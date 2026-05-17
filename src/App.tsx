import React, { useEffect } from 'react';
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import { Navbar, Footer } from './components/Shared';
import { ScrollToTop } from './components/ScrollToTop';
import { AccessibilityWidget } from './components/AccessibilityWidget';
import Home from './Home';
import About from './About';
import Solutions from './Solutions';
import Clients from './Clients';
import Contact from './Contact';
import UPVC from './UPVC';
import NotFound from './NotFound';

const pageTitles: Record<string, string> = {
  '/':          'Home | Srikala Projects',
  '/about':     'About Us | Srikala Projects',
  '/solutions': 'Solutions | Srikala Projects',
  '/upvc':      'UPVC Solutions | Srikala Projects',
  '/clients':   'Clients | Srikala Projects',
  '/contact':   'Contact | Srikala Projects',
};

export default function App() {
  const location = useLocation();

  // Update document title on every route change
  useEffect(() => {
    document.title = pageTitles[location.pathname] ?? 'Srikala Projects';
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <div className="flex flex-col min-h-screen bg-surface selection:bg-electric-blue/20 selection:text-electric-blue">
      <Navbar />

      <main className="flex-grow">
        <Routes>
          <Route path="/"          element={<Home />} />
          <Route path="/about"     element={<About />} />
          <Route path="/solutions" element={<Solutions />} />
          <Route path="/upvc"      element={<UPVC />} />
          <Route path="/clients"   element={<Clients />} />
          <Route path="/contact"   element={<Contact />} />
          <Route path="*"          element={<NotFound />} />
        </Routes>
      </main>

      <ScrollToTop />
      <AccessibilityWidget />

      <Footer />
    </div>
  );
}
