import React, { useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import gsap from 'gsap';
import { Factory, Menu, X } from 'lucide-react';
import { cn } from '../lib/utils';
import { ReactLenis } from 'lenis/react';

const navItems = [
  { label: 'Home',      path: '/'          },
  { label: 'About',     path: '/about'     },
  { label: 'Solutions', path: '/solutions' },
  { label: 'Clients',   path: '/clients'   },
  { label: 'Contact',   path: '/contact'   },
];

export const Navbar = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  const [scrolled, setScrolled]             = React.useState(false);
  const mobileMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => { setMobileMenuOpen(false); }, [pathname]);

  useEffect(() => {
    if (mobileMenuOpen && mobileMenuRef.current) {
      gsap.fromTo(
        mobileMenuRef.current,
        { opacity: 0, y: -20 },
        { opacity: 1, y: 0, duration: 0.3, ease: 'power2.out' }
      );
    }
  }, [mobileMenuOpen]);

  const go = (path: string) => {
    navigate(path);
    window.scrollTo(0, 0);
  };

  return (
    <header
      className={cn(
        'fixed top-0 w-full z-50 border-b transition-all duration-500',
        scrolled
          ? 'bg-slate-950/95 backdrop-blur-lg border-white/20 shadow-2xl py-3'
          : 'bg-slate-950/80 backdrop-blur-md border-white/10 py-4'
      )}
    >
      <div className="flex justify-between items-center w-full px-6 md:px-12 max-w-7xl mx-auto">
        {/* Logo */}
        <button
          onClick={() => go('/')}
          className="flex items-center gap-4"
          aria-label="Go to homepage"
        >
          <div className="w-10 h-10 bg-electric-blue flex items-center justify-center rounded-sm">
            <Factory className="text-white w-6 h-6" />
          </div>
          <span className="text-xl font-black tracking-tighter text-white uppercase sm:block hidden">
            PRECISION ENG
          </span>
        </button>

        {/* Desktop nav */}
        <nav className="hidden md:flex gap-8 items-center" aria-label="Main navigation">
          {navItems.map((item) => (
            <button
              key={item.path}
              onClick={() => go(item.path)}
              className={cn(
                'relative font-medium uppercase tracking-widest text-xs transition-colors duration-200',
                'after:content-[""] after:absolute after:-bottom-1 after:left-0 after:h-[2px] after:bg-electric-blue after:transition-all after:duration-300',
                pathname === item.path
                  ? 'text-electric-blue after:w-full'
                  : 'text-slate-400 hover:text-white after:w-0 hover:after:w-full'
              )}
            >
              {item.label}
            </button>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <button
            onClick={() => go('/contact')}
            className="hidden sm:block bg-electric-blue text-white px-6 py-2 uppercase tracking-widest font-bold text-xs hover:bg-blue-600 transition-all active:scale-95"
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
          className="md:hidden bg-slate-950 border-b border-white/10 px-6 py-8"
        >
          <div className="flex flex-col gap-6">
            {navItems.map((item) => (
              <button
                key={item.path}
                onClick={() => go(item.path)}
                className={cn(
                  'font-medium uppercase tracking-widest text-sm text-left',
                  pathname === item.path ? 'text-electric-blue' : 'text-slate-400'
                )}
              >
                {item.label}
              </button>
            ))}
            <button
              onClick={() => go('/contact')}
              className="bg-electric-blue text-white px-6 py-3 uppercase tracking-widest font-bold text-xs"
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
    <footer className="bg-slate-950 border-t border-white/5 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Top row */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 pb-12 border-b border-white/10">
          {/* Brand */}
          <div className="md:col-span-1">
            <button onClick={() => go('/')} className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 bg-electric-blue rounded-sm flex items-center justify-center">
                <Factory className="text-white w-4 h-4" />
              </div>
              <span className="text-white font-bold uppercase tracking-widest text-sm">PRECISION ENG</span>
            </button>
            <p className="text-slate-500 text-sm leading-relaxed">
              Four decades of defining industrial standards through precision and structural integrity.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="text-white font-bold uppercase tracking-widest text-xs mb-6">Navigation</h4>
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
            <h4 className="text-white font-bold uppercase tracking-widest text-xs mb-6">Services</h4>
            <ul className="space-y-3">
              {['UPVC Solutions', 'Pre-Engineered Buildings', 'Roofing Systems', 'Heavy Fabrication', 'ACP Cladding', 'Structural Glazing'].map((s) => (
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
            <h4 className="text-white font-bold uppercase tracking-widest text-xs mb-6">Contact</h4>
            <ul className="space-y-4">
              <li>
                <p className="text-[10px] text-slate-600 uppercase tracking-widest mb-1">Phone</p>
                <a href="tel:+18005557737" className="text-slate-400 hover:text-electric-blue transition-colors text-sm">
                  +1 (800) 555-PRECISION
                </a>
              </li>
              <li>
                <p className="text-[10px] text-slate-600 uppercase tracking-widest mb-1">Email</p>
                <a href="mailto:eng@industrial-precision.com" className="text-slate-400 hover:text-electric-blue transition-colors text-sm">
                  eng@industrial-precision.com
                </a>
              </li>
              <li>
                <p className="text-[10px] text-slate-600 uppercase tracking-widest mb-1">Address</p>
                <p className="text-slate-400 text-sm">77 Engineering Blvd,<br />Chicago, IL 60601</p>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom row */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 pt-8">
          <p className="text-[10px] uppercase tracking-wider text-slate-600">
            © {currentYear} Industrial Precision Corp. Engineered to Last.
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
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // No-op
  }, []);

  return (
    <div ref={wrapperRef} className="min-h-screen pt-16">
      {children}
    </div>
  );
};
