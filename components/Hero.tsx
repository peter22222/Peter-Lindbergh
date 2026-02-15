
import React from 'react';

const Hero: React.FC = () => {
  return (
    <section className="relative h-[60vh] mb-16 overflow-hidden flex items-center justify-center group">
      <img 
        src="https://picsum.photos/seed/lindbergh/1200/800?grayscale" 
        alt="Peter Lindbergh Style" 
        className="absolute inset-0 w-full h-full object-cover opacity-60 transition-transform duration-700 group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>
      <div className="relative z-10 text-center px-4">
        <h1 className="text-5xl md:text-7xl lg:text-8xl mb-4 leading-tight">Die Freiheit der Unvollkommenheit</h1>
        <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto font-light italic">
          "Die Verantwortung der Fotografen heute sollte es sein, die Frauen und schließlich alle von dem Terror der Jugend und der Perfektion zu befreien."
        </p>
      </div>
    </section>
  );
};

export default Hero;
