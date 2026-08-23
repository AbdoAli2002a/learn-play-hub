import { createFileRoute } from "@tanstack/react-router";
import { RegularShape } from "../components/Diagrams";
import { PageShell, SectionPlate } from "../components/LessonNav";

export const Route = createFileRoute("/gallery")({
  head: () => ({
    meta: [
      { title: "Polygon Gallery — Triangle to Decagon | GEO-LAB" },
      {
        name: "description",
        content:
          "A visual gallery of polygons from the triangle to the decagon, with the number of sides, diagonals and the sum of interior angles for each.",
      },
      { property: "og:title", content: "Polygon Gallery — Triangle to Decagon | GEO-LAB" },
      {
        property: "og:description",
        content:
          "Compare polygons side by side: sides, diagonals and interior angle sums from 3 to 10 sides.",
      },
    ],
  }),
  component: GalleryPage,
});

const polygons = [
  { n: 3, name: "Triangle" },
  { n: 4, name: "Quadrilateral" },
  { n: 5, name: "Pentagon" },
  { n: 6, name: "Hexagon" },
  { n: 7, name: "Heptagon" },
  { n: 8, name: "Octagon" },
  { n: 9, name: "Nonagon" },
  { n: 10, name: "Decagon" },
];

const diagonals = (n: number) => (n * (n - 3)) / 2;

function GalleryPage() {
  return (
    <PageShell
      eyebrow="SECTION 02"
      title="The Polygon Gallery"
      intro="Each polygon is named after its number of sides. Hover a plate to enlarge the figure, and read off its sides, diagonals and total interior angle measure."
    >
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {polygons.map((p) => (
          <figure
            key={p.n}
            className="group border border-border bg-card p-6 transition-colors hover:border-primary"
          >
            <div className="mb-5 flex aspect-square items-center justify-center bg-surface p-4">
              <div className="w-full transition-transform duration-500 group-hover:scale-110">
                <RegularShape sides={p.n} title={`Regular ${p.name.toLowerCase()}`} />
              </div>
            </div>
            <figcaption>
              <h2 className="font-display text-xl font-bold">{p.name}</h2>
              <p className="font-mono text-[10px] uppercase text-muted-foreground">
                {p.n} sides • {(p.n - 2) * 180}° total
              </p>
              <p className="mt-1 font-mono text-[10px] uppercase text-accent">
                {diagonals(p.n)} diagonals
              </p>
            </figcaption>
          </figure>
        ))}
      </div>

      <SectionPlate title="Counting diagonals">
        <p className="max-w-[60ch] text-base leading-relaxed">
          From each vertex you can draw a diagonal to every vertex except itself and its two
          neighbours, and each diagonal is counted twice — once from each end.
        </p>
        <div className="mt-6 border border-dashed border-border bg-surface p-6 text-center font-mono text-xl">
          Number of diagonals = n × (n − 3) ÷ 2
        </div>
        <p className="mt-4 font-mono text-sm text-muted-foreground">
          Quadrilateral: 4 × 1 ÷ 2 = 2 · Pentagon: 5 × 2 ÷ 2 = 5 · Hexagon: 6 × 3 ÷ 2 = 9
        </p>
      </SectionPlate>
    </PageShell>
  );
}
