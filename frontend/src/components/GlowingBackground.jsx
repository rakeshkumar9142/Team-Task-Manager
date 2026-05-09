export const GlowingBackground = () => (
  <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
    <div className="absolute -left-32 top-6 h-80 w-80 rounded-full bg-accentPurple/30 blur-3xl" />
    <div className="absolute right-0 top-32 h-72 w-72 rounded-full bg-accentCyan/20 blur-3xl" />
    <div className="absolute bottom-0 left-1/3 h-64 w-64 rounded-full bg-accentViolet/25 blur-3xl" />
  </div>
);
