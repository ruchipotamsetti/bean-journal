export function CoffeeLogCard({
  log,
}: {
  log: {
    id: string;
    coffeeType: string;
    cafeName: string | null;
    rating: number;
    notes: string | null;
    brewMethod: string | null;
    loggedAt: string;
  };
}) {
  return (
    <div className="rounded-2xl border border-border-tan border-l-4 border-l-accent-warm bg-bg-card p-6 shadow-sm transition-all duration-200 hover:shadow-lg hover:-rotate-1 hover:scale-[1.02] md:p-8 cursor-bean">
      <div className="flex items-start justify-between">
        <div>
          <h3 className="font-heading text-lg text-text-primary">
            {log.coffeeType}
          </h3>
          {log.cafeName && (
            <p className="mt-0.5 text-sm text-text-secondary">{log.cafeName}</p>
          )}
        </div>
        {log.brewMethod && (
          <span className="rounded-full bg-bg-accent px-3 py-1 font-mono-accent text-xs text-accent-warm">
            {log.brewMethod}
          </span>
        )}
      </div>
      <div className="mt-3 flex items-center gap-1">
        {Array.from({ length: 5 }).map((_, i) => (
          <span
            key={i}
            className={`text-lg ${i < log.rating ? "text-accent-pop" : "text-border-tan"}`}
          >
            ★
          </span>
        ))}
      </div>
      {log.notes && (
        <p className="mt-3 text-sm leading-relaxed text-text-secondary">{log.notes}</p>
      )}
      <p className="mt-4 font-mono-accent text-xs text-text-secondary/60">
        {new Date(log.loggedAt).toLocaleDateString("en-US", {
          year: "numeric",
          month: "short",
          day: "numeric",
        })}
      </p>
    </div>
  );
}
