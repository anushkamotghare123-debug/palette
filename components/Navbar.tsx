
import React from 'react';
import { UserRole } from '../types';

interface NavbarProps {
  currentRole: UserRole;
  onRoleChange: (role: UserRole) => void;
  onNavigate: (view: 'GALLERY' | 'DASHBOARD') => void;
}

const Navbar: React.FC<NavbarProps> = ({ currentRole, onRoleChange, onNavigate }) => {
  return (
    <nav className="sticky top-0 z-50 glass-effect border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center gap-8">
            <div 
              className="flex items-center gap-2 cursor-pointer"
              onClick={() => onNavigate('GALLERY')}
            >
              <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
                <div className="w-4 h-4 bg-white rounded-sm rotate-45" />
              </div>
              <span className="text-xl font-black text-slate-900 tracking-tight">PALETTE</span>
            </div>
            
            <div className="hidden md:flex items-center gap-1">
              <button 
                onClick={() => onNavigate('GALLERY')}
                className="px-4 py-2 text-sm font-semibold text-slate-600 hover:text-indigo-600 transition-colors"
              >
                Browse Art
              </button>
              <button 
                onClick={() => onNavigate('DASHBOARD')}
                className="px-4 py-2 text-sm font-semibold text-slate-600 hover:text-indigo-600 transition-colors"
              >
                Dashboard
              </button>
              <button className="px-4 py-2 text-sm font-semibold text-slate-600 hover:text-indigo-600 transition-colors">
                Artists
              </button>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden sm:flex items-center gap-1 bg-slate-100 p-1 rounded-xl">
              {(['BUYER', 'ARTIST', 'ADMIN'] as UserRole[]).map((role) => (
                <button
                  key={role}
                  onClick={() => onRoleChange(role)}
                  className={`px-3 py-1.5 rounded-lg text-[10px] font-bold transition-all ${
                    currentRole === role 
                    ? 'bg-white text-indigo-600 shadow-sm' 
                    : 'text-slate-500 hover:text-slate-700'
                  }`}
                >
                  {role}
                </button>
              ))}
            </div>
            
            <button className="w-10 h-10 rounded-full border border-slate-200 bg-white overflow-hidden hover:ring-2 hover:ring-indigo-500 transition-all">
              <img src={`https://i.pravatar.cc/100?u=${currentRole}`} alt="Avatar" />
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
