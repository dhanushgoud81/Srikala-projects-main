import React, { useState, useEffect } from 'react';
import { Factory, Cpu, ShieldCheck, Box } from 'lucide-react';

interface StageProps {
  id: number;
  title: string;
  desc: string;
  x: string;
  y: string;
}

export const PrecisionFactory3D = () => {
  const [activeStage, setActiveStage] = useState<number>(1);
  const [tickerCoordinates, setTickerCoordinates] = useState({ x: 104.2, y: 88.5 });

  // Simulate coordinate fluctuations for high-tech HUD coordinate readout
  useEffect(() => {
    const timer = setInterval(() => {
      setTickerCoordinates({
        x: parseFloat((100 + Math.random() * 8).toFixed(2)),
        y: parseFloat((85 + Math.random() * 5).toFixed(2))
      });
    }, 1200);
    return () => clearInterval(timer);
  }, []);

  const STAGES: StageProps[] = [
    { 
      id: 1, 
      title: 'TROPICAL EXTRUSION', 
      desc: 'aluplast profiles are extruded with advanced lead-free tropical formulations designed to withstand intense monsoon and high UV exposures.',
      x: '30%',
      y: '32%'
    },
    { 
      id: 2, 
      title: 'LASER FUSION WELDING', 
      desc: 'Automatic double-stack corner welders fuse profiles at exactly 250°C, producing hermetically sealed joints with maximum tensile strength.',
      x: '55%',
      y: '42%'
    },
    { 
      id: 3, 
      title: 'CNC CORNER CLEANING', 
      desc: 'High-speed CNC corner cleaners mill and scrape weld seams with sub-millimeter precision, achieving Srikala Projects\' clean seamless aesthetic.',
      x: '75%',
      y: '68%'
    },
    { 
      id: 4, 
      title: 'AUTOMATIC GLAZING & QC', 
      desc: 'Double-glazed units are automatically bonded using structural adhesives, followed by a rigorous 15-point mechanical stress test.',
      x: '46%',
      y: '80%'
    }
  ];

  return (
    <section className="py-24 bg-slate-50 border-t border-slate-200 relative overflow-hidden" id="smart-factory">
      {/* CAD technical coordinate lines */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(0,95,184,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(0,95,184,0.02)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />

      {/* Style blocks for keyframe animations (Isometric pathways & offsets) */}
      <style>{`
        @keyframes slideAlongPath1 {
          0% { offset-distance: 0%; opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { offset-distance: 100%; opacity: 0; }
        }
        @keyframes laserPulse {
          0%, 100% { stroke-width: 1.5px; filter: drop-shadow(0 0 2px rgba(0,95,184,0.6)); }
          50% { stroke-width: 2.5px; filter: drop-shadow(0 0 8px rgba(0,95,184,0.9)); }
        }
        @keyframes floatSlow {
          0%, 100% { transform: translateY(0px) rotateX(60deg) rotateZ(-45deg); }
          50% { transform: translateY(-6px) rotateX(60deg) rotateZ(-45deg); }
        }
        .moving-profile {
          offset-path: path('M 120 220 L 400 360 L 640 480 Q 750 420, 800 320');
          animation: slideAlongPath1 8s linear infinite;
        }
        .moving-glass {
          offset-path: path('M 350 480 L 520 395 L 750 280');
          animation: slideAlongPath1 6s linear infinite;
          animation-delay: 2s;
        }
      `}</style>

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Section Heading */}
        <div className="text-center mb-16">
          <span className="text-[10px] font-mono tracking-[0.25em] text-[#005fb8] uppercase block mb-3">Certified Manufacturing Flow</span>
          <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tight text-slate-900 mb-4">
            Smart Manufacturing Factory Flow
          </h2>
          <p className="text-slate-500 max-w-2xl mx-auto text-sm leading-relaxed">
            Experience our high-performance uPVC fabrication process in real-time, matching our German extrusion partners\' strict quality protocols.
          </p>
        </div>

        {/* 3D Isometric Interactive Area */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center max-w-6xl mx-auto bg-white border border-slate-200/80 rounded-3xl p-8 shadow-[0_25px_60px_rgba(0,0,0,0.02)] relative">
          
          {/* Left Side: Isometric Art Board */}
          <div className="lg:col-span-8 w-full bg-slate-50 rounded-2xl border border-slate-200/60 p-6 flex flex-col items-center justify-center relative overflow-hidden aspect-[4/3] shadow-inner select-none">
            
            {/* Ambient glows mimicking solar light beams */}
            <div className="absolute top-10 left-10 w-[200px] h-[200px] bg-blue-100/30 rounded-full blur-[80px] pointer-events-none" />
            <div className="absolute bottom-10 right-10 w-[250px] h-[250px] bg-indigo-100/20 rounded-full blur-[90px] pointer-events-none" />

            {/* High-tech HUD Coordinate Widget overlay (top left) */}
            <div className="absolute top-4 left-4 font-mono text-[8px] text-[#005fb8]/60 flex flex-col gap-0.5">
              <span>HUD RENDER STATE: ACTIVE</span>
              <span>CALIBRATION: X:{tickerCoordinates.x} Y:{tickerCoordinates.y}</span>
              <span>GRID SYSTEM: 3D ISOMETRIC 30°</span>
            </div>

            {/* Main 3D Canvas Vector Art Board */}
            <svg 
              viewBox="0 0 1000 700" 
              className="w-full h-full drop-shadow-[0_20px_40px_rgba(0,95,184,0.03)]"
              style={{ transform: 'scale(1.02)' }}
            >
              <defs>
                {/* Neon Blue Glow Filter */}
                <filter id="neonBlueGlow" x="-20%" y="-20%" width="140%" height="140%">
                  <feGaussianBlur stdDeviation="5" result="blur" />
                  <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
                
                {/* Isometric grid tile pattern */}
                <pattern id="isoGrid" width="60" height="34.6" patternUnits="userSpaceOnUse">
                  <path d="M 30 0 L 60 17.3 L 30 34.6 L 0 17.3 Z" fill="none" stroke="rgba(0, 95, 184, 0.03)" strokeWidth="0.5" />
                </pattern>

                {/* Clay materials gradients */}
                <linearGradient id="clayFront" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#ffffff" />
                  <stop offset="100%" stopColor="#e2e8f0" />
                </linearGradient>
                <linearGradient id="clayRight" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#f1f5f9" />
                  <stop offset="100%" stopColor="#cbd5e1" />
                </linearGradient>
                <linearGradient id="clayTop" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#ffffff" />
                  <stop offset="100%" stopColor="#f8fafc" />
                </linearGradient>
              </defs>

              {/* Blueprint Isometric Base floor */}
              <rect width="1000" height="700" fill="url(#isoGrid)" />

              {/* ─── Glowing Neon Conveyor Pathways (Just like luggage tracks!) ─── */}
              {/* Primary Profile Conveyor Route */}
              <path 
                d="M 120 220 L 400 360 L 640 480 Q 750 420, 800 320" 
                fill="none" 
                stroke="rgba(0, 95, 184, 0.08)" 
                strokeWidth="12" 
                strokeLinecap="round" 
              />
              <path 
                d="M 120 220 L 400 360 L 640 480 Q 750 420, 800 320" 
                fill="none" 
                stroke="#005fb8" 
                strokeWidth="2" 
                strokeLinecap="round"
                className="opacity-75"
                style={{ animation: 'laserPulse 2s infinite' }}
              />

              {/* Auxiliary Glass Conveyor Route */}
              <path 
                d="M 350 480 L 520 395 L 750 280" 
                fill="none" 
                stroke="rgba(139, 92, 246, 0.08)" 
                strokeWidth="8" 
                strokeLinecap="round" 
              />
              <path 
                d="M 350 480 L 520 395 L 750 280" 
                fill="none" 
                stroke="#8b5cf6" 
                strokeWidth="1.5" 
                strokeLinecap="round"
                className="opacity-75"
                style={{ animation: 'laserPulse 3s infinite' }}
              />

              {/* ─── Isometric Clay-Render Structural Buildings (Fine White Vector Blocks) ─── */}
              
              {/* 1. Profile Extrusion Tower (Left building, coordinates: x=120, y=140) */}
              <g className="transition-transform duration-500 hover:translate-y-[-4px]">
                {/* Left face */}
                <path d="M 60 180 L 120 215 L 120 280 L 60 245 Z" fill="url(#clayFront)" stroke="#cbd5e1" strokeWidth="0.5" />
                {/* Right face */}
                <path d="M 120 215 L 180 180 L 180 245 L 120 280 Z" fill="url(#clayRight)" stroke="#cbd5e1" strokeWidth="0.5" />
                {/* Top face */}
                <path d="M 120 150 L 180 180 L 120 215 L 60 180 Z" fill="url(#clayTop)" stroke="#cbd5e1" strokeWidth="0.5" />
                {/* Glowing neon amber window interior */}
                <path d="M 135 220 L 165 203 L 165 230 L 135 248 Z" fill="#b08754" opacity="0.85" className="animate-pulse" />
              </g>

              {/* 2. Laser Fusion Welder Station (Conveyor Gate arch, x=400, y=360) */}
              <g>
                {/* Glass neon arch tubes (just like the reference image!) */}
                <path d="M 360 380 C 360 300, 440 300, 440 380" fill="none" stroke="rgba(0, 95, 184, 0.15)" strokeWidth="16" strokeLinecap="round" />
                <path d="M 360 380 C 360 300, 440 300, 440 380" fill="none" stroke="#005fb8" strokeWidth="2.5" strokeLinecap="round" filter="url(#neonBlueGlow)" />
                {/* Structural supports */}
                <rect x="354" y="360" width="12" height="40" rx="1.5" fill="#e2e8f0" stroke="#cbd5e1" />
                <rect x="434" y="360" width="12" height="40" rx="1.5" fill="#cbd5e1" stroke="#94a3b8" />
              </g>

              {/* 3. CNC Corner Cleaner Hub (White Structure, x=640, y=480) */}
              <g className="transition-transform duration-500 hover:translate-y-[-4px]">
                {/* Main block */}
                <path d="M 570 470 L 640 510 L 640 580 L 570 540 Z" fill="url(#clayFront)" stroke="#cbd5e1" strokeWidth="0.5" />
                <path d="M 640 510 L 710 470 L 710 540 L 640 580 Z" fill="url(#clayRight)" stroke="#cbd5e1" strokeWidth="0.5" />
                <path d="M 640 430 L 710 470 L 640 510 L 570 470 Z" fill="url(#clayTop)" stroke="#cbd5e1" strokeWidth="0.5" />
                {/* Purple glowing laser coordinate deck */}
                <path d="M 600 480 L 680 470 Z" stroke="#8b5cf6" strokeWidth="3" filter="url(#neonBlueGlow)" />
              </g>

              {/* 4. Automated Glass glaze Dock (Right side structure, x=800, y=320) */}
              <g className="transition-transform duration-500 hover:translate-y-[-4px]">
                {/* Glass dock clay platform */}
                <path d="M 740 310 L 800 345 L 800 405 L 740 370 Z" fill="url(#clayFront)" stroke="#cbd5e1" strokeWidth="0.5" />
                <path d="M 800 345 L 860 310 L 860 370 L 800 405 Z" fill="url(#clayRight)" stroke="#cbd5e1" strokeWidth="0.5" />
                <path d="M 800 275 L 860 310 L 800 345 L 740 310 Z" fill="url(#clayTop)" stroke="#cbd5e1" strokeWidth="0.5" />
                {/* Double-glazing terminal slot */}
                <path d="M 770 305 L 830 305" stroke="#005fb8" strokeWidth="3.5" filter="url(#neonBlueGlow)" />
              </g>

              {/* ─── Moving SVG Elements Along Neon Paths (The "Airport luggage" Effect!) ─── */}
              
              {/* Profile item sliding along conveyor track */}
              <g className="moving-profile pointer-events-none">
                {/* Animated isometric uPVC frame profile */}
                <g style={{ transform: 'scale(0.85) rotateX(60deg) rotateZ(-45deg)', transformOrigin: 'center' }}>
                  {/* Isometric shadow */}
                  <rect x="-24" y="-18" width="48" height="36" rx="2" fill="none" stroke="rgba(0, 95, 184, 0.3)" strokeWidth="6" />
                  {/* High precision white profile block */}
                  <rect x="-24" y="-18" width="48" height="36" rx="2" fill="white" stroke="#005fb8" strokeWidth="3" />
                  {/* Central gasket line */}
                  <rect x="-18" y="-13" width="36" height="26" rx="1.5" fill="none" stroke="#e30613" strokeWidth="1" />
                </g>
              </g>

              {/* Glass unit sliding along helper path */}
              <g className="moving-glass pointer-events-none">
                <g style={{ transform: 'scale(0.65) rotateX(60deg) rotateZ(-45deg)', transformOrigin: 'center' }}>
                  {/* Glowing translucent double-glazed glass sheet */}
                  <rect x="-30" y="-20" width="60" height="40" rx="1" fill="rgba(139, 92, 246, 0.15)" stroke="#8b5cf6" strokeWidth="2" style={{ backdropFilter: 'blur(2px)' }} />
                  <line x1="-15" y1="-10" x2="15" y2="10" stroke="rgba(255,255,255,0.7)" strokeWidth="1.5" strokeLinecap="round" />
                </g>
              </g>

              {/* ─── Interactive Touch/Hover Pulsing Node buttons ─── */}
              {STAGES.map((stage) => {
                const isActive = activeStage === stage.id;
                return (
                  <g 
                    key={stage.id} 
                    className="cursor-pointer"
                    onClick={() => setActiveStage(stage.id)}
                  >
                    {/* Outer glowing pulsing ring */}
                    <circle cx={stage.x} cy={stage.y} r="16" fill="rgba(0, 95, 184, 0.12)" className={isActive ? "animate-ping" : ""} />
                    {/* Center node button */}
                    <circle 
                      cx={stage.x} 
                      cy={stage.y} 
                      r="9" 
                      fill={isActive ? "#005fb8" : "#ffffff"} 
                      stroke="#005fb8" 
                      strokeWidth="2.5" 
                      className="transition-colors duration-300"
                    />
                    <text 
                      x={stage.x} 
                      y={stage.y} 
                      dy="3" 
                      textAnchor="middle" 
                      fill={isActive ? "#ffffff" : "#005fb8"} 
                      className="font-sans font-black text-[9px] select-none pointer-events-none"
                    >
                      {stage.id}
                    </text>
                  </g>
                );
              })}

            </svg>
          </div>

          {/* Right Side: Interactive Stage Control HUD */}
          <div className="lg:col-span-4 flex flex-col justify-between h-full py-2">
            
            {/* Header capsule HUD */}
            <div className="mb-6">
              <span className="text-[8px] font-mono tracking-[0.25em] text-[#005fb8] uppercase font-bold block mb-1">FACTORY INSPECTION HUB</span>
              <h3 className="text-xl font-black text-slate-800 uppercase tracking-wide">STAGE MONITOR</h3>
            </div>

            {/* Stages Stagger block */}
            <div className="flex flex-col gap-3 mb-8">
              {STAGES.map((stage) => {
                const isActive = activeStage === stage.id;
                const StageIcon = stage.id === 1 ? Factory : stage.id === 2 ? Cpu : stage.id === 3 ? ShieldCheck : Box;
                return (
                  <button
                    key={stage.id}
                    onClick={() => setActiveStage(stage.id)}
                    className={`w-full flex items-center gap-4 p-4 rounded-xl border text-left transition-all duration-300 ${
                      isActive
                        ? 'bg-slate-900 border-slate-950 text-white shadow-lg translate-x-2'
                        : 'bg-slate-50 border-slate-200/75 text-slate-600 hover:bg-slate-100 hover:border-slate-350 hover:text-slate-900'
                    }`}
                  >
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 border transition-all ${
                      isActive 
                        ? 'bg-[#005fb8]/20 border-[#005fb8] text-cyan-400' 
                        : 'bg-white border-slate-200 text-slate-500'
                    }`}>
                      <StageIcon className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="text-[7px] font-mono tracking-widest text-[#005fb8] uppercase block font-black">STAGE 0{stage.id}</span>
                      <span className="font-extrabold text-[11px] uppercase tracking-wide block leading-tight">{stage.title}</span>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Detailed Spec card panel */}
            <div className="bg-slate-50 border border-slate-200/80 p-5 rounded-2xl relative shadow-inner animate-[fadeUp_0.4s_ease-out_forwards]">
              <span className="text-[7px] font-mono tracking-[0.2em] text-[#005fb8] uppercase font-black block mb-1">
                STAGE SPECIFICATION REPORT
              </span>
              <h4 className="font-black text-xs text-slate-800 uppercase tracking-wide mb-2 leading-tight">
                {STAGES[activeStage - 1].title}
              </h4>
              <p className="text-slate-500 text-[11px] leading-relaxed">
                {STAGES[activeStage - 1].desc}
              </p>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
