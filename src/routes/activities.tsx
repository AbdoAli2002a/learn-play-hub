import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import {
  CONCAVE_ARROW,
  CONCAVE_L,
  RegularShape,
  ShapeFigure,
  regularPoints,
  symmetryAxesFor,
} from "../components/Diagrams";
import { PageShell } from "../components/LessonNav";

export const Route = createFileRoute("/activities")({
  head: () => ({
    meta: [
      { title: "Polygon Activities, Practice & Learning Games | GEO-LAB" },
      {
        name: "description",
        content:
          "Play four interactive polygon games: a multiple-choice quiz, convex/concave sorting, an angle solver challenge and a symmetry counter — with instant feedback.",
      },
      { property: "og:title", content: "Polygon Activities, Practice & Learning Games | GEO-LAB" },
      {
        property: "og:description",
        content:
          "Quizzes, sorting, angle solving and symmetry counting — practise everything from Lesson 7 on polygons.",
      },
    ],
  }),
  component: ActivitiesPage,
});

/* ---------------- Game 1: multiple-choice quiz ---------------- */

const quiz = [
  {
    q: "A polygon with 7 sides is called:",
    options: ["Hexagon", "Heptagon", "Octagon", "Nonagon"],
    correct: 1,
    why: "Hepta- means seven, so a 7-sided polygon is a heptagon.",
  },
  {
    q: "The sum of the interior angles of an octagon is:",
    options: ["900°", "1,080°", "1,260°", "1,440°"],
    correct: 1,
    why: "(8 − 2) × 180° = 6 × 180° = 1,080°.",
  },
  {
    q: "A polygon that contains a reflex interior angle is:",
    options: ["Regular", "Convex", "Concave", "Equiangular"],
    correct: 2,
    why: "A reflex angle is greater than 180°, which makes the polygon concave.",
  },
  {
    q: "One interior angle of a regular pentagon measures:",
    options: ["100°", "108°", "120°", "135°"],
    correct: 1,
    why: "540° ÷ 5 = 108°.",
  },
  {
    q: "How many axes of symmetry does a parallelogram have?",
    options: ["0", "1", "2", "4"],
    correct: 0,
    why: "Its sides and angles are not all equal, so folding never makes the halves coincide.",
  },
  {
    q: "How many diagonals does a hexagon have?",
    options: ["6", "8", "9", "12"],
    correct: 2,
    why: "6 × (6 − 3) ÷ 2 = 9 diagonals.",
  },
];

function QuizGame() {
  const [i, setI] = useState(0);
  const [picked, setPicked] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [done, setDone] = useState(false);
  const item = quiz[i]!;

  const choose = (k: number) => {
    if (picked !== null) return;
    setPicked(k);
    if (k === item.correct) setScore((s) => s + 1);
  };

  const next = () => {
    if (i + 1 === quiz.length) {
      setDone(true);
      return;
    }
    setI(i + 1);
    setPicked(null);
  };

  const restart = () => {
    setI(0);
    setPicked(null);
    setScore(0);
    setDone(false);
  };

  if (done) {
    return (
      <div className="text-center">
        <p className="font-mono text-xs uppercase tracking-widest text-accent">Quiz complete</p>
        <p className="my-4 font-display text-5xl font-bold">
          {score}/{quiz.length}
        </p>
        <button
          type="button"
          onClick={restart}
          className="bg-accent px-6 py-3 font-bold text-accent-foreground transition-transform active:scale-95"
        >
          PLAY AGAIN
        </button>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-4 flex items-center justify-between font-mono text-xs uppercase text-muted-foreground">
        <span>
          Question {i + 1} / {quiz.length}
        </span>
        <span>Score {score}</span>
      </div>
      <p className="mb-5 font-display text-xl font-bold">{item.q}</p>
      <div className="grid gap-2 sm:grid-cols-2">
        {item.options.map((o, k) => {
          const isCorrect = k === item.correct;
          const state =
            picked === null
              ? "border-border hover:border-primary"
              : isCorrect
                ? "border-success bg-success/10 text-success"
                : picked === k
                  ? "border-destructive bg-destructive/10 text-destructive"
                  : "border-border opacity-60";
          return (
            <button
              key={o}
              type="button"
              onClick={() => choose(k)}
              className={`border px-4 py-3 text-left text-sm transition-colors ${state}`}
            >
              <span className="mr-2 font-mono text-xs">{String.fromCharCode(97 + k)})</span>
              {o}
            </button>
          );
        })}
      </div>
      {picked !== null ? (
        <div className="mt-5 flex flex-col gap-4 border-t border-border pt-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="font-mono text-xs text-muted-foreground">{item.why}</p>
          <button
            type="button"
            onClick={next}
            className="shrink-0 bg-primary px-5 py-2 text-sm font-bold text-primary-foreground"
          >
            {i + 1 === quiz.length ? "SEE RESULT" : "NEXT →"}
          </button>
        </div>
      ) : null}
    </div>
  );
}

/* ---------------- Game 2: convex / concave sorting ---------------- */

type SortItem = { id: string; label: string; concave: boolean; render: () => React.ReactNode };

const sortItems: SortItem[] = [
  {
    id: "pentagon",
    label: "Regular pentagon",
    concave: false,
    render: () => <RegularShape sides={5} title="Regular pentagon" />,
  },
  {
    id: "arrow",
    label: "Arrow quadrilateral",
    concave: true,
    render: () => (
      <ShapeFigure points={CONCAVE_ARROW} fill="accent" title="Arrow-shaped quadrilateral" />
    ),
  },
  {
    id: "l-shape",
    label: "L-shaped hexagon",
    concave: true,
    render: () => <ShapeFigure points={CONCAVE_L} fill="accent" title="L-shaped hexagon" />,
  },
  {
    id: "octagon",
    label: "Regular octagon",
    concave: false,
    render: () => <RegularShape sides={8} title="Regular octagon" />,
  },
  {
    id: "star",
    label: "Star-cut quadrilateral",
    concave: true,
    render: () => (
      <ShapeFigure
        points={[
          [50, 12],
          [64, 44],
          [92, 50],
          [58, 62],
          [70, 92],
          [42, 70],
          [12, 84],
          [24, 52],
        ]}
        fill="accent"
        title="Star-shaped concave polygon"
      />
    ),
  },
  {
    id: "trapezium",
    label: "Trapezium",
    concave: false,
    render: () => (
      <ShapeFigure
        points={[
          [24, 22],
          [76, 22],
          [92, 86],
          [8, 86],
        ]}
        title="Isosceles trapezium"
      />
    ),
  },
];

function SortGame() {
  const [answers, setAnswers] = useState<Record<string, boolean>>({});
  const solvedCount = Object.keys(answers).length;
  const correctCount = sortItems.filter((s) => answers[s.id] === s.concave).length;

  return (
    <div>
      <div className="mb-5 flex items-center justify-between font-mono text-xs uppercase text-muted-foreground">
        <span>Sort every shape</span>
        <span>
          Correct {correctCount} / {sortItems.length}
        </span>
      </div>
      <div className="grid gap-4 sm:grid-cols-3">
        {sortItems.map((s) => {
          const picked = answers[s.id];
          const graded = picked !== undefined;
          const right = graded && picked === s.concave;
          return (
            <div
              key={s.id}
              className={`border bg-surface p-4 ${
                graded ? (right ? "border-success" : "border-destructive") : "border-border"
              }`}
            >
              <div className="mx-auto mb-3 w-24">{s.render()}</div>
              <p className="mb-3 text-center text-xs font-medium">{s.label}</p>
              <div className="grid grid-cols-2 gap-2">
                {(["Convex", "Concave"] as const).map((label, idx) => (
                  <button
                    key={label}
                    type="button"
                    onClick={() => setAnswers((a) => ({ ...a, [s.id]: idx === 1 }))}
                    className={`border px-2 py-2 font-mono text-[10px] uppercase transition-colors ${
                      picked === (idx === 1)
                        ? right
                          ? "border-success bg-success/10 text-success"
                          : "border-destructive bg-destructive/10 text-destructive"
                        : "border-border hover:border-primary"
                    }`}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>
          );
        })}
      </div>
      {solvedCount === sortItems.length ? (
        <div className="mt-5 flex items-center justify-between border-t border-border pt-4">
          <p className="font-mono text-xs uppercase text-accent">
            {correctCount === sortItems.length
              ? "Perfect sort — every reflex angle spotted."
              : "Check the red plates: look for an interior angle bigger than 180°."}
          </p>
          <button
            type="button"
            onClick={() => setAnswers({})}
            className="bg-primary px-4 py-2 text-xs font-bold text-primary-foreground"
          >
            RESET
          </button>
        </div>
      ) : null}
    </div>
  );
}

/* ---------------- Game 3: angle solver ---------------- */

const names = [
  "",
  "",
  "",
  "triangle",
  "quadrilateral",
  "pentagon",
  "hexagon",
  "heptagon",
  "octagon",
  "nonagon",
  "decagon",
];

function makeChallenge(seed: number) {
  const n = 3 + (seed % 8);
  const total = (n - 2) * 180;
  const known = n - 1;
  const base = Math.floor(total / n);
  const angles: number[] = [];
  let used = 0;
  for (let i = 0; i < known; i++) {
    const jitter = ((seed * (i + 3)) % 21) - 10;
    const value = Math.min(base + jitter, 175);
    angles.push(value);
    used += value;
  }
  return { n, total, angles, answer: total - used };
}

function AngleSolver() {
  const [round, setRound] = useState(1);
  const [seed, setSeed] = useState(7);
  const [value, setValue] = useState("");
  const [state, setState] = useState<"idle" | "right" | "wrong">("idle");
  const [streak, setStreak] = useState(0);
  const challenge = useMemo(() => makeChallenge(seed), [seed]);

  const check = () => {
    const guess = Number(value);
    if (!Number.isFinite(guess) || value.trim() === "") return;
    if (guess === challenge.answer) {
      setState("right");
      setStreak((s) => s + 1);
    } else {
      setState("wrong");
      setStreak(0);
    }
  };

  const nextRound = () => {
    setSeed((s) => s * 3 + 11);
    setRound((r) => r + 1);
    setValue("");
    setState("idle");
  };

  return (
    <div>
      <div className="mb-4 flex items-center justify-between font-mono text-xs uppercase text-muted-foreground">
        <span>Round {round}</span>
        <span>Streak {streak}</span>
      </div>
      <div className="grid gap-6 sm:grid-cols-[1fr_120px]">
        <div>
          <p className="mb-3 text-sm">
            A <strong>{names[challenge.n]}</strong> has these known interior angles. Find the
            missing angle.
          </p>
          <p className="mb-4 font-mono text-sm leading-relaxed text-primary">
            {challenge.angles.map((a) => `${a}°`).join(" + ")} + <span className="text-accent">x</span>{" "}
            = {challenge.total.toLocaleString("en-US")}°
          </p>
          <div className="flex flex-wrap gap-2">
            <label className="sr-only" htmlFor="angle-answer">
              Missing angle in degrees
            </label>
            <input
              id="angle-answer"
              inputMode="numeric"
              value={value}
              onChange={(e) => {
                setValue(e.target.value);
                setState("idle");
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter") check();
              }}
              placeholder="x in degrees"
              className="w-40 border border-border bg-card px-3 py-2 font-mono text-sm outline-none focus:border-primary"
            />
            <button
              type="button"
              onClick={check}
              className="bg-primary px-5 py-2 text-sm font-bold text-primary-foreground"
            >
              CHECK
            </button>
            <button
              type="button"
              onClick={nextRound}
              className="border border-border px-5 py-2 text-sm font-bold"
            >
              NEW ROUND
            </button>
          </div>
          {state === "right" ? (
            <p className="mt-4 font-mono text-xs uppercase text-success">
              Correct — x = {challenge.answer}°. Keep the streak going.
            </p>
          ) : null}
          {state === "wrong" ? (
            <p className="mt-4 font-mono text-xs uppercase text-destructive">
              Not yet. Subtract the sum of the known angles from{" "}
              {challenge.total.toLocaleString("en-US")}°.
            </p>
          ) : null}
        </div>
        <div className="mx-auto w-28 self-start border border-border bg-surface p-3">
          <ShapeFigure
            points={regularPoints(challenge.n, 40)}
            title={`Figure of a ${names[challenge.n]}`}
          />
        </div>
      </div>
    </div>
  );
}

/* ---------------- Game 4: symmetry counter ---------------- */

const symmetryRounds = [
  { sides: 3, name: "Equilateral triangle" },
  { sides: 4, name: "Square" },
  { sides: 5, name: "Regular pentagon" },
  { sides: 6, name: "Regular hexagon" },
  { sides: 8, name: "Regular octagon" },
];

function SymmetryGame() {
  const [idx, setIdx] = useState(0);
  const [guess, setGuess] = useState<number | null>(null);
  const round = symmetryRounds[idx]!;
  const correct = guess === round.sides;

  return (
    <div className="grid gap-6 sm:grid-cols-[160px_1fr]">
      <figure className="border border-border bg-surface p-4">
        <ShapeFigure
          points={regularPoints(round.sides, 38)}
          symmetryAxes={correct ? symmetryAxesFor(round.sides) : undefined}
          title={`${round.name}${correct ? " with all axes of symmetry shown" : ""}`}
        />
        <figcaption className="mt-2 text-center font-mono text-[10px] uppercase text-muted-foreground">
          {round.name}
        </figcaption>
      </figure>
      <div>
        <p className="mb-4 text-sm">How many axes of symmetry does this shape have?</p>
        <div className="flex flex-wrap gap-2">
          {[3, 4, 5, 6, 7, 8, 9, 10].map((n) => (
            <button
              key={n}
              type="button"
              onClick={() => setGuess(n)}
              className={`h-10 w-10 border font-mono text-sm transition-colors ${
                guess === n
                  ? n === round.sides
                    ? "border-success bg-success/10 text-success"
                    : "border-destructive bg-destructive/10 text-destructive"
                  : "border-border hover:border-primary"
              }`}
            >
              {n}
            </button>
          ))}
        </div>
        <div className="mt-5 flex items-center justify-between border-t border-border pt-4">
          <p className="font-mono text-xs uppercase text-muted-foreground">
            {guess === null
              ? "Remember: a regular polygon has as many axes as sides."
              : correct
                ? `Correct — ${round.sides} axes, now drawn on the figure.`
                : "Try again — count the fold lines through opposite vertices and sides."}
          </p>
          <button
            type="button"
            onClick={() => {
              setIdx((idx + 1) % symmetryRounds.length);
              setGuess(null);
            }}
            className="shrink-0 bg-accent px-4 py-2 text-xs font-bold text-accent-foreground"
          >
            NEXT SHAPE →
          </button>
        </div>
      </div>
    </div>
  );
}

/* ---------------- Page ---------------- */

const games = [
  { tag: "QUIZ 01", title: "Polygon Knowledge Quiz", node: <QuizGame /> },
  { tag: "SORT 02", title: "Convex or Concave?", node: <SortGame /> },
  { tag: "SOLVE 03", title: "The Missing Angle Challenge", node: <AngleSolver /> },
  { tag: "GAME 04", title: "Symmetry Counter", node: <SymmetryGame /> },
];

function ActivitiesPage() {
  return (
    <PageShell
      eyebrow="SECTION 08"
      title="Practice Arcade"
      intro="Four activities that cover the whole lesson: a knowledge quiz, a convex/concave sorting task, an endless missing-angle challenge and a symmetry counting game. Every answer is checked instantly."
    >
      {games.map((g) => (
        <section key={g.tag} className="bg-foreground p-6 text-background lg:p-10">
          <div className="mb-6 flex items-baseline gap-4">
            <span className="font-mono text-xs uppercase tracking-widest text-accent">{g.tag}</span>
            <h2 className="font-display text-2xl font-bold lg:text-3xl">{g.title}</h2>
          </div>
          <div className="bg-card p-6 text-foreground lg:p-8">{g.node}</div>
        </section>
      ))}
    </PageShell>
  );
}
