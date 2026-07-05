export type AppScreen = 
  | 'login' 
  | 'dashboard' 
  | 'letters' 
  | 'numbers' 
  | 'shapes' 
  | 'reading' 
  | 'learning-analysis' 
  | 'settings';

export interface LetterInfo {
  letter: string;
  name: string;
  association: string; // e.g. "AXE", "EGG"
  color: string;       // Text color
  bgColor: string;     // Card background color
  accentColor: string; // Secondary border/badge color
  iconName: string;    // Lucide icon or emoji / custom shape description
}

export interface Story {
  id: string;
  title: string;
  emoji: string;
  sentences: string[];
}

export interface ContactFormData {
  name: string;
  email: string;
  role: 'parent' | 'teacher' | 'other';
  message: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  avatar: string;
  content: string;
  rating: number;
}
