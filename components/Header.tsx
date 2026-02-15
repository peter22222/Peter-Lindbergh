
import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="py-6 px-8 border-b border-white/10 flex justify-between items-center">
      <div className="text-xl font-bold tracking-[0.2em] uppercase">
        Peter <span className="font-light opacity-60">Lindbergh</span>
      </div>
      <div className="hidden md:block text-[10px] uppercase tracking-widest text-gray-500">
        Archiv der Wahrheit & Realität
      </div>
    </header>
  );
};

export default Header;
