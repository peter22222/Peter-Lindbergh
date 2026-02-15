
import React, { useState } from 'react';

interface Props {
  onSearch: (query: string) => void;
}

const SearchBar: React.FC<Props> = ({ onSearch }) => {
  const [query, setQuery] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="relative max-w-2xl mx-auto group">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Frage etwas über Peter Lindbergh..."
        className="w-full bg-transparent border-b border-white/20 py-4 px-2 text-xl focus:outline-none focus:border-white transition-colors placeholder:text-gray-700"
      />
      <button 
        type="submit"
        className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white transition-colors"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      </button>
      <div className="mt-2 flex gap-2 overflow-x-auto pb-2 no-scrollbar">
        {["Welche Nikon Kamera?", "Warum Schwarz-Weiß?", "Retusche Verbot", "Erstes Vogue Cover"].map(suggestion => (
          <button
            key={suggestion}
            type="button"
            onClick={() => {
              setQuery(suggestion);
              onSearch(suggestion);
            }}
            className="text-[10px] uppercase tracking-widest border border-white/10 px-3 py-1 hover:bg-white hover:text-black transition-all"
          >
            {suggestion}
          </button>
        ))}
      </div>
    </form>
  );
};

export default SearchBar;
