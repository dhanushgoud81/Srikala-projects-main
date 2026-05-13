import React, { useRef, useEffect, useState } from 'react';
import { Box, Layers, Building2, Grid3X3, Square, HardHat, CheckCircle2 } from 'lucide-react';
import { PageWrapper } from './components/Shared';
import { cn } from './lib/utils';
import { useGSAP } from './lib/useGSAP';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const solutions = [
  {
    id: 'upvc',
    title: 'UPVC Manufacturing',
    icon: Square,
    desc: 'Our UPVC solutions combine thermal efficiency with structural rigidity. We utilize advanced extrusion techniques to create profiles that withstand extreme climates.',
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB3pBe9jBFlkTEdFU2gFCqYYZqyhCQ7jahlbJH1vCC9pjTFsPbUFft2mPKx_6ArATke7P3ar8YCFWcjR1SKONNb4HCFp0CXGKtDD-P6vIl8bU40eTTMcICvs4eUGF3sx7uhJXc6Tn-T3aoMevSxcIkahhFxdin3C5E6BWnfeI87H1tMJl3Zt4viRzp1KUXh3m4zfHz5HpBOycAJB4KSrN12uWmQecLiRiZWcM3jQX1VDBFj_ep1Ffx7GH0B1s3TBh-tJsz3mcvYxdc',
    features: ['Multi-chambered profiles for insulation', 'Galvanized steel reinforcement', 'UV-resistant outer layer'],
  },
  {
    id: 'fabrication',
    title: 'Fabrication',
    icon: HardHat,
    desc: 'Specialized heavy-duty metal fabrication for industrial applications. From custom structural components to complex assemblies, our facility is equipped with high-precision CNC.',
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD_h1DQaafrVf2Ye_IGfB7bL5IzBfBoIbEcdkVC67ETkVFCyA3QDx9Y15wOFD6GpO5Tn4lpK3xDlDSIRMdpNEYGmaNWTzXc_CMgktNk5ebEI8uI2GVjKBlvrhyWd8yxV7q3R2N--ZumgxB_ZS-YJqe5V_LpFXSPMI6t_qfkXIX9Bkw75mVDmyU4RowTh48pxKGxg0fiuZOfoTbgb4Zp0QS1IkXRhYW8UK5YSYA8gwUF3hlNZLgdLB13aV6yC-mvAnxbvRJ7Dp45drk',
    features: ['Robotic precision welding', 'Custom CNC plasma & laser cutting', 'Heavy-duty structural components'],
  },
  {
    id: 'peb',
    title: 'PEB Solutions',
    icon: Building2,
    desc: 'Scalable, cost-effective, and rapidly deployable building solutions. Our PEB systems optimize material usage while providing expansive clear-span spaces.',
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAH-XmBUhNS6xbt8iVNL3Fs7bhjiWTxRPOloWTnn7_AFRSKcYj9--XWEPLWlLWwrWASF3zNiB2CEM8pjGN3hqsoD5vf__D-DsdDB6Ae3NI6lKy0wyC3mYW2RG9OmDM8p4AU4o4Bckhb1ZLpJgXWm_L1FBWdrhTXRSNxENJQbVSYRk2DhTtHXRteKxkOU1tcQ9I813R0DJQkoaD3knM3TCsmezHW_rfAj_m41gcoIp9H3MbG4saMcrAIPOHrkoMyZWE08bve3oayag0',
    features: ['Optimized structural design', 'Rapid on-site assembly', 'Long-span capabilities'],
  },
  {
    id: 'roofing',
    title: 'Roofing Systems',
    icon: Box,
    desc: 'Durable and weather-resistant roofing profiles designed for longevity. We offer a variety of standing seam and corrugated systems in Galvalume.',
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuASDTQRdHm5L8mJOwd1YfOdJCZlw-35tCuOsKVsQ5oNnLKKrE1E2LULNFhlX6tOFdARZ9bGNahp-np4vzKaItRzayR3cMFsCJn4Fdp0uR_SSwz58Y5URZW6amPectdabFkmMeTEZ0PXeakbihie-dHdMMx9bLIS61TcmEHPFWDg9-caj8VSiA52FWWeH9894mKWBEDq4WInIN9xtcRl-rT9v_xU47yUQGlpXF4f0EXcTbTAm4hXmAol1xLQvaSXTIogDIYtbWk2NCo',
    features: ['Leak-proof standing seam technology', 'High-reflectivity coatings', 'Corrosion-resistant Galvalume'],
  },
  {
    id: 'acp',
    title: 'ACP Cladding',
    icon: Layers,
    desc: 'Premium external facade solutions using high-grade Aluminum Composite Panels. Our cladding provides a modern aesthetic while offering superior insulation.',
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAMcZTFRp_52Sj32vxVy6VDUuGQ9WTrlaPaDOg9_QeHveP1u7kj0nEdEPzSGmd86hE53W0bUkRHJOEXSbMd_cY_0sbgBPNh9tQQbMfAmmo6uqXZsWOJOC4Gddtmmc4_bGG5nGxLNsZ5_rXtGZvE9EB32rn7fJtBbaxVqlZPzmPJD16u-P4stbXiRHFIjSl7w9LeYwveO60o_nuNmi_DVBPceprjv3HZsZc5FpmqVys50NC-Ja6obmcnQTXKFeaVacj2v_5PKHzwusQ',
    features: ['Fire-retardant core options', 'Superior flat surface finish', 'Advanced PVDF coating'],
  },
  {
    id: 'glazing',
    title: 'Structural Glazing',
    icon: Grid3X3,
    desc: 'Engineered glass curtain walls that redefine architectural boundaries. Our structural glazing systems maximize natural light while ensuring resistance.',
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAvjD8l_v_DU9FB3dK03la3liNpPOAHw9YbTp3sAi7iN0VMXY28ARlArDbdSXJ3dLFPLL1NFXWYy2jqohcyUBTWzQlWfQbhcCzOkGhCjBZvd-Q9g1TjIT6xTKJPb3SFtPtPNLvbaAaw3zRlBrufMPrGUAO1pDhoIkwAhNxM_n0_VIV9kadeZakPl1lCMW6y6BfnPMN0TY-0SUZ9fWzi8MHm1NQZV6xuh-iUN1XBLYpqstbVhzWfingZAVi1bbn3-hXGyLjUMkvb7tA',
    features: ['Unitized & semi-unitized systems', 'Double-glazed units for insulation', 'Spider fitting support'],
  },
];

export default function Solutions() {
  const [activeTab, setActiveTab] = useState('upvc');
  const contentRef = useRef<HTMLDivElement>(null);

  // Scroll-spy: update active tab as sections scroll into view
  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    solutions.forEach((s) => {
      const el = document.getElementById(s.id);
      if (!el) return;

      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActiveTab(s.id); },
        { rootMargin: '-40% 0px -55% 0px' }
      );
      obs.observe(el);
      observers.push(obs);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  useGSAP(() => {
    if (!contentRef.current) return;

    contentRef.current.querySelectorAll('.solution-section').forEach((section) => {
      gsap.from(section, {
        opacity: 0, y: 50, duration: 0.8, ease: 'power3.out',
        scrollTrigger: { trigger: section, start: 'top 80%', once: true },
      });
    });
  }, []);

  return (
    <PageWrapper>
      <div className="flex flex-col lg:flex-row min-h-[90vh]">
        {/* Sticky sidebar */}
        <aside className="lg:w-80 bg-slate-950 border-r border-white/10 p-8 lg:sticky lg:top-16 lg:h-[calc(100vh-4rem)] overflow-y-auto">
          <h3 className="text-white font-bold mb-8 uppercase tracking-widest text-xs border-b border-white/5 pb-4">
            Engineering Divisions
          </h3>
          <nav className="flex flex-col gap-2">
            {solutions.map((s) => (
              <button
                key={s.id}
                onClick={() => {
                  setActiveTab(s.id);
                  document.getElementById(s.id)?.scrollIntoView({ behavior: 'smooth' });
                }}
                className={cn(
                  'flex items-center gap-4 px-4 py-3 text-sm transition-all text-left',
                  activeTab === s.id
                    ? 'bg-electric-blue/10 text-electric-blue border-l-4 border-electric-blue'
                    : 'text-slate-400 hover:text-white hover:bg-white/5'
                )}
              >
                <s.icon className="w-4 h-4 shrink-0" />
                <span className="font-semibold tracking-tight">{s.title}</span>
              </button>
            ))}
          </nav>
        </aside>

        {/* Content */}
        <div ref={contentRef} className="flex-1 px-6 lg:px-12 py-12 space-y-32">
          {solutions.map((s, idx) => (
            <section
              key={s.id}
              id={s.id}
              className={cn(
                'solution-section flex flex-col gap-12 group',
                idx % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
              )}
            >
              <div className="w-full md:w-1/2 overflow-hidden shadow-2xl">
                <img
                  className="w-full h-[500px] object-cover group-hover:scale-105 transition-transform duration-500"
                  src={s.img}
                  alt={s.title}
                  loading="lazy"
                />
              </div>
              <div className="w-full md:w-1/2 flex flex-col justify-center">
                <h2 className="text-4xl font-bold text-primary mb-6 uppercase tracking-tight leading-none">{s.title}</h2>
                <p className="text-lg text-slate-500 mb-8 border-l-2 border-electric-blue pl-6">{s.desc}</p>
                <ul className="space-y-4 mb-10">
                  {s.features.map((f, i) => (
                    <li key={i} className="flex items-center gap-3 text-slate-700">
                      <CheckCircle2 className="text-electric-blue w-5 h-5 shrink-0" />
                      <span className="font-medium">{f}</span>
                    </li>
                  ))}
                </ul>
                <button
                  onClick={() => document.getElementById('contact-form')?.scrollIntoView({ behavior: 'smooth' })}
                  className="w-fit border border-outline px-8 py-4 text-xs font-bold uppercase tracking-widest hover:bg-slate-900 hover:text-white transition-all"
                >
                  GET A QUOTE
                </button>
              </div>
            </section>
          ))}
        </div>
      </div>
    </PageWrapper>
  );
}
