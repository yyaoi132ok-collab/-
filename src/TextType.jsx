import { createElement, useEffect, useMemo, useRef, useState } from 'react';
import { gsap } from 'gsap';
import './TextType.css';

export default function TextType({
  text,
  as: Component = 'span',
  typingSpeed = 50,
  initialDelay = 0,
  pauseDuration = 2000,
  deletingSpeed = 30,
  loop = true,
  className = '',
  showCursor = true,
  cursorCharacter = '|',
  cursorClassName = '',
  cursorBlinkDuration = 0.5,
  startOnVisible = false,
}) {
  const textArray = useMemo(() => (Array.isArray(text) ? text : [text]), [text]);
  const [displayedText, setDisplayedText] = useState('');
  const [textIndex, setTextIndex] = useState(0);
  const [characterIndex, setCharacterIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isVisible, setIsVisible] = useState(!startOnVisible);
  const containerRef = useRef(null);
  const cursorRef = useRef(null);

  useEffect(() => {
    if (!startOnVisible || !containerRef.current) return undefined;
    const observer = new IntersectionObserver(([entry]) => entry.isIntersecting && setIsVisible(true), { threshold: 0.1 });
    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, [startOnVisible]);

  useEffect(() => {
    if (!showCursor || !cursorRef.current) return undefined;
    const animation = gsap.to(cursorRef.current, { opacity: 0, duration: cursorBlinkDuration, repeat: -1, yoyo: true, ease: 'power2.inOut' });
    return () => animation.kill();
  }, [cursorBlinkDuration, showCursor]);

  useEffect(() => {
    if (!isVisible) return undefined;
    const activeText = textArray[textIndex] ?? '';
    let delay = typingSpeed;

    if (!isDeleting && characterIndex < activeText.length) {
      delay = characterIndex === 0 ? initialDelay || typingSpeed : typingSpeed;
    } else if (!isDeleting) {
      delay = pauseDuration;
    } else {
      delay = deletingSpeed;
    }

    const timeout = window.setTimeout(() => {
      if (!isDeleting && characterIndex < activeText.length) {
        setDisplayedText(activeText.slice(0, characterIndex + 1));
        setCharacterIndex((index) => index + 1);
        return;
      }
      if (!isDeleting && (loop || textIndex < textArray.length - 1)) {
        setIsDeleting(true);
        return;
      }
      if (isDeleting && characterIndex > 0) {
        setDisplayedText(activeText.slice(0, characterIndex - 1));
        setCharacterIndex((index) => index - 1);
        return;
      }
      if (isDeleting) {
        setIsDeleting(false);
        setTextIndex((index) => (index + 1) % textArray.length);
      }
    }, delay);

    return () => window.clearTimeout(timeout);
  }, [characterIndex, deletingSpeed, initialDelay, isDeleting, isVisible, loop, pauseDuration, textArray, textIndex, typingSpeed]);

  return createElement(
    Component,
    { className: `text-type ${className}`, ref: containerRef },
    <span className="text-type__content">{displayedText}</span>,
    showCursor && <span className={`text-type__cursor ${cursorClassName}`.trim()} ref={cursorRef}>{cursorCharacter}</span>,
  );
}
