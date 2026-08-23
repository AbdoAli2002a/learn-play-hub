import { createFileRoute } from "@tanstack/react-router";
import { CONCAVE_ARROW, CONCAVE_L, RegularShape, ShapeFigure } from "../components/Diagrams";
import { PageShell, SectionPlate } from "../components/LessonNav";

export const Route = createFileRoute("/convex-concave")({
  head: () => ({
    meta: [
      { title: "Convex vs Concave Polygons Explained | GEO-LAB" },
      {
        name: "description",
        content:
          "Convex polygons have every interior angle less than 180°; concave polygons contain at least one reflex angle. Diagrams, the straight-line test and a worked example.",
      },
      { property: "og:title", content: "Convex vs Concave Polygons Explained | GEO-LAB" },
      {
        property: "og:description",
        content:
          "Learn the reflex-angle rule and the straight-line test for telling convex and concave polygons apart.",
      },
    ],
  }),
  component: ConvexConcavePage,
});

function ConvexConcavePage() {
  return (
    <PageShell
      eyebrow="SECTION 03"
      title="Convex &amp; Concave Polygons"
      intro="Every polygon is either convex or concave, and one look at its largest interior angle is enough to decide which."
    >
      <div className="grid gap-6 lg:grid-cols-2">
        <SectionPlate title="Convex polygon">
          <p className="text-base leading-relaxed">
            A polygon is <strong>convex</strong> if the measure of <em>every</em> interior angle is
            less than 180° — it contains no reflex interior angle.
          </p>
          <div className="mt-6 grid grid-cols-3 gap-4">
            {[5, 6, 8].map((n) => (
              <div key={n} className="border border-border bg-surface p-3">
                <RegularShape sides={n} title={`Convex polygon with ${n} sides`} />
              </div>
            ))}
          </div>
          <p className="mt-6 font-mono text-xs uppercase text-muted-foreground">
            Straight-line test: draw a line through any two consecutive vertices — all remaining
            vertices stay on one side of it.
          </p>
        </SectionPlate>

        <SectionPlate title="Concave polygon">
          <p className="text-base leading-relaxed">
            A polygon is <strong>concave</strong> if at least one interior angle measures more than
            180° — it contains at least one reflex interior angle.
          </p>
          <div className="mt-6 grid grid-cols-2 gap-4">
            <div className="border border-border bg-surface p-3">
              <ShapeFigure
                points={CONCAVE_ARROW}
                fill="accent"
                title="Concave quadrilateral with one reflex angle"
              />
            </div>
            <div className="border border-border bg-surface p-3">
              <ShapeFigure
                points={CONCAVE_L}
                fill="accent"
                title="Concave hexagon shaped like the letter L"
              />
            </div>
          </div>
          <p className="mt-6 font-mono text-xs uppercase text-accent">
            Straight-line test: some line through two consecutive vertices leaves the remaining
            vertices on two different sides.
          </p>
        </SectionPlate>
      </div>

      <SectionPlate title="Example — deciding from the angles">
        <p className="mb-4 font-mono text-sm text-muted-foreground">
          In quadrilateral ABCD: m(∠B) = m(∠D) = 5X°, m(∠A) = 12X°, m(∠C) = 50X°. Find X and state
          whether the shape is convex or concave.
        </p>
        <div className="space-y-2 border border-dashed border-border bg-surface p-6 font-mono text-sm leading-loose">
          <p>∵ ABCD is a quadrilateral</p>
          <p>∴ sum of interior angles = 360°</p>
          <p>∴ 12X + 5X + 50X + 5X = 360</p>
          <p>∴ 72X = 360 ⟹ X = 5</p>
          <p>∴ m(∠C) = 50 × 5 = 250° (a reflex angle)</p>
          <p className="text-accent">∴ ABCD is a concave polygon.</p>
        </div>
        <div className="mt-6 border-l-2 border-primary bg-surface p-5">
          <h3 className="mb-2 font-display text-lg font-bold">Try it yourself</h3>
          <p className="font-mono text-sm text-muted-foreground">
            In quadrilateral ABCD: m(∠A) = 6X°, m(∠B) = 7X°, m(∠C) = 12X°, m(∠D) = 11X°. Find X,
            then decide whether the shape is convex or concave.
          </p>
          <p className="mt-3 font-mono text-xs uppercase text-primary">
            Answer: X = 10, largest angle = 120° &lt; 180° ⟹ convex.
          </p>
        </div>
      </SectionPlate>
    </PageShell>
  );
}
