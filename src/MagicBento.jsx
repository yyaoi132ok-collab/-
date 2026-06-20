import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import './MagicBento.css';

const createParticle = (x, y, glowColor) => {
  const particle = document.createElement('span');
  particle.className = 'magic-bento-particle';
  particle.style.setProperty('--particle-x', `${x}px`);
  particle.style.setProperty('--particle-y', `${y}px`);
  particle.style.setProperty('--glow-color', glowColor);
  return particle;
};

function MagicBentoCard({ card, index, glowColor, particleCount, enableTilt, enableMagnetism, clickEffect }) {
  const cardRef = useRef(null);

  useEffect(() => {
    const element = cardRef.current;
    if (!element || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;

    const reset = () => {
      gsap.to(element, { x: 0, y: 0, rotateX: 0, rotateY: 0, duration: 0.28, ease: 'power2.out' });
      element.querySelectorAll('.magic-bento-particle').forEach((particle) => particle.remove());
    };

    const handleMove = (event) => {
      const rect = element.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      element.style.setProperty('--glow-x', `${(x / rect.width) * 100}%`);
      element.style.setProperty('--glow-y', `${(y / rect.height) * 100}%`);
      element.style.setProperty('--glow-intensity', '1');

      if (enableTilt || enableMagnetism) {
        const offsetX = (x - rect.width / 2) / rect.width;
        const offsetY = (y - rect.height / 2) / rect.height;
        gsap.to(element, {
          x: enableMagnetism ? offsetX * 8 : 0,
          y: enableMagnetism ? offsetY * 8 : 0,
          rotateX: enableTilt ? -offsetY * 5 : 0,
          rotateY: enableTilt ? offsetX * 5 : 0,
          duration: 0.18,
          ease: 'power2.out',
        });
      }
    };

    const handleEnter = () => {
      Array.from({ length: particleCount }, (_, particleIndex) => {
        const particle = createParticle(Math.random() * element.clientWidth, Math.random() * element.clientHeight, glowColor);
        element.appendChild(particle);
        gsap.fromTo(
          particle,
          { opacity: 0, scale: 0 },
          { opacity: 0.8, scale: 1, duration: 0.25, delay: particleIndex * 0.04, ease: 'back.out(1.7)' },
        );
        gsap.to(particle, {
          x: (Math.random() - 0.5) * 56,
          y: (Math.random() - 0.5) * 56,
          duration: 1.8 + Math.random(),
          yoyo: true,
          repeat: -1,
          ease: 'sine.inOut',
        });
      });
    };

    const handleClick = (event) => {
      if (!clickEffect) return;
      const rect = element.getBoundingClientRect();
      const ripple = document.createElement('span');
      ripple.className = 'magic-bento-ripple';
      ripple.style.setProperty('--ripple-x', `${event.clientX - rect.left}px`);
      ripple.style.setProperty('--ripple-y', `${event.clientY - rect.top}px`);
      ripple.style.setProperty('--glow-color', glowColor);
      element.appendChild(ripple);
      gsap.fromTo(ripple, { scale: 0, opacity: 0.7 }, { scale: 1, opacity: 0, duration: 0.72, ease: 'power2.out', onComplete: () => ripple.remove() });
    };

    element.addEventListener('mouseenter', handleEnter);
    element.addEventListener('mousemove', handleMove);
    element.addEventListener('mouseleave', reset);
    element.addEventListener('click', handleClick);
    return () => {
      element.removeEventListener('mouseenter', handleEnter);
      element.removeEventListener('mousemove', handleMove);
      element.removeEventListener('mouseleave', reset);
      element.removeEventListener('click', handleClick);
      reset();
    };
  }, [clickEffect, enableMagnetism, enableTilt, glowColor, particleCount]);

  const Icon = card.icon;
  return (
    <article className="magic-bento-card" ref={cardRef} style={{ '--glow-color': glowColor }}>
      <div className="magic-bento-card__top">
        <div className="magic-bento-card__icon"><Icon size={22} /></div>
        <span>0{index + 1}</span>
      </div>
      <div className="magic-bento-card__content">
        <h3>{card.title}</h3>
        <p>{card.text}</p>
      </div>
    </article>
  );
}

export default function MagicBento({ cards, glowColor = '215, 181, 109', particleCount = 8, enableTilt = true, enableMagnetism = true, clickEffect = true }) {
  return (
    <div className="magic-bento-grid">
      {cards.map((card, index) => (
        <MagicBentoCard
          key={card.title}
          card={card}
          index={index}
          glowColor={glowColor}
          particleCount={particleCount}
          enableTilt={enableTilt}
          enableMagnetism={enableMagnetism}
          clickEffect={clickEffect}
        />
      ))}
    </div>
  );
}
