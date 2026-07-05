import React from 'react';
import { ArrowLeft, Volume2, Sparkles, Check, Moon, Sun, ToggleLeft, ToggleRight } from 'lucide-react';

interface SettingsScreenProps {
  onBack: () => void;
  voiceRate: number;
  setVoiceRate: (rate: number) => void;
  voicePitch: number;
  setVoicePitch: (pitch: number) => void;
  soundEffects: boolean;
  setSoundEffects: (val: boolean) => void;
  simBgColor: string;
  setSimBgColor: (color: string) => void;
}

const BG_COLOR_OPTIONS = [
  { id: 'bg-[#FCF8F2]', label: 'Krem', class: 'bg-[#FCF8F2] border-[#EBA04E]' },
  { id: 'bg-[#F2F7F2]', label: 'Hijau', class: 'bg-[#F2F7F2] border-emerald-400' },
  { id: 'bg-[#F2F4FC]', label: 'Biru', class: 'bg-[#F2F4FC] border-blue-400' },
  { id: 'bg-[#FFF9F9]', label: 'Merah', class: 'bg-[#FFF9F9] border-rose-300' },
  { id: 'bg-[#FFFBEB]', label: 'Kuning', class: 'bg-[#FFFBEB] border-amber-300' },
];

export const SettingsScreen: React.FC<SettingsScreenProps> = ({
  onBack,
  voiceRate,
  setVoiceRate,
  voicePitch,
  setVoicePitch,
  soundEffects,
  setSoundEffects,
  simBgColor,
  setSimBgColor,
}) => {

  const testSpeech = () => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance("Halo, ini adalah suara pemandu belajar Kidszoo!");
      utterance.lang = 'id-ID';
      utterance.rate = voiceRate;
      utterance.pitch = voicePitch;
      window.speechSynthesis.speak(utterance);
    }
  };

  return (
    <div className="flex flex-col h-full relative overflow-hidden font-sans">
      {/* Header */}
      <div className="px-5 pt-6 pb-2 flex items-center gap-3 select-none">
        <button
          onClick={onBack}
          className="w-10 h-10 bg-white border border-gray-100 rounded-full flex items-center justify-center shadow-sm hover:scale-110 active:scale-95 transition-all text-gray-600 hover:text-amber-500 cursor-pointer"
        >
          <ArrowLeft className="w-5 h-5 stroke-[2.5]" />
        </button>
        <div>
          <h2 className="text-xl font-bold text-gray-800 tracking-tight leading-none">Settings</h2>
          <span className="text-[10px] text-gray-400 font-bold tracking-wide uppercase">Ajustes de aplicación</span>
        </div>
      </div>

      <div className="flex-1 p-5 flex flex-col justify-between overflow-y-auto">
        <div className="flex flex-col gap-5 flex-1">
          {/* Custom theme color picker */}
          <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
            <h4 className="text-xs font-black text-gray-500 uppercase tracking-wider mb-2.5 select-none">Warna Tema Aplikasi</h4>
            <div className="grid grid-cols-5 gap-2 select-none">
              {BG_COLOR_OPTIONS.map((opt) => {
                const isSelected = opt.id === simBgColor;
                return (
                  <button
                    key={opt.id}
                    onClick={() => setSimBgColor(opt.id)}
                    className={`w-full aspect-square rounded-xl border-2 cursor-pointer transition-all ${opt.class} flex items-center justify-center ${
                      isSelected ? 'scale-110 ring-4 ring-amber-100 shadow-sm' : 'hover:scale-105'
                    }`}
                    title={opt.label}
                  >
                    {isSelected && <Check className="w-4 h-4 text-gray-700 stroke-[3]" />}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Speech Rate Controller */}
          <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 select-none">
            <div className="flex justify-between items-center mb-2.5">
              <h4 className="text-xs font-black text-gray-500 uppercase tracking-wider">Kecepatan Bicara ({voiceRate}x)</h4>
              <button
                onClick={testSpeech}
                className="text-[10px] bg-amber-100 text-amber-700 font-bold px-2 py-0.5 rounded-full hover:bg-amber-200 flex items-center gap-1 cursor-pointer"
              >
                <Volume2 className="w-3 h-3" /> Tes Suara
              </button>
            </div>

            <div className="flex gap-2">
              {[0.7, 0.85, 1.0, 1.15].map((rate) => (
                <button
                  key={rate}
                  onClick={() => setVoiceRate(rate)}
                  className={`flex-1 py-2 text-xs font-bold rounded-xl border transition-all cursor-pointer ${
                    voiceRate === rate
                      ? 'bg-amber-400 border-amber-400 text-white font-extrabold shadow-sm scale-102'
                      : 'bg-[#FCF8F2] border-gray-100 text-gray-600 hover:bg-amber-50'
                  }`}
                >
                  {rate === 1.0 ? 'Normal' : `${rate}x`}
                </button>
              ))}
            </div>
          </div>

          {/* Speech Pitch Controller */}
          <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 select-none">
            <h4 className="text-xs font-black text-gray-500 uppercase tracking-wider mb-2.5">Tinggi Nada Suara ({voicePitch}x)</h4>
            <div className="flex gap-2">
              {[0.9, 1.1, 1.3].map((pitch) => (
                <button
                  key={pitch}
                  onClick={() => setVoicePitch(pitch)}
                  className={`flex-1 py-2 text-xs font-bold rounded-xl border transition-all cursor-pointer ${
                    voicePitch === pitch
                      ? 'bg-amber-400 border-amber-400 text-white font-extrabold shadow-sm scale-102'
                      : 'bg-[#FCF8F2] border-gray-100 text-gray-600 hover:bg-amber-50'
                  }`}
                >
                  {pitch === 0.9 ? 'Rendah' : pitch === 1.1 ? 'Kanak-kanak' : 'Sangat Tinggi'}
                </button>
              ))}
            </div>
          </div>

          {/* Sound toggling */}
          <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 flex justify-between items-center select-none">
            <div>
              <h4 className="text-xs font-black text-gray-700 uppercase tracking-wide">Efek Suara Belajar</h4>
              <p className="text-[10px] text-gray-400 font-semibold leading-snug mt-0.5">Bunyi sorakan ketika jawaban kuis benar</p>
            </div>

            <button
              onClick={() => setSoundEffects(!soundEffects)}
              className="text-amber-500 hover:scale-105 transition-all cursor-pointer"
            >
              {soundEffects ? (
                <ToggleRight className="w-11 h-11 text-amber-500" />
              ) : (
                <ToggleLeft className="w-11 h-11 text-gray-300" />
              )}
            </button>
          </div>
        </div>

        {/* Save/back indicator bar */}
        <div className="mt-4 select-none">
          <button
            onClick={onBack}
            className="w-full py-3 bg-[#5CB895] hover:bg-[#4ea081] text-white font-black rounded-xl text-center shadow-md active:scale-95 transition-all text-xs cursor-pointer"
          >
            SIMPAN PENGATURAN
          </button>
        </div>
      </div>
    </div>
  );
};
