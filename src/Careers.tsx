import React from 'react';
import { motion } from 'motion/react';
import { MapPin, Briefcase, TrendingUp, CheckCircle, Upload, PenTool } from 'lucide-react';
import { PageWrapper } from './components/Shared';

const Careers = () => {
  const fadeInVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <PageWrapper>
      <section className="max-w-7xl mx-auto px-6 md:px-12 py-12" id="careers-hero">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="relative overflow-hidden rounded-sm bg-slate-950 p-12 md:p-20 flex flex-col md:flex-row items-center gap-16 border border-white/10"
        >
          <div className="flex-1 z-10 text-center md:text-left">
            <span className="text-electric-blue font-bold uppercase tracking-widest mb-6 block text-xs">Join Our Legacy</span>
            <h2 className="text-5xl md:text-6xl font-bold text-white mb-8 uppercase tracking-tighter leading-none">Build Your Future with Us</h2>
            <p className="text-slate-400 text-lg max-w-xl mb-12">
              At Precision Engineering, we combine structural honesty with technological mastery. Join a team dedicated to machining the future of global infrastructure.
            </p>
            <div className="flex flex-wrap justify-center md:justify-start gap-4">
              <button className="bg-electric-blue text-white px-10 py-5 text-xs font-bold uppercase tracking-widest hover:bg-blue-600 transition-all">VIEW OPENINGS</button>
              <button className="border border-slate-700 text-white px-10 py-5 text-xs font-bold uppercase tracking-widest hover:bg-white/5 transition-all">OUR CULTURE</button>
            </div>
          </div>
          <div className="flex-1 relative w-full h-[400px]">
             <img 
              className="absolute inset-0 w-full h-full object-cover rounded-sm opacity-60 mix-blend-luminosity" 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBm0csaY93RnP2DZPevsfOgPLBZggt-ChqPYpAcxS4njXz4f46efKvVi-zEZzNdZPIcMo_I8rmA-Wt2xg7R7kEbr3DBEXKgtm0zv9YI9OWt7d6vBIVy21pwuVutqRX3RcZvqP9oVe3sW0mTuPTZR_gTcYTVcHZyjUrnwQEEuDruALozkiULYagy4YMDjS7I-Ufa4FebzyKOS4yp6KSyaiMhAMGRS2VHjaxJ9iMmCiCUybJLVMK8HTbnBXYRxuyOxOvpAptndKO9pOM"
              alt="Industrial Workspace"
            />
          </div>
        </motion.div>
      </section>

      {/* Job Grid */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 py-24" id="open-positions">
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInVariants}
          className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8"
        >
          <div>
            <h3 className="text-4xl font-bold text-primary mb-2 uppercase">Open Positions</h3>
            <p className="text-slate-500">Engineering excellence starts with the right talent.</p>
          </div>
          <div className="flex items-center gap-4 text-slate-500 font-bold text-xs tracking-widest uppercase">
            <Briefcase className="w-4 h-4" />
            <span>Filter by Division</span>
          </div>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { title: "Structural Engineer", loc: "Düsseldorf, Germany", type: "Full-Time", icon: PenTool },
            { title: "Project Manager", loc: "Singapore, HQ", type: "Senior Level", icon: Briefcase },
            { title: "Sales Executive", loc: "Chicago, USA", type: "Growth", icon: TrendingUp }
          ].map((job, idx) => (
            <motion.div 
              key={idx}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInVariants}
              transition={{ delay: idx * 0.1 }}
              className="glass-card p-10 rounded-sm transition-all hover:-translate-y-2 hover:shadow-xl group"
            >
              <div className="flex justify-between items-start mb-8">
                <div className="bg-electric-blue/10 p-3 rounded-sm">
                  <job.icon className="text-electric-blue w-6 h-6" />
                </div>
                <span className="bg-slate-200 text-slate-600 text-[10px] font-bold px-3 py-1 uppercase tracking-tighter rounded-full">{job.type}</span>
              </div>
              <h4 className="text-2xl font-bold text-primary mb-4 uppercase">{job.title}</h4>
              <div className="flex items-center gap-2 text-slate-500 mb-8">
                <MapPin className="w-4 h-4" />
                <span className="text-sm">{job.loc}</span>
              </div>
              <button className="w-full py-4 border border-electric-blue text-electric-blue text-xs font-bold uppercase tracking-widest group-hover:bg-electric-blue group-hover:text-white transition-all">APPLY NOW</button>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Application Form */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 py-24 mb-xl" id="job-form">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h3 className="text-4xl font-bold text-primary mb-8 uppercase">Submit Your Application</h3>
            <p className="text-slate-500 text-lg mb-10 leading-relaxed">
              Can't find the perfect fit? We're always looking for precision-minded individuals. Submit a general application and our talent team will review your profile for future engineering divisions.
            </p>
            <div className="space-y-6">
              {[
                "Global Relocation Support",
                "Continuous Technical Training",
                "Industry-Leading Benefits"
              ].map((benefit, idx) => (
                <div key={idx} className="flex items-center gap-4 text-electric-blue text-xs font-bold uppercase tracking-widest">
                  <CheckCircle className="w-5 h-5" />
                  <span>{benefit}</span>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="bg-white p-10 md:p-16 border border-slate-200 rounded-sm shadow-sm relative"
          >
             <form className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Full Name</label>
                  <input type="text" placeholder="John Doe" className="w-full bg-slate-50 border-b border-slate-300 focus:border-electric-blue focus:ring-0 px-2 py-3 outline-none transition-all" />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Email Address</label>
                  <input type="email" placeholder="john@example.com" className="w-full bg-slate-50 border-b border-slate-300 focus:border-electric-blue focus:ring-0 px-2 py-3 outline-none transition-all" />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Desired Position</label>
                <select className="w-full bg-slate-50 border-b border-slate-300 focus:border-electric-blue focus:ring-0 px-2 py-3 outline-none transition-all text-slate-500">
                  <option>Select a role...</option>
                  <option>Structural Engineer</option>
                  <option>Project Manager</option>
                  <option>Sales Executive</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Resume Upload</label>
                <div className="border-2 border-dashed border-slate-200 p-10 text-center cursor-pointer hover:border-electric-blue transition-colors group">
                  <Upload className="w-8 h-8 text-slate-300 group-hover:text-electric-blue mx-auto mb-2" />
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">PDF, DOCX (Max 10MB)</p>
                </div>
              </div>
              <button className="w-full bg-slate-950 text-white font-bold text-xs py-5 uppercase tracking-[0.2em] hover:bg-slate-800 transition-all">SUBMIT APPLICATION</button>
            </form>
          </motion.div>
        </div>
      </section>
    </PageWrapper>
  );
};

export default Careers;
