import { createFileRoute } from "@tanstack/react-router";
import { RegularShape } from "../components/Diagrams";
import { PageShell, SectionPlate } from "../components/LessonNav";

export const Route = createFileRoute("/regular-polygons")({
  head: () => ({
    meta: [
      { title: "Regular Polygons and Their Angles | GEO-LAB" },
      {
        name: "description",
        content:
          "A regular polygon has all sides equal and all interior angles equal. Learn the one-angle formula, a reference table and two worked examples.",
      },
      { property: "og:title", content: "Regular Polygons and Their Angles | GEO-LAB" },
      {
        property: "og:description",
        content:
          "Equal sides, equal angles: how to find one interior angle of any regular polygon.",
      },
    ],
  }),
  component: RegularPolygonsPage,
});

const rows = [
  { name: "Equilateral triangle", n: 3 },
  { name: "Square", n: 4 },
  { name: "Regular pentagon", n: 5 },
  { name: "Regular hexagon", n: 6 },
  { name: "Regular octagon", n: 8 },
  { name: "Regular decagon", n: 10 },
];

function RegularPolygonsPage() {
  return (
    <PageShell
      eyebrow="SECTION 05"
      title="Regular Polygons"
      intro="A regular polygon satisfies two conditions at the same time: all of its sides are equal in length, and all of its interior angles are equal in measure. If only one condition holds, the polygon is irregular."
    >
      <SectionPlate title="One interior angle">
        <p className="max-w-[60ch] text-base leading-relaxed">
          Because every interior angle is equal, divide the total sum by the number of angles.
        </p>
        <div className="mt-6 border border-dashed border-border bg-surface p-6 text-center font-mono text-xl">
          One interior angle = (n − 2) × 180° ÷ n
        </div>

        <div className="mt-8 overflow-x-auto">
          <table className="w-full border-collapse font-mono text-sm">
            <caption className="sr-only">One interior angle of common regular polygons</caption>
            <thead>
              <tr className="border-b border-foreground text-left">
                <th className="py-3">Regular polygon</th>
                <th className="py-3">Sides (n)</th>
                <th className="py-3">Calculation</th>
                <th className="py-3 text-right">One angle</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {rows.map((r) => (
                <tr key={r.n}>
                  <td className="py-3">{r.name}</td>
                  <td className="py-3">{r.n}</td>
                  <td className="py-3">
                    {((r.n - 2) * 180).toLocaleString("en-US")}° ÷ {r.n}
                  </td>
                  <td className="py-3 text-right font-medium text-primary">
                    {((r.n - 2) * 180) / r.n}°
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-4">
          {[3, 4, 6, 8].map((n) => (
            <figure key={n} className="border border-border bg-surface p-4">
              <RegularShape sides={n} title={`Regular polygon with ${n} equal sides`} />
              <figcaption className="mt-2 text-center font-mono text-[10px] uppercase text-muted-foreground">
                {((n - 2) * 180) / n}° each
              </figcaption>
            </figure>
          ))}
        </div>
      </SectionPlate>

      <SectionPlate title="Worked examples">
        <div className="grid gap-6 lg:grid-cols-2">
          <div className="border border-dashed border-border bg-surface p-6 font-mono text-sm leading-loose">
            <p className="mb-3 font-sans font-semibold">
              1. ABCDE is a regular pentagon. Find one interior angle X.
            </p>
            <p>∵ sum of interior angles = 540°</p>
            <p>∴ X = 540 ÷ 5</p>
            <p className="text-primary">∴ X = 108</p>
          </div>
          <div className="border border-dashed border-border bg-surface p-6 font-mono text-sm leading-loose">
            <p className="mb-3 font-sans font-semibold">
              2. ABCDEFGH is a regular octagon and JHGI is a square. Find X.
            </p>
            <p>One angle of a regular octagon = 1,080 ÷ 8 = 135°</p>
            <p>One angle of a square = 90°</p>
            <p>Angles around point H: 135 + 90 + X = 360</p>
            <p className="text-primary">∴ X = 135</p>
          </div>
        </div>
        <div className="mt-6 border-l-2 border-primary bg-surface p-5">
          <h3 className="mb-2 font-display text-lg font-bold">Try it yourself</h3>
          <p className="font-mono text-sm text-muted-foreground">
            Decoration: a regular octagon and a square share the side BC. What is m(∠ABC)?
          </p>
          <p className="mt-3 font-mono text-xs uppercase text-primary">
            Answer: 360° − 135° − 90° = 135°.
          </p>
        </div>
      </SectionPlate>
    </PageShell>
  );
}
