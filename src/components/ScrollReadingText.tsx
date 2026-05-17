import React, { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { textReveal } from '../lib/stunningAnimations';

interface ScrollReadingTextProps {
  children: string;
  className?: string;
}

export const ScrollReadingText: React.FC<ScrollReadingTextProps> = ({ children, className = '' }) => {
  const textRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (textRef.current) {
      textReveal.readingEffect(textRef.current);
    }
  }, { scope: textRef });

  return (
    <div ref={textRef} className={`text-slate-200 ${className}`}>
      {children}
    </div>
  );
};
