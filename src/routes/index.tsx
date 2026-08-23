import { createFileRoute, Link } from "@tanstack/react-router";
import { RegularShape, ShapeFigure, OpenFigure, CONCAVE_ARROW } from "../components/Diagrams";
import { SectionPlate } from "../components/LessonNav";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Polygons — Lesson 7 | GEO-LAB Geometry" },
      {
        name: "description",
        content:
          "Learn what a polygon is: sides, vertices, interior and exterior angles, and diagonals — explained in English with clear diagrams and examples.",
      },
      { property: "og:title", content: "Polygons — Lesson 7 | GEO-LAB Geometry" },
      {
        property: "og:description",
        content:
          "The full polygons lesson: definitions, convex vs concave, interior angles, regular polygons, symmetry, examples and learning games.",
      },
    ],
  }),
  component: Index,
});

const outcomes = [
  "Learn the concept of a polygon.",
  "Distinguish between convex and concave polygons.",
  "Deduce the sum of the measures of the interior angles of a polygon.",
  "Learn what makes a polygon regular.",
  "Learn the concept of an axis of symmetry.",
  "Determine the axes of symmetry in polygons.",
];

const vocabulary = ["Polygon", "Regular", "Irregular", "Convex", "Concave", "Vertex", "Diagonal"];

const map = [
  { to: "/gallery", n: "02", t: "Polygon Gallery", d: "Triangle through decagon, side by side." },
  {
    to: "/convex-concave",
    n: "03",
    t: "Convex & Concave",
    d: "Reflex angles and the straight-line test.",
  },
  {
    to: "/interior-angles",
    n: "04",
    t: "Interior Angles",
    d: "Deduce (n − 2) × 180° from triangles.",
  },
  { to: "/regular-polygons", n: "05", t: "Regular Polygons", d: "Equal sides and equal angles." },
  { to: "/symmetry", n: "06", t: "Axes of Symmetry", d: "Fold lines and how many each shape has." },
  { to: "/examples", n: "07", t: "Worked Examples", d: "Step-by-step solutions and exercises." },
  { to: "/activities", n: "08", t: "Practice Zone", d: "Quizzes, matching and learning games." },
] as const;

function Index() {
  return (
    <div className="animate-fade-up">
      <div className="mb-6 inline-block bg-primary px-3 py-1 font-mono text-xs text-primary-foreground">
        UNIT 3 • LESSON 07
      </div>
      <h1 className="mb-8 font-display text-5xl font-bold leading-[0.9] tracking-tighter lg:text-8xl">
        Polygons &amp;
        <br />
        Properties.
      </h1>

      <div className="grid gap-10 border-t border-border pt-8 lg:grid-cols-2">
        <p className="text-xl leading-relaxed text-pretty">
          A polygon is a plane, closed shape formed from the union of three or more line segments,
          joined end to end so that no two adjacent segments lie on the same straight line. This
          lesson explains every property of polygons in English, with diagrams, worked examples and
          interactive practice.
        </p>
        <div className="grid gap-6 text-sm sm:grid-cols-2">
          <div>
            <h2 className="mb-2 font-mono text-xs uppercase text-muted-foreground">
              Learning Outcomes
            </h2>
            <ul className="list-inside list-disc space-y-1">
              {outcomes.map((o) => (
                <li key={o}>{o}</li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="mb-2 font-mono text-xs uppercase text-muted-foreground">Vocabulary</h2>
            <div className="flex flex-wrap gap-2">
              {vocabulary.map((v) => (
                <span key={v} className="border border-border bg-card px-2 py-1 font-mono text-xs">
                  {v}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="mt-16 space-y-16 pb-24">
        <SectionPlate title="What makes a shape a polygon?">
          <div className="grid gap-10 lg:grid-cols-[1.4fr_1fr]">
            <ol className="space-y-4 text-base leading-relaxed">
              <li>
                <strong>1. Sides.</strong> The line segments forming the shape are called the
                polygon&apos;s sides.
              </li>
              <li>
                <strong>2. Vertices.</strong> The segments intersect only at their endpoints; those
                points are the vertices.
              </li>
              <li>
                <strong>3. No straight joins.</strong> No two adjacent segments lie on one straight
                line.
              </li>
              <li>
                <strong>4. Naming.</strong> Every polygon is named after its number of sides.
              </li>
              <li className="border-t border-border pt-4 text-muted-foreground">
                Number of sides = number of vertices = number of interior angles.
              </li>
            </ol>
            <figure className="border border-border bg-surface p-4">
              <ShapeFigure
                points={[
                  [50, 10],
                  [90, 40],
                  [75, 88],
                  [25, 88],
                  [10, 40],
                ]}
                labels={["A", "B", "C", "D", "E"]}
                diagonalsFrom={0}
                title="Pentagon ABCDE with all diagonals drawn from vertex A"
              />
              <figcaption className="mt-2 font-mono text-[10px] uppercase text-muted-foreground">
                Pentagon ABCDE — dashed lines are diagonals from A
              </figcaption>
            </figure>
          </div>
        </SectionPlate>

        <SectionPlate title="Angles, diagonals and notes">
          <div className="grid gap-6 md:grid-cols-3">
            {[
              {
                t: "Interior angle",
                d: "The angle included between two adjacent sides of the polygon.",
              },
              {
                t: "Exterior angle",
                d: "The angle between one side and the extension of the adjacent side.",
              },
              {
                t: "Diagonal",
                d: "Any segment joining two non-consecutive vertices. A quadrilateral has 2 diagonals; a pentagon has 5.",
              },
            ].map((c) => (
              <div key={c.t} className="border border-border bg-surface p-5">
                <h3 className="mb-2 font-display text-lg font-bold">{c.t}</h3>
                <p className="text-sm leading-relaxed text-muted-foreground">{c.d}</p>
              </div>
            ))}
          </div>

          <div className="mt-8 grid gap-6 sm:grid-cols-3">
            <figure className="border border-border bg-surface p-4">
              <RegularShape sides={4} title="Quadrilateral with its 2 diagonals" />
              <figcaption className="mt-2 text-center font-mono text-[10px] uppercase text-muted-foreground">
                Polygon ✓
              </figcaption>
            </figure>
            <figure className="border border-border bg-surface p-4">
              <ShapeFigure
                points={CONCAVE_ARROW}
                fill="accent"
                title="Concave quadrilateral shaped like an arrow head"
              />
              <figcaption className="mt-2 text-center font-mono text-[10px] uppercase text-muted-foreground">
                Polygon ✓ (concave)
              </figcaption>
            </figure>
            <figure className="border border-border bg-surface p-4">
              <OpenFigure title="An open chain of segments, which is not a polygon" />
              <figcaption className="mt-2 text-center font-mono text-[10px] uppercase text-muted-foreground">
                Not a polygon ✗ (not closed)
              </figcaption>
            </figure>
          </div>
        </SectionPlate>

        <section>
          <h2 className="mb-8 font-display text-3xl font-bold tracking-tight">Lesson Map</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {map.map((m) => (
              <Link
                key={m.to}
                to={m.to}
                className="group border border-border bg-card p-6 transition-colors hover:border-primary"
              >
                <span className="font-mono text-xs text-muted-foreground">{m.n}</span>
                <h3 className="mt-2 font-display text-xl font-bold group-hover:text-primary">
                  {m.t}
                </h3>
                <p className="mt-1 text-sm text-muted-foreground">{m.d}</p>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
