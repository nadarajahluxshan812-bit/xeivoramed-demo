// Inline SVG logo: a rounded-square badge holding an "X" made of four rounded
// strokes, with a coral heartbeat/pulse line running horizontally through the
// centre. Self-contained — no external assets.

interface LogoProps {
  /** Pixel size of the square badge. */
  size?: number;
  /** Show the "XeivoraMed" wordmark beside the badge. */
  showWordmark?: boolean;
  /** Render the wordmark in white (for dark / gradient headers). */
  light?: boolean;
  className?: string;
}

export function Logo({ size = 36, showWordmark = false, light = false, className = "" }: LogoProps) {
  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <svg
        width={size}
        height={size}
        viewBox="0 0 48 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        role="img"
        aria-label="XeivoraMed"
      >
        <defs>
          <linearGradient id="xvm-badge" x1="0" y1="0" x2="48" y2="48" gradientUnits="userSpaceOnUse">
            <stop stopColor="#1B3A8F" />
            <stop offset="1" stopColor="#142C6E" />
          </linearGradient>
        </defs>

        {/* Rounded-square badge */}
        <rect x="1.5" y="1.5" width="45" height="45" rx="13" fill="url(#xvm-badge)" />

        {/* "X" — four rounded strokes radiating from the centre, leaving a gap
            in the middle for the pulse line to pass through. */}
        <g stroke="#FFFFFF" strokeWidth="3.6" strokeLinecap="round">
          <line x1="13" y1="13" x2="20" y2="20" />
          <line x1="35" y1="13" x2="28" y2="20" />
          <line x1="13" y1="35" x2="20" y2="28" />
          <line x1="35" y1="35" x2="28" y2="28" />
        </g>

        {/* Coral heartbeat / pulse line through the centre */}
        <polyline
          points="7,24 16,24 19,18 22,31 25,20 28,24 41,24"
          fill="none"
          stroke="#FF6B5E"
          strokeWidth="2.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>

      {showWordmark && (
        <span className={`text-[17px] font-semibold tracking-tight ${light ? "text-white" : "text-brand"}`}>
          Xeivora<span className={light ? "text-coral" : "text-coral"}>Med</span>
        </span>
      )}
    </span>
  );
}
