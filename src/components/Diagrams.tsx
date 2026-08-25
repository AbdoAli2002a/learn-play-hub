type Pt = [number, number];

export function regularPoints(n: number, r = 42, cx = 50, cy = 52): Pt[] {
  const start = -Math.PI / 2;
  return Array.from({ length: n }, (_, i) => {
    const a = start + (i * 2 * Math.PI) / n;
    return [cx + r * Math.cos(a), cy + r * Math.sin(a)] as Pt;
  });
}

const toPath = (pts: Pt[]) => pts.map(([x, y]) => `${x.toFixed(2)},${y.toFixed(2)}`).join(" ");

type ShapeProps = {
  points: Pt[];
  className?: string | undefined;
  labels?: string[] | undefined;
  diagonalsFrom?: number | undefined;
  symmetryAxes?: [Pt, Pt][] | undefined;
  fill?: "primary" | "accent" | "muted";
  title: string;
};

export function ShapeFigure({
  points,
  className = "",
  labels,
  diagonalsFrom,
  symmetryAxes,
  fill = "primary",
  title,
}: ShapeProps) {
  const fillClass =
    fill === "accent"
      ? "fill-accent/15 stroke-accent"
      : fill === "muted"
        ? "fill-muted-foreground/10 stroke-muted-foreground"
        : "fill-primary/12 stroke-primary";

  const diagonals: [Pt, Pt][] = [];
  if (diagonalsFrom !== undefined) {
    const n = points.length;
    for (let i = 0; i < n; i++) {
      if (i === diagonalsFrom) continue;
      if ((i + 1) % n === diagonalsFrom || (diagonalsFrom + 1) % n === i) continue;
      diagonals.push([points[diagonalsFrom]!, points[i]!]);
    }
  }

  return (
    <svg viewBox="0 0 100 104" role="img" aria-label={title} className={`w-full ${className}`}>
      <title>{title}</title>
      <polygon points={toPath(points)} strokeWidth={1.6} className={fillClass} />
      {diagonals.map(([a, b], i) => (
        <line
          key={`d${i}`}
          x1={a[0]}
          y1={a[1]}
          x2={b[0]}
          y2={b[1]}
          strokeWidth={0.9}
          strokeDasharray="3 2"
          className="stroke-accent"
        />
      ))}
      {symmetryAxes?.map(([a, b], i) => (
        <line
          key={`s${i}`}
          x1={a[0]}
          y1={a[1]}
          x2={b[0]}
          y2={b[1]}
          strokeWidth={0.9}
          strokeDasharray="4 2"
          className="stroke-accent"
        />
      ))}
      {points.map(([x, y], i) => (
        <g key={`v${i}`}>
          <circle cx={x} cy={y} r={1.4} className="fill-foreground" />
          {labels?.[i] ? (
            <text
              x={x + (x < 50 ? -5 : x > 50 ? 4 : 0)}
              y={y + (y < 52 ? -3 : 7)}
              className="fill-foreground font-mono"
              fontSize="6"
              textAnchor="middle"
            >
              {labels[i]}
            </text>
          ) : null}
        </g>
      ))}
    </svg>
  );
}

export function RegularShape({
  sides,
  title,
  fill = "primary",
  className,
}: {
  sides: number;
  title: string;
  fill?: "primary" | "accent" | "muted" | undefined;
  className?: string | undefined;
}) {
  return (
    <ShapeFigure points={regularPoints(sides)} title={title} fill={fill} className={className} />
  );
}

export const CONCAVE_ARROW: Pt[] = [
  [50, 8],
  [90, 92],
  [50, 66],
  [10, 92],
];

export const CONCAVE_L: Pt[] = [
  [14, 12],
  [58, 12],
  [58, 54],
  [88, 54],
  [88, 94],
  [14, 94],
];

export const NON_POLYGON_OPEN: Pt[] = [
  [16, 88],
  [30, 20],
  [62, 74],
  [88, 24],
];

export function OpenFigure({ title }: { title: string }) {
  return (
    <svg viewBox="0 0 100 104" role="img" aria-label={title} className="w-full">
      <title>{title}</title>
      <polyline
        points={toPath(NON_POLYGON_OPEN)}
        fill="none"
        strokeWidth={1.6}
        className="stroke-muted-foreground"
      />
      {NON_POLYGON_OPEN.map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r={1.4} className="fill-foreground" />
      ))}
    </svg>
  );
}

export function symmetryAxesFor(sides: number): [Pt, Pt][] {
  const axes: [Pt, Pt][] = [];
  const cx = 50;
  const cy = 52;
  const R = 48;
  for (let i = 0; i < sides; i++) {
    const a = -Math.PI / 2 + (i * Math.PI) / sides;
    axes.push([
      [cx - R * Math.cos(a), cy - R * Math.sin(a)],
      [cx + R * Math.cos(a), cy + R * Math.sin(a)],
    ]);
  }
  return axes;
}
