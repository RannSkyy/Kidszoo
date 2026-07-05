import React, { useState } from 'react';
import { ArrowLeft, Sparkles, TrendingUp, Calendar, Award } from 'lucide-react';

interface AnalysisScreenProps {
  onBack: () => void;
}

export const AnalysisScreen: React.FC<AnalysisScreenProps> = ({ onBack }) => {
  const [activeTab, setActiveTab] = useState<'progress' | 'history'>('progress');

  // Interactive statistics
  const stats = [
    { label: 'Huruf Hafal', value: '18 / 26', percent: 69, color: 'bg-amber-400', textColor: 'text-amber-600', icon: '🔤' },
    { label: 'Berhitung', value: '10 / 10', percent: 100, color: 'bg-emerald-500', textColor: 'text-emerald-600', icon: '🔢' },
    { label: 'Bentuk Cocok', value: '4 / 4', percent: 100, color: 'bg-rose-500', textColor: 'text-rose-600', icon: '📐' },
    { label: 'Buku Dibaca', value: '2 / 3', percent: 66, color: 'bg-sky-500', textColor: 'text-sky-600', icon: '📖' },
  ];

  const weeklyActivity = [
    { day: 'Sen', mins: 12, label: '12m' },
    { day: 'Sel', mins: 18, label: '18m' },
    { day: 'Rab', mins: 8, label: '8m' },
    { day: 'Kam', mins: 25, label: '25m' },
    { day: 'Jum', mins: 15, label: '15m' },
    { day: 'Sab', mins: 30, label: '30m' },
    { day: 'Min', mins: 20, label: '20m' },
  ];

  return (
    <div className="flex flex-col h-full bg-[#FCF8F2] relative overflow-hidden font-sans">
      {/* Header */}
      <div className="px-5 pt-6 pb-2 flex items-center gap-3 select-none">
        <button
          onClick={onBack}
          className="w-10 h-10 bg-white border border-gray-100 rounded-full flex items-center justify-center shadow-sm hover:scale-110 active:scale-95 transition-all text-gray-600 hover:text-amber-500 cursor-pointer"
        >
          <ArrowLeft className="w-5 h-5 stroke-[2.5]" />
        </button>
        <div>
          <h2 className="text-xl font-bold text-gray-800 tracking-tight leading-none">Analysis</h2>
          <span className="text-[10px] text-gray-400 font-bold tracking-wide uppercase">análisis de aprendizaje</span>
        </div>
      </div>

      <div className="flex-1 p-5 flex flex-col justify-between overflow-y-auto">
        {/* Navigation tabs */}
        <div className="flex bg-white/80 p-1 rounded-full border border-gray-100 shadow-inner mb-4 select-none">
          <button
            onClick={() => setActiveTab('progress')}
            className={`flex-1 py-2 text-center text-xs font-bold rounded-full transition-all cursor-pointer ${
              activeTab === 'progress' ? 'bg-[#EBA04E] text-white shadow-sm' : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            Progres Belajar
          </button>
          <button
            onClick={() => setActiveTab('history')}
            className={`flex-1 py-2 text-center text-xs font-bold rounded-full transition-all cursor-pointer ${
              activeTab === 'history' ? 'bg-[#EBA04E] text-white shadow-sm' : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            Piagam & Prestasi
          </button>
        </div>

        {activeTab === 'progress' ? (
          <div className="flex flex-col gap-4 flex-1">
            {/* Weekly Active time Bar Graph */}
            <div className="bg-white rounded-3xl p-4 shadow-sm border border-gray-100 flex flex-col justify-between">
              <div className="flex justify-between items-center mb-3 select-none">
                <span className="text-xs font-black text-gray-700 flex items-center gap-1">
                  <Calendar className="w-4 h-4 text-amber-500" />
                  Waktu Belajar Mingguan
                </span>
                <span className="text-[10px] bg-amber-100 text-amber-700 font-bold px-2 py-0.5 rounded-full">Total: 128m</span>
              </div>

              {/* Bar Layout Chart */}
              <div className="flex items-end justify-between h-24 pt-2 select-none px-1">
                {weeklyActivity.map((act) => (
                  <div key={act.day} className="flex flex-col items-center flex-1 gap-1">
                    <span className="text-[9px] text-amber-600 font-bold mb-1">{act.label}</span>
                    {/* Bar graphic */}
                    <div
                      className="w-4 bg-amber-400 hover:bg-amber-500 rounded-t-full transition-all duration-500 cursor-pointer"
                      style={{ height: `${act.mins * 2.4}px` }}
                      title={`${act.mins} menit`}
                    />
                    <span className="text-[10px] text-gray-400 font-bold mt-1">{act.day}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Course Completions Grid */}
            <div className="grid grid-cols-2 gap-3 flex-1 py-1">
              {stats.map((stat) => (
                <div key={stat.label} className="bg-white rounded-2xl p-3 border border-gray-50 shadow-sm flex flex-col justify-between">
                  <div className="flex justify-between items-start select-none">
                    <span className="text-xl">{stat.icon}</span>
                    <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">{stat.label.split(' ')[0]}</span>
                  </div>
                  
                  <div className="mt-2">
                    <h4 className="text-sm font-black text-gray-800 leading-tight">{stat.value}</h4>
                    {/* Small progress meter bar */}
                    <div className="w-full bg-gray-100 h-2 rounded-full mt-1.5 overflow-hidden">
                      <div className={`h-full ${stat.color} rounded-full`} style={{ width: `${stat.percent}%` }} />
                    </div>
                    <div className="flex justify-between items-center mt-1 select-none">
                      <span className="text-[9px] text-gray-400 font-bold">{stat.label}</span>
                      <span className={`text-[9px] font-black ${stat.textColor}`}>{stat.percent}%</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="flex flex-col gap-4 flex-1">
            {/* Trophies achievements layout */}
            <div className="bg-white rounded-3xl p-5 shadow-sm border border-gray-100 flex-1 flex flex-col items-center justify-center text-center">
              <div className="w-16 h-16 bg-amber-100 border border-amber-200 rounded-full flex items-center justify-center text-3xl mb-3 shadow-sm select-none">
                🏆
              </div>
              <h3 className="text-sm font-black text-gray-800 mb-1 leading-tight">Master Alfabet A-Z</h3>
              <p className="text-xs text-gray-400 leading-normal max-w-[85%] font-medium">Luar biasa! Kamu sudah menyelesaikan seluruh kuis huruf dan menguasai pengucapan fonik dengan lancar.</p>

              <div className="w-full h-[1px] bg-gray-100 my-4" />

              <div className="flex gap-4 select-none">
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 bg-emerald-50 rounded-full flex items-center justify-center text-2xl mb-1 shadow-sm border border-emerald-100">
                    🥇
                  </div>
                  <span className="text-[9px] font-bold text-gray-500">Berhitung</span>
                </div>
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 bg-rose-50 rounded-full flex items-center justify-center text-2xl mb-1 shadow-sm border border-rose-100">
                    🎖️
                  </div>
                  <span className="text-[9px] font-bold text-gray-500">Ahli Bentuk</span>
                </div>
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 bg-sky-50 rounded-full flex items-center justify-center text-2xl mb-1 shadow-sm border border-sky-100">
                    ⭐
                  </div>
                  <span className="text-[9px] font-bold text-gray-500">Membaca</span>
                </div>
              </div>
            </div>

            <div className="bg-[#5CB895] rounded-2xl p-3.5 text-white flex items-center gap-3 shadow-md select-none">
              <Award className="w-6 h-6 shrink-0 text-white fill-white/10" />
              <p className="text-[11px] font-medium leading-relaxed">
                Kumpulkan terus poin belajarmu untuk membuka piagam emas berikutnya dan hadiah kejutan interaktif!
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
