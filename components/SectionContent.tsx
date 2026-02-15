
import React from 'react';
import { AIResponse, SectionType } from '../types';

interface Props {
  content: AIResponse;
  section: SectionType;
}

const SectionContent: React.FC<Props> = ({ content, section }) => {
  // Simple markdown-ish bolding helper
  const formatText = (text: string) => {
    return text.split('\n').map((line, i) => {
      const bolded = line.replace(/\*\*(.*?)\*\*/g, '<strong class="text-white font-semibold">$1</strong>');
      if (line.trim().startsWith('-')) {
        return <li key={i} className="mb-2 list-none pl-4 border-l border-white/20" dangerouslySetInnerHTML={{ __html: bolded.substring(1) }} />;
      }
      return <p key={i} className="mb-4 leading-relaxed text-gray-300" dangerouslySetInnerHTML={{ __html: bolded }} />;
    });
  };

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
        <div className="md:col-span-2 prose prose-invert max-w-none">
          <div className="text-lg leading-relaxed first-letter:text-5xl first-letter:font-serif first-letter:mr-3 first-letter:float-left">
            {formatText(content.text)}
          </div>
        </div>
        
        <div className="md:col-span-1">
          <div className="sticky top-24 space-y-8">
            <div className="p-6 border border-white/10 bg-white/5 rounded-sm">
              <h4 className="text-xs uppercase tracking-widest text-gray-500 mb-4">Referenzen & Quellen</h4>
              <ul className="space-y-3">
                {content.sources.length > 0 ? (
                  content.sources.map((src, i) => (
                    <li key={i}>
                      <a 
                        href={src.web?.uri || src.maps?.uri} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-sm text-gray-400 hover:text-white transition-colors block border-b border-white/5 pb-2"
                      >
                        {src.web?.title || src.maps?.title || "Quelle " + (i+1)}
                        <span className="block text-[10px] opacity-40 truncate">{src.web?.uri || src.maps?.uri}</span>
                      </a>
                    </li>
                  ))
                ) : (
                  <li className="text-xs text-gray-600 italic">KI-generiertes Wissen ohne direkte Web-Links</li>
                )}
              </ul>
            </div>

            {section === SectionType.DIGITAL && (
              <div className="p-6 border border-white/10 bg-white/5 rounded-sm">
                <h4 className="text-xs uppercase tracking-widest text-gray-500 mb-4">Work-Tool Insight</h4>
                <p className="text-sm text-gray-400 leading-relaxed italic">
                  Lindbergh nutzte Capture One nicht für die Verfremdung, sondern um den filmähnlichen Look (Kodak Tri-X / T-Max) digital zu emulieren.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SectionContent;
