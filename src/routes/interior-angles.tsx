import { createFileRoute } from "@tanstack/react-router";
import { ShapeFigure, regularPoints } from "../components/Diagrams";
import { PageShell, SectionPlate } from "../components/LessonNav";

export const Route = createFileRoute("/interior-angles")({
  head: () => ({
    meta: [
      { title: "Sum of Interior Angles of a Polygon | GEO-LAB" },
      {
        name: "description",
        content:
          "Deduce the (n − 2) × 180° rule by splitting a polygon into triangles, with a full table from triangle to decagon and worked examples.",
      },
      { property: "og:title", content: "Sum of Interior Angles of a Polygon | GEO-LAB" },
      {
        property: "og:description",
        content:
          "Split any convex polygon into triangles from one vertex and read off the sum of its interior angles.",
      },
    ],
  }),
  component: InteriorAnglesPage,
});

const rows = [
  { name: "Triangle", n: 3 },
  { name: "Quadrilateral", n: 4 },
  { name: "Pentagon", n: 5 },
  { name: "Hexagon", n: 6 },
  { name: "Heptagon", n: 7 },
  { name: "Octagon", n: 8 },
  { name: "Nonagon", n: 9 },
  { name: "Decagon", n: 10 },
];

function InteriorAnglesPage() {
  return (
    <PageShell
      eyebrow="SECTION 04"
      title="The Sum of the Interior Angles"
      intro="We already know the three angles of a triangle add up to 180°. Draw every diagonal from a single vertex of a convex polygon and it splits into triangles — counting those triangles gives the whole rule."
    >
      <SectionPlate title="Splitting a polygon into triangles">
        <div className="grid gap-6 sm:grid-cols-4">
          {[4, 5, 6, 7].map((n) => (
            <figure key={n} className="border border-border bg-surface p-4">
              <ShapeFigure
                points={regularPoints(n)}
                diagonalsFrom={0}
                title={`Polygon with ${n} sides divided into ${n - 2} triangles`}
              />
              <figcaption className="mt-2 text-center font-mono text-[10px] uppercase text-muted-foreground">
                {n} sides → {n - 2} triangles
              </figcaption>
            </figure>
          ))}
        </div>

        <div className="mt-8 border border-dashed border-border bg-surface p-6 text-center font-mono text-2xl">
          Sum of interior angles = (n − 2) × 180°
        </div>
        <p className="mt-4 text-center font-mono text-xs uppercase text-muted-foreground">
          Number of triangles = number of sides − 2
        </p>
      </SectionPlate>

      <SectionPlate title="Reference table">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse font-mono text-sm">
            <caption className="sr-only">
              Sum of the interior angles for polygons with 3 to 10 sides
            </caption>
            <thead>
              <tr className="border-b border-foreground text-left">
                <th className="py-3">Polygon</th>
                <th className="py-3">Sides (n)</th>
                <th className="py-3">Triangles</th>
                <th className="py-3">Calculation</th>
                <th className="py-3 text-right">Sum</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {rows.map((r) => (
                <tr key={r.n}>
                  <td className="py-3">{r.name}</td>
                  <td className="py-3">{r.n}</td>
                  <td className="py-3">{r.n - 2}</td>
                  <td className="py-3">
                    {r.n - 2} × 180°
                  </td>
                  <td className="py-3 text-right font-medium text-primary">
                    {((r.n - 2) * 180).toLocaleString("en-US")}°
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </SectionPlate>

      <SectionPlate title="Worked examples">
        <div className="grid gap-6 lg:grid-cols-2">
          <div className="border border-dashed border-border bg-surface p-6 font-mono text-sm leading-loose">
            <p className="mb-3 font-sans font-semibold">
              1. Hexagon ABCDEF with angles X, 90°, X, 110°, 165°, 115°. Find X.
            </p>
            <p>∵ ABCDEF is a hexagon ⟹ sum = 720°</p>
            <p>∴ X + 90 + X + 110 + 165 + 115 = 720</p>
            <p>∴ 2X + 480 = 720 ⟹ 2X = 240</p>
            <p className="text-primary">∴ X = 120</p>
          </div>
          <div className="border border-dashed border-border bg-surface p-6 font-mono text-sm leading-loose">
            <p className="mb-3 font-sans font-semibold">
              2. Pentagon ABCDE with ED ∥ BF, m(∠A) = 130°, m(∠B) = 90°. Find m(∠E).
            </p>
            <p>∵ ED ∥ BF ⟹ co-interior angles sum to 180°</p>
            <p>∴ 180° + 150° + 80° + m(∠E) = 540°</p>
            <p>∴ 410° + m(∠E) = 540°</p>
            <p className="text-primary">∴ m(∠E) = 130°</p>
          </div>
        </div>
      </SectionPlate>
    </PageShell>
  );
}
