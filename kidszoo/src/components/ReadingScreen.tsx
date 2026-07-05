import React, { useState, useEffect } from 'react';
import { STORIES } from '../data';
import { ArrowLeft, Volume2, ArrowRight, ArrowLeftSquare, RefreshCw, VolumeX } from 'lucide-react';

interface ReadingScreenProps {
  onBack: () => void;
}

export const ReadingScreen: React.FC<ReadingScreenProps> = ({ onBack }) => {
  const [activeStoryIndex, setActiveStoryIndex] = useState(0);
  const [activeSentenceIndex, setActiveSentenceIndex] = useState(0);
  const [isSpeaking, setIsSpeaking] = useState(false);

  const activeStory = STORIES[activeStoryIndex];
  const activeSentence = activeStory.sentences[activeSentenceIndex];

  const speakSentence = (text: string) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'en-US'; // English storybook narration
      utterance.rate = 0.85; // slightly slower for children
      utterance.pitch = 1.1;

      utterance.onstart = () => setIsSpeaking(true);
      utterance.onend = () => setIsSpeaking(false);
      utterance.onerror = () => setIsSpeaking(false);

      window.speechSynthesis.speak(utterance);
    }
  };

  // Speak when sentence changes
  useEffect(() => {
    speakSentence(activeSentence);
  }, [activeSentenceIndex, activeStoryIndex]);

  const handleNext = () => {
    if (activeSentenceIndex < activeStory.sentences.length - 1) {
      setActiveSentenceIndex((prev) => prev + 1);
    } else {
      speakSentence("Yay, you finished the story! Excellent job!");
      alert('Keren! Kamu sudah menyelesaikan membaca cerita ini! 🎉');
    }
  };

  const handlePrev = () => {
    if (activeSentenceIndex > 0) {
      setActiveSentenceIndex((prev) => prev - 1);
    }
  };

  const handleStorySelect = (idx: number) => {
    setActiveStoryIndex(idx);
    setActiveSentenceIndex(0);
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
          <h2 className="text-xl font-bold text-gray-800 tracking-tight leading-none">Reading</h2>
          <span className="text-[10px] text-gray-400 font-bold tracking-wide uppercase">KIDSZOO ACADEMY</span>
        </div>
      </div>

      <div className="flex-1 p-5 flex flex-col justify-between overflow-y-auto">
        {/* Story Selector Pills */}
        <div className="flex gap-2 overflow-x-auto pb-2 select-none scrollbar-none">
          {STORIES.map((story, idx) => (
            <button
              key={story.id}
              onClick={() => handleStorySelect(idx)}
              className={`py-2 px-4 rounded-full text-xs font-bold border shrink-0 transition-all cursor-pointer ${
                idx === activeStoryIndex
                  ? 'bg-amber-400 border-amber-400 text-white shadow-sm'
                  : 'bg-white border-gray-100 text-gray-600 hover:bg-amber-50'
              }`}
            >
              <span className="mr-1">{story.emoji}</span>
              {story.title.split(' ')[0] /* Shorten title */}
            </button>
          ))}
        </div>

        {/* Story Display Book Canvas */}
        <div className="flex-1 bg-white rounded-3xl p-6 shadow-md border border-gray-100 flex flex-col justify-between relative mt-2 min-h-[220px]">
          
          {/* Cover icon & Title header */}
          <div className="flex justify-between items-center border-b border-gray-100 pb-3 select-none">
            <div className="flex items-center gap-2">
              <span className="text-3xl filter drop-shadow-sm">{activeStory.emoji}</span>
              <div>
                <h3 className="text-sm font-black text-gray-800 leading-tight">{activeStory.title}</h3>
                <p className="text-[9px] text-gray-400 font-bold uppercase tracking-wider">Halaman {activeSentenceIndex + 1} dari {activeStory.sentences.length}</p>
              </div>
            </div>

            {/* Speaking voice indicator */}
            <button
              onClick={() => speakSentence(activeSentence)}
              className={`w-9 h-9 rounded-full flex items-center justify-center shadow-sm transition-all ${
                isSpeaking
                  ? 'bg-amber-400 text-white animate-pulse'
                  : 'bg-amber-50 text-amber-500 hover:bg-amber-100'
              } cursor-pointer`}
              title="Putar Suara"
            >
              {isSpeaking ? <Volume2 className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
            </button>
          </div>

          {/* Active sentence displayed large for kids to read easily */}
          <div className="flex-1 flex items-center justify-center py-6 text-center">
            <p className="text-lg font-bold text-gray-700 leading-relaxed tracking-wide px-1">
              {activeSentence}
            </p>
          </div>

          {/* Page navigation controls */}
          <div className="flex justify-between items-center pt-3 border-t border-gray-50 select-none">
            <button
              onClick={handlePrev}
              disabled={activeSentenceIndex === 0}
              className={`flex items-center gap-1.5 py-2.5 px-4 rounded-xl text-xs font-bold border transition-all ${
                activeSentenceIndex === 0
                  ? 'bg-gray-50 border-gray-100 text-gray-300 cursor-not-allowed opacity-50'
                  : 'bg-[#FCF8F2] hover:bg-amber-50 text-gray-600 active:scale-95 cursor-pointer'
              }`}
            >
              Prev
            </button>

            {/* Pagination dots */}
            <div className="flex gap-1.5">
              {activeStory.sentences.map((_, i) => (
                <div
                  key={i}
                  className={`w-2.5 h-2.5 rounded-full transition-all ${
                    i === activeSentenceIndex ? 'bg-amber-400 w-5' : 'bg-gray-200'
                  }`}
                />
              ))}
            </div>

            <button
              onClick={handleNext}
              className="flex items-center gap-1.5 py-2.5 px-4 bg-amber-400 hover:bg-amber-500 text-white rounded-xl text-xs font-bold shadow-md transition-all active:scale-95 cursor-pointer"
            >
              {activeSentenceIndex === activeStory.sentences.length - 1 ? 'Selesai!' : 'Next'}
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Tip banner for parent involvement */}
        <div className="mt-4 select-none">
          <div className="bg-[#54B0EE] rounded-3xl p-4 text-white flex items-center gap-3 shadow-md">
            <div className="text-2xl">💡</div>
            <p className="text-[11px] font-medium leading-relaxed">
              <strong>Tip untuk Orang Tua:</strong> Dampingi si kecil saat membaca dan tirukan suara narasi bahasa Inggris untuk menguji pelafalannya!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
