
import React, { useState, useEffect, useCallback } from 'react';
import { getLindberghInfo } from './services/geminiService';
import { AIResponse, SectionType } from './types';
import Header from './components/Header';
import Hero from './components/Hero';
import SectionContent from './components/SectionContent';
import SearchBar from './components/SearchBar';
import Footer from './components/Footer';

const App: React.FC = () => {
  const [activeSection, setActiveSection] = useState<SectionType>(SectionType.PROCESS);
  const [loading, setLoading] = useState<boolean>(false);
  const [content, setContent] = useState<AIResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  const fetchContent = useCallback(async (section: SectionType) => {
    setLoading(true);
    setError(null);
    let query = "";
    let useMaps = false;

    switch (section) {
      case SectionType.PROCESS:
        query = "Erkläre detailliert den fotografischen Ablauf von Peter Lindbergh. Wie hat er am Set gearbeitet? Welches Equipment (Nikon, Filme wie Kodak Tri-X) hat er bevorzugt? Fokus auf seine Interaktion mit Models.";
        break;
      case SectionType.PHILOSOPHY:
        query = "Warum hat Peter Lindbergh so fotografiert, wie er es tat? Was war seine Philosophie bezüglich Realismus, Retusche und der Definition von Schönheit bei Frauen? Erwähne den Wendepunkt 1988 mit dem White Shirts Shooting.";
        break;
      case SectionType.DIGITAL:
        query = "Welche Software und digitalen Workflows hat Peter Lindbergh nach dem Umstieg auf Digitalfotografie genutzt? Erwähne Capture One, Phocus und seine spezifischen Anweisungen an Retuscheure (oder das Verbot derselben).";
        break;
      case SectionType.MAPS:
        query = "Wo finden aktuell oder permanent Ausstellungen von Peter Lindbergh statt? Welche Orte (z.B. Le Touquet, Paris, Berlin) waren für sein Werk prägend? Nutze Google Maps für Standorte.";
        useMaps = true;
        break;
    }

    try {
      const result = await getLindberghInfo(query, useMaps);
      setContent(result);
    } catch (err) {
      setError("Fehler beim Laden der Informationen. Bitte versuchen Sie es später erneut.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchContent(activeSection);
  }, [activeSection, fetchContent]);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow container mx-auto px-4 py-8 max-w-5xl">
        <Hero />
        
        <div className="sticky top-0 z-40 bg-black/80 backdrop-blur-md py-4 mb-8 border-b border-white/10">
          <nav className="flex flex-wrap justify-center gap-4 sm:gap-8">
            {[
              { id: SectionType.PROCESS, label: "Ablauf & Technik" },
              { id: SectionType.PHILOSOPHY, label: "Die Philosophie" },
              { id: SectionType.DIGITAL, label: "Digitaler Workflow" },
              { id: SectionType.MAPS, label: "Orte & Ausstellungen" }
            ].map((nav) => (
              <button
                key={nav.id}
                onClick={() => setActiveSection(nav.id)}
                className={`text-sm uppercase tracking-widest transition-all duration-300 ${
                  activeSection === nav.id 
                    ? "text-white border-b border-white pb-1" 
                    : "text-gray-500 hover:text-gray-300"
                }`}
              >
                {nav.label}
              </button>
            ))}
          </nav>
        </div>

        <div className="min-h-[400px]">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-20 animate-pulse">
              <div className="w-12 h-12 border-2 border-white/20 border-t-white rounded-full animate-spin mb-4"></div>
              <p className="text-gray-400 uppercase tracking-widest text-xs">Entwickle Einblicke...</p>
            </div>
          ) : error ? (
            <div className="text-red-400 text-center py-20 border border-red-900/50 bg-red-900/10 rounded-lg">
              {error}
            </div>
          ) : (
            content && <SectionContent content={content} section={activeSection} />
          )}
        </div>

        <div className="mt-20 pt-10 border-t border-white/10">
          <h3 className="text-2xl mb-6 text-center italic">Haben Sie spezifische Fragen zu Lindberghs Werk?</h3>
          <SearchBar onSearch={(q) => {
            setLoading(true);
            getLindberghInfo(q, false).then(res => {
              setContent(res);
              setLoading(false);
            });
          }} />
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default App;
