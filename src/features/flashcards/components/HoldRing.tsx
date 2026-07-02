const CIRCUMFERENCE = 75.4;

interface HoldRingProps {
  progress: number;
}

export function HoldRing({ progress }: HoldRingProps) {
  const offset = CIRCUMFERENCE * (1 - progress);

  return (
    <div className="absolute bottom-3 right-3 pointer-events-none">
      <svg width="28" height="28" viewBox="0 0 28 28">
        <circle
          cx="14"
          cy="14"
          r="12"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          className="text-border"
        />
        <circle
          cx="14"
          cy="14"
          r="12"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeDasharray={CIRCUMFERENCE}
          strokeDashoffset={offset}
          strokeLinecap="round"
          className="text-primary"
          style={{ transform: "rotate(-90deg)", transformOrigin: "14px 14px" }}
        />
      </svg>
    </div>
  );
}
