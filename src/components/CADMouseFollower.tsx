import React, { useEffect, useState, useRef } from 'react';

export const CADMouseFollower = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [visible, setVisible] = useState(false);
  const [isHoveringCard, setIsHoveringCard] = useState(false);
  const [isHoveringLink, setIsHoveringLink] = useState(false);
  const followerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Disable on mobile/touch screens
    const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    if (isTouch) return;

    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      if (!visible) setVisible(true);

      // Check what element is under the cursor
      const target = e.target as HTMLElement;
      if (!target) return;

      // Check if hovering over buttons/links/interactive tags
      const isInteractive = target.closest('button, a, [role="button"], input, select');
      setIsHoveringLink(!!isInteractive);

      // Check if hovering over engineering spec cards
      const isCard = target.closest('.pillar-card, .division-card, .config-card, [data-cad-inspect], #options-slider div');
      setIsHoveringCard(!!isCard);
    };

    const handleMouseLeave = () => {
      setVisible(false);
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [visible]);

  if (!visible) return null;

  return (
    <div 
      ref={followerRef}
      className="fixed inset-0 pointer-events-none z-[9999] overflow-hidden"
    >
      {/* Horizontal Crosshair Line */}
      <div 
        className="absolute left-0 right-0 h-px bg-blue-500/10 transition-all duration-300"
        style={{ 
          top: position.y,
          transform: 'translateY(-50%)',
          opacity: isHoveringCard ? 0.8 : isHoveringLink ? 0.2 : 0.4
        }}
      />
      {/* Vertical Crosshair Line */}
      <div 
        className="absolute top-0 bottom-0 w-px bg-blue-500/10 transition-all duration-300"
        style={{ 
          left: position.x,
          transform: 'translateX(-50%)',
          opacity: isHoveringCard ? 0.8 : isHoveringLink ? 0.2 : 0.4
        }}
      />

      {/* Target Focus Dot/Circle */}
      <div 
        className="absolute w-6 h-6 rounded-full border border-blue-500/20 flex items-center justify-center -translate-x-1/2 -translate-y-1/2 transition-all duration-300"
        style={{ 
          left: position.x,
          top: position.y,
          transform: `translate(-50%, -50%) scale(${isHoveringLink ? 0.5 : isHoveringCard ? 1.5 : 1})`,
          backgroundColor: isHoveringLink ? 'rgba(0, 95, 184, 0.1)' : 'transparent',
          borderColor: isHoveringLink ? '#005fb8' : 'rgba(0, 95, 184, 0.3)'
        }}
      >
        <div className="w-1.5 h-1.5 rounded-full bg-blue-600 animate-pulse" />
      </div>

      {/* Coordinates Readout HUD */}
      <div 
        className="absolute font-mono text-[8px] text-blue-500/60 tracking-wider -translate-y-6 translate-x-4 select-none"
        style={{ 
          left: position.x,
          top: position.y 
        }}
      >
        X: {position.x} Y: {position.y}
      </div>
    </div>
  );
};
