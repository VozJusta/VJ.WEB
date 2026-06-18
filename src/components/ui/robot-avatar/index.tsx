interface RobotAvatarProps {
  size?: number;
  className?: string;
}

export function RobotAvatar({ size = 120, className }: RobotAvatarProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 120 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Antenna base */}
      <rect x="56" y="8" width="8" height="12" rx="4" fill="#2585F4" />
      {/* Antenna ball */}
      <circle cx="60" cy="6" r="6" fill="#3B82F6" />

      {/* Head */}
      <rect x="22" y="20" width="76" height="56" rx="14" fill="#1E40AF" />
      <rect x="26" y="24" width="68" height="48" rx="10" fill="#1D4ED8" />

      {/* Eyes */}
      <rect x="34" y="36" width="20" height="16" rx="4" fill="#0EA5E9" />
      <rect x="66" y="36" width="20" height="16" rx="4" fill="#0EA5E9" />
      <circle cx="44" cy="44" r="5" fill="white" />
      <circle cx="76" cy="44" r="5" fill="white" />
      <circle cx="46" cy="46" r="2.5" fill="#1E3A8A" />
      <circle cx="78" cy="46" r="2.5" fill="#1E3A8A" />

      {/* Mouth / speaker grille */}
      <rect x="36" y="60" width="8" height="4" rx="2" fill="#60A5FA" />
      <rect x="48" y="60" width="8" height="4" rx="2" fill="#60A5FA" />
      <rect x="60" y="60" width="8" height="4" rx="2" fill="#60A5FA" />
      <rect x="72" y="60" width="8" height="4" rx="2" fill="#60A5FA" />

      {/* Neck */}
      <rect x="50" y="76" width="20" height="10" rx="4" fill="#1E40AF" />

      {/* Body */}
      <rect x="16" y="86" width="88" height="30" rx="12" fill="#1E40AF" />
      <rect x="22" y="92" width="76" height="18" rx="8" fill="#1D4ED8" />

      {/* Body details — chest lights */}
      <circle cx="42" cy="101" r="5" fill="#2585F4" />
      <circle cx="42" cy="101" r="3" fill="#60A5FA" />
      <rect x="54" y="96" width="24" height="5" rx="2.5" fill="#1E3A8A" />
      <rect x="54" y="104" width="24" height="5" rx="2.5" fill="#1E3A8A" />

      {/* Ear bolts */}
      <circle cx="22" cy="48" r="6" fill="#1E40AF" />
      <circle cx="22" cy="48" r="3" fill="#2585F4" />
      <circle cx="98" cy="48" r="6" fill="#1E40AF" />
      <circle cx="98" cy="48" r="3" fill="#2585F4" />
    </svg>
  );
}
