import React, { useState } from 'react';
import { AppScreen } from '../types';
import { LoginScreen } from './LoginScreen';
import { DashboardScreen } from './DashboardScreen';
import { LettersScreen } from './LettersScreen';
import { NumbersScreen } from './NumbersScreen';
import { ShapesScreen } from './ShapesScreen';
import { ReadingScreen } from './ReadingScreen';
import { AnalysisScreen } from './AnalysisScreen';
import { SettingsScreen } from './SettingsScreen';
import { Wifi, Battery, Radio } from 'lucide-react';

export const PhoneSimulator: React.FC = () => {
  const [activeScreen, setActiveScreen] = useState<AppScreen>('login');
  const [username, setUsername] = useState('Charmie');
  
  // Voice & Theme State synced from Settings Screen
  const [voiceRate, setVoiceRate] = useState(1.0);
  const [voicePitch, setVoicePitch] = useState(1.1);
  const [soundEffects, setSoundEffects] = useState(true);
  const [simBgColor, setSimBgColor] = useState('bg-[#FCF8F2]');

  // Handle Login authentication sequence
  const handleLogin = (user: string) => {
    setUsername(user);
    setActiveScreen('dashboard');
  };

  const handleLogout = () => {
    setActiveScreen('login');
  };

  // Switch content dynamically inside the phone wrapper frame
  const renderScreenContent = () => {
    switch (activeScreen) {
      case 'login':
        return <LoginScreen onLogin={handleLogin} />;
      case 'dashboard':
        return (
          <DashboardScreen
            username={username}
            onSelectScreen={(screen) => setActiveScreen(screen)}
            onLogout={handleLogout}
          />
        );
      case 'letters':
        return <LettersScreen onBack={() => setActiveScreen('dashboard')} />;
      case 'numbers':
        return <NumbersScreen onBack={() => setActiveScreen('dashboard')} />;
      case 'shapes':
        return <ShapesScreen onBack={() => setActiveScreen('dashboard')} />;
      case 'reading':
        return <ReadingScreen onBack={() => setActiveScreen('dashboard')} />;
      case 'learning-analysis':
        return <AnalysisScreen onBack={() => setActiveScreen('dashboard')} />;
      case 'settings':
        return (
          <SettingsScreen
            onBack={() => setActiveScreen('dashboard')}
            voiceRate={voiceRate}
            setVoiceRate={setVoiceRate}
            voicePitch={voicePitch}
            setVoicePitch={setVoicePitch}
            soundEffects={soundEffects}
            setSoundEffects={setSoundEffects}
            simBgColor={simBgColor}
            setSimBgColor={setSimBgColor}
          />
        );
      default:
        return <LoginScreen onLogin={handleLogin} />;
    }
  };

  return (
    <div className="relative mx-auto w-full max-w-[340px] h-[680px] bg-white rounded-[45px] p-3.5 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.25)] border-4 border-gray-100 flex flex-col select-none">
      
      {/* Speaker Notch cutout top */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-white rounded-b-2xl z-30 shadow-[inset_0_-2px_4px_rgba(0,0,0,0.03)] flex items-center justify-center">
        <div className="w-12 h-1 bg-gray-200 rounded-full mb-1" />
        <div className="w-2.5 h-2.5 bg-gray-800 rounded-full ml-2 mb-1" />
      </div>

      {/* Side buttons rockers decorations */}
      <div className="absolute -left-[6px] top-24 w-[2px] h-12 bg-gray-300 rounded-l-md" />
      <div className="absolute -left-[6px] top-40 w-[2px] h-10 bg-gray-300 rounded-l-md" />
      <div className="absolute -left-[6px] top-52 w-[2px] h-10 bg-gray-300 rounded-l-md" />
      <div className="absolute -right-[6px] top-28 w-[2px] h-16 bg-gray-300 rounded-r-md" />

      {/* Screen container */}
      <div className={`w-full h-full rounded-[36px] overflow-hidden relative flex flex-col justify-between ${simBgColor} transition-colors duration-500`}>
        
        {/* Absolute Top Status bar inside phone display */}
        <div className="pt-2 px-6 flex justify-between items-center text-gray-500 text-[10px] font-bold tracking-wider z-20 select-none">
          <span>09:41</span>
          
          <div className="flex items-center gap-1">
            <Radio className="w-3.5 h-3.5 stroke-[2.5]" />
            <Wifi className="w-3.5 h-3.5 stroke-[2.5]" />
            <Battery className="w-4 h-4 stroke-[2.5]" />
          </div>
        </div>

        {/* Screen Dynamic Inner viewport */}
        <div className="flex-1 overflow-hidden relative">
          {renderScreenContent()}
        </div>

        {/* Home Indicator bar line bottom */}
        <div className="pb-1.5 flex justify-center w-full z-20 select-none">
          <button
            onClick={() => {
              if (activeScreen !== 'login') {
                setActiveScreen('dashboard');
              }
            }}
            className="w-24 h-1 bg-gray-300 hover:bg-gray-400 rounded-full transition-colors active:scale-95 cursor-pointer"
            title="Kembali ke Dashboard Utama"
          />
        </div>

      </div>
    </div>
  );
};
