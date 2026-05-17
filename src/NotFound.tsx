import React from 'react';
import { useNavigate } from 'react-router-dom';
import { PageWrapper } from './components/Shared';
import { ArrowLeft } from 'lucide-react';

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <PageWrapper>
      <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-6">
        <span className="text-[10px] font-bold text-electric-blue uppercase tracking-widest mb-4">Error 404</span>
        <h1 className="text-8xl md:text-[160px] font-black text-slate-100 leading-none select-none">404</h1>
        <h2 className="text-3xl font-bold uppercase tracking-tight text-primary mt-4 mb-4">Page Not Found</h2>
        <p className="text-slate-500 max-w-md mb-10">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <button
          onClick={() => navigate('/')}
          className="flex items-center gap-3 bg-electric-blue text-white px-10 py-4 text-xs font-bold uppercase tracking-widest hover:bg-slate-900 transition-all"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Home
        </button>
      </div>
    </PageWrapper>
  );
}
