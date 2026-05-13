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
import NotFound from './NotFound';

const pageTitles: Record<string, string> = {
  '/':          'Home | Precision Engineering',
  '/about':     'About Us | Precision Engineering',
  '/solutions': 'Solutions | Precision Engineering',
  '/clients':   'Clients | Precision Engineering',
  '/contact':   'Contact | Precision Engineering',
};

export default function App() {
  const location = useLocation();

  // Update document title on every route change
  useEffect(() => {
    document.title = pageTitles[location.pathname] ?? 'Precision Engineering';
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
