import React from 'react';

interface DinosaurIllustrationProps {
  className?: string;
}

export const DinosaurIllustration: React.FC<DinosaurIllustrationProps> = ({ className = '' }) => {
  return (
    <div className={`relative flex items-center justify-center ${className}`}>
      <svg
        viewBox="0 0 400 320"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-auto max-w-[280px]"
      >
        {/* Sky Clouds */}
        <path
          d="M30 40 C45 40, 50 30, 60 30 C70 30, 75 40, 90 40 C100 40, 105 45, 100 55 C95 65, 35 65, 30 55 Z"
          fill="#FFFFFF"
          opacity="0.8"
        />
        <path
          d="M310 60 C320 60, 325 50, 335 50 C345 50, 350 60, 360 60 C370 60, 375 65, 370 75 C365 85, 315 85, 310 75 Z"
          fill="#FFFFFF"
          opacity="0.8"
        />

        {/* Dinosaur Body */}
        {/* Tail */}
        <path
          d="M 120 220 C 130 240, 150 250, 200 240 C 250 230, 270 190, 280 200 C 290 210, 290 240, 260 260 C 230 280, 180 290, 130 270 Z"
          fill="#5CB895"
        />
        
        {/* Legs - Back Left */}
        <path
          d="M135 250 C130 270, 120 280, 115 295 C115 298, 125 300, 135 300 C145 300, 150 290, 150 275 Z"
          fill="#499C7C"
        />
        {/* Legs - Back Right */}
        <path
          d="M235 235 C235 260, 240 275, 245 295 C245 298, 255 300, 265 300 C275 300, 270 275, 265 245 Z"
          fill="#499C7C"
        />

        {/* Legs - Front Left */}
        <path
          d="M155 255 C150 275, 140 285, 135 302 C135 305, 148 307, 158 307 C168 307, 172 295, 172 278 Z"
          fill="#5CB895"
        />
        {/* Legs - Front Right */}
        <path
          d="M210 240 C210 265, 215 282, 220 302 C220 305, 232 307, 242 307 C252 307, 248 280, 242 250 Z"
          fill="#5CB895"
        />

        {/* Dino Body Main */}
        <path
          d="M 110 210 C 110 260, 180 280, 250 250 C 265 240, 270 210, 260 180 C 250 150, 160 150, 120 180 C 110 190, 110 200, 110 210 Z"
          fill="#5CB895"
        />

        {/* Spikes on Back */}
        <polygon points="120,185 110,175 125,175" fill="#408C6E" />
        <polygon points="135,175 125,160 142,165" fill="#408C6E" />
        <polygon points="155,170 148,152 163,158" fill="#408C6E" />
        <polygon points="260,190 272,185 265,200" fill="#408C6E" />
        <polygon points="272,210 285,208 277,222" fill="#408C6E" />
        <polygon points="280,230 292,232 282,242" fill="#408C6E" />

        {/* Dino Long Neck and Head */}
        <path
          d="M 115 195 C 110 170, 95 140, 90 100 C 85 70, 110 60, 135 60 C 150 65, 155 85, 145 95 C 135 105, 125 120, 128 150 C 130 170, 132 190, 125 200 Z"
          fill="#5CB895"
        />

        {/* Dino Eye */}
        <circle cx="112" cy="78" r="5" fill="#333333" />
        <circle cx="110" cy="76" r="1.5" fill="#FFFFFF" />
        {/* Blush */}
        <ellipse cx="118" cy="85" rx="5" ry="3" fill="#E67B7B" opacity="0.6" />
        {/* Mouth */}
        <path d="M 103 86 Q 108 92 112 86" stroke="#333333" strokeWidth="2" strokeLinecap="round" />
        
        {/* Dino Front Arm */}
        <path
          d="M 115 145 C 105 145, 95 152, 98 160 C 100 164, 110 162, 118 155 Z"
          fill="#499C7C"
        />

        {/* KID 1 (Boy with Yellow Hair, Purple Shirt) */}
        {/* Body & Shirt */}
        <path d="M 160 175 C 155 185, 152 205, 175 205 C 185 205, 185 185, 180 175 Z" fill="#8B5CF6" />
        {/* Pants */}
        <path d="M 158 202 L 178 202 L 180 215 L 172 215 L 172 208 L 166 208 L 164 215 L 156 215 Z" fill="#EF4444" />
        {/* Shoes */}
        <ellipse cx="158" cy="216" rx="4" ry="2" fill="#3B82F6" />
        <ellipse cx="178" cy="216" rx="4" ry="2" fill="#3B82F6" />
        {/* Hands holding neck */}
        <path d="M 155 185 C 145 180, 140 165, 138 160" stroke="#FDBA74" strokeWidth="3" strokeLinecap="round" />
        {/* Head */}
        <circle cx="170" cy="160" r="12" fill="#FDBA74" />
        {/* Face */}
        <circle cx="166" cy="159" r="1.5" fill="#333333" />
        <circle cx="174" cy="159" r="1.5" fill="#333333" />
        <path d="M 168 165 Q 170 168 172 165" stroke="#333333" strokeWidth="1.5" strokeLinecap="round" />
        {/* Hair - Yellow */}
        <path
          d="M 156 160 C 156 145, 184 145, 184 160 C 184 148, 174 142, 170 142 C 166 142, 156 148, 156 160 Z"
          fill="#FBBF24"
        />
        <path
          d="M 158 155 C 155 150, 162 146, 166 148 C 170 146, 174 150, 172 155"
          stroke="#FBBF24"
          strokeWidth="3"
          strokeLinecap="round"
        />

        {/* KID 2 (Girl with Red Hair, Lavender Dress) */}
        {/* Body & Dress */}
        <path d="M 190 180 C 185 190, 180 210, 208 210 C 215 210, 215 190, 210 180 Z" fill="#A78BFA" />
        {/* Legs */}
        <line x1="196" y1="210" x2="194" y2="222" stroke="#FDBA74" strokeWidth="3" strokeLinecap="round" />
        <line x1="204" y1="210" x2="206" y2="222" stroke="#FDBA74" strokeWidth="3" strokeLinecap="round" />
        {/* Shoes */}
        <ellipse cx="193" cy="223" rx="4" ry="2" fill="#EC4899" />
        <ellipse cx="207" cy="223" rx="4" ry="2" fill="#EC4899" />
        {/* Head */}
        <circle cx="202" cy="165" r="11" fill="#FDBA74" />
        {/* Face */}
        <circle cx="199" cy="164" r="1.5" fill="#333333" />
        <circle cx="205" cy="164" r="1.5" fill="#333333" />
        <path d="M 200 170 Q 202 173 204 170" stroke="#333333" strokeWidth="1.5" strokeLinecap="round" />
        {/* Hair - Red/Orange */}
        <path
          d="M 190 168 C 188 152, 216 152, 214 168 C 216 175, 214 185, 214 185"
          fill="#F97316"
        />
        <path
          d="M 192 160 C 190 156, 196 152, 200 154 C 204 152, 210 156, 208 160"
          stroke="#F97316"
          strokeWidth="3"
          strokeLinecap="round"
        />
        <path d="M 190 172 C 186 175, 184 182, 186 186" stroke="#F97316" strokeWidth="3.5" strokeLinecap="round" />

        {/* Ocean/Water Waves at Bottom */}
        <path
          d="M 10 300 Q 100 290, 200 305 T 390 300 L 390 320 L 10 320 Z"
          fill="#54B0EE"
        />
        <path
          d="M 30 306 Q 120 298, 220 311 T 370 306 L 370 320 L 30 320 Z"
          fill="#3598DB"
          opacity="0.6"
        />
      </svg>
    </div>
  );
};
