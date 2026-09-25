interface LogoProps {
  className?: string;
}

/** Логотип SparkQuest: лампочка-знак питання (копія src/app/icon.svg). */
export default function Logo({ className }: LogoProps) {
  return (
    <svg viewBox="0 0 256 256" className={className} aria-hidden="true">
      <defs>
        <filter id="sq-glow" x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur stdDeviation="8" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
        <linearGradient id="sq-grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FBBF24" />
          <stop offset="100%" stopColor="#34D399" />
        </linearGradient>
      </defs>
      <rect width="256" height="256" rx="48" fill="#0F172A" />
      <path
        d="M128 32 v16 M60 60 l12 12 M196 60 l-12 12 M32 128 h16 M224 128 h-16"
        stroke="#FBBF24"
        strokeWidth="6"
        strokeLinecap="round"
        opacity="0.4"
      />
      <path
        d="M96 112 c0-32 64-40 64 0 c0 24-32 32-32 56"
        fill="none"
        stroke="url(#sq-grad)"
        strokeWidth="20"
        strokeLinecap="round"
        filter="url(#sq-glow)"
      />
      <circle cx="128" cy="204" r="12" fill="#34D399" filter="url(#sq-glow)" />
    </svg>
  );
}
