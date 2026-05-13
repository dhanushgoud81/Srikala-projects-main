import React, { useRef } from 'react';

import { useTransform, motion, useScroll, MotionValue } from 'motion/react';
import { ArrowRight } from 'lucide-react';

const PROJECTS = [
  { id: 1, title: 'Omega Facility', type: 'PEB Structure', image: '/src/images/pre-Engineered.png', color: '#1e293b' },
  { id: 2, title: 'Nova Logistics Park', type: 'Roofing Systems', image: '/src/images/Roofing System.png', color: '#0f172a' },
  { id: 3, title: 'Zenith Tech Hub', type: 'Structural Glazing', image: '/src/images/Structural Glazing.png', color: '#020617' }
];

export const ProjectStack = () => {
  const container = useRef(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ['start start', 'end end'],
  });

  return (
    <section className='bg-slate-950 relative' ref={container} id="projects">
        <div className='text-white h-[70vh] w-full grid place-content-center pt-24'>
          <div className='absolute bottom-0 left-0 right-0 top-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:54px_54px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]'></div>
          
          <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 text-center">
            <h2 className="text-4xl md:text-5xl font-bold uppercase mb-4 tracking-tighter">Featured Projects</h2>
            <div className="w-20 h-1 bg-electric-blue mx-auto mb-8" />
            <p className='text-xl text-slate-400 font-medium text-center max-w-2xl mx-auto leading-relaxed'>
              Stacking Cards Using Motion. Scroll down to view our engineered solutions! 👇
            </p>
          </div>
        </div>

        <div className='text-white w-full bg-slate-950 pb-24'>
          {PROJECTS.map((project, i) => {
            const targetScale = 1 - (PROJECTS.length - i) * 0.05;
            return (
              <Card
                key={`p_${i}`}
                i={i}
                url={project.image}
                title={project.title}
                color={project.color}
                description={project.type}
                progress={scrollYProgress}
                range={[i * (1 / PROJECTS.length), 1]}
                targetScale={targetScale}
              />
            );
          })}
        </div>
    </section>
  );
};

interface CardProps {
  i: number;
  title: string;
  description: string;
  url: string;
  color: string;
  progress: MotionValue<number>;
  range: [number, number];
  targetScale: number;
}

const Card: React.FC<CardProps> = ({
  i,
  title,
  description,
  url,
  color,
  progress,
  range,
  targetScale,
}) => {
  const container = useRef(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ['start end', 'start start'],
  });

  const imageScale = useTransform(scrollYProgress, [0, 1], [2, 1]);
  const scale = useTransform(progress, range, [1, targetScale]);

  return (
    <div
      ref={container}
      className='h-screen flex items-center justify-center sticky top-0 px-4'
    >
      <motion.div
        style={{
          backgroundColor: color,
          scale,
          top: `calc(-5vh + ${i * 25}px)`,
        }}
        className={`flex flex-col relative -top-[20%] h-[450px] w-full max-w-5xl rounded-md lg:p-10 sm:p-4 p-4 origin-top border border-white/10 shadow-2xl`}
      >
        <h2 className='text-3xl md:text-4xl uppercase font-black tracking-tighter mb-4'>{title}</h2>
        <div className={`flex flex-col md:flex-row h-full gap-6 md:gap-10`}>
          <div className={`w-full md:w-[40%] flex flex-col justify-center`}>
            <p className='text-electric-blue uppercase tracking-[0.2em] text-sm font-bold mb-4'>{description}</p>
            <p className='text-slate-300 text-sm md:text-base leading-relaxed mb-6'>
              Engineered with precision and built to last. Our {description.toLowerCase()} solutions set the standard for industrial excellence.
            </p>
            <span className='flex items-center gap-2 pt-2 group cursor-pointer w-fit'>
              <span className='text-sm font-bold uppercase tracking-widest group-hover:text-electric-blue transition-colors'>
                View Case Study
              </span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-2 group-hover:text-electric-blue transition-all" />
            </span>
          </div>

          <div
            className={`relative w-full md:w-[60%] h-48 md:h-full rounded-lg overflow-hidden`}
          >
            <motion.div
              className={`w-full h-full`}
              style={{ scale: imageScale }}
            >
              <img src={url} alt={title} className='w-full h-full object-cover' />
            </motion.div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
