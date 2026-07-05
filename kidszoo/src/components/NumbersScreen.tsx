import React, { useState, useEffect } from 'react';
import { ArrowLeft, Sparkles, Volume2, Plus, Minus } from 'lucide-react';

interface NumbersScreenProps {
  onBack: () => void;
}

const COUNTING_ITEMS = [
  { char: '🎈', name: 'Balon' },
  { char: '⭐', name: 'Bintang' },
  { char: '🦁', name: 'Singa' },
  { char: '🍎', name: 'Apel' },
  { char: '🦖', name: 'Dino' },
];

export const NumbersScreen: React.FC<NumbersScreenProps> = ({ onBack }) => {
  const [currentNumber, setCurrentNumber] = useState<number>(3);
  const [selectedItemIndex, setSelectedItemIndex] = useState<number>(0);
  const [score, setScore] = useState<number>(0);

  const activeItem = COUNTING_ITEMS[selectedItemIndex];

  const speakText = (text: string) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'id-ID'; // Indonesian for counts
      utterance.rate = 1.0;
      utterance.pitch = 1.15;
      window.speechSynthesis.speak(utterance);
    }
  };

  const speakCounting = (num: number) => {
    let countStr = `Ayo berhitung... `;
    for (let i = 1; i <= num; i++) {
      countStr += `${i}... `;
    }
    countStr += `Ada ${num} ${activeItem.name}! Hebat!`;
    speakText(countStr);
    setScore((prev) => prev + num);
  };

  useEffect(() => {
    speakCounting(currentNumber);
  }, [currentNumber, selectedItemIndex]);

  const handleNumberSelect = (num: number) => {
    setCurrentNumber(num);
  };

  return (
    <div className="flex flex-col h-full bg-[#FCF8F2] relative overflow-hidden font-sans">
      {/* Header bar */}
      <div className="px-5 pt-6 pb-2 flex items-center gap-3 select-none">
        <button
          onClick={onBack}
          className="w-10 h-10 bg-white border border-gray-100 rounded-full flex items-center justify-center shadow-sm hover:scale-110 active:scale-95 transition-all text-gray-600 hover:text-amber-500 cursor-pointer"
        >
          <ArrowLeft className="w-5 h-5 stroke-[2.5]" />
        </button>
        <div>
          <h2 className="text-xl font-bold text-gray-800 tracking-tight leading-none">Numbers</h2>
          <span className="text-[10px] text-gray-400 font-bold tracking-wide uppercase">KIDSZOO ACADEMY</span>
        </div>

        {/* Score Badge */}
        <div className="ml-auto bg-green-100 border border-green-200 text-green-700 px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1">
          <Sparkles className="w-3.5 h-3.5 text-green-500 fill-green-300" />
          <span>{score} pts</span>
        </div>
      </div>

      <div className="flex-1 p-5 flex flex-col justify-between overflow-y-auto">
        {/* Item Selection Tabs */}
        <div className="flex justify-center gap-2 mb-2 select-none">
          {COUNTING_ITEMS.map((item, idx) => (
            <button
              key={item.name}
              onClick={() => setSelectedItemIndex(idx)}
              className={`w-10 h-10 rounded-full flex items-center justify-center text-xl transition-all border shadow-sm cursor-pointer ${
                idx === selectedItemIndex
                  ? 'bg-amber-400 border-amber-400 text-white scale-110'
                  : 'bg-white border-gray-100 hover:bg-amber-50'
              }`}
            >
              {item.char}
            </button>
          ))}
        </div>

        {/* Active Number Counting Sandbox Canvas */}
        <div className="flex-1 bg-white/70 border-2 border-dashed border-gray-200 rounded-3xl p-5 flex flex-col items-center justify-center relative min-h-[220px]">
          {/* Main big display */}
          <div className="absolute top-4 left-4 bg-amber-100 border border-amber-200 text-amber-700 font-black text-2xl w-12 h-12 rounded-2xl flex items-center justify-center select-none shadow-sm">
            {currentNumber}
          </div>

          <button
            onClick={() => speakCounting(currentNumber)}
            className="absolute top-4 right-4 w-10 h-10 bg-white hover:bg-amber-50 rounded-full flex items-center justify-center shadow-md text-amber-500 cursor-pointer hover:scale-105 active:scale-95 transition-all"
          >
            <Volume2 className="w-5 h-5" />
          </button>

          {/* Render Bouncing Items on grid layout */}
          <div className="grid grid-cols-5 gap-4 justify-center items-center w-full max-w-[240px] py-6">
            {Array.from({ length: currentNumber }).map((_, i) => (
              <div
                key={i}
                className="text-4xl text-center select-none transform hover:scale-130 active:rotate-12 cursor-pointer transition-all animate-bounce"
                style={{ animationDelay: `${i * 0.15}s`, animationDuration: '2s' }}
                onClick={() => {
                  speakText(`${i + 1}`);
                }}
              >
                {activeItem.char}
              </div>
            ))}
          </div>

          <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider mt-2 select-none">
            Tekan item untuk menghitung satu per satu!
          </p>
        </div>

        {/* Numbers Click Selector slider from 1 to 10 */}
        <div className="mt-4">
          <p className="text-center text-xs font-bold text-gray-500 mb-3 select-none">
            Geser atau Pilih Angka:
          </p>

          <div className="flex justify-between items-center bg-white border border-gray-100 p-2 rounded-2xl shadow-sm mb-4 select-none">
            <button
              onClick={() => {
                if (currentNumber > 1) handleNumberSelect(currentNumber - 1);
              }}
              className="w-10 h-10 bg-amber-100 text-amber-700 hover:bg-amber-200 active:scale-90 rounded-xl flex items-center justify-center font-bold cursor-pointer transition-all"
            >
              <Minus className="w-5 h-5" />
            </button>
            
            <span className="text-3xl font-black text-amber-500">{currentNumber}</span>

            <button
              onClick={() => {
                if (currentNumber < 10) handleNumberSelect(currentNumber + 1);
              }}
              className="w-10 h-10 bg-amber-100 text-amber-700 hover:bg-amber-200 active:scale-90 rounded-xl flex items-center justify-center font-bold cursor-pointer transition-all"
            >
              <Plus className="w-5 h-5" />
            </button>
          </div>

          <div className="grid grid-cols-5 gap-2 select-none">
            {Array.from({ length: 10 }).map((_, i) => {
              const num = i + 1;
              const isSelected = num === currentNumber;
              return (
                <button
                  key={num}
                  onClick={() => handleNumberSelect(num)}
                  className={`py-3 text-sm font-black rounded-xl border transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-amber-400 border-amber-400 text-white scale-110 shadow-md'
                      : 'bg-white border-gray-100 hover:bg-amber-50 text-gray-700'
                  }`}
                >
                  {num}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
