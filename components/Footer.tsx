
import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="py-12 px-8 mt-20 border-t border-white/10 flex flex-col items-center">
      <div className="text-[10px] uppercase tracking-[0.4em] text-gray-600 mb-4">
        Ehrlichkeit . Wahrheit . Fotografie
      </div>
      <p className="text-xs text-gray-500 text-center">
        Powered by Gemini AI . Search & Maps Grounding Enabled . 2024
      </p>
    </footer>
  );
};

export default Footer;
