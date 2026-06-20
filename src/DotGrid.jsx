import { useCallback, useEffect, useMemo, useRef } from 'react';
import { gsap } from 'gsap';
import './DotGrid.css';

const toRgb = (hex) => {
  const value = hex.replace('#', '');
  return [0, 2, 4].map((index) => Number.parseInt(value.slice(index, index + 2), 16));
};

export default function DotGrid({
  dotSize = 3,
  gap = 22,
  baseColor = '#2E2F20',
  activeColor = '#B7A06D',
  proximity = 92,
  shockRadius = 108,
  shockStrength = 11,
  resistance = 750,
  returnDuration = 0.7,
  className = '',
  style,
}) {
  const wrapperRef = useRef(null);
  const canvasRef = useRef(null);
  const dotsRef = useRef([]);
  const pointerRef = useRef({ x: -9999, y: -9999 });
  const activeRef = useRef(false);
  const frameRef = useRef(0);
  const drawRef = useRef(null);
  const baseRgb = useMemo(() => toRgb(baseColor), [baseColor]);
  const activeRgb = useMemo(() => toRgb(activeColor), [activeColor]);

  const buildGrid = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const width = window.innerWidth;
    const height = window.innerHeight;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = Math.ceil(width * dpr);
    canvas.height = Math.ceil(height * dpr);
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;
    canvas.getContext('2d')?.setTransform(dpr, 0, 0, dpr, 0, 0);

    const cell = dotSize + gap;
    const columns = Math.floor((width + gap) / cell);
    const rows = Math.floor((height + gap) / cell);
    const startX = (width - (columns * cell - gap)) / 2 + dotSize / 2;
    const startY = (height - (rows * cell - gap)) / 2 + dotSize / 2;
    dotsRef.current = Array.from({ length: columns * rows }, (_, index) => ({
      x: startX + (index % columns) * cell,
      y: startY + Math.floor(index / columns) * cell,
      xOffset: 0,
      yOffset: 0,
      animating: false,
    }));
  }, [dotSize, gap]);

  useEffect(() => {
    buildGrid();
    window.addEventListener('resize', buildGrid, { passive: true });
    return () => window.removeEventListener('resize', buildGrid);
  }, [buildGrid]);

  useEffect(() => {
    const draw = () => {
      frameRef.current = 0;
      if (!activeRef.current || document.hidden) return;
      const canvas = canvasRef.current;
      const context = canvas?.getContext('2d');
      if (!canvas || !context) return;
      const proximitySquared = proximity * proximity;
      context.clearRect(0, 0, window.innerWidth, window.innerHeight);
      for (const dot of dotsRef.current) {
        const dx = dot.x - pointerRef.current.x;
        const dy = dot.y - pointerRef.current.y;
        const distanceSquared = dx * dx + dy * dy;
        const amount = distanceSquared < proximitySquared ? 1 - Math.sqrt(distanceSquared) / proximity : 0;
        const color = baseRgb.map((channel, index) => Math.round(channel + (activeRgb[index] - channel) * amount));
        context.beginPath();
        context.arc(dot.x + dot.xOffset, dot.y + dot.yOffset, dotSize / 2 + amount * 1.7, 0, Math.PI * 2);
        context.fillStyle = `rgb(${color.join(', ')})`;
        context.fill();
      }
      frameRef.current = window.requestAnimationFrame(draw);
    };
    drawRef.current = draw;
    const start = () => {
      if (activeRef.current && !document.hidden && !frameRef.current) frameRef.current = window.requestAnimationFrame(draw);
    };
    const observer = new IntersectionObserver(([entry]) => {
      activeRef.current = entry.isIntersecting;
      if (!entry.isIntersecting) {
        pointerRef.current = { x: -9999, y: -9999 };
        if (frameRef.current) window.cancelAnimationFrame(frameRef.current);
        frameRef.current = 0;
      } else start();
    }, { threshold: 0 });
    if (wrapperRef.current) observer.observe(wrapperRef.current);
    const onVisibilityChange = () => {
      if (document.hidden && frameRef.current) {
        window.cancelAnimationFrame(frameRef.current);
        frameRef.current = 0;
      } else start();
    };
    document.addEventListener('visibilitychange', onVisibilityChange);
    return () => {
      observer.disconnect();
      document.removeEventListener('visibilitychange', onVisibilityChange);
      if (frameRef.current) window.cancelAnimationFrame(frameRef.current);
      frameRef.current = 0;
    };
  }, [activeRgb, baseRgb, dotSize, proximity]);

  useEffect(() => {
    const updatePointer = (event) => {
      const rect = wrapperRef.current?.getBoundingClientRect();
      if (!rect || event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) {
        pointerRef.current = { x: -9999, y: -9999 };
        return;
      }
      pointerRef.current = { x: event.clientX, y: event.clientY };
    };
    const shock = (event) => {
      const rect = wrapperRef.current?.getBoundingClientRect();
      if (!rect || event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) return;
      for (const dot of dotsRef.current) {
        const distance = Math.hypot(dot.x - event.clientX, dot.y - event.clientY);
        if (distance >= shockRadius || dot.animating) continue;
        dot.animating = true;
        const force = shockStrength * (1 - distance / shockRadius);
        gsap.killTweensOf(dot);
        gsap.to(dot, {
          xOffset: (dot.x - event.clientX) * force / shockRadius,
          yOffset: (dot.y - event.clientY) * force / shockRadius,
          duration: Math.max(0.18, 0.5 - resistance / 3000),
          ease: 'power3.out',
          onComplete: () => gsap.to(dot, {
            xOffset: 0,
            yOffset: 0,
            duration: returnDuration,
            ease: 'power3.out',
            onComplete: () => { dot.animating = false; },
          }),
        });
      }
    };
    window.addEventListener('pointermove', updatePointer, { passive: true });
    window.addEventListener('click', shock, { passive: true });
    return () => {
      window.removeEventListener('pointermove', updatePointer);
      window.removeEventListener('click', shock);
    };
  }, [resistance, returnDuration, shockRadius, shockStrength]);

  return <div ref={wrapperRef} className={`dot-grid ${className}`} style={style} aria-hidden="true"><canvas ref={canvasRef} className="dot-grid__canvas" /></div>;
}
