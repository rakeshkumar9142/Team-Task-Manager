const styles = {
  low: "bg-emerald-500/20 text-emerald-200",
  medium: "bg-amber-500/20 text-amber-200",
  high: "bg-rose-500/20 text-rose-200",
};

export const PriorityBadge = ({ priority = "medium" }) => (
  <span className={`rounded-full px-2 py-1 text-xs capitalize ${styles[priority] || styles.medium}`}>
    {priority}
  </span>
);
