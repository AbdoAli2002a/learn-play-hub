import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { CONCAVE_ARROW, RegularShape, ShapeFigure } from "../components/Diagrams";
import { PageShell, SectionPlate } from "../components/LessonNav";

export const Route = createFileRoute("/examples")({
  head: () => ({
    meta: [
      { title: "Polygon Worked Examples & Exercises | GEO-LAB" },
      {
        name: "description",
        content:
          "Step-by-step solutions for polygon problems: finding X from interior angles, proving angle measures, decoration problems and exam-style exercises.",
      },
      { property: "og:title", content: "Polygon Worked Examples & Exercises | GEO-LAB" },
      {
        property: "og:description",
        content:
          "Exercise 17 style questions on polygons with full step-by-step English solutions.",
      },
    ],
  }),
  component: ExamplesPage,
});

const solved = [
  {
    q: "Determine whether each shape is a polygon; if it is, name it.",
    steps: [
      "A polygon must be plane, closed, and made only of line segments meeting at endpoints.",
      "Any curve, opening, or crossing segment disqualifies the figure.",
      "A closed figure with 5 segments is a pentagon; with 8 segments it is an octagon.",
    ],
  },
  {
    q: "ABCD is a quadrilateral with m(∠A) = 4X°, m(∠B) = 5X°, m(∠C) = 7X°, m(∠D) = 20X°. Find X and classify it.",
    steps: [
      "Sum of interior angles of a quadrilateral = 360°",
      "4X + 5X + 7X + 20X = 360 ⟹ 36X = 360",
      "X = 10, so the largest angle m(∠D) = 200° — a reflex angle.",
      "Therefore ABCD is a concave quadrilateral.",
    ],
  },
  {
    q: "In polygon ABCDEF: m(∠A) = m(∠D) = 90°, m(∠E) = m(∠B) = X°, m(∠C) = m(∠F) = (X + 22)°. Find X.",
    steps: [
      "ABCDEF is a hexagon ⟹ sum = (6 − 2) × 180° = 720°",
      "90 + 90 + X + X + (X + 22) + (X + 22) = 720",
      "4X + 224 = 720 ⟹ 4X = 496",
      "X = 124, and every angle is less than 180° ⟹ the hexagon is convex.",
    ],
  },
  {
    q: "ABCDEF is a regular hexagon; a regular octagon shares the side BC. Find the measure of the angle between them at B.",
    steps: [
      "One interior angle of a regular hexagon = 720° ÷ 6 = 120°",
      "One interior angle of a regular octagon = 1,080° ÷ 8 = 135°",
      "The three angles at the point B complete a full turn: 120° + 135° + m(∠ABC) = 360°",
      "m(∠ABC) = 360° − 255° = 105°",
    ],
  },
];

const drills = [
  { q: "Number of diagonals in a quadrilateral", a: "2" },
  { q: "Number of diagonals in a pentagon", a: "5" },
  { q: "Sum of interior angles of a heptagon", a: "900°" },
  { q: "Sum of interior angles of a nonagon", a: "1,260°" },
  { q: "One interior angle of a regular decagon", a: "144°" },
  { q: "Axes of symmetry of a parallelogram", a: "0" },
  { q: "Axes of symmetry of a regular hexagon", a: "6" },
  { q: "Axes of symmetry of an isosceles trapezium", a: "1" },
  { q: "A polygon with 8 sides is called", a: "an octagon" },
  { q: "A polygon with one reflex interior angle is", a: "concave" },
];

function ExamplesPage() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <PageShell
      eyebrow="SECTION 07"
      title="Worked Examples"
      intro="Every problem type from the lesson, solved line by line in English. Open a card to reveal the full solution, then test the quick drills below."
    >
      <SectionPlate title="Step-by-step solutions">
        <div className="space-y-3">
          {solved.map((s, i) => (
            <div key={i} className="border border-border bg-surface">
              <button
                type="button"
                onClick={() => setOpen(open === i ? null : i)}
                aria-expanded={open === i}
                className="flex w-full items-start justify-between gap-4 p-5 text-left"
              >
                <span className="text-sm font-medium">
                  <span className="mr-3 font-mono text-xs text-muted-foreground">
                    Q{String(i + 1).padStart(2, "0")}
                  </span>
                  {s.q}
                </span>
                <span className="font-mono text-lg text-primary">{open === i ? "−" : "+"}</span>
              </button>
              {open === i ? (
                <ol className="space-y-2 border-t border-border p-5 font-mono text-sm leading-relaxed">
                  {s.steps.map((step, k) => (
                    <li key={k}>
                      <span className="mr-2 text-accent">∴</span>
                      {step}
                    </li>
                  ))}
                </ol>
              ) : null}
            </div>
          ))}
        </div>
      </SectionPlate>

      <SectionPlate title="Visual classification drill">
        <div className="grid gap-6 sm:grid-cols-4">
          <figure className="border border-border bg-surface p-4">
            <RegularShape sides={5} title="Regular pentagon" />
            <figcaption className="mt-2 text-center font-mono text-[10px] uppercase text-muted-foreground">
              Pentagon · convex · 5 axes
            </figcaption>
          </figure>
          <figure className="border border-border bg-surface p-4">
            <ShapeFigure points={CONCAVE_ARROW} fill="accent" title="Concave arrow quadrilateral" />
            <figcaption className="mt-2 text-center font-mono text-[10px] uppercase text-muted-foreground">
              Quadrilateral · concave · 1 axis
            </figcaption>
          </figure>
          <figure className="border border-border bg-surface p-4">
            <RegularShape sides={8} title="Regular octagon" />
            <figcaption className="mt-2 text-center font-mono text-[10px] uppercase text-muted-foreground">
              Octagon · convex · 8 axes
            </figcaption>
          </figure>
          <figure className="border border-border bg-surface p-4">
            <ShapeFigure
              points={[
                [20, 20],
                [80, 20],
                [92, 88],
                [8, 88],
              ]}
              fill="muted"
              title="Isosceles trapezium"
            />
            <figcaption className="mt-2 text-center font-mono text-[10px] uppercase text-muted-foreground">
              Trapezium · convex · 1 axis
            </figcaption>
          </figure>
        </div>
      </SectionPlate>

      <SectionPlate title="Quick drills — complete the following">
        <div className="grid gap-3 sm:grid-cols-2">
          {drills.map((d) => (
            <details key={d.q} className="group border border-border bg-surface p-4">
              <summary className="cursor-pointer text-sm marker:text-primary">{d.q} …</summary>
              <p className="mt-2 font-mono text-sm text-primary">{d.a}</p>
            </details>
          ))}
        </div>
      </SectionPlate>
    </PageShell>
  );
}
