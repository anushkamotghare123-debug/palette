
import React, { useState, useMemo } from 'react';
import Navbar from './components/Navbar';
import ArtCard from './components/ArtCard';
import ArtworkDetail from './components/ArtworkDetail';
import Dashboard from './components/Dashboard';
import { UserRole, Artwork } from './types';
import { MOCK_ARTWORKS, CATEGORIES, MOCK_REVIEWS } from './constants';
import { semanticArtSearch } from './services/geminiService';

const App: React.FC = () => {
  const [currentRole, setCurrentRole] = useState<UserRole>('BUYER');
  const [currentView, setCurrentView] = useState<'GALLERY' | 'DASHBOARD' | 'DETAIL'>('GALLERY');
  const [selectedArtwork, setSelectedArtwork] = useState<Artwork | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [aiSearchResults, setAiSearchResults] = useState<string[] | null>(null);
  const [isSearching, setIsSearching] = useState(false);
  const [favorites, setFavorites] = useState<Set<string>>(new Set());

  const handleAISearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) {
      setAiSearchResults(null);
      return;
    }
    setIsSearching(true);
    const resultIds = await semanticArtSearch(searchQuery, MOCK_ARTWORKS);
    setAiSearchResults(resultIds);
    setIsSearching(false);
  };

  const filteredArtworks = useMemo(() => {
    let list = MOCK_ARTWORKS;
    
    if (aiSearchResults) {
      list = list.filter(art => aiSearchResults.includes(art.id));
    } else if (searchQuery) {
      list = list.filter(art => 
        art.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
        art.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase())) ||
        art.medium.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (selectedCategory !== 'All') {
      list = list.filter(art => art.category === selectedCategory);
    }
    
    return list;
  }, [searchQuery, selectedCategory, aiSearchResults]);

  const navigateToDetail = (artwork: Artwork) => {
    setSelectedArtwork(artwork);
    setCurrentView('DETAIL');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const toggleFavorite = (artwork: Artwork) => {
    setFavorites(prev => {
      const next = new Set(prev);
      if (next.has(artwork.id)) {
        next.delete(artwork.id);
      } else {
        next.add(artwork.id);
      }
      return next;
    });
  };

  return (
    <div className="min-h-screen bg-[#FAF9F6] selection:bg-indigo-100 selection:text-indigo-900">
      <Navbar 
        currentRole={currentRole} 
        onRoleChange={setCurrentRole}
        onNavigate={(view) => {
          setCurrentView(view);
          setSelectedArtwork(null);
        }}
      />

      <main className="pb-32">
        {currentView === 'GALLERY' && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            {/* Hero Section */}
            <div className="text-center mb-24 space-y-6">
              <div className="inline-block px-4 py-1.5 rounded-full bg-[#E7F0DC] text-[#5D6D4E] text-[10px] font-bold tracking-[0.3em] uppercase mb-4 animate-in fade-in slide-in-from-bottom-2 duration-1000">
                EST. 2024 • ARTIST OWNED
              </div>
              <h1 className="text-6xl md:text-8xl font-black text-[#3E4A35] tracking-tight animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-100">
                A <span className="text-indigo-600 italic font-serif serif">calmer</span> way <br className="hidden md:block" /> to collect art.
              </h1>
              <p className="text-[#8B9A7A] text-xl max-w-2xl mx-auto font-medium animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-200">
                Connecting discerning collectors with independent artists through a minimal, mindful marketplace.
              </p>
            </div>

            {/* Search and Filters */}
            <div className="max-w-5xl mx-auto mb-20 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-300">
              <div className="bg-white p-6 rounded-[40px] shadow-2xl shadow-[#E5D3B3]/20 border border-[#E5D3B3]/30 flex flex-col lg:flex-row gap-6">
                <form onSubmit={handleAISearch} className="flex-1 relative group">
                  <input 
                    type="text" 
                    placeholder="Search by mood, color, or style... (Try: 'warm golden sunset')"
                    className="w-full h-16 pl-16 pr-6 bg-[#FAF9F6] rounded-[28px] border-none focus:ring-2 focus:ring-indigo-500 outline-none font-bold text-[#3E4A35] placeholder:text-[#A69984]/60 transition-all"
                    value={searchQuery}
                    onChange={(e) => {
                      setSearchQuery(e.target.value);
                      if (!e.target.value) setAiSearchResults(null);
                    }}
                  />
                  <div className="absolute left-6 top-1/2 -translate-y-1/2 text-[#8B9A7A] group-hover:scale-110 transition-transform">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </div>
                  {isSearching && (
                    <div className="absolute right-6 top-1/2 -translate-y-1/2">
                      <div className="animate-spin rounded-full h-5 w-5 border-2 border-indigo-600 border-t-transparent" />
                    </div>
                  )}
                </form>
                
                <div className="flex gap-2 items-center overflow-x-auto pb-2 lg:pb-0 scrollbar-hide">
                  <button 
                    onClick={() => setSelectedCategory('All')}
                    className={`px-8 h-16 rounded-[28px] font-black text-xs uppercase tracking-widest transition-all ${
                      selectedCategory === 'All' 
                      ? 'bg-[#3E4A35] text-white shadow-xl shadow-[#3E4A35]/20' 
                      : 'bg-[#FAF9F6] text-[#8B9A7A] hover:bg-[#E7F0DC]'
                    }`}
                  >
                    ALL
                  </button>
                  {CATEGORIES.map(cat => (
                    <button 
                      key={cat}
                      onClick={() => setSelectedCategory(cat)}
                      className={`px-8 h-16 rounded-[28px] font-black text-xs uppercase tracking-widest whitespace-nowrap transition-all ${
                        selectedCategory === cat
                        ? 'bg-[#3E4A35] text-white shadow-xl shadow-[#3E4A35]/20' 
                        : 'bg-[#FAF9F6] text-[#8B9A7A] hover:bg-[#E7F0DC]'
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-12 animate-in fade-in slide-in-from-bottom-12 duration-1000 delay-500">
              {filteredArtworks.map(art => (
                <ArtCard 
                  key={art.id} 
                  artwork={art} 
                  onViewDetails={navigateToDetail}
                />
              ))}
            </div>

            {filteredArtworks.length === 0 && (
              <div className="text-center py-32 bg-white rounded-[48px] border-2 border-dashed border-[#E5D3B3] animate-in fade-in duration-700">
                <div className="w-20 h-20 bg-[#FAF9F6] rounded-full flex items-center justify-center mx-auto mb-6 text-[#8B9A7A]">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 9.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-[#3E4A35] font-black text-2xl mb-2">No masterpieces found</h3>
                <p className="text-[#8B9A7A] mb-8 font-medium">Try broadening your search or choosing another category.</p>
                <button 
                  onClick={() => {setSearchQuery(''); setAiSearchResults(null); setSelectedCategory('All');}}
                  className="px-8 py-3 bg-[#E7F0DC] text-[#5D6D4E] font-black text-xs rounded-2xl tracking-[0.2em] uppercase hover:bg-[#C9DABF] transition-all"
                >
                  Clear Filters
                </button>
              </div>
            )}
          </div>
        )}

        {currentView === 'DETAIL' && selectedArtwork && (
          <ArtworkDetail 
            artwork={selectedArtwork}
            reviews={MOCK_REVIEWS.filter(r => r.artworkId === selectedArtwork.id)}
            onBack={() => setCurrentView('GALLERY')}
            onPurchase={(art) => alert(`Purchasing ${art.title} for $${art.price}`)}
            isFavorited={favorites.has(selectedArtwork.id)}
            onToggleFavorite={toggleFavorite}
          />
        )}

        {currentView === 'DASHBOARD' && (
          <Dashboard 
            role={currentRole} 
            userName={currentRole === 'BUYER' ? 'John Collector' : currentRole === 'ARTIST' ? 'Elena Vance' : 'System Admin'} 
          />
        )}
      </main>

      {/* Persistent CTA */}
      <div className="fixed bottom-10 right-10 z-50">
        <button 
          className="bg-slate-900 text-white h-16 px-10 rounded-[32px] shadow-2xl flex items-center justify-center gap-3 hover:scale-105 hover:-translate-y-1 transition-all group overflow-hidden relative"
          onClick={() => alert("Commission feature coming soon!")}
        >
          <div className="absolute inset-0 bg-gradient-to-tr from-indigo-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 relative z-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
          <span className="font-black text-xs tracking-widest uppercase relative z-10">Request Commission</span>
        </button>
      </div>

      <footer className="bg-white border-t border-[#E5D3B3]/20 py-24">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <div className="flex items-center justify-center gap-2 mb-8">
            <div className="w-8 h-8 bg-slate-900 rounded-lg flex items-center justify-center">
              <div className="w-4 h-4 bg-white rounded-sm rotate-45" />
            </div>
            <span className="text-xl font-black text-slate-900 tracking-tighter">PALETTE</span>
          </div>
          <p className="text-[#8B9A7A] text-sm font-medium mb-12 max-w-sm mx-auto">
            A sustainable art ecosystem empowering independent creators and passionate collectors.
          </p>
          <div className="flex justify-center gap-12 text-[10px] font-black uppercase tracking-[0.2em] text-[#A69984]">
            <a href="#" className="hover:text-indigo-600 transition-colors">Instagram</a>
            <a href="#" className="hover:text-indigo-600 transition-colors">Pinterest</a>
            <a href="#" className="hover:text-indigo-600 transition-colors">Journal</a>
            <a href="#" className="hover:text-indigo-600 transition-colors">Terms</a>
          </div>
          <p className="mt-16 text-[#A69984]/40 text-[10px] font-bold tracking-widest">© 2024 PALETTE COLLECTIVE</p>
        </div>
      </footer>
    </div>
  );
};

export default App;
