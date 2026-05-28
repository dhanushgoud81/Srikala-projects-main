import React, { useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import gsap from 'gsap';
import { Factory, Menu, X, Phone, Mail, MapPin, Facebook, Twitter, Linkedin, Instagram, Globe } from 'lucide-react';
import { cn } from '../lib/utils';

const navItems = [
  { label: 'Home',      path: '/'          },
  { label: 'Solutions', path: '/solutions' },
  { label: 'uPVC Windows & Doors', path: '/upvc' },
  { label: 'Contact',   path: '/contact'   },
];

export const Navbar = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  const [scrolled, setScrolled]             = React.useState(false);
  const mobileMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => { setMobileMenuOpen(false); }, [pathname]);

  const go = (path: string) => {
    navigate(path);
    window.scrollTo(0, 0);
  };

  return (
    <header
      className={cn(
        'fixed top-0 w-full z-50 border-b transition-all duration-500',
        scrolled
          ? 'bg-baumeister-charcoal/95 backdrop-blur-lg border-white/20 shadow-2xl'
          : 'bg-baumeister-charcoal/40 border-white/10'
      )}
    >
      {/* ─── 1. Header Top Bar (Utility Details) ─── */}
      <div
        className={cn(
          'w-full bg-[#18191b] border-b border-white/5 text-[10.5px] uppercase tracking-widest text-slate-400 font-sans hidden lg:block transition-all duration-300',
          scrolled ? 'h-0 py-0 opacity-0 overflow-hidden border-none' : 'h-10 opacity-100'
        )}
      >
        <div className="flex justify-between items-center max-w-7xl mx-auto px-6 md:px-12 h-full">
          {/* Left contact specs */}
          <div className="flex items-center gap-6">
            <a 
              href="https://maps.app.goo.gl/8CgULSLTmw5RoYWv7" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="flex items-center gap-2 pr-6 border-r border-white/10 text-slate-350 hover:text-white transition-colors duration-200"
            >
              <MapPin className="text-electric-blue w-3.5 h-3.5" />
              <span>Hyderabad, Telangana, India</span>
            </a>
            <div className="flex items-center gap-2 pr-6 border-r border-white/10">
              <Phone className="text-electric-blue w-3.5 h-3.5" />
              <a href="tel:+919866089771" className="hover:text-white transition-colors duration-200">
                +91 98660 89771
              </a>
            </div>
            <div className="flex items-center gap-2">
              <Mail className="text-electric-blue w-3.5 h-3.5" />
              <a href="mailto:sales@srikalaprojects.com" className="hover:text-white transition-colors duration-200 lowercase">
                sales@srikalaprojects.com
              </a>
            </div>
          </div>

          {/* Right socials & region map */}
          <div className="flex items-center gap-5">
            <div className="flex items-center gap-3.5 text-slate-400">
              <a href="#" aria-label="Facebook Link" className="hover:text-electric-blue transition-colors"><Facebook className="w-3.5 h-3.5" /></a>
              <a href="#" aria-label="Twitter Link" className="hover:text-electric-blue transition-colors"><Twitter className="w-3.5 h-3.5" /></a>
              <a href="#" aria-label="LinkedIn Link" className="hover:text-electric-blue transition-colors"><Linkedin className="w-3.5 h-3.5" /></a>
              <a href="#" aria-label="Instagram Link" className="hover:text-electric-blue transition-colors"><Instagram className="w-3.5 h-3.5" /></a>
            </div>
            <div className="w-[1px] h-3 bg-white/15" />
            <div className="flex items-center gap-2 text-slate-300">
              <Globe className="text-electric-blue w-4 h-4 animate-pulse" />
              <span className="font-bold">US</span>
            </div>
          </div>
        </div>
      </div>

      {/* ─── 2. Header Bottom Bar (Main Navigation) ─── */}
      <div
        className={cn(
          'flex justify-between items-center w-full px-6 md:px-12 max-w-7xl mx-auto transition-all duration-300',
          scrolled ? 'py-2.5' : 'py-5'
        )}
      >
        {/* Brand Logo */}
        <button
          onClick={() => go('/')}
          className="flex items-center gap-3.5 group"
          aria-label="Go to homepage"
        >
          <div className="w-9 h-9 bg-electric-blue flex items-center justify-center rounded-none shadow-md group-hover:scale-105 transition-transform duration-300">
            <Factory className="text-white w-5 h-5" />
          </div>
          <span className="text-xl font-oswald font-bold tracking-tight text-white uppercase sm:block hidden">
            <span className="text-electric-blue group-hover:text-white transition-colors duration-300">SRIKALA</span> PROJECTS
          </span>
        </button>

        {/* Desktop Menu Navigation Links */}
        <nav className="hidden md:flex gap-8 items-center" aria-label="Main navigation">
          {navItems.map((item) => (
            <button
              key={item.path}
              onClick={() => go(item.path)}
              className={cn(
                'relative font-oswald font-bold uppercase tracking-widest text-xs transition-colors duration-200 py-1.5',
                'after:content-[""] after:absolute after:-bottom-0.5 after:left-0 after:h-[2px] after:bg-electric-blue after:transition-all after:duration-300',
                pathname === item.path
                  ? 'text-electric-blue after:w-full'
                  : 'text-white hover:text-electric-blue after:w-0 hover:after:w-full'
              )}
            >
              {item.label}
            </button>
          ))}
        </nav>

        {/* Action Call Trigger */}
        <div className="flex items-center gap-4">
          <button
            onClick={() => go('/contact')}
            className="hidden sm:block bg-electric-blue text-white px-6 py-2.5 uppercase tracking-widest font-oswald font-bold text-xs hover:bg-blue-600 hover:text-white hover:scale-105 active:scale-95 transition-all duration-200 rounded-none shadow-sm"
          >
            GET QUOTE
          </button>
          <button
            className="md:hidden text-white"
            onClick={() => setMobileMenuOpen((v) => !v)}
            aria-label="Toggle mobile menu"
          >
            {mobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div
          ref={mobileMenuRef}
          className="md:hidden bg-baumeister-charcoal border-b border-white/10 px-6 py-8"
        >
          <div className="flex flex-col gap-6">
            {navItems.map((item) => (
              <button
                key={item.path}
                onClick={() => go(item.path)}
                className={cn(
                  'font-oswald font-bold uppercase tracking-widest text-sm text-left py-1',
                  pathname === item.path ? 'text-electric-blue' : 'text-slate-350'
                )}
              >
                {item.label}
              </button>
            ))}
            <button
              onClick={() => go('/contact')}
              className="bg-electric-blue text-white px-6 py-3 uppercase tracking-widest font-oswald font-bold text-xs text-center rounded-none shadow-md"
            >
              GET QUOTE
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

export const Footer = () => {
  const navigate = useNavigate();

  const go = (path: string) => {
    navigate(path);
    window.scrollTo(0, 0);
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#121315] border-t border-white/5 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Top row */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 pb-12 border-b border-white/10">
          {/* Brand */}
          <div className="md:col-span-1">
            <button onClick={() => go('/')} className="flex items-center gap-3 mb-4 group text-left">
              <div className="w-8 h-8 bg-electric-blue rounded-none flex items-center justify-center">
                <Factory className="text-white w-4 h-4" />
              </div>
              <span className="text-white font-oswald font-bold uppercase tracking-wider text-sm">
                SRIKALA <span className="text-electric-blue group-hover:text-white transition-colors duration-300">PROJECTS</span>
              </span>
            </button>
            <p className="text-slate-500 text-sm leading-relaxed">
              Four decades of defining industrial standards through precision and structural integrity.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="text-white font-oswald font-bold uppercase tracking-widest text-xs mb-6">Navigation</h4>
            <ul className="space-y-3">
              {navItems.map((item) => (
                <li key={item.path}>
                  <button
                    onClick={() => go(item.path)}
                    className="relative text-slate-500 hover:text-electric-blue transition-colors text-sm after:content-[''] after:absolute after:-bottom-1 after:left-0 after:w-0 hover:after:w-full after:h-[1px] after:bg-electric-blue after:transition-all after:duration-300"
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-white font-oswald font-bold uppercase tracking-widest text-xs mb-6">Services</h4>
            <ul className="space-y-3">
              {['uPVC Windows & Doors', 'Pre-Engineered Buildings', 'Roofing Systems', 'Heavy Fabrication', 'ACP Cladding', 'Structural Glazing'].map((s) => (
                <li key={s}>
                  <button
                    onClick={() => go('/solutions')}
                    className="relative text-slate-500 hover:text-electric-blue transition-colors text-sm text-left w-fit after:content-[''] after:absolute after:-bottom-1 after:left-0 after:w-0 hover:after:w-full after:h-[1px] after:bg-electric-blue after:transition-all after:duration-300"
                  >
                    {s}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-oswald font-bold uppercase tracking-widest text-xs mb-6">Contact</h4>
            <ul className="space-y-4">
              <li>
                <p className="text-[10px] text-slate-650 uppercase tracking-widest mb-1">Phone</p>
                <a href="tel:+919866089771" className="text-slate-450 hover:text-electric-blue transition-colors text-sm font-medium">
                  +91 98660 89771
                </a>
              </li>
              <li>
                <p className="text-[10px] text-slate-650 uppercase tracking-widest mb-1">Email</p>
                <a href="mailto:sales@srikalaprojects.com" className="text-slate-450 hover:text-electric-blue transition-colors text-sm font-medium">
                  sales@srikalaprojects.com
                </a>
              </li>
              <li>
                <p className="text-[10px] text-slate-650 uppercase tracking-widest mb-1">Address</p>
                <a 
                  href="https://maps.app.goo.gl/8CgULSLTmw5RoYWv7" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-slate-450 hover:text-electric-blue transition-colors text-sm block leading-relaxed"
                >
                  Srikala Projects, Mamidipally,<br />
                  Hyderabad, Telangana, India - 501359
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom row */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 pt-8">
          <p className="text-[10px] uppercase tracking-wider text-slate-600">
            © {currentYear} Srikala Projects. Engineered to Last.
          </p>
          <div className="flex gap-6">
            {['Privacy Policy', 'Terms of Service', 'Compliance'].map((link) => (
              <a
                key={link}
                href="#"
                className="text-[10px] uppercase tracking-wider text-slate-600 hover:text-electric-blue transition-colors"
              >
                {link}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export const PageWrapper = ({ children }: { children: React.ReactNode }) => {
  const { pathname } = useLocation();
  const isHome = pathname === '/';

  return (
    <div className={cn("min-h-screen", isHome ? "pt-0" : "pt-16 lg:pt-26")}>
      {children}
    </div>
  );
};
