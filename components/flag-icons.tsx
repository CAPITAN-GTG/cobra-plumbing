/** Small decorative flags for the language switcher (not a political statement). */

export function FlagUs({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 19 10"
      width={19}
      height={10}
      aria-hidden="true"
      focusable="false"
    >
      <rect fill="#B22234" width="19" height="10" />
      <path
        fill="#fff"
        d="M0,1h19v1H0zm0,2h19v1H0zm0,2h19v1H0zm0,2h19v1H0zm0,2h19v1H0z"
      />
      <rect fill="#3C3B6E" width="7.6" height="5.4" />
      <g fill="#fff">
        {(
          [
            [0.55, 0.55],
            [1.65, 0.55],
            [2.75, 0.55],
            [3.85, 0.55],
            [5.0, 0.55],
            [6.1, 0.55],
            [1.1, 1.1],
            [2.2, 1.1],
            [3.3, 1.1],
            [4.4, 1.1],
            [5.5, 1.1],
            [0.55, 1.65],
            [1.65, 1.65],
            [2.75, 1.65],
            [3.85, 1.65],
            [5.0, 1.65],
            [6.1, 1.65],
            [1.1, 2.2],
            [2.2, 2.2],
            [3.3, 2.2],
            [4.4, 2.2],
            [5.5, 2.2],
            [0.55, 2.75],
            [1.65, 2.75],
            [2.75, 2.75],
            [3.85, 2.75],
            [5.0, 2.75],
            [6.1, 2.75],
            [1.1, 3.3],
            [2.2, 3.3],
            [3.3, 3.3],
            [4.4, 3.3],
            [5.5, 3.3],
            [0.55, 3.85],
            [1.65, 3.85],
            [2.75, 3.85],
            [3.85, 3.85],
            [5.0, 3.85],
            [6.1, 3.85],
            [1.1, 4.4],
            [2.2, 4.4],
            [3.3, 4.4],
            [4.4, 4.4],
            [5.5, 4.4],
            [0.55, 4.95],
            [1.65, 4.95],
            [2.75, 4.95],
            [3.85, 4.95],
            [5.0, 4.95],
            [6.1, 4.95],
          ] as const
        ).map(([cx, cy]) => (
          <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r="0.28" />
        ))}
      </g>
    </svg>
  );
}

export function FlagMx({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 14 8"
      width={14}
      height={8}
      aria-hidden="true"
      focusable="false"
    >
      <rect fill="#006847" width="4.67" height="8" />
      <rect fill="#fff" x="4.67" width="4.66" height="8" />
      <rect fill="#CE1126" x="9.33" width="4.67" height="8" />
      <circle cx="7" cy="4" r="1.15" fill="#AA8C30" stroke="#8B6914" strokeWidth="0.08" />
    </svg>
  );
}
