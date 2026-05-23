import React, { useState, useEffect, useRef } from 'react';
import { 
  ArrowLeft, ChevronLeft, ChevronRight, Check,
  Thermometer, Shield, Volume2, Droplets, Sparkles, Move,
  Hammer, Eye, Layers, Compass, Palette
} from 'lucide-react';
import gsap from 'gsap';

// ─── Interfaces ──────────────────────────────────────────────────────────────────
export interface WindowDetail {
  id: string;
  title: string;
  desc: string;
  img: string;
  overview: string;
  features: {
    icon: React.ComponentType<any>;
    title: string;
    desc: string;
  }[];
  options: {
    name: string;
    desc: string;
    svgPath: React.ReactNode;
  }[];
}

// ─── CAD Blueprint Schematics (Clean Light CAD Blueprint Theme) ───────────────────
const CAD_GRID_PATTERN_LIGHT = (
  <defs>
    <pattern id="cadGridLight" width="10" height="10" patternUnits="userSpaceOnUse">
      <path d="M 10 0 L 0 0 0 10" fill="none" stroke="rgba(0, 95, 184, 0.04)" strokeWidth="0.5" />
    </pattern>
  </defs>
);

const SVG_SLIDING_4PANEL = (
  <svg viewBox="0 0 100 80" className="w-full h-full stroke-slate-400 fill-none stroke-[1.2]">
    {CAD_GRID_PATTERN_LIGHT}
    <rect width="100" height="80" fill="url(#cadGridLight)" className="stroke-none" />
    
    {/* Blueprint outer frame */}
    <rect x="5" y="10" width="90" height="60" rx="1" className="stroke-[#005fb8] stroke-2 opacity-90" />
    <line x1="27.5" y1="10" x2="27.5" y2="70" className="stroke-slate-300 stroke-dasharray-[2,2]" />
    <line x1="50" y1="10" x2="50" y2="70" className="stroke-[#005fb8] stroke-2" />
    <line x1="72.5" y1="10" x2="72.5" y2="70" className="stroke-slate-300 stroke-dasharray-[2,2]" />
    
    {/* Sashes */}
    <rect x="9" y="14" width="15" height="52" rx="0.5" className="stroke-slate-800" />
    <rect x="31.5" y="14" width="15" height="52" rx="0.5" className="stroke-slate-800" />
    <rect x="54" y="14" width="15" height="52" rx="0.5" className="stroke-slate-800" />
    <rect x="76.5" y="14" width="15" height="52" rx="0.5" className="stroke-slate-800" />
    
    {/* Technical Arrows */}
    <path d="M 21 40 L 13 40 M 16 37 L 13 40 L 16 43" className="stroke-[#005fb8] stroke-1" />
    <path d="M 35 40 L 43 40 M 40 37 L 43 40 L 40 43" className="stroke-[#005fb8] stroke-1" />
    <path d="M 65 40 L 57 40 M 60 37 L 57 40 L 60 43" className="stroke-[#005fb8] stroke-1" />
    <path d="M 79 40 L 87 40 M 84 37 L 87 40 L 84 43" className="stroke-[#005fb8] stroke-1" />
    
    {/* Dimension lines */}
    <path d="M 5 5 L 95 5 M 5 2 L 5 8 M 95 2 L 95 8" className="stroke-slate-300 stroke-[0.5]" />
    <text x="50" y="4" textAnchor="middle" className="fill-slate-400 font-mono text-[4px]">W: 3200mm</text>
  </svg>
);

const SVG_SLIDING_1TRACK_INT = (
  <svg viewBox="0 0 100 80" className="w-full h-full stroke-slate-400 fill-none stroke-[1.2]">
    {CAD_GRID_PATTERN_LIGHT}
    <rect width="100" height="80" fill="url(#cadGridLight)" className="stroke-none" />
    
    <rect x="15" y="10" width="70" height="60" rx="1" className="stroke-[#005fb8] stroke-2" />
    <line x1="50" y1="10" x2="50" y2="70" className="stroke-[#005fb8] stroke-2" />
    
    {/* Left Fixed Panel with large "X" */}
    <path d="M 20 18 L 45 62 M 45 18 L 20 62" className="stroke-slate-200 stroke-[1]" />
    
    {/* Right Sliding sash */}
    <rect x="54" y="14" width="27" height="52" rx="0.5" className="stroke-slate-800 stroke-[1.5]" />
    <circle cx="58" cy="40" r="1" className="fill-[#005fb8] stroke-none" />
    
    {/* Sliding Arrow */}
    <path d="M 75 40 L 63 40 M 67 36 L 63 40 L 67 44" className="stroke-[#005fb8] stroke-1" />
    <text x="50" y="4" textAnchor="middle" className="fill-slate-400 font-mono text-[4px]">W: 1800mm</text>
  </svg>
);

const SVG_SLIDING_2_5TRACK_MESH = (
  <svg viewBox="0 0 100 80" className="w-full h-full stroke-slate-400 fill-none stroke-[1.2]">
    {CAD_GRID_PATTERN_LIGHT}
    <rect width="100" height="80" fill="url(#cadGridLight)" className="stroke-none" />
    
    <rect x="5" y="10" width="90" height="60" rx="1" className="stroke-[#005fb8] stroke-2" />
    <line x1="50" y1="10" x2="50" y2="70" className="stroke-[#005fb8] stroke-2" />
    
    {/* Left sash with mesh texture in top corner */}
    <rect x="9" y="14" width="37" height="52" rx="0.5" className="stroke-slate-800" />
    <path d="M 34 14 L 42 22 M 38 14 L 42 18 M 41 14 L 42 15" className="stroke-[#005fb8]/50 stroke-[0.8]" />
    
    {/* Right sliding sash */}
    <rect x="54" y="14" width="37" height="52" rx="0.5" className="stroke-slate-800 stroke-[1.5]" />
    
    {/* Sliding arrows */}
    <path d="M 20 40 L 28 40 M 24 36 L 28 40 L 24 44" className="stroke-slate-400 stroke-1" />
    <path d="M 80 40 L 72 40 M 76 36 L 72 40 L 76 44" className="stroke-slate-400 stroke-1" />
    <text x="50" y="4" textAnchor="middle" className="fill-slate-400 font-mono text-[4px]">W: 2400mm</text>
  </svg>
);

const SVG_SLIDING_2TRACK_MESH = (
  <svg viewBox="0 0 100 80" className="w-full h-full stroke-slate-400 fill-none stroke-[1.2]">
    {CAD_GRID_PATTERN_LIGHT}
    <rect width="100" height="80" fill="url(#cadGridLight)" className="stroke-none" />
    
    <rect x="5" y="10" width="90" height="60" rx="1" className="stroke-[#005fb8] stroke-2" />
    <line x1="50" y1="10" x2="50" y2="70" className="stroke-[#005fb8] stroke-2" />
    
    {/* Left & Right sashes */}
    <rect x="9" y="14" width="37" height="52" rx="0.5" className="stroke-slate-800" />
    <rect x="54" y="14" width="37" height="52" rx="0.5" className="stroke-slate-800" />
    
    <circle cx="42" cy="40" r="1" className="fill-slate-900 stroke-none" />
    <circle cx="58" cy="40" r="1" className="fill-slate-900 stroke-none" />
    
    {/* Sliding arrows */}
    <path d="M 22 40 L 32 40 M 28 36 L 32 40 L 28 44" className="stroke-slate-400 stroke-1" />
    <path d="M 78 40 L 68 40 M 72 36 L 68 40 L 72 44" className="stroke-slate-400 stroke-1" />
    <text x="50" y="4" textAnchor="middle" className="fill-slate-400 font-mono text-[4px]">W: 2000mm</text>
  </svg>
);

// ─── SVG Schematics for Casement ──────────────────────────────────────────────────
const SVG_CASEMENT_1PANEL = (
  <svg viewBox="0 0 100 80" className="w-full h-full stroke-slate-400 fill-none stroke-[1.2]">
    {CAD_GRID_PATTERN_LIGHT}
    <rect width="100" height="80" fill="url(#cadGridLight)" className="stroke-none" />
    <rect x="20" y="10" width="60" height="60" rx="1" className="stroke-[#005fb8] stroke-2" />
    <rect x="25" y="15" width="50" height="50" rx="0.5" className="stroke-slate-800" />
    <path d="M 25 15 L 75 40 L 25 65" className="stroke-dashed stroke-[#005fb8]/60 stroke-[1]" />
    <circle cx="70" cy="40" r="1.5" className="fill-slate-900 stroke-none" />
  </svg>
);

const SVG_CASEMENT_FRENCH = (
  <svg viewBox="0 0 100 80" className="w-full h-full stroke-slate-400 fill-none stroke-[1.2]">
    {CAD_GRID_PATTERN_LIGHT}
    <rect width="100" height="80" fill="url(#cadGridLight)" className="stroke-none" />
    <rect x="10" y="10" width="80" height="60" rx="1" className="stroke-[#005fb8] stroke-2" />
    <line x1="50" y1="10" x2="50" y2="70" className="stroke-[#005fb8] stroke-2" />
    
    <rect x="14" y="15" width="32" height="50" rx="0.5" className="stroke-slate-800" />
    <path d="M 14 15 L 46 40 L 14 65" className="stroke-slate-300 stroke-[0.8]" />
    
    <rect x="54" y="15" width="32" height="50" rx="0.5" className="stroke-slate-800" />
    <path d="M 86 15 L 54 40 L 86 65" className="stroke-slate-300 stroke-[0.8]" />
  </svg>
);

const SVG_CASEMENT_TOPHUNG = (
  <svg viewBox="0 0 100 80" className="w-full h-full stroke-slate-400 fill-none stroke-[1.2]">
    {CAD_GRID_PATTERN_LIGHT}
    <rect width="100" height="80" fill="url(#cadGridLight)" className="stroke-none" />
    <rect x="20" y="10" width="60" height="60" rx="1" className="stroke-[#005fb8] stroke-2" />
    <rect x="25" y="15" width="50" height="50" rx="0.5" className="stroke-slate-800" />
    <path d="M 25 65 L 50 15 L 75 65" className="stroke-slate-300 stroke-[1]" />
    <circle cx="50" cy="60" r="1.5" className="fill-slate-900 stroke-none" />
  </svg>
);

// ─── SVG Schematics for Arch ──────────────────────────────────────────────────────
const SVG_ARCH_FULL = (
  <svg viewBox="0 0 100 80" className="w-full h-full stroke-slate-400 fill-none stroke-[1.2]">
    {CAD_GRID_PATTERN_LIGHT}
    <rect width="100" height="80" fill="url(#cadGridLight)" className="stroke-none" />
    <path d="M 20 70 L 20 40 A 30 30 0 0 1 80 40 L 80 70 Z" className="stroke-[#005fb8] stroke-2" />
    <line x1="20" y1="40" x2="80" y2="40" className="stroke-slate-200 stroke-dasharray-[2,2]" />
    <path d="M 26 65 L 26 40 A 24 24 0 0 1 74 40 L 74 65 Z" className="stroke-slate-800" />
  </svg>
);

const SVG_ARCH_OPERABLE = (
  <svg viewBox="0 0 100 80" className="w-full h-full stroke-slate-400 fill-none stroke-[1.2]">
    {CAD_GRID_PATTERN_LIGHT}
    <rect width="100" height="80" fill="url(#cadGridLight)" className="stroke-none" />
    <path d="M 20 70 L 20 40 A 30 30 0 0 1 80 40 L 80 70 Z" className="stroke-[#005fb8] stroke-2" />
    <line x1="20" y1="40" x2="80" y2="40" className="stroke-[#005fb8] stroke-2" />
    <rect x="25" y="44" width="50" height="22" rx="0.5" className="stroke-slate-800" />
    <path d="M 25 44 L 75 55 L 25 66" className="stroke-slate-300 stroke-[0.8]" />
  </svg>
);

// ─── SVG Schematics for Combination & Other ───────────────────────────────────────
const SVG_COMBINATION_CS_FX = (
  <svg viewBox="0 0 100 80" className="w-full h-full stroke-slate-400 fill-none stroke-[1.2]">
    {CAD_GRID_PATTERN_LIGHT}
    <rect width="100" height="80" fill="url(#cadGridLight)" className="stroke-none" />
    <rect x="10" y="10" width="80" height="60" rx="1" className="stroke-[#005fb8] stroke-2" />
    <line x1="45" y1="10" x2="45" y2="70" className="stroke-[#005fb8] stroke-2" />
    
    <rect x="14" y="15" width="27" height="50" rx="0.5" className="stroke-slate-800" />
    <path d="M 14 15 L 41 40 L 14 65" className="stroke-slate-300" />
    
    <rect x="49" y="15" width="37" height="50" rx="0.5" className="stroke-slate-300" />
    <line x1="49" y1="15" x2="86" y2="65" className="stroke-slate-100" />
  </svg>
);

const SVG_TILT_TURN_TILT = (
  <svg viewBox="0 0 100 80" className="w-full h-full stroke-slate-400 fill-none stroke-[1.2]">
    {CAD_GRID_PATTERN_LIGHT}
    <rect width="100" height="80" fill="url(#cadGridLight)" className="stroke-none" />
    <rect x="20" y="10" width="60" height="60" rx="1" className="stroke-[#005fb8] stroke-2" />
    <rect x="25" y="15" width="50" height="50" rx="0.5" className="stroke-slate-800" />
    <path d="M 25 15 L 50 65 L 75 15" className="stroke-[#005fb8] stroke-1" />
    <path d="M 25 15 L 75 15 L 50 25 Z" className="fill-[#005fb8]/5 stroke-none" />
  </svg>
);

const SVG_VILLA_SYSTEM = (
  <svg viewBox="0 0 100 80" className="w-full h-full stroke-slate-400 fill-none stroke-[1.2]">
    {CAD_GRID_PATTERN_LIGHT}
    <rect width="100" height="80" fill="url(#cadGridLight)" className="stroke-none" />
    <rect x="15" y="10" width="70" height="60" rx="1" className="stroke-[#005fb8] stroke-2" />
    <g className="stroke-slate-100 stroke-[0.75]">
      <line x1="25" y1="10" x2="25" y2="70" />
      <line x1="38" y1="10" x2="38" y2="70" />
      <line x1="50" y1="10" x2="50" y2="70" />
      <line x1="62" y1="10" x2="62" y2="70" />
      <line x1="75" y1="10" x2="75" y2="70" />
      <line x1="15" y1="25" x2="85" y2="25" />
      <line x1="15" y1="40" x2="85" y2="40" />
      <line x1="15" y1="55" x2="85" y2="55" />
    </g>
    <rect x="20" y="14" width="60" height="52" rx="0.5" className="stroke-slate-800 stroke-[1.5]" />
  </svg>
);

// ─── Specs database ───────────────────────────────────────────────────────────────
export const DETAILED_PRODUCTS: Record<string, WindowDetail> = {
  'Sliding Windows': {
    id: 'sliding',
    title: 'uPVC Sliding Windows',
    desc: 'Glide horizontally on heavy-duty tracks requiring absolutely no interior or exterior swing space. A space-saving engineering marvel engineered for apartments and high-rises.',
    img: '/images/sliding-window-render.png',
    overview: 'uPVC Sliding Windows are fitted with heavy-duty brass/nylon rollers at the bottom for effortless, silent horizontal gliding. Exceptionally space-saving and highly robust, sliding windows are an ideal choice for apartments, high-rises, and offices needing expansive panoramic views with ample natural ventilation. Since the window open horizontally, they require zero swing space, allowing furniture or curtains to be placed right against the window.',
    features: [
      { icon: Move, title: 'Effortless Glide Technology', desc: 'Precision-engineered nylon rollers allow expansive 100kg sashes to slide smoothly with a single finger touch.' },
      { icon: Thermometer, title: 'Insulated Space Sealing', desc: 'Multi-chamber design traps air to stop tropical thermal transfer, dramatically reducing residential air-con energy bills.' },
      { icon: Shield, title: 'Intruder Force Shield', desc: 'Multi-point perimeter safety lock brackets secure sashes directly inside structural galvanized steel frame reinforcement.' },
      { icon: Droplets, title: 'Hurricane Monsoon Tracks', desc: 'Features an upward-angled channel threshold that forces torrential rain and gale winds (up to 2.0 kPa) outward.' }
    ],
    options: [
      { name: '4 TRACK, 4 PANEL SLIDING WINDOW', desc: 'Designed for wide openings. Sashes open outward from the center, providing a stunning wide-aperture view.', svgPath: SVG_SLIDING_4PANEL },
      { name: '1 TRACK WITH INTERMEDIATE', desc: 'A minimalist layout featuring a single sliding sash beside a wide fixed panoramic picture frame with structural safety markings.', svgPath: SVG_SLIDING_1TRACK_INT },
      { name: '2.5 TRACK x 2 PANEL SLIDING WINDOW WITH MESH/GRILL', desc: 'Features sliding glass panels plus a dedicated track for an insect mesh screen, engineered with premium safety profiles.', svgPath: SVG_SLIDING_2_5TRACK_MESH },
      { name: '2 TRACK SLIDING WINDOW WITH/WITHOUT MESH/GRILL', desc: 'Classic double-track configuration. Features two sliding panels on standard tracks to maximize daylight.', svgPath: SVG_SLIDING_2TRACK_MESH }
    ]
  },
  'Casement Windows': {
    id: 'casement',
    title: 'uPVC Casement Windows',
    desc: 'Hinged at the side and opening outwards like a traditional door, casement windows deliver maximum ventilation, airtight seals, and unmatched thermal performance.',
    img: '/images/casement-windows.png',
    overview: 'uPVC Casement Windows are the gold standard for acoustic and thermal insulation. By closing flat against a continuous rubber compression seal and securing with multi-point locks around the entire frame perimeter, they achieve a completely airtight seal. Hinged on heavy-duty friction stays, they open up to a full 90 degrees, catching passing breezes and redirecting fresh air directly into your home.',
    features: [
      { icon: Compass, title: '90° Maximum Ventilation', desc: 'Hinges swing fully open to custom redirect external cooling winds and sunlight inside your rooms.' },
      { icon: Volume2, title: 'Acoustic Compression Dampening', desc: 'Premium dual EPDM hollow weather gaskets block up to 40dB of ambient road traffic, city, and airport noises.' },
      { icon: Shield, title: 'Multi-Point Burglar Defense', desc: 'High-strength shootbolts anchor the sash firmly into the heavy frame at up to 6 distinct secure points.' },
      { icon: Layers, title: 'Deep Double Glazing Frame', desc: 'Deep 54mm profiles easily support structural double or triple insulated safety glass layers up to 24mm.' }
    ],
    options: [
      { name: 'SINGLE SASH OUTWARD CASEMENT', desc: 'A classic single operable pane opening outward left or right. Excellent for bedrooms and hallways.', svgPath: SVG_CASEMENT_1PANEL },
      { name: 'DOUBLE SASH FRENCH CASEMENT', desc: 'Two sashes opening outward from the center without a central vertical pillar, leaving a completely unobstructed opening.', svgPath: SVG_CASEMENT_FRENCH },
      { name: 'TOP HUNG VENTILATOR CASEMENT', desc: 'Hinged on the top and opening outward from the bottom. Allows ventilation even during unexpected rain showers.', svgPath: SVG_CASEMENT_TOPHUNG },
      { name: 'FIXED CASEMENT WITH OPERABLE PANEL', desc: 'Combines a large non-operable picture pane for constant light with a smaller casement pane for controlled fresh air.', svgPath: SVG_CASEMENT_1PANEL }
    ]
  },
  'Arch Windows': {
    id: 'arch',
    title: 'uPVC Arch Windows',
    desc: 'Add timeless architectural elegance and vintage styling to your facade using precision-curved modern profiles without compromising on high insulation.',
    img: '/images/arch-windows.png',
    overview: 'uPVC Arch Windows combine the historic, elegant beauty of curved arches with the high performance, insulation, and durability of modern uPVC technology. Utilizing state-of-the-art thermal profile bending machines, Srikala Projects creates perfectly uniform, continuous curves. They add premium character, classic style, and an elite luxury touch to bungalows, resort facades, and heritage-style homes.',
    features: [
      { icon: Sparkles, title: 'Bespoke Curving Precision', desc: 'Utilizes high-temperature automated profile bending to achieve perfectly smooth arches of any custom radius.' },
      { icon: Layers, title: 'Reinforced Curved Core', desc: 'Internal galvanized curved steel inserts guarantee high stability and maintain shape across decades.' },
      { icon: Hammer, title: 'Classic Heritage Aesthetic', desc: 'Integrates classical visual appeal into modern buildings, instantly boosting facade value.' },
      { icon: Droplets, title: 'Hermetic Leak Protection', desc: 'Continuously welded curved corners eliminate joint gaps, completely blocking monsoon rainwater.' }
    ],
    options: [
      { name: 'FULL SEMI-CIRCULAR ARCH PANEL', desc: 'A gorgeous, completely fixed semi-circle glass panel that floods high ceilings with natural daylight.', svgPath: SVG_ARCH_FULL },
      { name: 'SEGMENTAL LOW ARCH CURVE', desc: 'A wider, gentler curved arch top. Offers a modern twist on standard classical arches.', svgPath: SVG_ARCH_FULL },
      { name: 'OPERABLE LOWER CASEMENT ARCH', desc: 'Features a fixed circular arch on the top and an operable outward opening casement window on the bottom.', svgPath: SVG_ARCH_OPERABLE },
      { name: 'GOTHIC POINTED ARCH DESIGN', desc: 'A premium custom arch ending in a pointed peak, ideal for cathedral, institutional, or classic custom architectures.', svgPath: SVG_ARCH_FULL }
    ]
  },
  'Combination Windows': {
    id: 'combination',
    title: 'uPVC Combination Windows',
    desc: 'Fuse fixed, sliding, and casement panels within a single integrated heavy-duty frame to maximize panoramic light and precise ventilation in wide living spaces.',
    img: '/images/combination-windows.jpg',
    overview: 'uPVC Combination Windows are highly versatile, customized multi-window layouts built within a single robust outer frame. By coupling fixed picture windows with sliding panes, casements, or top-hung ventilators, they offer infinite options to fit expansive openings. They are particularly popular in double-height living rooms, bay windows, master bedroom walls, and commercial facades.',
    features: [
      { icon: Layers, title: 'Multi-Profile Integration', desc: 'Blends sliding sashes, operable casements, and fixed panoramic panes into a single heavy-gauge unit.' },
      { icon: Compass, title: 'Optimized Thermal Ventilation', desc: 'Allows separate operable panes to be positioned strategically to create highly efficient cross-drafts.' },
      { icon: Shield, title: 'Heavy-Duty Coupled Joint', desc: 'Structural coupling mullions are internally reinforced to safely handle massive double-height wind pressures.' },
      { icon: Sparkles, title: 'Tailored Glass Facade', desc: 'Designed specifically to transform expansive flat concrete walls into premium glass visual displays.' }
    ],
    options: [
      { name: 'CASEMENT + FIXED COMBINATION', desc: 'Features a large fixed panoramic pane coupled with operable casement windows on the sides for fresh air.', svgPath: SVG_COMBINATION_CS_FX },
      { name: 'SLIDING + FIXED COMBINATION', desc: 'A sleek modern configuration combining sliding panels on the bottom with a fixed picture glass panel above.', svgPath: SVG_COMBINATION_CS_FX },
      { name: 'BAY WINDOW COMBINATION LAYOUT', desc: 'A classic 3-sided projecting window configuration angled at 45 or 90 degrees, enlarging interior floor space.', svgPath: SVG_COMBINATION_CS_FX },
      { name: 'CASEMENT + AWNING COMBINATION', desc: 'A tall layout with casement windows in the middle and top-hung awning ventilators on top for heat exhaust.', svgPath: SVG_COMBINATION_CS_FX }
    ]
  },
  'Tilt and Turn Windows': {
    id: 'tilt-turn',
    title: 'uPVC Tilt & Turn Windows',
    desc: 'Representing the peak of European window engineering. A single handle controls two modes: tilt inward for secure draft-free air, or turn inward for full access.',
    img: '/images/tilt-turn-windows.jpg',
    overview: 'uPVC Tilt and Turn Windows are high-end, premium European systems characterized by an advanced multi-action mechanism. A single modern handle regulates three positions: pointing down locks the window airtight; turning 90° sideways swings the sash fully inward (turn mode) like a door for easy glass cleaning; turning 180° upwards tilts the sash inward from the top (tilt mode) by 10-15 degrees for secure, rain-proof ventilation.',
    features: [
      { icon: Move, title: 'Dual-Action Mechanical Valve', desc: 'A single heavy handle activates double operations: tilt for draft-free airflow, turn for full access.' },
      { icon: Shield, title: 'Perimeter Compressive Locks', desc: 'Locking pins around the entire sash circumference are compressed securely into the frame, preventing forced entry.' },
      { icon: Thermometer, title: 'Ultra Heat Insulation', desc: 'Premium tight compression gaskets deliver Srikala Projects\' highest air-tight energy efficiency and acoustic rating.' },
      { icon: Eye, title: 'High-Rise Safe Maintenance', desc: 'Window swings fully inward, eliminating the high risk of cleaning external glass panes from the outside.' }
    ],
    options: [
      { name: 'STANDARD SINGLE TILT & TURN', desc: 'A single, high-performance sash window that tilts or turns inward. The modern standard for luxury apartments.', svgPath: SVG_TILT_TURN_TILT },
      { name: 'DOUBLE SASH FRENCH TILT & TURN', desc: 'Two sashes opening inward. The primary master sash tilts and turns, while the secondary slave sash turns fully.', svgPath: SVG_TILT_TURN_TILT },
      { name: 'TILT & TURN WITH FIXED BOTTOM', desc: 'Features a fixed glass sheet on the bottom for safety, and an operable tilt-and-turn pane on top.', svgPath: SVG_TILT_TURN_TILT },
      { name: 'TILT & TURN WITH SIDE LIGHT', desc: 'A wide system coupling a high-performance tilt-turn sash on one side with a fixed panoramic panel on the other.', svgPath: SVG_TILT_TURN_TILT }
    ]
  },
  'Villa Windows': {
    id: 'villa',
    title: 'uPVC Villa Windows',
    desc: 'The ultimate luxury window designed for Indian homes, integrating double sashes, a built-in heavy-duty steel safety grill, and bug screening into a single system.',
    img: '/images/villa-windows.jpg',
    overview: 'uPVC Villa Windows are luxury window systems specifically engineered to address the unique requirements of premium villas and Indian homes. They are the only systems that seamlessly integrate three critical elements within a single high-strength frame: an outward-opening glass casement sash, an inward-opening high-tensile mesh sash, and a built-in heavy-duty metal safety grill. This delivers complete protection against thieves, mosquitoes, heat, and heavy rain simultaneously.',
    features: [
      { icon: Shield, title: 'Integrated Security Grill', desc: 'Heavy-gauge steel security bars are anchored directly inside the profile\'s internal steel core.' },
      { icon: Layers, title: 'Dual Operable Sashes', desc: 'Combines an outward opening weather-sealed glass sash with an independent inward swinging bug screen.' },
      { icon: Droplets, title: 'Insect & Mosquito Block', desc: 'Keeps out bugs, dust, and debris while allowing a continuous, comfortable breeze inside.' },
      { icon: Hammer, title: 'Luxurious Timber Lamination', desc: 'Features advanced polymer laminate coatings that perfectly emulate rich teak, golden oak, or mahogany wood grains.' }
    ],
    options: [
      { name: 'SINGLE SASH VILLA WINDOW SYSTEM', desc: 'Features a single outward glass sash, built-in security grill, and an inward high-tensile bug screen.', svgPath: SVG_VILLA_SYSTEM },
      { name: 'DOUBLE SASH FRENCH VILLA WINDOW', desc: 'Designed for double-door openings. Sashes open fully, backed by a beautiful integrated security grill.', svgPath: SVG_VILLA_SYSTEM },
      { name: 'VILLA WINDOW WITH ARCH TOP', desc: 'A stunning custom luxury configuration combining a classical arched fixed top panel with a villa sash below.', svgPath: SVG_VILLA_SYSTEM },
      { name: 'HIGH-DRAINAGE VILLA WINDOW UNIT', desc: 'Equipped with an advanced water drainage track system to handle extreme, tropical, coastal rainfall storms.', svgPath: SVG_VILLA_SYSTEM }
    ]
  }
};

// ─── Customization details ────────────────────────────────────────────────────────
const COLOR_SWATCHES = [
  { name: 'Ivory White', hex: '#FAF9F6', desc: 'UV-stabilized pristine modern white' },
  { name: 'Walnut Finish', hex: '#3d2314', desc: 'Rich, deep brown structural timber' },
  { name: 'Golden Oak', hex: '#b37d32', desc: 'Warm, honey-golden classic wood' },
  { name: 'Charcoal Oak', hex: '#262626', desc: 'Contemporary minimalist charcoal' },
  { name: 'Dark Mahogany', hex: '#521f18', desc: 'Luxurious deep reddish woodgrain' }
];

interface UPVCProductDetailProps {
  productName: string;
  onBack: () => void;
  onSelectProduct: (name: string) => void;
}

export default function UPVCProductDetail({ productName, onBack, onSelectProduct }: UPVCProductDetailProps) {
  const detail = DETAILED_PRODUCTS[productName] || DETAILED_PRODUCTS['Sliding Windows'];
  const [selectedCustomTab, setSelectedCustomTab] = useState<'lamination' | 'glass' | 'hardware' | 'mesh'>('lamination');
  const [activeColor, setActiveColor] = useState(COLOR_SWATCHES[0]);
  const [activeGlassLevel, setActiveGlassLevel] = useState<1 | 2 | 3>(2); // 1=Single, 2=DGU, 3=Triple

  const containerRef = useRef<HTMLDivElement>(null);
  const heroImageRef = useRef<HTMLImageElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const customRef = useRef<HTMLDivElement>(null);

  // Trigger smooth scroll to top and GSAP reveal animations when product changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });

    // GSAP animations for smooth, premium entry
    const ctx = gsap.context(() => {
      gsap.fromTo('.anim-header', 
        { opacity: 0, y: -20 },
        { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' }
      );
      
      gsap.fromTo('.anim-fade-up', 
        { opacity: 0, y: 35 },
        { opacity: 1, y: 0, duration: 0.75, ease: 'power3.out', stagger: 0.08 }
      );

      gsap.fromTo('.glow-ambient-light',
        { scale: 0.8, opacity: 0 },
        { scale: 1, opacity: 0.5, duration: 1.5, ease: 'power2.out' }
      );

      gsap.fromTo(heroImageRef.current,
        { scale: 0.95, opacity: 0 },
        { scale: 1, opacity: 1, duration: 1, ease: 'power3.out' }
      );
    }, containerRef);

    return () => ctx.revert();
  }, [productName]);

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -320, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 320, behavior: 'smooth' });
    }
  };

  return (
    <div ref={containerRef} className="bg-slate-50 min-h-screen pb-24 text-slate-800 select-none overflow-hidden font-sans">
      
      {/* ─── Product Selection Sticky Header (Light Theme Translucent Glass) ───────── */}
      <div className="sticky top-16 z-30 bg-white/80 backdrop-blur-md border-b border-slate-200/60 py-4 shadow-[0_4px_25px_rgba(0,0,0,0.04)] transition-all duration-300">
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-wrap items-center justify-between gap-6">
          <button 
            onClick={onBack}
            className="flex items-center gap-2 text-slate-600 hover:text-[#005fb8] text-xs uppercase font-extrabold tracking-widest transition-all duration-300 active:scale-95 group"
          >
            <ArrowLeft className="w-4 h-4 transition-transform duration-300 group-hover:-translate-x-0.5 text-[#005fb8]" /> Back to Systems
          </button>
          
          {/* Segmented slider categories navigation */}
          <div className="flex bg-slate-100 p-1 rounded-full border border-slate-200/50 overflow-x-auto no-scrollbar gap-1 max-w-full md:max-w-none">
            {Object.keys(DETAILED_PRODUCTS).map((key) => {
              const isActive = key === productName;
              return (
                <button
                  key={key}
                  onClick={() => {
                    onSelectProduct(key);
                    setSelectedCustomTab('lamination');
                  }}
                  className={`px-5 py-2 rounded-full text-[10px] uppercase font-black tracking-widest transition-all duration-500 whitespace-nowrap ${
                    isActive 
                      ? 'bg-gradient-to-r from-[#005fb8] to-blue-600 text-white shadow-[0_4px_12px_rgba(0,95,184,0.25)] scale-[1.02]' 
                      : 'text-slate-500 hover:text-slate-900 hover:bg-slate-200/60'
                  }`}
                >
                  {key.replace(' Windows', '')}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* ─── Breadcrumb Navigation ────────────────────────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 pt-10 pb-4 anim-header">
        <div className="text-[10px] uppercase tracking-widest text-slate-400 flex items-center gap-2">
          <span>uPVC Systems</span>
          <span>/</span>
          <span>We Manufacture</span>
          <span>/</span>
          <span className="text-[#005fb8] font-extrabold tracking-[0.1em]">{detail.title}</span>
        </div>
      </div>

      {/* ─── Product Hero Layout Grid ────────────────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 py-8 relative">
        {/* Soft daylight glows */}
        <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] bg-cyan-100/30 rounded-full blur-[80px] pointer-events-none opacity-50 glow-ambient-light" />
        <div className="absolute bottom-1/4 right-10 w-[300px] h-[300px] bg-blue-100/20 rounded-full blur-[80px] pointer-events-none opacity-30 glow-ambient-light" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center relative z-10">
          
          {/* Left Column: Visual Showcase (Large image + ambient glass glow) */}
          <div className="lg:col-span-5 w-full flex flex-col gap-8">
            <div className="relative bg-white border border-slate-200/80 p-10 shadow-[0_15px_40px_rgba(0,0,0,0.03)] rounded-2xl flex items-center justify-center aspect-square overflow-hidden group">
              
              {/* Soft warm solar insulation glow backdrop */}
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(0,95,184,0.03)_0%,transparent_60%)] animate-pulse" />
              
              <img 
                ref={heroImageRef}
                src={detail.img} 
                alt={detail.title} 
                className="w-full h-full object-contain max-h-[360px] transition-transform duration-700 group-hover:scale-[1.03]"
              />
              
              {/* Quality overlay badge */}
              <div className="absolute bottom-4 left-4 bg-slate-900/90 backdrop-blur-sm text-[8px] font-black tracking-widest px-3.5 py-2 uppercase rounded-full border border-white/5 text-white flex items-center gap-2 shadow-md">
                <Move className="w-3 h-3 text-cyan-400" /> Premium 3D Render
              </div>
            </div>
            
            {/* Gallery angles */}
            <div className="grid grid-cols-3 gap-4 anim-fade-up">
              {[detail.img, detail.img, detail.img].map((imgSrc, i) => (
                <div 
                  key={i} 
                  className={`bg-white border rounded-xl p-4 flex items-center justify-center cursor-pointer transition-all duration-300 ${
                    i === 0 
                      ? 'border-[#005fb8] ring-2 ring-[#005fb8]/10 scale-[1.02]' 
                      : 'border-slate-200/80 hover:border-slate-350'
                  }`}
                >
                  <img src={imgSrc} alt="Render angle" className="w-12 h-12 object-contain opacity-80 hover:opacity-100 transition-opacity" />
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Premium 2-Column Feature Cards Grid */}
          <div ref={contentRef} className="lg:col-span-7 flex flex-col justify-center">
            <span className="text-[10px] font-extrabold text-[#005fb8] uppercase tracking-[0.25em] block mb-3 anim-fade-up">
              SRIKALA PRECISION ENGINEERING
            </span>
            <h1 className="text-3xl md:text-5xl font-black uppercase tracking-tighter mb-6 anim-fade-up leading-tight text-slate-900">
              {detail.title}
            </h1>
            
            <p className="text-slate-500 text-base md:text-lg mb-10 leading-relaxed border-l-2 border-[#005fb8] pl-6 anim-fade-up">
              {detail.overview}
            </p>

            <div className="w-full h-[1px] bg-slate-200 mb-10 anim-fade-up" />

            <h3 className="text-xs font-black uppercase tracking-[0.2em] text-[#005fb8] mb-8 anim-fade-up">
              FEATURES & STRUCTURAL BENEFITS
            </h3>

            {/* 2-Column Technical Feature Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 anim-fade-up">
              {detail.features.map((feature, idx) => {
                const IconComponent = feature.icon;
                return (
                  <div 
                    key={idx} 
                    className="flex gap-4 p-5 rounded-xl bg-white border border-slate-200/80 hover:border-[#005fb8]/30 hover:shadow-[0_8px_30px_rgba(0,0,0,0.02)] transition-all duration-300 group"
                  >
                    <div className="w-10 h-10 rounded-lg bg-slate-50 text-[#005fb8] border border-slate-200 flex items-center justify-center shrink-0 group-hover:scale-105 transition-all duration-300">
                      <IconComponent className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-extrabold text-slate-800 text-sm uppercase tracking-tight mb-1">
                        {feature.title}
                      </h4>
                      <p className="text-slate-500 text-xs leading-relaxed">
                        {feature.desc}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ─── Middle Section: Light CAD Blueprint Configuration Options ────────────── */}
      <section className="bg-white border-y border-slate-200 py-24 mt-24 relative" id="options-slider">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom,_rgba(0,95,184,0.02)_0%,transparent_50%)] pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
          
          <div className="text-center mb-16">
            <h2 className="text-2xl md:text-3xl font-black uppercase tracking-tight text-slate-900 mb-4 text-center">
              {detail.title.toUpperCase()} OPTIONS TO CHOOSE FROM
            </h2>
            <p className="text-slate-500 max-w-4xl mx-auto text-sm leading-relaxed text-center px-4">
              Srikala Projects is the premier fabricator of 2/3/4 track uPVC {detail.title.replace('uPVC ', '')}. Along with the track of your choice, you can also customise the windows with the sash, mesh, grill and hardware of your choice.
            </p>
          </div>

          {/* Slider track with blue navigation buttons */}
          <div className="relative max-w-6xl mx-auto flex items-center gap-4">
            
            {/* Left Button */}
            <button 
              onClick={scrollLeft}
              aria-label="Scroll left"
              className="w-12 h-12 bg-[#005fb8] hover:bg-[#004da3] shrink-0 flex items-center justify-center text-white transition-all active:scale-95 shadow-[0_4px_12px_rgba(0,95,184,0.3)] rounded-sm z-10"
            >
              <ChevronLeft className="w-6 h-6 stroke-[3.5]" />
            </button>

            {/* Horizontal scrollable CAD Blueprint cards */}
            <div 
              ref={scrollContainerRef} 
              className="flex gap-6 overflow-x-auto no-scrollbar scroll-smooth py-6 flex-grow"
              style={{ scrollSnapType: 'x mandatory' }}
            >
              {detail.options.map((option, i) => (
                <div 
                  key={i} 
                  className="min-w-[280px] md:min-w-[310px] flex-shrink-0 flex flex-col items-center gap-4 bg-white border border-slate-200/80 hover:border-[#005fb8]/30 p-6 rounded-sm shadow-[0_8px_30px_rgba(0,0,0,0.02)] transition-all duration-300 group"
                  style={{ scrollSnapAlign: 'start' }}
                >
                  {/* Schematic card container (Light CAD grid background) */}
                  <div className="w-full h-48 bg-slate-50 border border-slate-100 flex items-center justify-center rounded-sm relative overflow-hidden select-none">
                    {option.svgPath}
                  </div>
                  {/* Centered bold capitalized text */}
                  <span className="text-[10px] font-extrabold text-slate-800 text-center uppercase tracking-wider block px-2 leading-relaxed h-12 flex items-center justify-center group-hover:text-[#005fb8] transition-colors">
                    {option.name}
                  </span>
                </div>
              ))}
            </div>

            {/* Right Button */}
            <button 
              onClick={scrollRight}
              aria-label="Scroll right"
              className="w-12 h-12 bg-[#005fb8] hover:bg-[#004da3] shrink-0 flex items-center justify-center text-white transition-all active:scale-95 shadow-[0_4px_12px_rgba(0,95,184,0.3)] rounded-sm z-10"
            >
              <ChevronRight className="w-6 h-6 stroke-[3.5]" />
            </button>

          </div>
        </div>
      </section>

      {/* ─── Bottom Section: Premium Customization Console (Configurator cockpit) ─── */}
      <section ref={customRef} className="max-w-7xl mx-auto px-6 md:px-12 py-24 mt-10">
        
        <div className="text-center mb-20">
          <span className="text-xs font-bold text-[#005fb8] uppercase tracking-widest block mb-4">Live Customizer Console</span>
          <h2 className="text-3xl md:text-5xl font-black uppercase tracking-widest mb-4 text-slate-900">
            Customise Your {detail.title.replace('uPVC ', '')}s
          </h2>
          <div className="w-16 h-1 bg-gradient-to-r from-[#005fb8] to-blue-500 mx-auto mb-6" />
          <p className="text-slate-500 max-w-2xl mx-auto text-sm leading-relaxed">
            Interact with our configuration console to review and select custom wood-grain lamination coatings, insulation levels, locks, and safety screen screens.
          </p>
        </div>

        {/* Tactile console grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start bg-white border border-slate-200/80 rounded-2xl p-8 md:p-12 shadow-[0_20px_50px_rgba(0,0,0,0.02)] relative">
          <div className="absolute top-0 right-0 w-[250px] h-[250px] bg-blue-50/20 rounded-full blur-[60px] pointer-events-none" />

          {/* Left: Component selector category tabs */}
          <div className="lg:col-span-5 flex flex-col gap-4">
            <h3 className="text-xs font-black tracking-widest text-slate-400 uppercase mb-2">
              Select Component
            </h3>
            
            {[
              { id: 'lamination', title: 'Colour / Lamination', icon: Palette, text: 'Choose rich woodgrain textures or contemporary solids.' },
              { id: 'glass', title: 'Glass Options', icon: Layers, text: 'Check thermal properties, DGU, and acoustic insulation levels.' },
              { id: 'hardware', title: 'Precision Hardware', icon: Hammer, text: 'Select secure lock handles, friction stays, and steel rollers.' },
              { id: 'mesh', title: 'Mesh & Safety Grills', icon: Shield, text: 'Configure custom insect screens and secure safety steel grills.' }
            ].map((tab) => {
              const isActive = selectedCustomTab === tab.id;
              const TabIcon = tab.icon;
              return (
                <div 
                  key={tab.id}
                  onClick={() => setSelectedCustomTab(tab.id as any)}
                  className={`flex gap-4 p-5 rounded-xl cursor-pointer border transition-all duration-300 ${
                    isActive 
                      ? 'bg-gradient-to-r from-blue-50/40 to-slate-50 border-[#005fb8]/50 shadow-[0_4px_20px_rgba(0,95,184,0.05)] scale-[1.01]' 
                      : 'bg-white border-slate-200/60 hover:border-slate-350 hover:bg-slate-50/50'
                  }`}
                >
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 border transition-all ${
                    isActive 
                      ? 'bg-blue-50 border-[#005fb8] text-[#005fb8]' 
                      : 'bg-slate-50 border-slate-200 text-slate-400'
                  }`}>
                    <TabIcon className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-extrabold text-slate-800 text-sm uppercase tracking-tight mb-1 flex items-center gap-2">
                      {tab.title}
                      {isActive && <span className="w-1.5 h-1.5 rounded-full bg-[#005fb8] animate-ping" />}
                    </h4>
                    <p className="text-slate-500 text-xs leading-relaxed">{tab.text}</p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right: Selection output dynamic display workspace */}
          <div className="lg:col-span-7 bg-slate-50/50 border border-slate-200/60 rounded-xl p-6 md:p-8 min-h-[380px] flex flex-col justify-between">
            
            {/* Lamination Category Workspace */}
            {selectedCustomTab === 'lamination' && (
              <div className="flex flex-col gap-6 h-full justify-between">
                <div>
                  <span className="text-[9px] uppercase tracking-widest text-[#005fb8] font-extrabold block mb-2">Category: Lamination finishes</span>
                  <h4 className="text-xl font-bold uppercase text-slate-900 mb-4">Choose Woodgrain Textures & Coatings</h4>
                  <p className="text-slate-500 text-xs leading-relaxed mb-6">
                    Srikala Projects applies UV-stabilized architectural polymers to achieve natural wood textures. Select a swatch below to preview:
                  </p>

                  {/* Swatches selector */}
                  <div className="flex flex-wrap gap-4 mb-8">
                    {COLOR_SWATCHES.map((swatch, idx) => {
                      const isSelected = activeColor.name === swatch.name;
                      return (
                        <button
                          key={idx}
                          onClick={() => setActiveColor(swatch)}
                          className={`flex items-center gap-3 px-4 py-2 border rounded-full text-xs font-bold transition-all duration-300 ${
                            isSelected 
                              ? 'bg-blue-50 border-[#005fb8] text-slate-900 shadow-sm' 
                              : 'bg-white border-slate-200 text-slate-500 hover:text-slate-900 hover:border-slate-350'
                          }`}
                        >
                          <span 
                            className="w-3.5 h-3.5 rounded-full border border-slate-200 shrink-0" 
                            style={{ backgroundColor: swatch.hex }}
                          />
                          {swatch.name}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Swatch preview card */}
                <div className="bg-white border border-slate-200/80 p-5 rounded-lg flex items-center gap-5 shadow-sm">
                  <div 
                    className="w-16 h-16 rounded-md border border-slate-200/80 shrink-0 shadow-inner flex items-center justify-center"
                    style={{ backgroundColor: activeColor.hex }}
                  >
                    {activeColor.hex === '#FAF9F6' && <Sparkles className="w-5 h-5 text-slate-350 animate-spin" />}
                  </div>
                  <div>
                    <h5 className="font-extrabold text-sm text-[#005fb8] uppercase tracking-tight">{activeColor.name} Swatch</h5>
                    <p className="text-slate-500 text-xs mt-1">{activeColor.desc}</p>
                    <p className="text-slate-400 text-[10px] font-mono mt-1">Status: Active Selection · Samples Available</p>
                  </div>
                </div>
              </div>
            )}

            {/* Glass Category Workspace */}
            {selectedCustomTab === 'glass' && (
              <div className="flex flex-col gap-6 h-full justify-between">
                <div>
                  <span className="text-[9px] uppercase tracking-widest text-[#005fb8] font-extrabold block mb-2">Category: Glass & Acoustics</span>
                  <h4 className="text-xl font-bold uppercase text-slate-900 mb-4">Insulation Glass Configurations</h4>
                  <p className="text-slate-500 text-xs leading-relaxed mb-8">
                    Interact with our insulation slider to check the U-value thermal retention and sound reduction decibels for each glazing configuration:
                  </p>

                  {/* Glazing Tabs */}
                  <div className="grid grid-cols-3 gap-3 mb-8">
                    {[
                      { level: 1, label: 'Single Glazed', uVal: 'Uf = 5.8', db: 'Sound: -20 dB' },
                      { level: 2, label: 'Double Glazed (DGU)', uVal: 'Uf = 1.6', db: 'Sound: -38 dB' },
                      { level: 3, label: 'Triple Glazed', uVal: 'Uf = 0.9', db: 'Sound: -45 dB' }
                    ].map((levelItem) => {
                      const isSelected = activeGlassLevel === levelItem.level;
                      return (
                        <button
                          key={levelItem.level}
                          onClick={() => setActiveGlassLevel(levelItem.level as any)}
                          className={`p-4 border rounded-xl flex flex-col text-left transition-all duration-300 ${
                            isSelected 
                              ? 'bg-blue-50/50 border-[#005fb8] shadow-[0_4px_15px_rgba(0,95,184,0.05)] scale-[1.01]' 
                              : 'bg-white border-slate-200 hover:border-slate-350'
                          }`}
                        >
                          <span className="font-extrabold text-[10px] uppercase text-slate-800 mb-2">{levelItem.label}</span>
                          <span className="text-[#005fb8] text-xs font-mono font-bold">{levelItem.uVal}</span>
                          <span className="text-slate-400 text-[10px] mt-1 font-mono">{levelItem.db}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Rating progress bar */}
                <div className="bg-white border border-slate-200/80 p-5 rounded-lg">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-[10px] text-slate-400 uppercase tracking-widest font-bold">Insulation Rating</span>
                    <span className="text-xs text-[#005fb8] font-bold">
                      {activeGlassLevel === 1 && 'Basic Protection'}
                      {activeGlassLevel === 2 && 'Advanced Energy Saver'}
                      {activeGlassLevel === 3 && 'Ultimate Passive House'}
                    </span>
                  </div>
                  <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-[#005fb8] to-blue-500 transition-all duration-500"
                      style={{ width: activeGlassLevel === 1 ? '33%' : activeGlassLevel === 2 ? '66%' : '100%' }}
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Hardware Category Workspace */}
            {selectedCustomTab === 'hardware' && (
              <div className="flex flex-col gap-6 h-full justify-between">
                <div>
                  <span className="text-[9px] uppercase tracking-widest text-[#005fb8] font-extrabold block mb-2">Category: Metal Hardware</span>
                  <h4 className="text-xl font-bold uppercase text-slate-900 mb-4">Precision Locking & Smooth Rolling stays</h4>
                  <p className="text-slate-500 text-xs leading-relaxed mb-6">
                    A window\'s operational lifespan depends entirely on its structural metal stays. Srikala Projects imports certified hardware built to last 50,000 cycles:
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {[
                      { name: 'Multi-Point Security Lock', desc: 'Activates interlocking steel bolts at up to 6 perimeter points, preventing forced opening.' },
                      { name: 'EPDM Double-Hollow Gasket', desc: 'Synthetic rubber weather-stripping that compresses tightly, blocking whistling winds.' },
                      { name: 'Heavy Tandem Brass Rollers', desc: 'Double-row bottom wheels that distribute panel load for quiet, smooth gliding.' },
                      { name: 'Perimeter Friction Hinges', desc: 'Stainless steel stays that hold windows stable at any angle against gusts.' }
                    ].map((hw, i) => (
                      <div key={i} className="bg-white border border-slate-200/80 p-4 rounded-lg flex gap-3">
                        <Check className="w-4 h-4 text-[#005fb8] shrink-0 mt-0.5" />
                        <div>
                          <h6 className="font-extrabold text-xs text-slate-800 uppercase tracking-tight">{hw.name}</h6>
                          <p className="text-slate-500 text-[10px] leading-relaxed mt-1">{hw.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Mesh & Grills Category Workspace */}
            {selectedCustomTab === 'mesh' && (
              <div className="flex flex-col gap-6 h-full justify-between">
                <div>
                  <span className="text-[9px] uppercase tracking-widest text-[#005fb8] font-extrabold block mb-2">Category: Safety screen systems</span>
                  <h4 className="text-xl font-bold uppercase text-slate-900 mb-4">High-Tensile Wire Mesh & Safety Grills</h4>
                  <p className="text-slate-500 text-xs leading-relaxed mb-6">
                    Configure custom barrier systems to filter out mosquitoes, block dust, and secure your home from break-ins:
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {[
                      { name: 'Fiberglass Insect Screen', desc: 'Non-combustible, near-invisible mesh that filters out mosquitoes while letting light pass.' },
                      { name: 'SS304 Marine Steel Mesh', desc: 'Heavy-gauge stainless steel mesh resistant to claws, impacts, and blades for active security.' },
                      { name: 'Built-In Structural Grill', desc: 'Heavy-duty steel grill rods anchored directly inside the profile\'s internal steel core.' },
                      { name: 'Pleated Accordion Screen', desc: 'Retractable pleated insect screen that folds out of sight inside side profiles.' }
                    ].map((mesh, i) => (
                      <div key={i} className="bg-white border border-slate-200/80 p-4 rounded-lg flex gap-3">
                        <Check className="w-4 h-4 text-[#005fb8] shrink-0 mt-0.5" />
                        <div>
                          <h6 className="font-extrabold text-xs text-slate-800 uppercase tracking-tight">{mesh.name}</h6>
                          <p className="text-slate-500 text-[10px] leading-relaxed mt-1">{mesh.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

          </div>
        </div>
      </section>
    </div>
  );
}
