
import React, { useState } from 'react';
import { UserRole, Artwork, Order, Commission } from '../types';
import { MOCK_ARTWORKS, CATEGORIES, MEDIUMS } from '../constants';
import { generateArtDescription } from '../services/geminiService';

interface DashboardProps {
  role: UserRole;
  userName: string;
}

const Dashboard: React.FC<DashboardProps> = ({ role, userName }) => {
  const [activeTab, setActiveTab] = useState<'OVERVIEW' | 'PORTFOLIO' | 'ORDERS' | 'COMMISSIONS'>('OVERVIEW');
  const [isGenerating, setIsGenerating] = useState(false);
  const [newArt, setNewArt] = useState({ 
    title: '', 
    category: 'Oil Painting', 
    medium: 'Canvas',
    style: '', 
    description: '',
    price: '',
    dimensions: ''
  });

  const [commissions, setCommissions] = useState<Commission[]>([
    {
      id: 'c1',
      buyerId: 'b1',
      buyerName: 'John Collector',
      artistId: 'a1',
      title: 'Family Portrait in Sage',
      requirements: 'A classic 18x24 portrait of 4 people in a minimalist outdoor setting.',
      budget: 1500,
      deadline: '2024-05-20',
      status: 'PENDING',
      createdAt: '2024-02-10'
    }
  ]);

  const handleUpdateCommissionStatus = (id: string, status: Commission['status']) => {
    setCommissions(prev => prev.map(c => c.id === id ? { ...c, status } : c));
  };

  const handleGenerateDesc = async () => {
    if (!newArt.title || !newArt.style) return;
    setIsGenerating(true);
    const desc = await generateArtDescription(newArt.title, newArt.category, newArt.style);
    setNewArt(prev => ({ ...prev, description: desc }));
    setIsGenerating(false);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="bg-[#FAF9F6] border border-[#E5D3B3] rounded-[48px] p-10 shadow-sm">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-6">
          <div>
            <h1 className="text-4xl font-black text-[#3E4A35]">Dashboard</h1>
            <p className="text-[#8B9A7A] font-medium">Hello, {userName}. Here's what's happening today.</p>
          </div>
          <div className="flex gap-1 bg-[#E7F0DC] p-1.5 rounded-2xl">
            {(['OVERVIEW', 'PORTFOLIO', 'ORDERS', 'COMMISSIONS'] as const).map(tab => {
              if (role !== 'ARTIST' && tab === 'PORTFOLIO') return null;
              return (
                <button 
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-6 py-2.5 rounded-xl text-xs font-bold transition-all uppercase tracking-widest ${
                    activeTab === tab ? 'bg-white shadow-sm text-indigo-600' : 'text-[#8B9A7A] hover:text-[#5D6D4E]'
                  }`}
                >
                  {tab}
                </button>
              );
            })}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-10">
          <div className="lg:col-span-3">
            {activeTab === 'OVERVIEW' && (
              <div className="space-y-10">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                  <div className="bg-white p-8 rounded-[32px] border border-[#E5D3B3]/40">
                    <p className="text-[#8B9A7A] text-[10px] font-bold uppercase tracking-widest mb-2">Total Earnings</p>
                    <p className="text-3xl font-black text-[#3E4A35]">$4,850</p>
                  </div>
                  <div className="bg-white p-8 rounded-[32px] border border-[#E5D3B3]/40">
                    <p className="text-[#8B9A7A] text-[10px] font-bold uppercase tracking-widest mb-2">Profile Views</p>
                    <p className="text-3xl font-black text-[#3E4A35]">1.2k</p>
                  </div>
                  <div className="bg-white p-8 rounded-[32px] border border-[#E5D3B3]/40">
                    <p className="text-[#8B9A7A] text-[10px] font-bold uppercase tracking-widest mb-2">Completion Rate</p>
                    <p className="text-3xl font-black text-[#3E4A35]">98%</p>
                  </div>
                </div>

                <div className="bg-white p-10 rounded-[40px] border border-[#E5D3B3]/40">
                  <h2 className="text-xl font-black text-[#3E4A35] mb-8">Recent Notifications</h2>
                  <div className="space-y-6">
                    {[1, 2].map(i => (
                      <div key={i} className="flex items-start gap-5 p-4 rounded-2xl hover:bg-[#FAF9F6] transition-colors">
                        <div className="w-12 h-12 rounded-2xl bg-[#E7F0DC] flex items-center justify-center text-[#5D6D4E]">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                          </svg>
                        </div>
                        <div className="flex-1">
                          <p className="text-md font-bold text-[#3E4A35]">New Commission Request</p>
                          <p className="text-sm text-[#8B9A7A]">John Collector wants a "Family Portrait in Sage"</p>
                        </div>
                        <span className="text-xs font-bold text-[#A69984]">2m ago</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'PORTFOLIO' && role === 'ARTIST' && (
              <div className="bg-white p-10 rounded-[40px] border border-[#E5D3B3]/40 space-y-10">
                <div className="flex justify-between items-center">
                  <h2 className="text-2xl font-black text-[#3E4A35]">Upload New Masterpiece</h2>
                  <span className="text-[10px] font-bold text-[#8B9A7A] bg-[#FAF9F6] px-4 py-1 rounded-full uppercase tracking-widest">Draft Saved 12:45 PM</span>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-6">
                    <div>
                      <label className="block text-[10px] font-bold text-[#8B9A7A] uppercase tracking-widest mb-2">Title</label>
                      <input 
                        type="text" 
                        className="w-full px-6 py-4 rounded-2xl bg-[#FAF9F6] border-none focus:ring-2 focus:ring-indigo-500 font-bold text-[#3E4A35]"
                        placeholder="Artwork name"
                        value={newArt.title}
                        onChange={e => setNewArt({...newArt, title: e.target.value})}
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[10px] font-bold text-[#8B9A7A] uppercase tracking-widest mb-2">Category</label>
                        <select className="w-full px-6 py-4 rounded-2xl bg-[#FAF9F6] border-none focus:ring-2 focus:ring-indigo-500 font-bold text-[#3E4A35]">
                          {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                        </select>
                      </div>
                      <div>
                        <label className="block text-[10px] font-bold text-[#8B9A7A] uppercase tracking-widest mb-2">Medium</label>
                        <select className="w-full px-6 py-4 rounded-2xl bg-[#FAF9F6] border-none focus:ring-2 focus:ring-indigo-500 font-bold text-[#3E4A35]">
                          {MEDIUMS.map(m => <option key={m} value={m}>{m}</option>)}
                        </select>
                      </div>
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-[#8B9A7A] uppercase tracking-widest mb-2">Visual Style (for AI Help)</label>
                      <input 
                        type="text" 
                        className="w-full px-6 py-4 rounded-2xl bg-[#FAF9F6] border-none focus:ring-2 focus:ring-indigo-500 font-bold text-[#3E4A35]"
                        placeholder="e.g. moody, pastel, sharp"
                        value={newArt.style}
                        onChange={e => setNewArt({...newArt, style: e.target.value})}
                      />
                    </div>
                  </div>

                  <div className="space-y-6">
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <label className="block text-[10px] font-bold text-[#8B9A7A] uppercase tracking-widest">Description</label>
                        <button 
                          onClick={handleGenerateDesc}
                          disabled={isGenerating}
                          className="text-[10px] font-bold text-indigo-600 hover:text-indigo-800 tracking-widest uppercase"
                        >
                          {isGenerating ? 'AI Thinking...' : '✨ Use Magic AI'}
                        </button>
                      </div>
                      <textarea 
                        rows={6}
                        className="w-full px-6 py-4 rounded-2xl bg-[#FAF9F6] border-none focus:ring-2 focus:ring-indigo-500 font-medium text-[#5D6D4E]"
                        placeholder="Tell the story of this piece..."
                        value={newArt.description}
                        onChange={e => setNewArt({...newArt, description: e.target.value})}
                      />
                    </div>
                  </div>
                </div>

                <div className="border-4 border-dashed border-[#E7F0DC] rounded-[32px] p-16 text-center hover:bg-[#E7F0DC]/20 transition-all cursor-pointer group">
                  <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm group-hover:scale-110 transition-transform">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-[#8B9A7A]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <p className="text-[#3E4A35] font-black text-xl mb-1">Upload high-res imagery</p>
                  <p className="text-[#8B9A7A] font-medium">PNG, JPG or TIFF up to 50MB</p>
                </div>

                <div className="flex justify-end pt-6 border-t border-[#FAF9F6]">
                  <button className="bg-indigo-600 text-white px-12 py-4 rounded-2xl font-black text-sm tracking-widest uppercase hover:bg-indigo-700 transition-all shadow-xl shadow-indigo-100">
                    Publish to Gallery
                  </button>
                </div>
              </div>
            )}

            {activeTab === 'ORDERS' && (
              <div className="bg-white p-10 rounded-[40px] border border-[#E5D3B3]/40">
                <h2 className="text-2xl font-black text-[#3E4A35] mb-8">Recent Sales</h2>
                <div className="overflow-x-auto">
                  <table className="w-full text-left">
                    <thead>
                      <tr className="border-b border-[#FAF9F6] text-[10px] text-[#8B9A7A] font-black uppercase tracking-[0.2em]">
                        <th className="pb-6">Item</th>
                        <th className="pb-6">Price</th>
                        <th className="pb-6">Status</th>
                        <th className="pb-6">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#FAF9F6]">
                      {MOCK_ARTWORKS.filter(a => a.status === 'SOLD').map(art => (
                        <tr key={art.id} className="group hover:bg-[#FAF9F6] transition-colors">
                          <td className="py-6">
                            <div className="flex items-center gap-4">
                              <img src={art.imageUrl} className="w-12 h-12 rounded-xl object-cover" />
                              <span className="font-bold text-[#3E4A35]">{art.title}</span>
                            </div>
                          </td>
                          <td className="py-6 font-black text-[#3E4A35]">${art.price}</td>
                          <td className="py-6">
                            <span className="bg-[#E7F0DC] text-[#5D6D4E] px-4 py-1.5 rounded-full text-[10px] font-black tracking-widest">DELIVERED</span>
                          </td>
                          <td className="py-6">
                            <button className="text-[10px] font-black text-indigo-600 hover:underline uppercase tracking-widest">Details</button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {activeTab === 'COMMISSIONS' && (
              <div className="bg-white p-10 rounded-[40px] border border-[#E5D3B3]/40 space-y-8">
                <h2 className="text-2xl font-black text-[#3E4A35] mb-4">Commission Requests</h2>
                {commissions.map(c => (
                  <div key={c.id} className="p-8 rounded-[32px] border border-[#E5D3B3]/40 bg-[#FAF9F6]/50">
                    <div className="flex justify-between items-start mb-6">
                      <div>
                        <h3 className="text-xl font-black text-[#3E4A35] mb-1">{c.title}</h3>
                        <p className="text-sm font-bold text-[#8B9A7A]">From {c.buyerName}</p>
                      </div>
                      <span className={`px-4 py-1.5 rounded-full text-[10px] font-black tracking-widest uppercase ${
                        c.status === 'PENDING' ? 'bg-amber-100 text-amber-700' : 'bg-emerald-100 text-emerald-700'
                      }`}>
                        {c.status}
                      </span>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-8 mb-8">
                      <div>
                        <p className="text-[10px] font-bold text-[#8B9A7A] uppercase tracking-widest mb-1">Deadline</p>
                        <p className="font-bold text-[#3E4A35]">{c.deadline}</p>
                      </div>
                      <div>
                        <p className="text-[10px] font-bold text-[#8B9A7A] uppercase tracking-widest mb-1">Budget</p>
                        <p className="font-bold text-[#3E4A35]">${c.budget}</p>
                      </div>
                    </div>

                    <div className="mb-8">
                      <p className="text-[10px] font-bold text-[#8B9A7A] uppercase tracking-widest mb-2">Requirements</p>
                      <p className="text-sm text-[#5D6D4E] leading-relaxed italic">"{c.requirements}"</p>
                    </div>

                    {c.status === 'PENDING' && (
                      <div className="flex gap-4">
                        <button 
                          onClick={() => handleUpdateCommissionStatus(c.id, 'ACCEPTED')}
                          className="flex-1 bg-[#8B9A7A] text-white py-3 rounded-2xl font-black text-xs tracking-widest uppercase hover:bg-[#5D6D4E] transition-all"
                        >
                          Accept
                        </button>
                        <button 
                          onClick={() => handleUpdateCommissionStatus(c.id, 'REJECTED')}
                          className="flex-1 border-2 border-[#E5D3B3] text-[#8B9A7A] py-3 rounded-2xl font-black text-xs tracking-widest uppercase hover:bg-white transition-all"
                        >
                          Decline
                        </button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="space-y-6">
            <div className="bg-[#E7F0DC] p-8 rounded-[40px] border border-[#C9DABF]">
              <h3 className="text-lg font-black text-[#3E4A35] mb-4">Artist Profile</h3>
              <div className="text-center mb-6">
                <div className="w-24 h-24 rounded-full bg-white mx-auto mb-4 border-4 border-white shadow-lg overflow-hidden">
                  <img src={`https://i.pravatar.cc/150?u=${userName}`} alt={userName} />
                </div>
                <h4 className="font-black text-[#3E4A35]">{userName}</h4>
                <p className="text-xs font-bold text-[#8B9A7A] uppercase tracking-widest">Verified Pro</p>
              </div>
              <button className="w-full bg-white text-[#5D6D4E] py-3 rounded-2xl text-xs font-black tracking-widest uppercase hover:shadow-md transition-all">
                Edit Public Profile
              </button>
            </div>

            <div className="bg-white p-8 rounded-[40px] border border-[#E5D3B3]/40">
              <h3 className="text-[10px] font-black text-[#8B9A7A] uppercase tracking-widest mb-6">Your Performance</h3>
              <div className="space-y-6">
                <div>
                  <div className="flex justify-between text-[10px] font-black uppercase mb-2">
                    <span className="text-[#3E4A35]">Sales Growth</span>
                    <span className="text-[#8B9A7A]">+12%</span>
                  </div>
                  <div className="h-1.5 bg-[#FAF9F6] rounded-full overflow-hidden">
                    <div className="h-full bg-[#8B9A7A] w-[75%] rounded-full" />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-[10px] font-black uppercase mb-2">
                    <span className="text-[#3E4A35]">Engagement</span>
                    <span className="text-[#8B9A7A]">+45%</span>
                  </div>
                  <div className="h-1.5 bg-[#FAF9F6] rounded-full overflow-hidden">
                    <div className="h-full bg-indigo-400 w-[60%] rounded-full" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
