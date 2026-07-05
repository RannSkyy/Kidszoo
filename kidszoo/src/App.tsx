import React, { useState, useEffect } from 'react';
import { PhoneSimulator } from './components/PhoneSimulator';
import { TESTIMONIALS } from './data';
import { ContactFormData } from './types';
import { motion, AnimatePresence } from 'motion/react';
import {
  Star,
  Sparkles,
  Check,
  ArrowUp,
  Menu,
  X,
  BookOpen,
  Volume2,
  Trophy,
  Activity,
  Phone,
  Mail,
  MapPin,
  Heart,
  Smile,
  Compass,
  Award
} from 'lucide-react';

export default function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  // Contact form state
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    role: 'parent',
    message: '',
  });
  const [formErrors, setFormErrors] = useState<Partial<ContactFormData>>({});
  const [formSuccess, setFormSuccess] = useState(false);

  // Monitor scroll for Back-to-Top and Active Navbar indicators
  useEffect(() => {
    const handleScroll = () => {
      // Back to top visibility
      if (window.scrollY > 400) {
        setShowBackToTop(true);
      } else {
        setShowBackToTop(false);
      }

      // Section tracking
      const sections = ['home', 'features', 'demo', 'testimonials', 'contact'];
      const scrollPos = window.scrollY + 120;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(section);
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleScrollTo = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      const topOffset = element.offsetTop - 80;
      window.scrollTo({
        top: topOffset,
        behavior: 'smooth',
      });
    }
  };

  // Contact Form submit handler
  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errors: Partial<ContactFormData> = {};

    if (!formData.name.trim()) errors.name = 'Nama lengkap wajib diisi!';
    if (!formData.email.trim()) {
      errors.email = 'Alamat email wajib diisi!';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = 'Format email tidak valid!';
    }
    if (!formData.message.trim()) errors.message = 'Pesan wajib diisi!';

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    setFormErrors({});
    setFormSuccess(true);
    
    // Reset form
    setFormData({
      name: '',
      email: '',
      role: 'parent',
      message: '',
    });
  };

  return (
    <div className="min-h-screen bg-[#FDFBF7] text-gray-800 font-sans antialiased overflow-x-hidden selection:bg-amber-200">
      
      {/* Sticky Header Navigation */}
      <header className="sticky top-0 z-50 bg-[#FDFBF7]/90 backdrop-blur-md border-b border-amber-100/60 transition-all shadow-[0_2px_15px_rgba(251,191,36,0.04)]">
        <div className="max-w-7xl mx-auto px-6 h-18 flex items-center justify-between">
          
          {/* Logo Bubbly */}
          <div
            onClick={() => handleScrollTo('home')}
            className="flex items-center gap-1.5 cursor-pointer group select-none"
          >
            <div className="w-10 h-10 bg-amber-400 rounded-2xl flex items-center justify-center text-xl shadow-md transform group-hover:rotate-12 transition-transform">
              🦖
            </div>
            <h1 className="text-2xl font-bold tracking-tight flex items-center">
              <span className="text-rose-500 font-black">K</span>
              <span className="text-amber-500 font-black">i</span>
              <span className="text-sky-500 font-black">d</span>
              <span className="text-emerald-500 font-black">s</span>
              <span className="text-indigo-500 font-black">z</span>
              <span className="text-orange-500 font-black">o</span>
              <span className="text-teal-500 font-black">o</span>
            </h1>
          </div>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center gap-8 font-semibold text-sm text-gray-600">
            {[
              { id: 'home', label: 'Home' },
              { id: 'features', label: 'Fitur Unggulan' },
              { id: 'demo', label: 'Demo Interaktif' },
              { id: 'testimonials', label: 'Testimoni Orang Tua' },
              { id: 'contact', label: 'Hubungi Kami' },
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => handleScrollTo(item.id)}
                className={`relative py-1 cursor-pointer transition-colors hover:text-amber-500 ${
                  activeSection === item.id ? 'text-amber-500 font-extrabold' : ''
                }`}
              >
                {item.label}
                {activeSection === item.id && (
                  <motion.div
                    layoutId="activeIndicator"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-amber-400 rounded-full"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
              </button>
            ))}
          </nav>

          {/* Desktop Call To Action */}
          <div className="hidden md:block">
            <button
              onClick={() => handleScrollTo('demo')}
              className="bg-[#EBA04E] hover:bg-[#d98b37] text-white font-extrabold px-6 py-2.5 rounded-full shadow-[0_4px_12px_rgba(235,160,78,0.3)] transition-all transform hover:-translate-y-0.5 active:scale-95 text-xs tracking-wider uppercase cursor-pointer"
            >
              Mainkan Demo
            </button>
          </div>

          {/* Mobile hamburger menu trigger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 md:hidden hover:bg-amber-50 rounded-xl transition-colors cursor-pointer text-gray-700"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </header>

      {/* Mobile Drawer Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-18 left-0 right-0 bg-[#FDFBF7] border-b border-amber-100 shadow-xl z-40 md:hidden p-6 select-none"
          >
            <div className="flex flex-col gap-4 font-semibold text-gray-700">
              {[
                { id: 'home', label: 'Home' },
                { id: 'features', label: 'Fitur Unggulan' },
                { id: 'demo', label: 'Demo Interaktif' },
                { id: 'testimonials', label: 'Testimoni Orang Tua' },
                { id: 'contact', label: 'Hubungi Kami' },
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleScrollTo(item.id)}
                  className={`py-2 text-left hover:text-amber-500 border-b border-gray-50 cursor-pointer ${
                    activeSection === item.id ? 'text-amber-500 font-extrabold' : ''
                  }`}
                >
                  {item.label}
                </button>
              ))}
              <button
                onClick={() => handleScrollTo('demo')}
                className="w-full mt-2 bg-[#EBA04E] hover:bg-[#d98b37] text-white font-extrabold py-3 rounded-full text-center shadow-md transition-all cursor-pointer"
              >
                Coba Demo Sekarang
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero Section */}
      <section id="home" className="relative pt-10 pb-20 md:py-24 overflow-hidden select-none">
        {/* Floating background blobs */}
        <div className="absolute -left-20 -top-20 w-80 h-80 bg-amber-200/30 rounded-full blur-3xl -z-10" />
        <div className="absolute -right-20 top-40 w-96 h-96 bg-rose-200/20 rounded-full blur-3xl -z-10" />
        <div className="absolute left-1/3 bottom-10 w-72 h-72 bg-emerald-200/20 rounded-full blur-3xl -z-10" />

        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-12 gap-12 items-center">
          
          {/* Pitch Information Left */}
          <div className="md:col-span-7 flex flex-col gap-6 text-center md:text-left">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 bg-amber-100 border border-amber-200 text-amber-800 px-4 py-1.5 rounded-full font-bold text-xs max-w-max mx-auto md:mx-0 shadow-sm"
            >
              <Sparkles className="w-4 h-4 text-amber-500 fill-amber-300" />
              <span>Aplikasi Edukasi Anak Usia Dini Terfavorit</span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.6 }}
              className="text-4xl md:text-5.5xl font-extrabold tracking-tight text-gray-900 leading-[1.12]"
            >
              Belajar Alfabet, Berhitung & Bentuk Jadi Lebih{' '}
              <span className="text-[#EBA04E] underline decoration-wavy decoration-amber-300">Menyenangkan!</span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="text-lg text-gray-600 font-medium leading-relaxed max-w-xl mx-auto md:mx-0"
            >
              Kidszoo adalah platform belajar awal yang interaktif untuk si kecil menguasai huruf A-Z, berhitung, membaca cerita, dan mengenali bentuk dengan permainan visual ceria, efek suara, dan panduan audio bersahabat.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="flex flex-col sm:flex-row gap-3 justify-center md:justify-start mt-2"
            >
              <button
                onClick={() => handleScrollTo('demo')}
                className="bg-[#EBA04E] hover:bg-[#d98b37] text-white font-black px-8 py-4 rounded-full shadow-lg shadow-amber-500/20 active:scale-95 transition-all text-sm tracking-wider uppercase cursor-pointer"
              >
                Coba Demo Interaktif
              </button>
              <button
                onClick={() => handleScrollTo('features')}
                className="bg-white border-2 border-amber-200 hover:border-amber-400 text-amber-700 hover:bg-amber-50/20 font-black px-8 py-4 rounded-full shadow-sm active:scale-95 transition-all text-sm tracking-wider uppercase cursor-pointer"
              >
                Pelajari Fitur
              </button>
            </motion.div>

            {/* Micro proof badges */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="flex items-center justify-center md:justify-start gap-8 mt-6 border-t border-amber-100/60 pt-6 text-xs text-gray-500 font-bold"
            >
              <div className="flex items-center gap-2">
                <span className="text-xl">🛡️</span>
                <span>100% Aman Untuk Anak</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xl">🚫</span>
                <span>Bebas Iklan Pengganggu</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xl">🗣️</span>
                <span>Panduan Audio Phonics</span>
              </div>
            </motion.div>
          </div>

          {/* Interactive Phone Simulator Right */}
          <div className="md:col-span-5 flex justify-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, type: 'spring', bounce: 0.2 }}
              className="relative"
            >
              {/* Highlight background accent ring */}
              <div className="absolute inset-0 bg-amber-400 rounded-[50px] rotate-3 -z-10 blur-xl opacity-25" />
              <div className="absolute inset-0 bg-emerald-400 rounded-[50px] -rotate-3 -z-10 blur-xl opacity-25" />
              
              <PhoneSimulator />
            </motion.div>
          </div>

        </div>
      </section>

      {/* Features Showcase Division */}
      <section id="features" className="py-20 bg-amber-50/20 border-y border-amber-100/50">
        <div className="max-w-7xl mx-auto px-6">
          
          <div className="text-center max-w-2xl mx-auto mb-16 select-none">
            <span className="text-xs font-black text-amber-600 bg-amber-100 border border-amber-200 px-3.5 py-1 rounded-full uppercase tracking-wider">
              METODE KIDSZOO
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mt-3 tracking-tight">
              Mengapa Orang Tua & Guru Menyukai Kidszoo?
            </h2>
            <p className="text-gray-500 font-medium mt-3 leading-relaxed">
              Kami menggabungkan estetika desain anak yang bersahabat dengan interaksi aktif untuk melatih kognitif dan verbal anak usia 3-6 tahun.
            </p>
          </div>

          {/* Features Grid */}
          <div className="grid md:grid-cols-4 gap-6">
            
            {/* Feature 1 */}
            <motion.div
              whileHover={{ y: -8 }}
              className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm flex flex-col justify-between"
            >
              <div>
                <div className="w-12 h-12 bg-rose-100 border border-rose-200 rounded-2xl flex items-center justify-center text-2xl shadow-sm mb-5 select-none">
                  🎨
                </div>
                <h3 className="text-base font-extrabold text-gray-800 leading-snug mb-2">Desain Pastel Eye-Safe</h3>
                <p className="text-xs text-gray-500 leading-relaxed font-medium">
                  Menggunakan kombinasi warna pastel lembut, sudut melingkar ramah anak, serta ilustrasi lucu yang merangsang fokus visual tanpa melelahkan mata.
                </p>
              </div>
              <div className="mt-4 text-rose-500 font-bold text-xs select-none">Estetika Sempurna 🎨</div>
            </motion.div>

            {/* Feature 2 */}
            <motion.div
              whileHover={{ y: -8 }}
              className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm flex flex-col justify-between"
            >
              <div>
                <div className="w-12 h-12 bg-amber-100 border border-amber-200 rounded-2xl flex items-center justify-center text-2xl shadow-sm mb-5 select-none">
                  🔊
                </div>
                <h3 className="text-base font-extrabold text-gray-800 leading-snug mb-2">Suara Pelafalan (Audio)</h3>
                <p className="text-xs text-gray-500 leading-relaxed font-medium">
                  Dilengkapi teknologi pembaca suara ramah anak (English & Indonesian phonics). Setiap ketukan huruf dan kata akan melafalkan suaranya secara otomatis.
                </p>
              </div>
              <div className="mt-4 text-amber-600 font-bold text-xs select-none">Teknologi Web Speech 🔊</div>
            </motion.div>

            {/* Feature 3 */}
            <motion.div
              whileHover={{ y: -8 }}
              className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm flex flex-col justify-between"
            >
              <div>
                <div className="w-12 h-12 bg-emerald-100 border border-emerald-200 rounded-2xl flex items-center justify-center text-2xl shadow-sm mb-5 select-none">
                  🎮
                </div>
                <h3 className="text-base font-extrabold text-gray-800 leading-snug mb-2">Pemberian Skor & Kuis</h3>
                <p className="text-xs text-gray-500 leading-relaxed font-medium">
                  Setiap modul diisi kuis ceria seperti tebak kata alfabet, permainan berhitung benda, dan pencocokan bentuk untuk melatih ketangkasan anak.
                </p>
              </div>
              <div className="mt-4 text-emerald-600 font-bold text-xs select-none">Belajar Sambil Bermain 🧩</div>
            </motion.div>

            {/* Feature 4 */}
            <motion.div
              whileHover={{ y: -8 }}
              className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm flex flex-col justify-between"
            >
              <div>
                <div className="w-12 h-12 bg-indigo-100 border border-indigo-200 rounded-2xl flex items-center justify-center text-2xl shadow-sm mb-5 select-none">
                  📊
                </div>
                <h3 className="text-base font-extrabold text-gray-800 leading-snug mb-2">Analisis Aktivitas</h3>
                <p className="text-xs text-gray-500 leading-relaxed font-medium">
                  Dashboard analitis khusus membantu orang tua memantau durasi belajar harian, tingkat keakuratan kuis, serta bab kurikulum yang telah dikuasai si kecil.
                </p>
              </div>
              <div className="mt-4 text-indigo-600 font-bold text-xs select-none">Transparan Bagi Orang Tua 📊</div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* Interactive Showcase / Demo Guide Section */}
      <section id="demo" className="py-20 select-none">
        <div className="max-w-7xl mx-auto px-6">
          <div className="bg-white rounded-[40px] p-8 md:p-12 border border-amber-100 shadow-lg grid md:grid-cols-12 gap-10 items-center">
            
            {/* Guide Text Left */}
            <div className="md:col-span-6 flex flex-col gap-6">
              <span className="text-xs font-black text-amber-600 bg-amber-50 border border-amber-100 px-3.5 py-1 rounded-full uppercase tracking-wider max-w-max">
                UJI COBA APLIKASI
              </span>
              <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight leading-tight">
                Bagaimana Cara Menggunakan Demo Kidszoo?
              </h2>
              <p className="text-sm text-gray-600 font-medium leading-relaxed">
                Kamu dapat langsung berinteraksi dengan replika hp Kidszoo di sebelah kanan! Ketuk tombol-tombol berikut untuk melompat langsung ke halaman modul yang ingin kamu uji:
              </p>

              <div className="grid grid-cols-2 gap-3 mt-2">
                <div className="flex items-start gap-2.5 p-3 bg-amber-50/50 rounded-2xl border border-amber-100/60">
                  <div className="w-6 h-6 bg-amber-400 rounded-lg flex items-center justify-center text-xs font-bold text-white">1</div>
                  <div>
                    <h4 className="text-xs font-bold text-gray-800">Login Sesi</h4>
                    <p className="text-[10px] text-gray-400 font-semibold mt-0.5 leading-snug">Gunakan tombol "GO" di hp untuk login.</p>
                  </div>
                </div>

                <div className="flex items-start gap-2.5 p-3 bg-[#F2F4FC]/50 rounded-2xl border border-blue-100">
                  <div className="w-6 h-6 bg-[#EBA04E] rounded-lg flex items-center justify-center text-xs font-bold text-white">2</div>
                  <div>
                    <h4 className="text-xs font-bold text-gray-800">Belajar Huruf A-Z</h4>
                    <p className="text-[10px] text-gray-400 font-semibold mt-0.5 leading-snug">Klik huruf di sidebar untuk memicu suara.</p>
                  </div>
                </div>

                <div className="flex items-start gap-2.5 p-3 bg-green-50/50 rounded-2xl border border-green-100">
                  <div className="w-6 h-6 bg-[#5CB895] rounded-lg flex items-center justify-center text-xs font-bold text-white">3</div>
                  <div>
                    <h4 className="text-xs font-bold text-gray-800">Belajar Angka</h4>
                    <p className="text-[10px] text-gray-400 font-semibold mt-0.5 leading-snug">Sesuaikan angka untuk berhitung hewan.</p>
                  </div>
                </div>

                <div className="flex items-start gap-2.5 p-3 bg-rose-50/50 rounded-2xl border border-rose-100">
                  <div className="w-6 h-6 bg-rose-400 rounded-lg flex items-center justify-center text-xs font-bold text-white">4</div>
                  <div>
                    <h4 className="text-xs font-bold text-gray-800">Suaikan Bentuk</h4>
                    <p className="text-[10px] text-gray-400 font-semibold mt-0.5 leading-snug">Pasangkan segitiga & bintang ke slotnya.</p>
                  </div>
                </div>
              </div>

              <div className="bg-[#54B0EE]/10 border border-[#54B0EE]/20 p-4 rounded-3xl mt-2 flex items-center gap-3">
                <div className="text-2xl">👩‍🏫</div>
                <p className="text-[11px] font-medium leading-relaxed text-gray-700">
                  <strong>Apakah kamu mendengar suaranya?</strong> Pastikan speaker komputer atau ponselmu menyala ketika menekan huruf di sidebar untuk mendengar pembacaan bersuara!
                </p>
              </div>
            </div>

            {/* Simulated Frame Right */}
            <div className="md:col-span-6 flex justify-center">
              <div className="relative">
                {/* Decorative kids graphic background element behind phone */}
                <div className="absolute -left-12 -bottom-10 text-5xl animate-bounce">🦖</div>
                <div className="absolute -right-10 -top-10 text-5xl">🎈</div>
                
                <PhoneSimulator />
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-20 bg-amber-50/20 border-t border-amber-100/50 select-none">
        <div className="max-w-7xl mx-auto px-6">
          
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-xs font-black text-amber-600 bg-amber-100 border border-amber-200 px-3.5 py-1 rounded-full uppercase tracking-wider">
              TESTIMONI
            </span>
            <h2 className="text-3xl font-extrabold text-gray-900 mt-3 tracking-tight">
              Dipercaya oleh Ribuan Orang Tua & Guru
            </h2>
            <p className="text-gray-500 font-medium mt-3 leading-relaxed">
              Berikut adalah kisah nyata dari para wali murid dan pendidik anak usia dini yang merasakan kemudahan mengajar bersama Kidszoo.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {TESTIMONIALS.map((test) => (
              <div
                key={test.id}
                className="bg-white rounded-[32px] p-6 border border-gray-100 shadow-sm flex flex-col justify-between"
              >
                <div>
                  {/* Rating Stars */}
                  <div className="flex gap-1 mb-4">
                    {Array.from({ length: test.rating }).map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>

                  <p className="text-xs text-gray-600 font-medium leading-relaxed italic mb-6">
                    "{test.content}"
                  </p>
                </div>

                <div className="flex items-center gap-3 pt-4 border-t border-gray-50">
                  <div className="w-10 h-10 bg-amber-100 rounded-full flex items-center justify-center text-xl shadow-sm">
                    {test.avatar}
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-gray-800 leading-none">{test.name}</h4>
                    <span className="text-[10px] text-gray-400 font-bold tracking-wide">{test.role}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* Contact Form Section */}
      <section id="contact" className="py-20">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-12 gap-12">
          
          {/* Information Column Left */}
          <div className="md:col-span-5 flex flex-col gap-6 justify-center">
            <span className="text-xs font-black text-amber-600 bg-amber-100 border border-amber-200 px-3.5 py-1 rounded-full uppercase tracking-wider max-w-max select-none">
              HUBUNGI KAMI
            </span>
            <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight leading-tight select-none">
              Punya Pertanyaan atau Ingin Kerja Sama Sekolah?
            </h2>
            <p className="text-sm text-gray-600 font-medium leading-relaxed select-none">
              Kami selalu siap menerima masukan, keluhan, maupun permohonan kerja sama program PAUD/TK dari sekolah Anda. Silakan hubungi sekretariat kami atau kirim pesan langsung melalui formulir interaktif di sebelah kanan!
            </p>

            <div className="flex flex-col gap-4 mt-2 select-none">
              <div className="flex items-center gap-3 text-sm font-semibold text-gray-700">
                <div className="w-9 h-9 bg-amber-100 rounded-xl flex items-center justify-center text-amber-600">
                  <Mail className="w-4 h-4" />
                </div>
                <span>info@kidszoo-academy.com</span>
              </div>
              <div className="flex items-center gap-3 text-sm font-semibold text-gray-700">
                <div className="w-9 h-9 bg-rose-100 rounded-xl flex items-center justify-center text-rose-600">
                  <Phone className="w-4 h-4" />
                </div>
                <span>+62 812-3456-7890</span>
              </div>
              <div className="flex items-center gap-3 text-sm font-semibold text-gray-700">
                <div className="w-9 h-9 bg-emerald-100 rounded-xl flex items-center justify-center text-emerald-600">
                  <MapPin className="w-4 h-4" />
                </div>
                <span>Gedung Eduka Pratama, Jakarta Selatan</span>
              </div>
            </div>
          </div>

          {/* Interactive Form Right */}
          <div className="md:col-span-7">
            <div className="bg-white rounded-[32px] p-6 md:p-8 border border-amber-100 shadow-md relative">
              <h3 className="text-lg font-extrabold text-gray-800 mb-6 select-none">Formulir Kontak Kidszoo</h3>

              <form onSubmit={handleContactSubmit} className="flex flex-col gap-4">
                
                {/* Full Name */}
                <div>
                  <label htmlFor="form-name" className="block text-xs font-black text-gray-500 uppercase tracking-wide mb-1.5 select-none">Nama Lengkap</label>
                  <input
                    id="form-name"
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Masukkan nama panggilan atau nama lengkap"
                    className="w-full bg-gray-50 border border-gray-100 rounded-2xl py-3 px-4 text-sm font-semibold text-gray-700 outline-none placeholder-gray-400 focus:border-amber-400 focus:bg-white focus:ring-2 focus:ring-amber-200 transition-all shadow-inner"
                  />
                  {formErrors.name && <p className="text-xs text-rose-500 font-bold mt-1.5 select-none">{formErrors.name}</p>}
                </div>

                {/* Email Address */}
                <div>
                  <label htmlFor="form-email" className="block text-xs font-black text-gray-500 uppercase tracking-wide mb-1.5 select-none">Alamat Email</label>
                  <input
                    id="form-email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="contoh@alamat-email.com"
                    className="w-full bg-gray-50 border border-gray-100 rounded-2xl py-3 px-4 text-sm font-semibold text-gray-700 outline-none placeholder-gray-400 focus:border-amber-400 focus:bg-white focus:ring-2 focus:ring-amber-200 transition-all shadow-inner"
                  />
                  {formErrors.email && <p className="text-xs text-rose-500 font-bold mt-1.5 select-none">{formErrors.email}</p>}
                </div>

                {/* Role dropdown selection */}
                <div>
                  <label htmlFor="form-role" className="block text-xs font-black text-gray-500 uppercase tracking-wide mb-1.5 select-none">Saya Adalah</label>
                  <select
                    id="form-role"
                    value={formData.role}
                    onChange={(e) => setFormData({ ...formData, role: e.target.value as any })}
                    className="w-full bg-gray-50 border border-gray-100 rounded-2xl py-3 px-4 text-sm font-semibold text-gray-700 outline-none focus:border-amber-400 focus:bg-white focus:ring-2 focus:ring-amber-200 transition-all shadow-sm cursor-pointer"
                  >
                    <option value="parent">Orang Tua / Wali Murid 🏡</option>
                    <option value="teacher">Guru / Lembaga PAUD-TK 🏫</option>
                    <option value="other">Lainnya / Kolaborator Konten 🎒</option>
                  </select>
                </div>

                {/* Detailed Message */}
                <div>
                  <label htmlFor="form-message" className="block text-xs font-black text-gray-500 uppercase tracking-wide mb-1.5 select-none">Isi Pesan</label>
                  <textarea
                    id="form-message"
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Tuliskan masukan, pertanyaan, atau permohonan kerja samamu di sini..."
                    className="w-full bg-gray-50 border border-gray-100 rounded-2xl py-3 px-4 text-sm font-semibold text-gray-700 outline-none placeholder-gray-400 focus:border-amber-400 focus:bg-white focus:ring-2 focus:ring-amber-200 transition-all shadow-inner resize-none"
                  />
                  {formErrors.message && <p className="text-xs text-rose-500 font-bold mt-1.5 select-none">{formErrors.message}</p>}
                </div>

                {/* Submit button */}
                <button
                  id="form-submit"
                  type="submit"
                  className="w-full bg-[#EBA04E] hover:bg-[#d98b37] text-white font-black py-4 rounded-2xl shadow-md active:scale-98 transition-all text-xs tracking-wider uppercase cursor-pointer"
                >
                  KIRIM PESAN SEKARANG
                </button>

              </form>

              {/* Success Overlay Modal */}
              <AnimatePresence>
                {formSuccess && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 bg-[#FDFBF7] rounded-[32px] p-6 flex flex-col items-center justify-center text-center z-10"
                  >
                    <motion.div
                      initial={{ scale: 0.8, y: 15 }}
                      animate={{ scale: 1, y: 0 }}
                      className="w-16 h-16 bg-emerald-100 border border-emerald-200 text-emerald-600 rounded-full flex items-center justify-center text-3xl mb-4 shadow-sm"
                    >
                      🎉
                    </motion.div>
                    <h4 className="text-lg font-black text-gray-800 leading-snug">Pesan Terkirim Sukses!</h4>
                    <p className="text-xs text-gray-500 font-medium leading-relaxed max-w-xs mt-2 select-none">
                      Terima kasih atas pesannya! Tim Kidszoo akan meninjau dan merespons pesanmu dalam waktu maksimal 24 jam ke email yang dicantumkan.
                    </p>
                    <button
                      onClick={() => setFormSuccess(false)}
                      className="mt-6 bg-[#EBA04E] hover:bg-[#d98b37] text-white font-extrabold px-6 py-2.5 rounded-xl shadow-md text-xs tracking-wide cursor-pointer"
                    >
                      Kirim Pesan Baru
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>

            </div>
          </div>

        </div>
      </section>

      {/* Playful Footer */}
      <footer className="bg-gray-950 text-white/90 pt-16 pb-8 border-t border-amber-100/10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-12 gap-10 border-b border-white/5 pb-12 select-none">
            
            {/* Info Col */}
            <div className="md:col-span-5 flex flex-col gap-4">
              <div className="flex items-center gap-1.5">
                <div className="w-8 h-8 bg-amber-400 rounded-xl flex items-center justify-center text-lg shadow-md">
                  🦖
                </div>
                <h3 className="text-xl font-bold tracking-tight">Kidszoo</h3>
              </div>
              <p className="text-xs text-gray-400 leading-relaxed font-medium max-w-sm">
                Kidszoo adalah komitmen kami untuk memfasilitasi anak-anak usia prasekolah agar dapat belajar membaca, berhitung, dan mengenali bentuk secara ceria, mandiri, dan bebas iklan berbahaya.
              </p>
            </div>

            {/* Quicklinks */}
            <div className="md:col-span-3 flex flex-col gap-3">
              <h4 className="text-xs font-black text-gray-400 uppercase tracking-wider">Navigasi Cepat</h4>
              <ul className="flex flex-col gap-2 text-xs font-semibold text-gray-300">
                <li><button onClick={() => handleScrollTo('home')} className="hover:text-amber-400 transition-colors cursor-pointer text-left">Home</button></li>
                <li><button onClick={() => handleScrollTo('features')} className="hover:text-amber-400 transition-colors cursor-pointer text-left">Fitur Unggulan</button></li>
                <li><button onClick={() => handleScrollTo('demo')} className="hover:text-amber-400 transition-colors cursor-pointer text-left">Demo Interaktif</button></li>
                <li><button onClick={() => handleScrollTo('testimonials')} className="hover:text-amber-400 transition-colors cursor-pointer text-left">Testimoni</button></li>
              </ul>
            </div>

            {/* Legal */}
            <div className="md:col-span-4 flex flex-col gap-3">
              <h4 className="text-xs font-black text-gray-400 uppercase tracking-wider">Keamanan & Kebijakan</h4>
              <p className="text-xs text-gray-400 leading-relaxed font-medium">
                Kidszoo bersertifikasi ramah anak, bebas dari materi kekerasan, dan mematuhi regulasi privasi anak internasional (COPPA compliant).
              </p>
            </div>

          </div>

          {/* Copyrights row */}
          <div className="pt-8 flex flex-col sm:flex-row justify-between items-center text-xs text-gray-500 font-bold tracking-wide select-none">
            <span>© {new Date().getFullYear()} Kidszoo Academy. Hak Cipta Dilindungi Undang-Undang.</span>
            <div className="flex items-center gap-1 mt-3 sm:mt-0">
              <span>Made with</span>
              <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
              <span>for early childhood education</span>
            </div>
          </div>
        </div>
      </footer>

      {/* Back to Top Floating Button */}
      <AnimatePresence>
        {showBackToTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="fixed bottom-6 right-6 z-40 w-12 h-12 bg-[#EBA04E] hover:bg-[#d98b37] text-white rounded-full flex items-center justify-center shadow-lg hover:scale-110 active:scale-90 transition-all cursor-pointer"
            title="Kembali ke Atas"
          >
            <ArrowUp className="w-5 h-5 stroke-[2.5]" />
          </motion.button>
        )}
      </AnimatePresence>

    </div>
  );
}
