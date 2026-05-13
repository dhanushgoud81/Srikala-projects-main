import React, { useRef } from 'react';
import { Eye, Rocket, ShieldCheck } from 'lucide-react';
import { PageWrapper } from './components/Shared';
import { useGSAP } from './lib/useGSAP';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const team = [
  { name: 'Dr. Marcus Thorne',  role: 'CHIEF TECHNICAL OFFICER',  img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDgpArO3x0QUqiqLcdVOl90IbZh7zvYDfRcMEbIIr0K7FicJTuNc7eJbHd8SGrrXPGihJLMvTTC-IQVMEAa3eGMdpSX9rJYdMjDz7Qm-f0v-bhyK3ciUPuOYFMEyoQCF4dtrVRlucwsoRb0gjQ6bNg3q6aaOuYunlH-xn1cY9jlGZEej9sImyZ-4smK9iycb8TSiB9Vta__ogDES6svm15oaKToOaTTQQ86Q1c87DoXhTZsHPc_7iZfD5_ctE_iLd-sr8UPVq9GKmY' },
  { name: 'Sarah Chen',         role: 'HEAD OF OPERATIONS',        img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuATzK6nEhkwFZCFFkmRf7DI3U93IHXVcmDVFcZEBy68CWjnueGOtS4_7ko0gHAEZ_b_tJ38gZLv_P7atiZjL_nC65OvFkAi9xFggTXv2ltgeSIBNDORzjxh2IurOhMSBrHJzpmuYS72UTf6UIpuve_RPiRfW103Pb0BTFiFky9Y-Dy5dAkQItqn_wy8qKG_q1zeoObXG3peDoQuEe7iN4QSm_6JjYD6VezBqZoG9pxhyBnaqOLH4pFvOoOBvt-3Jd8-fUmcVDzEYKQ' },
  { name: 'Julian Vane',        role: 'PRINCIPAL DESIGNER',        img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCnfnrFOCNWQz6yd4NZ4tm_pxbQGYGp7YywzWs_hE2P44yB_PNHfS0yQEp2Z-GpxkmellOYN_XYGOf_CdGOtrTHgK5O_VxlmtCCdoA5h3RVifNaVg5Y-j7RM9Dp8FICKnvtnIY1rOl3oQuEXoeTQiiRjjNCcDtvWMA9Y9w4_1rq3hRNZF7el5J0ASkf6ulTB2tYsHOmGNS99-xqTixnrnN0nvXE671x98IS9Ej_zzYJtKHzPk8EKGfWasLrKiMxacdyIATCWFjn2pA' },
  { name: 'Elena Rodriguez',    role: 'STRUCTURAL SPECIALIST',     img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCSZRXg8bl7G_SRuQR7aosqSmp8_wbGdLTT3X8mxi2jN1-TigT_Hw2svaL5qBuUmlo5v7m3_Wm6pGeFmP9jmd5UG26YAJkSyUlZwf8xR3BRpSCQcjog7EcAsghyRPJo9ixzHBCjoZFAlLFA9FT8stwXsw-O9GP77IzZFbjkw3Ye1psGHpuSjdFKxO1jTNiWbcf2opYaOnI-dsOB9UNvmxXjpyCmfZfs2qM5Rj3bHv6-JnhVsE7MkNMn-DCx7FCr2txeDXvHnk1H5uo' },
];

export default function About() {
  const heroRef   = useRef<HTMLDivElement>(null);
  const bentoRef  = useRef<HTMLDivElement>(null);
  const teamRef   = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // Hero fade-in
    if (heroRef.current) {
      gsap.from(heroRef.current, { opacity: 0, y: 30, duration: 0.8, ease: 'power3.out' });
    }

    // Bento cards stagger on scroll
    if (bentoRef.current) {
      gsap.from(bentoRef.current.children, {
        opacity: 0, y: 40, scale: 0.97, stagger: 0.12, duration: 0.8, ease: 'power3.out',
        scrollTrigger: { trigger: bentoRef.current, start: 'top 80%' },
      });
    }

    // Team cards stagger on scroll
    if (teamRef.current) {
      gsap.from(teamRef.current.children, {
        opacity: 0, y: 40, stagger: 0.1, duration: 0.7, ease: 'power3.out',
        scrollTrigger: { trigger: teamRef.current, start: 'top 80%' },
      });
    }
  }, []);

  return (
    <PageWrapper>
      {/* Hero */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 py-12" id="about-hero">
        <div
          ref={heroRef}
          className="flex flex-col md:flex-row items-end gap-12 border-b border-outline-variant pb-12"
        >
          <div className="w-full md:w-2/3">
            <span className="text-electric-blue font-bold tracking-[0.2em] uppercase mb-4 block text-xs">ESTABLISHED 1984</span>
            <h1 className="text-6xl md:text-8xl font-bold text-primary leading-none uppercase tracking-tighter">
              Heritage of Engineering Excellence
            </h1>
          </div>
          <div className="w-full md:w-1/3">
            <p className="text-lg text-slate-500 max-w-sm">
              Four decades of defining industrial standards through mathematical precision and structural integrity.
            </p>
          </div>
        </div>
      </section>

      {/* Bento */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 py-12" id="about-bento">
        <div ref={bentoRef} className="grid grid-cols-1 md:grid-cols-12 gap-6">
          <div className="md:col-span-8 h-[400px] relative overflow-hidden rounded-sm group">
            <img
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuAOw_2p0K_b5NRF_mNRHLHSyqxj47ONXQ6c03--M3Qx5EPC3ffBzqnwOC0qqMyFcOaDQ2cRL7oB8PhacfPAkIqsx3yeIBNgAMXVuMtUq3z46SS37Kc8AltZa2UIKcNVXGguD17OODIOY0ynlu9G1hwwUnqNO3If_WbAO4mRr64_IhJT3NKH_mhZEak7AsCgz19KqVs8jGbZF_U57zAqYs0g9qQtmuplidEt_LIOQsKhuhH6AA9LOfydx3EVqGNeqUpB4BBZGNGzB4c"
              alt="Industrial Transformation"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 to-transparent flex flex-col justify-end p-8">
              <h3 className="text-3xl font-bold text-white mb-2">Industrial Transformation</h3>
              <p className="text-slate-300 max-w-xl">
                We lead the evolution of infrastructure by integrating traditional craftsmanship with next-generation automation.
              </p>
            </div>
          </div>

          <div className="md:col-span-4 glass-card p-8 flex flex-col justify-between rounded-sm">
            <div>
              <Eye className="text-electric-blue w-10 h-10 mb-6" />
              <h3 className="text-2xl font-bold text-primary mb-4 uppercase">The Vision</h3>
              <p className="text-slate-500">
                To become the global benchmark for technical structural integrity and architectural innovation.
              </p>
            </div>
            <div className="pt-6 border-t border-outline-variant/30">
              <span className="text-[10px] font-bold text-electric-blue uppercase tracking-widest">Global Reach • 2030</span>
            </div>
          </div>

          <div className="md:col-span-4 glass-card p-8 flex flex-col justify-between rounded-sm">
            <div>
              <Rocket className="text-electric-blue w-10 h-10 mb-6" />
              <h3 className="text-2xl font-bold text-primary mb-4 uppercase">The Mission</h3>
              <p className="text-slate-500">
                Delivering uncompromising precision in every fabrication, ensuring safety and longevity for complex global projects.
              </p>
            </div>
          </div>

          <div className="md:col-span-8 h-[300px] relative overflow-hidden rounded-sm">
            <img
              className="w-full h-full object-cover"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuAnble2opw7ZQgHfCElmVXcmB810WgtC0xD9tKO2aJBOUowd1HuQOSoAGeaG9GF5Zk-MgtVgjg3njHGDBv17E-pdJ__e5ILhkLaGafMaPIPRyHoLzpWAubghibwc7K07uIHe93bzZHrUAxXFdQ9a_1VZz1WRQo_85xJEu8k4P-dTVURgr_n1oYS8doMv5KbtMotZ644JD_29BSkMyl0_eE2TRswUCFo1N1ORVvSfGizlRs_A7iihF7zLqC9MD2KkNT0IGAkLaSPyUg"
              alt="Engineering Plans"
              loading="lazy"
            />
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 py-24" id="team">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-primary mb-4 uppercase tracking-tight">The Engineering Mindset</h2>
          <p className="text-lg text-slate-500 max-w-2xl mx-auto">
            Led by a consortium of technical specialists dedicated to pushing the boundaries of industrial fabrication.
          </p>
        </div>
        <div ref={teamRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {team.map((person, idx) => (
            <div key={idx} className="group overflow-hidden border border-outline-variant bg-white">
              <div className="aspect-[3/4] overflow-hidden grayscale group-hover:grayscale-0 transition-all duration-500">
                <img
                  className="w-full h-full object-cover"
                  src={person.img}
                  alt={person.name}
                  loading="lazy"
                />
              </div>
              <div className="p-6 text-center bg-white group-hover:-translate-y-2 transition-transform duration-300">
                <h4 className="text-xl font-bold text-primary mb-1">{person.name}</h4>
                <span className="text-[10px] text-electric-blue font-bold uppercase tracking-widest">{person.role}</span>
              </div>
            </div>
          ))}
        </div>
      </section>
    </PageWrapper>
  );
}
