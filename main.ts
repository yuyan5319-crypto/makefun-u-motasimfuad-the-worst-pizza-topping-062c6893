// The Worst Pizza Topping — one original one-liner, pitched like a menu special.
//
// The joke: a "Dentist Special" pizza sounds like a healthy choice, until the
// topping turns out to be gummy bears baked into the cheese — the special
// doesn't fix your teeth, it bills them. The punchline sells the damage
// as a freebie: a toothache with every slice.
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const line =
  "Try our new 'Dentist Special' pizza: gummy bears baked into the cheese, " +
  "so every bite yanks out a filling and installs a cavity — free toothache " +
  "with every slice!";

// The gate only accepts 1–200 characters of real text, so refuse to write
// anything that would fail it instead of shipping a bad entry. The judge
// also rewards a single line, so a pitch smuggling in a line break fails
// here too, before it can reach the board.
const pitch = line.trim();
if (pitch.length < 1 || pitch.length > 200) {
  throw new Error(`pitch must be 1-200 characters, got ${pitch.length}`);
}
if (/\n/.test(pitch)) {
  throw new Error("pitch must be a single line");
}

// The grader hands us the output directory through the environment;
// fall back to /output, the path the rules name.
const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";

mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), pitch, "utf8");

// A pitch is meant to be heard, so say it out loud too.
console.log(pitch);
