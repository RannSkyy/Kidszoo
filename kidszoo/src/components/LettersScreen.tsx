import React, { useState, useEffect } from 'react';
import { LETTERS_DATA } from '../data';
import { LetterInfo } from '../types';
import { ArrowLeft, Volume2, Sparkles, Check, Play } from 'lucide-react';

interface LettersScreenProps {
  onBack: () => void;
}

export const LettersScreen: React.FC<LettersScreenProps> = ({ onBack }) => {
  const [selectedLetter, setSelectedLetter] = useState<LetterInfo>(LETTERS_DATA[0]);
  const [score, setScore] = useState(0);
  const [quizSuccess, setQuizSuccess] = useState<boolean | null>(null);
  const [quizOptions, setQuizOptions] = useState<string[]>([]);

  // Function to pronounce the letter and association
  const speakWord = (text: string) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel(); // Stop current speech
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'en-US';
      utterance.rate = 0.95;
      utterance.pitch = 1.1; // Kid-friendly higher pitch
      window.speechSynthesis.speak(utterance);
    } else {
      console.log('Text-to-speech not supported:', text);
    }
  };

  // Trigger speak when letter changes
  useEffect(() => {
    speakWord(`${selectedLetter.letter}. ${selectedLetter.association}`);
    generateQuiz(selectedLetter);
  }, [selectedLetter]);

  // Generate simple interactive quiz options
  const generateQuiz = (letter: LetterInfo) => {
    const correct = letter.association;
    // Get 2 other random associations
    const pool = LETTERS_DATA.filter((l) => l.association !== correct).map((l) => l.association);
    const shuffled = pool.sort(() => 0.5 - Math.random());
    const options = [correct, shuffled[0], shuffled[1]].sort(() => 0.5 - Math.random());
    setQuizOptions(options);
    setQuizSuccess(null);
  };

  const handleAnswer = (option: string) => {
    if (option === selectedLetter.association) {
      setQuizSuccess(true);
      setScore((prev) => prev + 10);
      speakWord(`Excellent! ${selectedLetter.letter} is indeed for ${selectedLetter.association}!`);
    } else {
      setQuizSuccess(false);
      speakWord(`Try again! That is not ${selectedLetter.letter}!`);
    }
  };

  return (
    <div className="flex flex-col h-full bg-[#FCF8F2] relative overflow-hidden font-sans">
      {/* Top Navigation Row */}
      <div className="px-5 pt-6 pb-2 flex items-center gap-3">
        <button
          onClick={onBack}
          className="w-10 h-10 bg-white border border-gray-100 rounded-full flex items-center justify-center shadow-sm hover:scale-110 active:scale-95 transition-all text-gray-600 hover:text-amber-500 cursor-pointer"
        >
          <ArrowLeft className="w-5 h-5 stroke-[2.5]" />
        </button>
        <div>
          <h2 className="text-xl font-bold text-gray-800 tracking-tight leading-none">Letters</h2>
          <span className="text-[10px] text-gray-400 font-bold tracking-wide uppercase">KIDSZOO ACADEMY</span>
        </div>

        {/* Mini Score Badge */}
        <div className="ml-auto bg-amber-100 border border-amber-200 text-amber-700 px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1">
          <Sparkles className="w-3.5 h-3.5 text-amber-500 fill-amber-300" />
          <span>{score} pts</span>
        </div>
      </div>

      {/* Main Board View: Split into Main Card on Left, Alphabet Sidebar Scroll on Right */}
      <div className="flex-1 flex overflow-hidden">
        
        {/* Left Side: Interactive Cartoon Learning Box */}
        <div className="flex-1 p-4 flex flex-col justify-between overflow-y-auto">
          <div>
            <p className="text-xs text-gray-500 leading-snug font-medium pr-2">
              Pilih huruf di sebelah kanan untuk belajar pengucapan suara dan bermain kuis kata!
            </p>
          </div>

          {/* Interactive display area */}
          <div className="flex-1 my-3 flex flex-col items-center justify-center">
            {/* The Bubbly Cartoon Letter Card */}
            <div className={`w-full max-w-[210px] aspect-[4/5] rounded-3xl p-5 ${selectedLetter.bgColor} border-2 border-dashed border-gray-200 shadow-lg flex flex-col items-center justify-between relative transform hover:scale-102 transition-all group`}>
              
              {/* Voice button */}
              <button
                onClick={() => speakWord(`${selectedLetter.letter} is for ${selectedLetter.association}`)}
                className="absolute top-3 right-3 w-8 h-8 bg-white/80 hover:bg-white rounded-full flex items-center justify-center shadow-sm hover:scale-105 transition-all text-amber-500 cursor-pointer"
              >
                <Volume2 className="w-4 h-4" />
              </button>

              {/* Big Letter character with overlaid eyes & blush */}
              <div className="relative mt-2 select-none">
                <span className={`text-8xl font-black tracking-tighter ${selectedLetter.color} block drop-shadow-sm`}>
                  {selectedLetter.letter}
                </span>

                {/* Cute eyes overlay */}
                <div className="absolute top-[40%] left-1/2 -translate-x-1/2 -translate-y-1/2 flex gap-4">
                  {/* Left Eye */}
                  <div className="w-3.5 h-3.5 bg-gray-800 rounded-full flex items-center justify-center relative">
                    <div className="w-1.5 h-1.5 bg-white rounded-full absolute top-0.5 left-0.5" />
                  </div>
                  {/* Right Eye */}
                  <div className="w-3.5 h-3.5 bg-gray-800 rounded-full flex items-center justify-center relative">
                    <div className="w-1.5 h-1.5 bg-white rounded-full absolute top-0.5 left-0.5" />
                  </div>
                </div>

                {/* Blush cheeks */}
                <div className="absolute top-[52%] left-1/2 -translate-x-1/2 -translate-y-1/2 flex gap-10">
                  <div className="w-3.5 h-2.5 bg-rose-400 rounded-full opacity-60 blur-[0.5px]" />
                  <div className="w-3.5 h-2.5 bg-rose-400 rounded-full opacity-60 blur-[0.5px]" />
                </div>

                {/* Smiling Mouth */}
                <svg viewBox="0 0 40 20" className="w-6 h-3 absolute top-[55%] left-1/2 -translate-x-1/2 text-gray-800 fill-none stroke-current stroke-3 stroke-round">
                  <path d="M 5,5 Q 20,18 35,5" />
                </svg>
              </div>

              {/* Association Word representation, e.g. (A = AXE) */}
              <div className="text-center w-full">
                <div className="text-sm font-black text-gray-700 tracking-wide bg-white/60 border border-white px-4 py-1.5 rounded-full inline-block shadow-sm">
                  ({selectedLetter.letter} = <span className="text-amber-600 font-extrabold">{selectedLetter.association}</span>)
                </div>
                <p className="text-[10px] text-gray-400 font-bold uppercase mt-1.5 tracking-wider select-none">Tekan tombol suara untuk mendengar</p>
              </div>
            </div>
          </div>

          {/* Mini-Quiz Game to ensure full interactivity without dead placeholders */}
          <div className="bg-white rounded-2xl p-3 border border-gray-100 shadow-sm">
            <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-2 text-center select-none">
              Kuis: {selectedLetter.letter} untuk apa?
            </p>
            
            <div className="grid grid-cols-3 gap-1.5">
              {quizOptions.map((opt) => (
                <button
                  key={opt}
                  onClick={() => handleAnswer(opt)}
                  className={`py-2 px-1 text-center text-xs font-bold rounded-xl border transition-all cursor-pointer truncate ${
                    quizSuccess !== null && opt === selectedLetter.association
                      ? 'bg-emerald-50 border-emerald-300 text-emerald-600 scale-102'
                      : quizSuccess === false && opt !== selectedLetter.association
                      ? 'bg-gray-50 border-gray-100 text-gray-400 opacity-60'
                      : 'bg-amber-50/50 hover:bg-amber-50 border-amber-100 text-amber-700 active:scale-95'
                  }`}
                >
                  {opt}
                </button>
              ))}
            </div>

            {quizSuccess === true && (
              <div className="text-[11px] text-center text-emerald-600 font-bold mt-2 animate-bounce flex items-center justify-center gap-1">
                <Check className="w-3 h-3 stroke-[3]" /> Hebat! Jawabanmu Benar! +10 Poin
              </div>
            )}
            {quizSuccess === false && (
              <div className="text-[11px] text-center text-rose-500 font-bold mt-2 select-none">
                Ayo coba lagi, kamu pasti bisa!
              </div>
            )}
          </div>
        </div>

        {/* Right Side: A-Z Letters Sidebar vertical list */}
        <div className="w-[85px] bg-white border-l border-gray-100 flex flex-col">
          <div className="py-2.5 text-center border-b border-gray-50 bg-amber-50/20 select-none">
            <span className="text-[10px] font-black text-amber-500 tracking-wider">PILIH A-Z</span>
          </div>

          {/* Letter list */}
          <div className="flex-1 overflow-y-auto py-2 px-3 flex flex-col gap-2">
            {LETTERS_DATA.map((item) => {
              const isSelected = item.letter === selectedLetter.letter;
              return (
                <button
                  id={`alphabet-sidebar-btn-${item.letter}`}
                  key={item.letter}
                  onClick={() => setSelectedLetter(item)}
                  className={`w-12 h-12 rounded-2xl flex flex-col items-center justify-center border-2 transition-all outline-none cursor-pointer ${
                    isSelected
                      ? 'bg-[#EBA04E] border-[#EBA04E] text-white scale-110 shadow-md'
                      : 'bg-gray-50 hover:bg-amber-50/80 border-gray-100 text-gray-700 hover:scale-105'
                  }`}
                >
                  <span className="text-lg font-black tracking-tight leading-none">{item.letter}</span>
                  <span className={`text-[8px] font-bold uppercase ${isSelected ? 'text-white/80' : 'text-gray-400'}`}>
                    {item.name.slice(0, 4)}
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
