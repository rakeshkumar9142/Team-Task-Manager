export const SkeletonCard = ({ count = 1, className = "h-24" }) => (
  <>
    {Array.from({ length: count }).map((_, index) => (
      <div key={index} className={`animate-pulse rounded-2xl bg-white/5 ${className}`} />
    ))}
  </>
);
