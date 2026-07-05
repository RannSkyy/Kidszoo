import React, { useState } from 'react';
import { ArrowLeft, Sparkles, RefreshCw } from 'lucide-react';

interface ShapesScreenProps {
  onBack: () => void;
}

interface ShapeItem {
  id: string;
  name: string;
  color: string;
  svg: React.ReactNode;
}

const SHAPES_POOL: ShapeItem[] = [
  {
    id: 'triangle',
    name: 'Segitiga',
    color: 'fill-amber-500',
    svg: (
      <svg viewBox="0 0 100 100" className="w-12 h-12">
        <polygon points="50,15 15,80 85,80" />
      </svg>
    ),
  },
  {
    id: 'circle',
    name: 'Lingkaran',
    color: 'fill-sky-500',
    svg: (
      <svg viewBox="0 0 100 100" className="w-12 h-12">
        <circle cx="50" cy="50" r="35" />
      </svg>
    ),
  },
  {
    id: 'square',
    name: 'Persegi',
    color: 'fill-emerald-500',
    svg: (
      <svg viewBox="0 0 100 100" className="w-12 h-12">
        <rect x="20" y="20" width="60" height="60" rx="8" />
      </svg>
    ),
  },
  {
    id: 'star',
    name: 'Bintang',
    color: 'fill-rose-500',
    svg: (
      <svg viewBox="0 0 100 100" className="w-12 h-12">
        <polygon points="50,10 63,38 93,38 70,58 78,88 50,70 22,88 30,58 7,38 37,38" />
      </svg>
    ),
  },
];

export const ShapesScreen: React.FC<ShapesScreenProps> = ({ onBack }) => {
  const [selectedShapeId, setSelectedShapeId] = useState<string | null>(null);
  const [matchedShapes, setMatchedShapes] = useState<string[]>([]);
  const [score, setScore] = useState<number>(0);
  const [message, setMessage] = useState<string>('Ketuk sebuah bentuk, lalu ketuk slot bergaris putus-putus yang cocok!');

  const speakText = (text: string) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'id-ID';
      utterance.rate = 1.0;
      utterance.pitch = 1.15;
      window.speechSynthesis.speak(utterance);
    }
  };

  const handleSelectShape = (id: string) => {
    if (matchedShapes.includes(id)) return;
    setSelectedShapeId(id);
    const shape = SHAPES_POOL.find((s) => s.id === id);
    if (shape) {
      speakText(shape.name);
      setMessage(`Kamu memilih ${shape.name}. Sekarang ketuk kotak target yang cocok!`);
    }
  };

  const handleMatchSlot = (targetId: string) => {
    if (!selectedShapeId) {
      speakText('Pilih bentuk terlebih dahulu!');
      setMessage('Ayo, pilih salah satu bentuk berwarna di bawah terlebih dahulu!');
      return;
    }

    if (selectedShapeId === targetId) {
      // Success match!
      const shape = SHAPES_POOL.find((s) => s.id === targetId);
      const updatedMatches = [...matchedShapes, targetId];
      setMatchedShapes(updatedMatches);
      setScore((prev) => prev + 25);
      setSelectedShapeId(null);
      
      const feedback = `Hebat! ${shape?.name} berhasil dicocokkan!`;
      speakText(feedback);
      setMessage(feedback);

      if (updatedMatches.length === SHAPES_POOL.length) {
        setTimeout(() => {
          speakText('Luar biasa! Kamu menyelesaikan semua teka-teki bentuk!');
          setMessage('🥳 Selamat! Semua bentuk telah cocok sempurna!');
        }, 1200);
      }
    } else {
      // Wrong match
      const wrongShape = SHAPES_POOL.find((s) => s.id === selectedShapeId);
      const targetShape = SHAPES_POOL.find((s) => s.id === targetId);
      const errorMsg = `Bukan! Itu target untuk ${targetShape?.name}. Coba pasang ${wrongShape?.name} ke tempatnya!`;
      speakText('Bukan di situ!');
      setMessage(errorMsg);
    }
  };

  const handleReset = () => {
    setMatchedShapes([]);
    setSelectedShapeId(null);
    setScore(0);
    setMessage('Teka-teki dimulai kembali! Pasangkan bentuk-bentuknya!');
    speakText('Ayo main lagi!');
  };

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
          <h2 className="text-xl font-bold text-gray-800 tracking-tight leading-none">Shapes</h2>
          <span className="text-[10px] text-gray-400 font-bold tracking-wide uppercase">KIDSZOO ACADEMY</span>
        </div>

        {/* Score */}
        <div className="ml-auto bg-rose-100 border border-rose-200 text-rose-700 px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1">
          <Sparkles className="w-3.5 h-3.5 text-rose-500 fill-rose-300" />
          <span>{score} pts</span>
        </div>
      </div>

      <div className="flex-1 p-5 flex flex-col justify-between overflow-y-auto">
        {/* Instruction Message Board */}
        <div className="bg-amber-100 border border-amber-200 p-3.5 rounded-2xl text-center shadow-sm mb-4">
          <p className="text-xs font-bold text-amber-800 leading-snug">{message}</p>
        </div>

        {/* Shape target slots (Grid of Dashed outlines) */}
        <div className="grid grid-cols-2 gap-4 flex-1 items-center justify-center py-4">
          {SHAPES_POOL.map((shape) => {
            const isMatched = matchedShapes.includes(shape.id);
            return (
              <button
                key={shape.id}
                onClick={() => handleMatchSlot(shape.id)}
                className={`aspect-square rounded-3xl border-3 border-dashed flex flex-col items-center justify-center p-4 transition-all relative cursor-pointer ${
                  isMatched
                    ? 'bg-emerald-50 border-emerald-400 text-emerald-600 scale-102 shadow-inner'
                    : 'bg-white border-gray-300 hover:border-amber-400 text-gray-400 hover:bg-amber-50/20'
                }`}
              >
                {/* If matched, show shape. Else show dashed placeholder */}
                {isMatched ? (
                  <div className={`${shape.color} transform scale-110 animate-bounce`}>
                    {shape.svg}
                  </div>
                ) : (
                  <div className="opacity-30 stroke-current text-gray-500 hover:opacity-50">
                    {shape.svg}
                  </div>
                )}
                <span className="text-xs font-bold mt-2 uppercase tracking-wide">
                  {isMatched ? 'Cocok! ✅' : shape.name}
                </span>
              </button>
            );
          })}
        </div>

        {/* Bottom selector row containing draggable/clickable shape elements */}
        <div className="bg-white border border-gray-100 p-4 rounded-3xl shadow-md mt-2">
          <div className="flex justify-between items-center mb-3">
            <span className="text-xs font-bold text-gray-500 select-none">BENTUK WARNA-WARNI:</span>
            <button
              onClick={handleReset}
              className="p-1.5 hover:bg-gray-100 rounded-full text-amber-500 hover:scale-110 transition-all cursor-pointer"
              title="Reset Puzzle"
            >
              <RefreshCw className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-4 gap-2 select-none">
            {SHAPES_POOL.map((shape) => {
              const isMatched = matchedShapes.includes(shape.id);
              const isSelected = shape.id === selectedShapeId;
              return (
                <button
                  key={shape.id}
                  onClick={() => handleSelectShape(shape.id)}
                  disabled={isMatched}
                  className={`py-3 flex flex-col items-center justify-center rounded-2xl border transition-all cursor-pointer ${
                    isMatched
                      ? 'bg-gray-100 border-gray-200 text-gray-300 opacity-30 cursor-not-allowed scale-90'
                      : isSelected
                      ? 'bg-amber-400 border-amber-400 text-white scale-110 shadow-md ring-4 ring-amber-100'
                      : 'bg-[#FCF8F2] hover:bg-amber-50 border-gray-200 hover:scale-105'
                  }`}
                >
                  <div className={`${isMatched ? 'opacity-30' : isSelected ? 'fill-white text-white' : shape.color}`}>
                    {shape.svg}
                  </div>
                  <span className={`text-[10px] font-bold mt-1.5 ${isSelected ? 'text-white' : 'text-gray-600'}`}>
                    {shape.name}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
