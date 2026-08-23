import { Link } from "@tanstack/react-router";

const items = [
  { to: "/", n: "01", label: "INTRODUCTION" },
  { to: "/gallery", n: "02", label: "POLYGON GALLERY" },
  { to: "/convex-concave", n: "03", label: "CONVEX & CONCAVE" },
  { to: "/interior-angles", n: "04", label: "INTERIOR ANGLES" },
  { to: "/regular-polygons", n: "05", label: "REGULAR POLYGONS" },
  { to: "/symmetry", n: "06", label: "AXES OF SYMMETRY" },
  { to: "/examples", n: "07", label: "WORKED EXAMPLES" },
  { to: "/activities", n: "08", label: "PRACTICE ZONE" },
] as const;

export function LessonNav() {
  return (
    <nav
      aria-label="Lesson sections"
      className="fixed left-0 top-0 z-50 hidden h-full w-64 flex-col gap-10 border-r border-border bg-background/85 p-8 backdrop-blur-md lg:flex"
    >
      <Link to="/" className="flex items-center gap-2">
        <span className="polygon-hex size-6 bg-primary" aria-hidden="true" />
        <span className="font-display text-xl font-bold tracking-tight">GEO-LAB</span>
      </Link>

      <ul className="flex flex-col gap-5 font-mono text-sm">
        {items.map((item) => (
          <li key={item.to} className="group">
            <Link
              to={item.to}
              className="flex items-center gap-3 transition-colors hover:text-primary"
              activeProps={{ className: "text-primary" }}
              activeOptions={{ exact: item.to === "/" }}
            >
              <span className="opacity-50">{item.n}</span>
              <span className="font-medium">{item.label}</span>
            </Link>
          </li>
        ))}
      </ul>

      <div className="mt-auto rounded border border-accent/25 bg-accent/5 p-4">
        <p className="mb-1 font-mono text-[10px] uppercase text-accent">Lesson active</p>
        <p className="text-xs font-bold">Lesson 7 — Polygons</p>
        <p className="mt-1 text-[11px] text-muted-foreground">Unit 3: Geometry & Measurement</p>
      </div>
    </nav>
  );
}

export function MobileNav() {
  return (
    <nav
      aria-label="Lesson sections"
      className="sticky top-0 z-50 border-b border-border bg-background/90 backdrop-blur-md lg:hidden"
    >
      <div className="flex items-center gap-3 overflow-x-auto px-4 py-3 font-mono text-xs">
        <span className="polygon-hex size-4 shrink-0 bg-primary" aria-hidden="true" />
        {items.map((item) => (
          <Link
            key={item.to}
            to={item.to}
            className="whitespace-nowrap text-muted-foreground"
            activeProps={{ className: "text-primary font-medium" }}
            activeOptions={{ exact: item.to === "/" }}
          >
            {item.label}
          </Link>
        ))}
      </div>
    </nav>
  );
}

export function PageShell({
  eyebrow,
  title,
  intro,
  children,
}: {
  eyebrow: string;
  title: string;
  intro?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="animate-fade-up">
      <div className="mb-6 inline-block bg-primary px-3 py-1 font-mono text-xs text-primary-foreground">
        {eyebrow}
      </div>
      <h1 className="mb-6 font-display text-4xl font-bold leading-[0.95] tracking-tighter lg:text-6xl">
        {title}
      </h1>
      {intro ? (
        <p className="max-w-[62ch] border-t border-border pt-6 text-lg leading-relaxed text-pretty">
          {intro}
        </p>
      ) : null}
      <div className="mt-14 space-y-16 pb-24">{children}</div>
    </div>
  );
}

export function SectionPlate({
  title,
  children,
  id,
}: {
  title: string;
  children: React.ReactNode;
  id?: string;
}) {
  return (
    <section id={id} className="card-plate p-6 lg:p-10">
      <h2 className="mb-6 font-display text-2xl font-bold lg:text-3xl">{title}</h2>
      {children}
    </section>
  );
}
