import React, { useRef, useState } from 'react';
import { Phone, Mail, MapPin, Send, ShieldCheck, ChevronDown, CheckCircle2 } from 'lucide-react';
import { PageWrapper } from './components/Shared';
import { useGSAP } from './lib/useGSAP';
import gsap from 'gsap';

// ─── FREE EMAIL CONTACT FORM CONFIGURATION ───────────────────────────────────
// To receive form submissions for FREE directly to your inbox, we use FormSubmit.co.
// 1. Enter your real email address below in MY_EMAIL.
// 2. The very first time you submit this form, FormSubmit will send you a single
//    activation email. Click the link in it, and your form will be 100% active!
const MY_EMAIL = 'ssrikalaprojects@gmail.com'; 
const FORM_ENDPOINT = `https://formsubmit.co/ajax/${MY_EMAIL}`;
// ─────────────────────────────────────────────────────────────────────────────

type FormState = 'idle' | 'submitting' | 'success' | 'error';

export default function Contact() {
  const heroRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const [formState, setFormState] = useState<FormState>('idle');

  useGSAP(() => {
    if (heroRef.current) {
      gsap.from(heroRef.current, { opacity: 0, y: 30, duration: 0.8, ease: 'power3.out' });
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!formRef.current) return;

    setFormState('submitting');

    try {
      const data = new FormData(formRef.current);
      const res  = await fetch(FORM_ENDPOINT, {
        method:  'POST',
        body:    data,
        headers: { Accept: 'application/json' },
      });

      if (res.ok) {
        setFormState('success');
        formRef.current.reset();
      } else {
        setFormState('error');
      }
    } catch {
      setFormState('error');
    }
  };

  return (
    <PageWrapper>
      <section className="max-w-7xl mx-auto px-6 md:px-12 py-12" id="contact-hero">
        {/* Header */}
        <div ref={heroRef} className="mb-20 text-center md:text-left">
          <div className="inline-block px-4 py-1 mb-8 border border-electric-blue/30 bg-electric-blue/5 rounded-full">
            <span className="text-[10px] font-bold text-electric-blue uppercase tracking-widest">
              Connect with our engineers
            </span>
          </div>
          <h1 className="text-5xl md:text-7xl font-bold text-primary mb-6 uppercase tracking-tighter leading-none">
            Let's Talk Results
          </h1>
          <p className="text-lg text-slate-500 max-w-2xl">
            From structural glazing to PEB solutions, our precision engineering team is ready to scale your next
            industrial project with technical mastery.
          </p>
        </div>

        {/* Info + Map */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-32">
          <div className="lg:col-span-5 flex flex-col gap-4">
            <div className="glass-card p-12 flex flex-col gap-12 h-full hover:shadow-xl hover:-translate-y-1 transition-all">
              {[
                { icon: Phone,  label: 'Direct Line',         val: '+1 (800) 555-PRECISION',          sub: 'Available Mon–Fri, 08:00–18:00 EST',    href: 'tel:+18005557737' },
                { icon: Mail,   label: 'Project Inquiries',   val: 'eng@industrial-precision.com',    sub: 'Fast-track response within 12 hours',   href: 'mailto:eng@industrial-precision.com' },
                { icon: MapPin, label: 'Manufacturing & Office', val: 'Srikala Projects',             sub: 'Mamidipally, Hyderabad, Telangana - 501359', href: 'https://maps.app.goo.gl/8CgULSLTmw5RoYWv7' },
              ].map((item, idx) => (
                <div key={idx} className="flex items-start gap-6">
                  <div className="w-14 h-14 bg-slate-900 flex items-center justify-center shrink-0">
                    <item.icon className="text-electric-blue w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-slate-400 mb-1 uppercase tracking-widest">{item.label}</p>
                    {item.href ? (
                      <a 
                        href={item.href} 
                        target={item.href.startsWith('http') ? '_blank' : undefined}
                        rel={item.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                        className="text-2xl font-bold text-primary tracking-tight leading-tight mb-1 hover:text-electric-blue transition-colors block"
                      >
                        {item.val}
                      </a>
                    ) : (
                      <p className="text-2xl font-bold text-primary tracking-tight leading-tight mb-1">{item.val}</p>
                    )}
                    <p className="text-sm text-slate-500">{item.sub}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <a 
            href="https://maps.app.goo.gl/8CgULSLTmw5RoYWv7"
            target="_blank"
            rel="noopener noreferrer"
            className="lg:col-span-7 bg-slate-100 border border-outline-variant relative overflow-hidden h-[400px] lg:h-auto min-h-[500px] block group cursor-pointer"
          >
            <img
              className="absolute inset-0 w-full h-full object-cover grayscale brightness-75 contrast-125 opacity-40 group-hover:scale-105 transition-transform duration-700"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuA0BvcQiSss8vl7npI6jlu0BsJ1tBX07IDr89NBz6gKhTe_rW_Re5D4yUrC83KPdtHa32e-BPLCdFMs_xHbPuJXo6WIROmtxysw0EC73CTaclJjNjHSpG-9iC-8ZuJLAfq_QxnJ0C32e_I0XFFnCevOFW93yqTgJpck8f_R9u_y08MMVyZranz4E63gV7HS0RQJqPOlAAjK32a7v1k3r9tTxdhDDTApPajp_fjOVFi0T-Co2psh_xyJ_vsC2-BbRT589DWHq_b2kPY"
              alt="Hyderabad Map Location"
              loading="lazy"
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="bg-slate-950/90 text-white px-8 py-6 border border-white/10 shadow-2xl backdrop-blur-xl group-hover:bg-electric-blue transition-colors duration-300">
                <div className="flex items-center gap-4">
                  <MapPin className="text-electric-blue w-8 h-8 fill-electric-blue group-hover:text-white group-hover:fill-white transition-colors duration-300" />
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 group-hover:text-white/80 transition-colors duration-300">Manufacturing Unit</p>
                    <p className="font-black text-xl tracking-tight uppercase">Hyderabad, India</p>
                  </div>
                </div>
              </div>
            </div>
          </a>
        </div>

        {/* Form */}
        <section className="max-w-4xl mx-auto py-24 px-6 border-t border-outline-variant/30" id="contact-form">
          <div className="mb-16">
            <h2 className="text-4xl font-bold text-primary mb-4 uppercase">Technical Specification</h2>
            <p className="text-lg text-slate-500">
              Provide the parameters of your project below. Our specialist leads will review and contact you with a
              preliminary assessment.
            </p>
          </div>

          {/* Success state */}
          {formState === 'success' && (
            <div className="flex flex-col items-center justify-center py-16 gap-4 text-center">
              <CheckCircle2 className="w-16 h-16 text-electric-blue" />
              <h3 className="text-2xl font-bold uppercase">Message Sent!</h3>
              <p className="text-slate-500 max-w-md">
                Thank you for reaching out. Our engineering team will respond within 12 hours.
              </p>
              <button
                onClick={() => setFormState('idle')}
                className="mt-4 border border-outline px-8 py-3 text-xs font-bold uppercase tracking-widest hover:bg-slate-900 hover:text-white transition-all"
              >
                Send Another
              </button>
            </div>
          )}

          {formState !== 'success' && (
            <form
              ref={formRef}
              onSubmit={handleSubmit}
              className="grid grid-cols-1 md:grid-cols-2 gap-12"
            >
              {/* FormSubmit carbon copy (CC) to send to secondary email address */}
              <input type="hidden" name="_cc" value="sales@srikalaprojects.com" />
              <div className="relative group">
                <input
                  type="text"
                  name="name"
                  required
                  placeholder=" "
                  className="peer w-full bg-transparent border-b border-slate-300 py-3 focus:border-electric-blue focus:ring-0 outline-none transition-all placeholder-transparent"
                />
                <label className="absolute left-0 -top-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest transition-all peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-focus:-top-4 peer-focus:text-[10px] peer-focus:text-electric-blue">
                  Full Name
                </label>
              </div>

              <div className="relative group">
                <input
                  type="email"
                  name="email"
                  required
                  placeholder=" "
                  className="peer w-full bg-transparent border-b border-slate-300 py-3 focus:border-electric-blue focus:ring-0 outline-none transition-all placeholder-transparent"
                />
                <label className="absolute left-0 -top-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest transition-all peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-focus:-top-4 peer-focus:text-[10px] peer-focus:text-electric-blue">
                  Email Address
                </label>
              </div>

              <div className="relative group">
                <input
                  type="text"
                  name="company"
                  placeholder=" "
                  className="peer w-full bg-transparent border-b border-slate-300 py-3 focus:border-electric-blue focus:ring-0 outline-none transition-all placeholder-transparent"
                />
                <label className="absolute left-0 -top-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest transition-all peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-focus:-top-4 peer-focus:text-[10px] peer-focus:text-electric-blue">
                  Company / Organization
                </label>
              </div>

              <div className="relative group">
                <select
                  name="division"
                  className="peer w-full bg-transparent border-b border-slate-300 py-3 focus:border-electric-blue focus:ring-0 outline-none transition-all appearance-none text-slate-700"
                >
                  <option value="">Select Division</option>
                  <option>UPVC Solutions</option>
                  <option>Fabrication</option>
                  <option>PEB Solutions</option>
                  <option>Roofing Systems</option>
                  <option>ACP Cladding</option>
                  <option>Structural Glazing</option>
                </select>
                <label className="absolute left-0 -top-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                  Engineering Division
                </label>
                <ChevronDown className="absolute right-0 top-3 w-4 h-4 text-slate-400 pointer-events-none" />
              </div>

              <div className="relative group md:col-span-2">
                <textarea
                  name="message"
                  required
                  placeholder=" "
                  rows={4}
                  className="peer w-full bg-transparent border-b border-slate-300 py-3 focus:border-electric-blue focus:ring-0 outline-none transition-all placeholder-transparent resize-none"
                />
                <label className="absolute left-0 -top-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest transition-all peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-focus:-top-4 peer-focus:text-[10px] peer-focus:text-electric-blue">
                  Project Scope & Requirements
                </label>
              </div>

              {formState === 'error' && (
                <p className="md:col-span-2 text-red-500 text-sm font-medium">
                  Something went wrong. Please try again or email us directly.
                </p>
              )}

              <div className="md:col-span-2 flex flex-col md:flex-row items-center justify-between gap-8 pt-6">
                <div className="flex items-center gap-3 text-slate-400">
                  <ShieldCheck className="w-5 h-5 text-electric-blue" />
                  <span className="text-[10px] font-bold uppercase tracking-widest">
                    Data encryption active for secure transmission
                  </span>
                </div>
                <button
                  type="submit"
                  disabled={formState === 'submitting'}
                  className="w-full md:w-auto bg-electric-blue text-white px-16 py-6 text-sm font-black uppercase tracking-widest hover:bg-slate-950 transition-all active:scale-95 flex items-center justify-center gap-4 group disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {formState === 'submitting' ? 'SENDING…' : 'SEND MESSAGE'}
                  <Send className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </button>
              </div>
            </form>
          )}
        </section>
      </section>
    </PageWrapper>
  );
}
