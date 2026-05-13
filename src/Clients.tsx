import React, { useRef } from 'react';
import { Quote, User, Rocket, Cpu, Landmark, TreeDeciduous, Building, ShieldCheck } from 'lucide-react';
import { PageWrapper } from './components/Shared';
import { useGSAP } from './lib/useGSAP';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const clients = [
  { name: 'Wonderla',   icon: Building,      logo: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA3OKzoUd1GpNa0SwmKkP9SnfdQJbzOs3HTAtij4e303roESR2Nk6dtO9blmXFjcpdnYtSWSxbQtXvbBJZmEDPAZ9M_IoMTV3EpAZBFbJspgkfJjNNhm6LofdLbeA5K8V0X5Stz3tq34faVhBxFJ9D1g7ngirBwsjgX139XHRjwOE9ddUaGVyigCldYovhVRuuv0FHAhrHYYUhijtJL7N-gFyuRajMAXKy96fUqrCxRP2Ur5ZEhAuYjs-PFwu132ADAETWBdDPUzQc' },
  { name: 'DRDO',       icon: ShieldCheck,   logo: null },
  { name: 'DRDL',       icon: Rocket,        logo: null },
  { name: 'Zen Tech',   icon: Cpu,           logo: null },
  { name: 'SRI DURGA',  icon: Landmark,      logo: null },
  { name: 'SHUBHAM',    icon: TreeDeciduous, logo: null },
];

export default function Clients() {
  const gridRef        = useRef<HTMLDivElement>(null);
  const testimonialsRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (gridRef.current) {
      gsap.from(gridRef.current.children, {
        opacity: 0, y: 30, stagger: 0.1, duration: 0.7, ease: 'power3.out',
        scrollTrigger: { trigger: gridRef.current, start: 'top 80%' },
      });
    }

    if (testimonialsRef.current) {
      gsap.from(testimonialsRef.current.children, {
        opacity: 0, y: 40, stagger: 0.15, duration: 0.8, ease: 'power3.out',
        scrollTrigger: { trigger: testimonialsRef.current, start: 'top 80%' },
      });
    }
  }, []);

  return (
    <PageWrapper>
      {/* Hero */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 py-12" id="clients-hero">
        <div className="flex flex-col md:flex-row items-end justify-between gap-8 border-b border-outline-variant pb-12">
          <div className="max-w-2xl">
            <span className="text-xs font-bold text-electric-blue uppercase tracking-widest block mb-4">Partnerships</span>
            <h1 className="text-5xl md:text-7xl font-bold text-primary mb-6 uppercase tracking-tighter">
              Trusted by Industry Leaders
            </h1>
            <p className="text-lg text-slate-500">
              We partner with global defense, hospitality, and tech giants to deliver engineered solutions that define
              the next generation of industrial excellence.
            </p>
          </div>
          <div className="hidden md:block">
            <span className="text-[120px] font-black text-slate-200 leading-none select-none">02</span>
          </div>
        </div>
      </section>

      {/* Client grid */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 py-12" id="client-grid">
        <div ref={gridRef} className="grid grid-cols-2 md:grid-cols-3 border-l border-t border-outline-variant">
          {clients.map((client, idx) => (
            <div
              key={idx}
              className="group border-r border-b border-outline-variant p-12 hover:bg-white transition-all duration-300 flex flex-col items-center justify-center min-h-[200px]"
            >
              <div className="w-20 h-20 mb-6 flex items-center justify-center grayscale group-hover:grayscale-0 transition-all opacity-40 group-hover:opacity-100">
                {client.logo ? (
                  <img src={client.logo} className="max-w-full h-auto" alt={client.name} loading="lazy" />
                ) : (
                  <client.icon className="w-16 h-16 text-slate-400 group-hover:text-electric-blue" />
                )}
              </div>
              <span className="text-[10px] font-bold text-slate-400 group-hover:text-primary transition-colors uppercase tracking-widest">
                {client.name}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 py-24" id="testimonials">
        <h2 className="text-3xl font-bold text-primary mb-12 uppercase border-l-4 border-electric-blue pl-6">
          Client Feedback
        </h2>
        <div ref={testimonialsRef} className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2 glass-card p-12 relative overflow-hidden bg-white/70">
            <Quote className="text-electric-blue w-12 h-12 mb-8 opacity-20 absolute top-8 left-8" />
            <p className="text-3xl font-bold text-primary mb-12 italic leading-tight z-10 relative">
              "PRECISION ENG delivered a custom structural glazing solution that exceeded our stringent safety
              requirements for the new defense testing facility. Their technical mastery is unmatched."
            </p>
            <div className="flex items-center gap-6">
              <div className="w-16 h-16 bg-slate-100 flex items-center justify-center rounded-full border border-outline-variant">
                <User className="text-slate-500 w-8 h-8" />
              </div>
              <div>
                <p className="text-lg font-bold text-primary">Dr. Rajesh Kumar</p>
                <p className="text-xs text-slate-500 uppercase tracking-widest">Director of Operations, DRDO</p>
              </div>
            </div>
          </div>

          <div className="bg-slate-950 p-12 flex flex-col justify-between rounded-sm">
            <div>
              <Quote className="text-electric-blue w-12 h-12 mb-8 opacity-20" />
              <p className="text-xl text-white mb-12 font-medium">
                "The PEB structures for our latest resort expansion were installed with incredible speed and accuracy.
                Truly an engineered success."
              </p>
            </div>
            <div>
              <p className="text-lg font-bold text-white">Ananya Rao</p>
              <p className="text-xs text-electric-blue uppercase tracking-widest">Project Lead, Wonderla</p>
            </div>
          </div>
        </div>
      </section>
    </PageWrapper>
  );
}
