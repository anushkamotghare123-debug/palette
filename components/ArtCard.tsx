
import React from 'react';
import { Artwork } from '../types';

interface ArtCardProps {
  artwork: Artwork;
  onViewDetails: (artwork: Artwork) => void;
}

const ArtCard: React.FC<ArtCardProps> = ({ artwork, onViewDetails }) => {
  return (
    <div 
      className="bg-white rounded-3xl overflow-hidden group cursor-pointer border border-[#E5D3B3]/20 hover:border-[#8B9A7A]/40 transition-all duration-500 hover:-translate-y-1"
      onClick={() => onViewDetails(artwork)}
    >
      <div className="relative aspect-[4/5] overflow-hidden">
        <img 
          src={artwork.imageUrl} 
          alt={artwork.title}
          className="w-full h-full object-cover grayscale-[20%] group-hover:grayscale-0 transition-all duration-700 ease-out scale-[1.02] group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-500" />
        
        {artwork.status !== 'AVAILABLE' && (
          <div className="absolute top-4 left-4 bg-[#8B9A7A]/90 backdrop-blur text-white px-4 py-1.5 rounded-full text-[10px] font-bold tracking-widest uppercase">
            {artwork.status}
          </div>
        )}
        <div className="absolute bottom-4 right-4 bg-white/95 backdrop-blur text-[#5D6D4E] px-4 py-2 rounded-2xl text-xs font-bold shadow-sm opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
          ${artwork.price}
        </div>
      </div>
      
      <div className="p-6">
        <div className="flex justify-between items-start mb-1">
          <h3 className="font-semibold text-[#3E4A35] text-lg leading-tight">{artwork.title}</h3>
          <span className="text-[9px] uppercase tracking-widest font-bold text-[#8B9A7A]">
            {artwork.medium}
          </span>
        </div>
        <p className="text-[#8B9A7A] text-sm font-medium mb-3">by {artwork.artistName}</p>
        
        <div className="flex gap-2 flex-wrap">
          {artwork.tags.slice(0, 2).map(tag => (
            <span key={tag} className="text-[10px] text-[#A69984] bg-[#FAF9F6] px-2 py-0.5 rounded-md">
              #{tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ArtCard;
