import React, { useState } from 'react';
import { AppScreen } from '../types';
import { Search, Menu, LogOut, X, Settings, Star, Play, Sparkles } from 'lucide-react';

interface DashboardScreenProps {
  username: string;
  onSelectScreen: (screen: AppScreen) => void;
  onLogout: () => void;
}

export const DashboardScreen: React.FC<DashboardScreenProps> = ({
  username,
  onSelectScreen,
  onLogout,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [menuOpen, setMenuOpen] = useState(false);

  // Define the menu items
  const menuItems = [
    {
      id: 'numbers' as AppScreen,
      title: 'Numbers',
      sub: '(números)',
      color: 'bg-[#F2F7F2]',
      icon: (
        <svg viewBox="0 0 100 100" className="w-14 h-14">
          {/* Block 1 (Green) */}
          <rect x="25" y="20" width="24" height="24" rx="4" fill="#5CB895" />
          <text x="37" y="37" fill="#FFFFFF" fontSize="14" fontWeight="bold" textAnchor="middle" dominantBaseline="middle">1</text>
          
          {/* Block 2 (Orange) */}
          <rect x="15" y="48" width="24" height="24" rx="4" fill="#EBA04E" />
          <text x="27" y="65" fill="#FFFFFF" fontSize="14" fontWeight="bold" textAnchor="middle" dominantBaseline="middle">2</text>
          
          {/* Block 3 (Purple) */}
          <rect x="45" y="44" width="24" height="24" rx="4" fill="#A78BFA" />
          <text x="57" y="61" fill="#FFFFFF" fontSize="14" fontWeight="bold" textAnchor="middle" dominantBaseline="middle">3</text>
        </svg>
      ),
    },
    {
      id: 'reading' as AppScreen,
      title: 'Reading',
      sub: '(Leer)',
      color: 'bg-[#FFF9F2]',
      icon: (
        <svg viewBox="0 0 100 100" className="w-14 h-14">
          {/* Open Book */}
          <path d="M50 75 C 50 75, 30 70, 15 75 L 15 30 C 30 25, 45 30, 50 32 C 55 30, 70 25, 85 30 L 85 75 C 70 70, 50 75, 50 75 Z" fill="#EBA04E" opacity="0.15" />
          {/* Left page (orange accent) */}
          <path d="M50 72 C 35 68, 20 71, 15 72 L 15 28 C 20 27, 35 24, 50 28 Z" fill="#EBA04E" />
          {/* Right page (teal/blue accent) */}
          <path d="M50 72 C 65 68, 80 71, 85 72 L 85 28 C 80 27, 65 24, 50 28 Z" fill="#54B0EE" />
          {/* Spine bookmark */}
          <path d="M50 24 L 50 76" stroke="#4B5563" strokeWidth="2" strokeLinecap="round" />
          {/* Mini lines on pages */}
          <line x1="22" y1="40" x2="42" y2="40" stroke="#FFFFFF" strokeWidth="3" strokeLinecap="round" opacity="0.7" />
          <line x1="22" y1="50" x2="38" y2="50" stroke="#FFFFFF" strokeWidth="3" strokeLinecap="round" opacity="0.7" />
          <line x1="22" y1="60" x2="42" y2="60" stroke="#FFFFFF" strokeWidth="3" strokeLinecap="round" opacity="0.7" />
          <line x1="58" y1="40" x2="78" y2="40" stroke="#FFFFFF" strokeWidth="3" strokeLinecap="round" opacity="0.7" />
          <line x1="58" y1="50" x2="74" y2="50" stroke="#FFFFFF" strokeWidth="3" strokeLinecap="round" opacity="0.7" />
          <line x1="58" y1="60" x2="78" y2="60" stroke="#FFFFFF" strokeWidth="3" strokeLinecap="round" opacity="0.7" />
        </svg>
      ),
    },
    {
      id: 'shapes' as AppScreen,
      title: 'Shapes',
      sub: '(Formas)',
      color: 'bg-[#FFF9F9]',
      icon: (
        <svg viewBox="0 0 100 100" className="w-14 h-14">
          {/* Triangle (Orange) */}
          <polygon points="30,20 12,50 48,50" fill="#EBA04E" />
          {/* Circle (Blue) */}
          <circle cx="68" cy="35" r="14" fill="#54B0EE" />
          {/* Square (Green) */}
          <rect x="34" y="55" width="24" height="24" rx="4" fill="#5CB895" />
        </svg>
      ),
    },
    {
      id: 'letters' as AppScreen,
      title: 'Vocab & Letters',
      sub: '(Vocabulario & Letras)',
      color: 'bg-[#F2F4FC]',
      icon: (
        <svg viewBox="0 0 100 100" className="w-14 h-14">
          {/* Blocks Stack C, A, B */}
          {/* Block C (Orange) */}
          <rect x="38" y="16" width="24" height="24" rx="4" fill="#EBA04E" />
          <text x="50" y="32" fill="#FFFFFF" fontSize="14" fontWeight="bold" textAnchor="middle" dominantBaseline="middle">C</text>

          {/* Block A (Purple) */}
          <rect x="20" y="44" width="24" height="24" rx="4" fill="#A78BFA" />
          <text x="32" y="60" fill="#FFFFFF" fontSize="14" fontWeight="bold" textAnchor="middle" dominantBaseline="middle">A</text>

          {/* Block B (Blue) */}
          <rect x="56" y="44" width="24" height="24" rx="4" fill="#54B0EE" />
          <text x="68" y="60" fill="#FFFFFF" fontSize="14" fontWeight="bold" textAnchor="middle" dominantBaseline="middle">B</text>
        </svg>
      ),
    },
    {
      id: 'learning-analysis' as AppScreen,
      title: 'Learning Analysis',
      sub: '(análisis de aprendizaje)',
      color: 'bg-[#F5F9FD]',
      icon: (
        <svg viewBox="0 0 100 100" className="w-14 h-14">
          {/* Chart Board */}
          <rect x="24" y="22" width="52" height="56" rx="8" fill="#F3F4F6" stroke="#D1D5DB" strokeWidth="2" />
          <rect x="32" y="32" width="36" height="8" rx="2" fill="#54B0EE" />
          <rect x="32" y="46" width="24" height="8" rx="2" fill="#5CB895" />
          <rect x="32" y="60" width="18" height="8" rx="2" fill="#EBA04E" />
          
          {/* Magnifying Glass */}
          <circle cx="68" cy="64" r="12" fill="#FFFFFF" stroke="#374151" strokeWidth="3" />
          <line x1="76" y1="72" x2="88" y2="84" stroke="#374151" strokeWidth="4" strokeLinecap="round" />
          {/* Highlight shine */}
          <path d="M 62 60 A 6 6 0 0 1 70 58" stroke="#374151" strokeWidth="1" strokeLinecap="round" />
        </svg>
      ),
    },
    {
      id: 'settings' as AppScreen,
      title: 'Settings',
      sub: '(Ajustes de aplicación)',
      color: 'bg-[#FAF2FC]',
      icon: (
        <svg viewBox="0 0 100 100" className="w-14 h-14">
          {/* Settings Cog Gear with Segment Colors */}
          <circle cx="50" cy="50" r="16" fill="none" stroke="#EBA04E" strokeWidth="10" />
          
          {/* Multi colored segments */}
          {/* Spikes */}
          <path d="M50 14 L50 24" stroke="#EBA04E" strokeWidth="10" strokeLinecap="round" />
          <path d="M50 76 L50 86" stroke="#54B0EE" strokeWidth="10" strokeLinecap="round" />
          <path d="M14 50 L24 50" stroke="#5CB895" strokeWidth="10" strokeLinecap="round" />
          <path d="M76 50 L86 50" stroke="#A78BFA" strokeWidth="10" strokeLinecap="round" />
          <path d="M25 25 L32 32" stroke="#EC4899" strokeWidth="10" strokeLinecap="round" />
          <path d="M68 68 L75 75" stroke="#F59E0B" strokeWidth="10" strokeLinecap="round" />
          <path d="M25 75 L32 68" stroke="#10B981" strokeWidth="10" strokeLinecap="round" />
          <path d="M68 25 L75 32" stroke="#EF4444" strokeWidth="10" strokeLinecap="round" />

          {/* Core center hole */}
          <circle cx="50" cy="50" r="11" fill="#FFFFFF" />
          <circle cx="50" cy="50" r="5" fill="#374151" />
        </svg>
      ),
    },
  ];

  // Filter items based on search
  const filteredItems = menuItems.filter(
    (item) =>
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.sub.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex flex-col h-full bg-[#FCF8F2] relative justify-between overflow-y-auto overflow-x-hidden font-sans pb-4">
      {/* Search Filter Overlay when searching */}
      {menuOpen && (
        <div className="absolute inset-0 bg-black/40 z-50 transition-opacity">
          <div className="absolute top-0 left-0 w-3/4 h-full bg-white shadow-2xl p-6 flex flex-col justify-between animate-in slide-in-from-left duration-300">
            <div>
              <div className="flex justify-between items-center mb-8">
                <h3 className="text-xl font-bold text-gray-800">Menu Kidszoo</h3>
                <button onClick={() => setMenuOpen(false)} className="p-1 hover:bg-gray-100 rounded-full cursor-pointer">
                  <X className="w-6 h-6 text-gray-500" />
                </button>
              </div>

              <div className="flex flex-col gap-4">
                <button
                  onClick={() => {
                    onSelectScreen('letters');
                    setMenuOpen(false);
                  }}
                  className="flex items-center gap-3 py-3 px-4 rounded-xl hover:bg-amber-50 text-left font-semibold text-gray-700 transition-colors cursor-pointer"
                >
                  <Sparkles className="w-5 h-5 text-amber-500" />
                  Belajar Huruf A-Z
                </button>
                <button
                  onClick={() => {
                    onSelectScreen('numbers');
                    setMenuOpen(false);
                  }}
                  className="flex items-center gap-3 py-3 px-4 rounded-xl hover:bg-green-50 text-left font-semibold text-gray-700 transition-colors cursor-pointer"
                >
                  <Star className="w-5 h-5 text-green-500" />
                  Belajar Berhitung 1-10
                </button>
                <button
                  onClick={() => {
                    onSelectScreen('shapes');
                    setMenuOpen(false);
                  }}
                  className="flex items-center gap-3 py-3 px-4 rounded-xl hover:bg-red-50 text-left font-semibold text-gray-700 transition-colors cursor-pointer"
                >
                  <Play className="w-5 h-5 text-red-500" />
                  Mencocokkan Bentuk
                </button>
                <button
                  onClick={() => {
                    onSelectScreen('reading');
                    setMenuOpen(false);
                  }}
                  className="flex items-center gap-3 py-3 px-4 rounded-xl hover:bg-sky-50 text-left font-semibold text-gray-700 transition-colors cursor-pointer"
                >
                  <Sparkles className="w-5 h-5 text-sky-500" />
                  Membaca Dongeng
                </button>
                <button
                  onClick={() => {
                    onSelectScreen('learning-analysis');
                    setMenuOpen(false);
                  }}
                  className="flex items-center gap-3 py-3 px-4 rounded-xl hover:bg-indigo-50 text-left font-semibold text-gray-700 transition-colors cursor-pointer"
                >
                  <Sparkles className="w-5 h-5 text-indigo-500" />
                  Analisis Belajar
                </button>
                <button
                  onClick={() => {
                    onSelectScreen('settings');
                    setMenuOpen(false);
                  }}
                  className="flex items-center gap-3 py-3 px-4 rounded-xl hover:bg-purple-50 text-left font-semibold text-gray-700 transition-colors cursor-pointer"
                >
                  <Settings className="w-5 h-5 text-purple-500" />
                  Pengaturan Suara
                </button>
              </div>
            </div>

            <button
              onClick={onLogout}
              className="flex items-center justify-center gap-2 py-3 bg-rose-500 text-white rounded-xl font-bold shadow-md hover:bg-rose-600 transition-colors cursor-pointer"
            >
              <LogOut className="w-5 h-5" />
              Keluar Sesi
            </button>
          </div>
        </div>
      )}

      {/* Header Bar */}
      <div className="px-5 pt-6 pb-4 flex justify-between items-center">
        {/* User profile avatar and hello text */}
        <div className="flex items-center gap-2.5">
          <div className="w-12 h-12 bg-rose-200 border-2 border-white shadow-md rounded-full flex items-center justify-center text-2xl select-none">
            👶
          </div>
          <div>
            <p className="text-xs font-bold text-gray-400 tracking-wide uppercase">Hello</p>
            <h2 className="text-lg font-bold text-gray-800 tracking-tight leading-tight">{username}</h2>
          </div>
        </div>

        {/* Search and Hamburger Menu Icons */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              const query = prompt('Ketik kata kunci pencarian:', searchQuery);
              if (query !== null) setSearchQuery(query);
            }}
            className="w-10 h-10 bg-white border border-gray-100 rounded-full flex items-center justify-center shadow-sm hover:scale-105 active:scale-95 transition-all text-gray-600 hover:text-amber-500 cursor-pointer"
          >
            <Search className="w-5 h-5" />
          </button>
          <button
            onClick={() => setMenuOpen(true)}
            className="w-10 h-10 bg-white border border-gray-100 rounded-full flex items-center justify-center shadow-sm hover:scale-105 active:scale-95 transition-all text-gray-600 hover:text-amber-500 cursor-pointer"
          >
            <Menu className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Search cancellation indicator */}
      {searchQuery && (
        <div className="px-5 mb-2 flex justify-between items-center">
          <span className="text-xs text-amber-600 font-bold bg-amber-50 border border-amber-100 rounded-full py-1 px-3">
            Hasil pencarian: "{searchQuery}"
          </span>
          <button
            onClick={() => setSearchQuery('')}
            className="text-xs font-bold text-rose-500 hover:underline cursor-pointer"
          >
            Hapus filter
          </button>
        </div>
      )}

      {/* 6 Category Bento Grid */}
      <div className="px-5 flex-1 flex flex-col justify-center py-2">
        <div className="grid grid-cols-2 gap-4">
          {filteredItems.map((item) => (
            <div
              id={`card-${item.id}`}
              key={item.id}
              onClick={() => onSelectScreen(item.id)}
              className={`${item.color} rounded-3xl p-4 flex flex-col items-center text-center justify-between border-2 border-transparent hover:border-amber-300 hover:shadow-xl active:scale-95 cursor-pointer transition-all duration-300 shadow-md group`}
            >
              {/* Dynamic SVG Icon */}
              <div className="transform group-hover:scale-110 transition-transform duration-300 mb-2">
                {item.icon}
              </div>

              {/* Text titles */}
              <div>
                <h4 className="text-sm font-bold text-gray-800 leading-tight group-hover:text-amber-600 transition-colors">
                  {item.title}
                </h4>
                <p className="text-[10px] text-gray-400 font-medium mt-0.5 select-none">{item.sub}</p>
              </div>
            </div>
          ))}

          {filteredItems.length === 0 && (
            <div className="col-span-2 text-center py-8">
              <p className="text-sm text-gray-500 font-bold">Kategori tidak ditemukan 😿</p>
              <button
                onClick={() => setSearchQuery('')}
                className="mt-2 text-xs font-semibold text-amber-500 hover:underline cursor-pointer"
              >
                Tampilkan semua
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Bottom banner for kids */}
      <div className="px-5 mt-4 select-none">
        <div className="bg-[#5CB895] rounded-3xl p-4 text-white flex items-center justify-between shadow-lg relative overflow-hidden">
          {/* Sparkly background decoration */}
          <div className="absolute right-0 top-0 translate-x-3 -translate-y-3 w-16 h-16 bg-white/10 rounded-full blur-xl" />
          <div className="absolute left-0 bottom-0 -translate-x-3 translate-y-3 w-12 h-12 bg-white/10 rounded-full blur-xl" />
          
          <div className="z-10 max-w-[65%]">
            <h5 className="text-xs font-bold bg-white/20 px-2 py-0.5 rounded-full inline-block mb-1">PROGRES KAMU</h5>
            <p className="text-xs font-medium text-white/95 leading-snug">Hebat, Charmie! Kamu sudah belajar 5 menit hari ini. Teruskan!</p>
          </div>
          <div className="text-3xl filter drop-shadow-md transform hover:rotate-12 transition-transform cursor-pointer">
            🏆
          </div>
        </div>
      </div>
    </div>
  );
};
