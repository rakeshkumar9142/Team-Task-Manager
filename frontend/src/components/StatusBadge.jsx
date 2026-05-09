const styles = {
  todo: "bg-slate-500/25 text-slate-200",
  in_progress: "bg-cyan-500/20 text-cyan-200",
  done: "bg-emerald-500/20 text-emerald-200",
};

export const StatusBadge = ({ status = "todo" }) => (
  <span className={`rounded-full px-2 py-1 text-xs ${styles[status] || styles.todo}`}>
    {status.replace("_", " ")}
  </span>
);
