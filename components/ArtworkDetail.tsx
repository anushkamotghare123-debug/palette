
import React from 'react';
import { Artwork, Review } from '../types';

interface ArtworkDetailProps {
  artwork: Artwork;
  reviews: Review[];
  onBack: () => void;
  onPurchase: (artwork: Artwork) => void;
  isFavorited: boolean;
  onToggleFavorite: (artwork: Artwork) => void;
}

const ArtworkDetail: React.FC<ArtworkDetailProps> = ({ 
  artwork, 
  reviews, 
  onBack, 
  onPurchase,
  isFavorited,
  onToggleFavorite
}) => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <button 
        onClick={onBack}
        className="mb-8 flex items-center gap-2 text-[#8B9A7A] hover:text-[#5D6D4E] transition-colors group"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        <span className="font-semibold text-sm tracking-wide">BACK TO GALLERY</span>
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
        {/* Left: Image */}
        <div className="space-y-6">
          <div className="rounded-[40px] overflow-hidden bg-white shadow-2xl shadow-[#E5D3B3]/20 border border-[#E5D3B3]/30">
            <img src={artwork.imageUrl} alt={artwork.title} className="w-full object-cover" />
          </div>
          
          <div className="bg-[#E7F0DC]/30 p-8 rounded-[32px] border border-[#E7F0DC]">
            <h3 className="text-[#3E4A35] font-bold mb-4 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#8B9A7A]" />
              STORY BEHIND THE PIECE
            </h3>
            <p className="text-[#5D6D4E]/80 leading-relaxed italic">
              "{artwork.description}"
            </p>
          </div>
        </div>

        {/* Right: Info */}
        <div className="flex flex-col">
          <div className="mb-2">
            <span className="text-[#8B9A7A] font-bold text-xs tracking-[0.2em] uppercase">{artwork.category}</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-[#3E4A35] mb-4 leading-tight">{artwork.title}</h1>
          
          <div className="flex items-center gap-4 mb-8">
            <div className="w-12 h-12 rounded-full bg-[#E5D3B3] overflow-hidden border-2 border-white shadow-sm">
              <img src={`https://i.pravatar.cc/100?u=${artwork.artistId}`} alt={artwork.artistName} />
            </div>
            <div>
              <p className="text-xs text-[#8B9A7A] font-bold tracking-wider uppercase">Created By</p>
              <p className="text-lg font-bold text-[#3E4A35]">{artwork.artistName}</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-8 py-8 border-y border-[#E5D3B3]/40 mb-8">
            <div>
              <p className="text-xs text-[#8B9A7A] font-bold tracking-wider uppercase mb-1">Medium</p>
              <p className="text-md font-medium text-[#5D6D4E]">{artwork.medium}</p>
            </div>
            <div>
              <p className="text-xs text-[#8B9A7A] font-bold tracking-wider uppercase mb-1">Dimensions</p>
              <p className="text-md font-medium text-[#5D6D4E]">{artwork.dimensions}</p>
            </div>
          </div>

          <div className="flex items-end justify-between mb-10 gap-4">
            <div>
              <p className="text-xs text-[#8B9A7A] font-bold tracking-wider uppercase mb-2">Price</p>
              <p className="text-4xl font-black text-[#3E4A35]">${artwork.price}</p>
            </div>
            <div className="flex gap-3">
              <button 
                onClick={() => onToggleFavorite(artwork)}
                className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-all border-2 ${
                  isFavorited 
                  ? 'bg-rose-50 border-rose-200 text-rose-500 shadow-lg shadow-rose-100' 
                  : 'bg-white border-[#E5D3B3]/40 text-[#8B9A7A] hover:border-[#8B9A7A] hover:text-[#5D6D4E]'
                }`}
                aria-label={isFavorited ? "Remove from favorites" : "Add to favorites"}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className={`h-6 w-6 transition-transform ${isFavorited ? 'scale-110' : 'group-hover:scale-110'}`} fill={isFavorited ? "currentColor" : "none"} viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </button>
              <button 
                onClick={() => onPurchase(artwork)}
                disabled={artwork.status !== 'AVAILABLE'}
                className={`px-12 py-4 rounded-2xl font-bold transition-all shadow-xl shadow-indigo-100 ${
                  artwork.status === 'AVAILABLE' 
                  ? 'bg-indigo-600 text-white hover:bg-indigo-700 hover:-translate-y-1' 
                  : 'bg-slate-200 text-slate-500 cursor-not-allowed'
                }`}
              >
                {artwork.status === 'AVAILABLE' ? 'PURCHASE NOW' : 'OUT OF STOCK'}
              </button>
            </div>
          </div>

          {/* Reviews */}
          <div className="mt-auto pt-8">
            <h4 className="text-[#3E4A35] font-bold mb-6 flex items-center gap-2">
              REVIEWS ({reviews.length})
            </h4>
            <div className="space-y-4">
              {reviews.map(review => (
                <div key={review.id} className="bg-white/50 p-6 rounded-3xl border border-[#E5D3B3]/20">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-bold text-sm text-[#3E4A35]">{review.userName}</span>
                    <div className="flex gap-0.5">
                      {[...Array(5)].map((_, i) => (
                        <span key={i} className={`text-xs ${i < review.rating ? 'text-amber-400' : 'text-slate-200'}`}>★</span>
                      ))}
                    </div>
                  </div>
                  <p className="text-[#5D6D4E] text-sm italic">"{review.comment}"</p>
                </div>
              ))}
              {reviews.length === 0 && (
                <p className="text-[#8B9A7A] text-sm italic">No reviews yet for this piece.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArtworkDetail;
