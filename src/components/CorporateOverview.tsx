import React from 'react';
import { Shield, Award, Calendar, CheckCircle } from 'lucide-react';

export const CorporateOverview = () => {
  return (
    <section className="py-24 bg-white relative overflow-hidden" id="corporate-overview">
      {/* Subtle background tech grid */}
      <div className="absolute inset-0 dot-grid opacity-[0.4] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* 1. Left Corporate Statement & Mission Column (6 cols) */}
          <div className="lg:col-span-6 text-left flex flex-col justify-center">
            <div className="flex items-center gap-2 mb-4">
              <span className="font-mono text-xs text-electric-blue tracking-widest font-bold">
                [ CORPORATE IDENTITY ]
              </span>
              <div className="h-[1px] w-8 bg-electric-blue/30" />
            </div>
            
            <h2 className="text-3xl sm:text-4xl lg:text-[44px] font-oswald font-extrabold text-slate-900 leading-[1.1] mb-6 uppercase tracking-tight">
              Engineering Strength. <br />
              <span className="text-electric-blue">Designing Transparency.</span>
            </h2>
            
            <p className="text-slate-600 text-base leading-relaxed mb-6">
              Srikala Projects is an elite structural engineering and architectural building envelope enterprise. For over two decades, we have defined the skyline by delivering turnkey, high-integrity infrastructure solutions.
            </p>
            
            <p className="text-slate-600 text-sm leading-relaxed mb-8">
              We merge the heavy-duty resilience of **Pre-Engineered Steel Buildings** and custom **Heavy Steel Fabrication** with the state-of-the-art elegance of premium **German-profile uPVC Windows & Doors** and high-performance **Glass Facades**. Our fully integrated manufacturing facilities combine automated engineering with strict ISO quality parameters, ensuring every framework is fabricated to endure.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 border-t border-slate-105 pt-8">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-electric-blue/10 flex items-center justify-center shrink-0 border border-electric-blue/20">
                  <Shield className="w-5 h-5 text-electric-blue" />
                </div>
                <div>
                  <h4 className="font-oswald font-bold text-xs uppercase text-slate-900 tracking-wider">Turnkey PEB Infrastructure</h4>
                  <p className="text-[11px] text-slate-500 mt-0.5">Heavy industrial steel factories, sheds, and warehouses.</p>
                </div>
              </div>
              <div className="flex items-start gap-3 sm:border-l sm:border-slate-150 sm:pl-6">
                <div className="w-10 h-10 bg-electric-blue/10 flex items-center justify-center shrink-0 border border-electric-blue/20">
                  <Award className="w-5 h-5 text-electric-blue" />
                </div>
                <div>
                  <h4 className="font-oswald font-bold text-xs uppercase text-slate-900 tracking-wider">Premium Architectural Envelope</h4>
                  <p className="text-[11px] text-slate-500 mt-0.5">Luxury weather-tight uPVC and glazed facade systems.</p>
                </div>
              </div>
            </div>
          </div>

          {/* 2. Right Blueprint Tech Metric Panel Column (6 cols) */}
          <div className="lg:col-span-6 relative">
            
            {/* Technical Blueprint Frame */}
            <div className="bg-[#121315] border border-white/10 p-8 md:p-12 relative shadow-2xl rounded-none text-left">
              {/* Corner decorative bracket lines (specifying Srikala engineering detail) */}
              <div className="absolute top-0 left-0 w-4 h-[1px] bg-electric-blue" />
              <div className="absolute top-0 left-0 w-[1px] h-4 bg-electric-blue" />
              <div className="absolute bottom-0 right-0 w-4 h-[1px] bg-electric-blue" />
              <div className="absolute bottom-0 right-0 w-[1px] h-4 bg-electric-blue" />
              
              <div className="absolute top-0 right-0 w-4 h-[1px] bg-white/20" />
              <div className="absolute top-0 right-0 w-[1px] h-4 bg-white/20" />
              <div className="absolute bottom-0 left-0 w-4 h-[1px] bg-white/20" />
              <div className="absolute bottom-0 left-0 w-[1px] h-4 bg-white/20" />

              {/* Grid backdrop overlay */}
              <div className="absolute inset-0 opacity-[0.08] dot-grid pointer-events-none" />

              {/* Technical drawing labels */}
              <div className="absolute top-3 left-4 font-mono text-[9px] text-slate-500 tracking-widest uppercase">
                CAD SPEC REF: SK-2026 // SITE DATA
              </div>
              <div className="absolute bottom-3 right-4 font-mono text-[9px] text-slate-500 tracking-widest uppercase">
                SCALE: 1:100 / STRUCTURAL METRICS
              </div>

              {/* Metrics Grid */}
              <div className="grid grid-cols-2 gap-8 pt-4 pb-2 border-b border-white/5">
                
                {/* Metric 1 */}
                <div className="relative">
                  <div className="flex items-center gap-1.5 mb-1">
                    <Calendar className="w-3.5 h-3.5 text-electric-blue" />
                    <span className="font-mono text-[10px] text-slate-400 tracking-widest uppercase">Pillars</span>
                  </div>
                  <div className="text-3xl md:text-4xl font-oswald font-extrabold text-white tracking-tight">25+</div>
                  <div className="font-oswald font-bold text-[10px] uppercase text-electric-blue tracking-wider mt-1">Years of Excellence</div>
                  <p className="text-[10px] text-slate-400 mt-1 leading-relaxed">Defining structural standards in steel infrastructure.</p>
                </div>

                {/* Metric 2 */}
                <div className="relative">
                  <div className="flex items-center gap-1.5 mb-1">
                    <CheckCircle className="w-3.5 h-3.5 text-electric-blue" />
                    <span className="font-mono text-[10px] text-slate-400 tracking-widest uppercase">Completes</span>
                  </div>
                  <div className="text-3xl md:text-4xl font-oswald font-extrabold text-white tracking-tight">500+</div>
                  <div className="font-oswald font-bold text-[10px] uppercase text-electric-blue tracking-wider mt-1">Projects Delivered</div>
                  <p className="text-[10px] text-slate-400 mt-1 leading-relaxed">Turnkey factories, warehouses, and corporate facilities.</p>
                </div>

                {/* Metric 3 */}
                <div className="relative">
                  <div className="flex items-center gap-1.5 mb-1">
                    <Shield className="w-3.5 h-3.5 text-electric-blue" />
                    <span className="font-mono text-[10px] text-slate-400 tracking-widest uppercase">Standards</span>
                  </div>
                  <div className="text-3xl md:text-4xl font-oswald font-extrabold text-white tracking-tight">ISO 9001</div>
                  <div className="font-oswald font-bold text-[10px] uppercase text-electric-blue tracking-wider mt-1">Certified Quality</div>
                  <p className="text-[10px] text-slate-400 mt-1 leading-relaxed">ISO-certified, Lean automated fabrication plants.</p>
                </div>

                {/* Metric 4 */}
                <div className="relative">
                  <div className="flex items-center gap-1.5 mb-1">
                    <Award className="w-3.5 h-3.5 text-electric-blue" />
                    <span className="font-mono text-[10px] text-slate-400 tracking-widest uppercase">FENESTRA</span>
                  </div>
                  <div className="text-3xl md:text-4xl font-oswald font-extrabold text-white tracking-tight">100%</div>
                  <div className="font-oswald font-bold text-[10px] uppercase text-electric-blue tracking-wider mt-1">German Hardware</div>
                  <p className="text-[10px] text-slate-400 mt-1 leading-relaxed">Premium lamination, weather proofing, and statics.</p>
                </div>

              </div>

              {/* Bottom technical specifications cockpit overlay */}
              <div className="pt-4 flex items-center justify-between text-slate-500 font-mono text-[10px]">
                <span className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 bg-electric-blue rounded-full animate-ping" />
                  SYSTEM ACTIVE
                </span>
                <span>VERIFICATION CODE: OK-PASS</span>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
