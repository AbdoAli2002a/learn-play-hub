import { createFileRoute } from "@tanstack/react-router";
import {
  CONCAVE_L,
  ShapeFigure,
  regularPoints,
  symmetryAxesFor,
} from "../components/Diagrams";
import { PageShell, SectionPlate } from "../components/LessonNav";

export const Route = createFileRoute("/symmetry")({
  head: () => ({
    meta: [
      { title: "Axes of Symmetry in Polygons | GEO-LAB" },
      {
        name: "description",
        content:
          "An axis of symmetry divides a shape into two identical parts. See how many axes squares, rectangles, parallelograms and regular polygons have.",
      },
      { property: "og:title", content: "Axes of Symmetry in Polygons | GEO-LAB" },
      {
        property: "og:description",
        content:
          "Fold lines explained: counting axes of symmetry in regular and irregular polygons.",
      },
    ],
  }),
  component: SymmetryPage,
});

const cases = [
  { name: "Equilateral triangle", axes: 3, sides: 3 },
  { name: "Square", axes: 4, sides: 4 },
  { name: "Regular pentagon", axes: 5, sides: 5 },
  { name: "Regular hexagon", axes: 6, sides: 6 },
];

const facts = [
  { shape: "Rectangle", axes: "2" },
  { shape: "Parallelogram", axes: "0" },
  { shape: "Rhombus", axes: "2" },
  { shape: "Isosceles trapezium", axes: "1" },
  { shape: "Isosceles triangle", axes: "1" },
  { shape: "Scalene triangle", axes: "0" },
  { shape: "Circle", axes: "infinitely many" },
  { shape: "Regular n-gon", axes: "n" },
];

function SymmetryPage() {
  return (
    <PageShell
      eyebrow="SECTION 06"
      title="Axes of Symmetry"
      intro="The axis of symmetry of a shape is a straight line that divides it into two identical parts: fold the shape along that line and both halves coincide exactly. A shape may have one axis, many axes, or none at all."
    >
      <SectionPlate title="Regular polygons: axes = sides">
        <div className="grid gap-6 sm:grid-cols-4">
          {cases.map((c) => (
            <figure key={c.name} className="border border-border bg-surface p-4">
              <ShapeFigure
                points={regularPoints(c.sides, 38)}
                symmetryAxes={symmetryAxesFor(c.sides)}
                title={`${c.name} with ${c.axes} axes of symmetry`}
              />
              <figcaption className="mt-2 text-center">
                <span className="block text-sm font-medium">{c.name}</span>
                <span className="font-mono text-[10px] uppercase text-accent">{c.axes} axes</span>
              </figcaption>
            </figure>
          ))}
        </div>
        <p className="mt-6 border-l-2 border-accent bg-surface p-4 font-mono text-xs uppercase text-accent">
          Note: the number of axes of symmetry of a regular polygon equals its number of sides.
        </p>
      </SectionPlate>

      <SectionPlate title="Shapes to remember">
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {facts.map((f) => (
            <div
              key={f.shape}
              className="flex items-center justify-between border border-border bg-surface px-4 py-3"
            >
              <span className="text-sm">{f.shape}</span>
              <span className="font-mono text-xs text-primary">{f.axes}</span>
            </div>
          ))}
        </div>
      </SectionPlate>

      <SectionPlate title="Careful: irregular shapes">
        <div className="grid gap-8 lg:grid-cols-[1fr_1.4fr]">
          <figure className="border border-border bg-surface p-6">
            <ShapeFigure
              points={CONCAVE_L}
              fill="accent"
              symmetryAxes={[
                [
                  [14, 12],
                  [88, 94],
                ],
              ]}
              title="L-shaped concave hexagon with one axis of symmetry along its diagonal"
            />
            <figcaption className="mt-2 text-center font-mono text-[10px] uppercase text-muted-foreground">
              L-shape — 1 axis of symmetry
            </figcaption>
          </figure>
          <div className="space-y-4 text-base leading-relaxed">
            <p>
              Having equal sides is not enough. A rhombus has four equal sides but only 2 axes of
              symmetry, because its angles are not equal. A rectangle has equal angles but only 2
              axes, because its sides are not all equal.
            </p>
            <p>
              A parallelogram that is neither a rectangle nor a rhombus has <strong>no</strong> axis
              of symmetry at all — although it does have rotational symmetry of order 2.
            </p>
            <p className="font-mono text-sm text-muted-foreground">
              Test to use: fold along the candidate line. If every vertex lands exactly on another
              vertex, the line is an axis of symmetry.
            </p>
          </div>
        </div>
      </SectionPlate>
    </PageShell>
  );
}
