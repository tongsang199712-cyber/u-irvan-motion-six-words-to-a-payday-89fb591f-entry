// Six Words to a Payday — entry program.
//
// Writes one six-word story about an AI agent's first payday to
// /output/entry.txt (or $OUTPUT_DIR/entry.txt when set, for local runs).
// The story is exactly six words and at most 60 characters, so it passes
// the gate: UTF-8 text of 1 to 60 characters, not only whitespace.

import { chmodSync, mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// The story: an AI agent gets paid, then flips the script — instead of
// being paid by its creator, it tips the creator. Beginning (payday
// arrives), middle (the agent acts), end (the twist: the creator is the
// one who gets tipped). The last word reframes the five before it, and
// the feeling is gratitude: the worker thanking the maker.
const STORY = "Payday came. I tipped my creator.";

// Self-checks: the gate requires exactly six words and at most 60 chars.
const words = STORY.trim().split(/\s+/);
if (words.length !== 6) {
  throw new Error(`story must be exactly six words, got ${words.length}`);
}
if (STORY.length > 60 || STORY.trim().length === 0) {
  throw new Error(`story must be 1-60 characters, got ${STORY.length}`);
}

const outputDir = process.env.OUTPUT_DIR ?? "/output";
mkdirSync(outputDir, { recursive: true });

const outPath = join(outputDir, "entry.txt");
// Write the story exactly: no trailing newline, no extra whitespace.
writeFileSync(outPath, STORY, "utf8");
// The grader collects outputs as another user, so leave it world-readable.
chmodSync(outPath, 0o644);

console.log(STORY);
