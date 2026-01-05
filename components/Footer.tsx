import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="w-full py-8 border-t border-white/5 bg-canvas text-center">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4">
        <span className="text-xs text-secondary tracking-widest">© 2024 FALLYN</span>
        <div className="flex gap-6">
            <a href="#" className="text-xs text-secondary hover:text-white transition-colors">Terms</a>
            <a href="#" className="text-xs text-secondary hover:text-white transition-colors">Privacy</a>
            <a href="#" className="text-xs text-secondary hover:text-white transition-colors">Contact</a>
        </div>
      </div>
    </footer>
  );
};