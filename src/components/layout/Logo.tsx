export function Logo({ className = 'h-8' }: { className?: string }) {
  return (
    <svg viewBox="0 0 200 32" className={className} xmlns="http://www.w3.org/2000/svg">
      <rect x="0" y="0" width="32" height="32" rx="6" fill="#2a3352"/>
      <text x="16" y="21.5" textAnchor="middle" fontFamily="system-ui, sans-serif" fontSize="16" fontWeight="400" fill="#8b95a8">T</text>
      <text x="40" y="23" fontFamily="'DM Sans', system-ui, sans-serif" fontSize="21" fontWeight="400" letterSpacing="-0.02em">
        <tspan fill="#c8cdd8">tvameva</tspan>
        <tspan fill="#f5a623">.ai</tspan>
      </text>
    </svg>
  );
}