import React, { useState } from 'react';
import { DinosaurIllustration } from './DinosaurIllustration';

interface LoginScreenProps {
  onLogin: (username: string) => void;
}

export const LoginScreen: React.FC<LoginScreenProps> = ({ onLogin }) => {
  const [username, setUsername] = useState('Charmie');
  const [password, setPassword] = useState('••••••••');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!username.trim()) {
      setError('Masukkan nama panggilanmu!');
      return;
    }
    setError('');
    onLogin(username);
  };

  return (
    <div className="flex flex-col h-full bg-[#FCF8F2] relative justify-between overflow-hidden font-sans">
      {/* Top clouds spacing */}
      <div className="pt-6 px-6 text-center select-none">
        {/* Colorful bubbly Kidszoo Logo */}
        <h1 className="text-4xl font-bold tracking-wider mb-1 flex justify-center items-center gap-0.5">
          <span className="text-rose-500 transform hover:scale-110 transition-transform cursor-pointer drop-shadow-[0_2px_0_rgba(244,63,94,0.2)]">K</span>
          <span className="text-amber-500 transform hover:scale-110 transition-transform cursor-pointer drop-shadow-[0_2px_0_rgba(245,158,11,0.2)]">i</span>
          <span className="text-sky-500 transform hover:scale-110 transition-transform cursor-pointer drop-shadow-[0_2px_0_rgba(56,189,248,0.2)]">d</span>
          <span className="text-emerald-500 transform hover:scale-110 transition-transform cursor-pointer drop-shadow-[0_2px_0_rgba(16,185,129,0.2)]">s</span>
          <span className="text-indigo-500 transform hover:scale-110 transition-transform cursor-pointer drop-shadow-[0_2px_0_rgba(99,102,241,0.2)]">z</span>
          <span className="text-orange-500 transform hover:scale-110 transition-transform cursor-pointer drop-shadow-[0_2px_0_rgba(249,115,22,0.2)]">o</span>
          <span className="text-teal-500 transform hover:scale-110 transition-transform cursor-pointer drop-shadow-[0_2px_0_rgba(20,184,166,0.2)]">o</span>
        </h1>
        <p className="text-xs text-gray-400 font-medium tracking-wide">Aplikasi Belajar & Bermain Anak</p>
      </div>

      {/* Login Form */}
      <form onSubmit={handleSubmit} className="px-6 flex flex-col gap-4 z-10">
        {error && (
          <div className="text-center text-xs text-rose-500 bg-rose-50 border border-rose-100 rounded-lg py-1 px-2">
            {error}
          </div>
        )}

        {/* Username field */}
        <div className="relative">
          <input
            id="login-username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Username"
            className="w-full bg-white border border-gray-100 rounded-full py-3 px-5 text-sm font-medium text-gray-700 outline-none placeholder-gray-400 focus:border-amber-400 focus:ring-2 focus:ring-amber-200 transition-all shadow-[0_2px_6px_rgba(0,0,0,0.03)]"
          />
        </div>

        {/* Password field */}
        <div className="relative">
          <input
            id="login-password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="w-full bg-white border border-gray-100 rounded-full py-3 px-5 text-sm font-medium text-gray-700 outline-none placeholder-gray-400 focus:border-amber-400 focus:ring-2 focus:ring-amber-200 transition-all shadow-[0_2px_6px_rgba(0,0,0,0.03)]"
          />
        </div>

        {/* Forgot Password */}
        <div className="text-right">
          <button
            type="button"
            onClick={() => alert('Fitur reset password disimulasikan untuk demo!')}
            className="text-xs font-semibold text-gray-600 hover:text-amber-500 transition-colors"
          >
            Forgot Password?
          </button>
        </div>

        {/* GO Button */}
        <button
          id="login-submit"
          type="submit"
          className="w-full bg-[#EBA04E] hover:bg-[#d98b37] text-white font-bold py-3.5 rounded-full shadow-[0_4px_10px_rgba(235,160,78,0.4)] active:scale-95 transition-all text-center tracking-wider text-sm outline-none cursor-pointer"
        >
          GO
        </button>

        {/* Sign up prompt */}
        <div className="text-center">
          <p className="text-xs text-gray-500 font-medium">
            Don't have account yet?{' '}
            <button
              type="button"
              onClick={() => alert('Pendaftaran akun disimulasikan untuk demo!')}
              className="font-bold text-emerald-500 hover:underline cursor-pointer"
            >
              Sign up
            </button>
          </p>
        </div>
      </form>

      {/* Illustration & Water Waves */}
      <div className="relative w-full overflow-hidden select-none">
        <DinosaurIllustration className="w-full -mb-1 mt-2 transform scale-105" />
      </div>
    </div>
  );
};
