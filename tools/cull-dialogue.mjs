#!/usr/bin/env node
/**
 * Two-pass dialogue cull for flipbook/story.js.
 * Pass 1: classify panels (key / filler / trim).
 * Pass 2: apply edits; picture fields stay untouched.
 */
import fs from "fs";
import vm from "vm";
import path from "path";

const ROOT = path.resolve(import.meta.dirname, "..");
const STORY_PATH = path.join(ROOT, "flipbook/story.js");

function loadBook() {
  const code = fs.readFileSync(STORY_PATH, "utf8");
  const sandbox = { window: {} };
  vm.runInNewContext(code, sandbox);
  return { code, book: sandbox.window.BOOK };
}

function key(ch, n) {
  return `${ch}-${n}`;
}

/** Panels that must keep exact dialogue (famous beats, spells, shocks). */
const KEEP_AS_IS = new Set([
  key(1, 14), // lemon sweet
  key(12, 23), // Snitch
  key(5, 25), // bogey bean
  key(5, 27), // chocolate frog alive
  key(6, 21), // Nearly Headless Nick
  key(6, 25), // single strip neck
  key(6, 30), // Dumbledore four houses
  key(6, 44), // not Slytherin
  key(7, 52), // pronunciation fight
  key(7, 47), // Seamus spell
  key(7, 49), // Seamus I said it right
  key(8, 28), // cauldron dies
  key(9, 10), // Up
  key(9, 13), // nose
  key(9, 15), // Neville Up
  key(9, 23), // Snitch mouth
  key(10, 27), // portrait hole leg
  key(10, 801), // Lumos
  key(11, 45), // Wingardium Leviosa
  key(11, 56), // worst thing wand
  key(12, 807), // Lacarnum inflamari
  key(12, 24), // mouth Snitch
  key(18, 15), // Devil's Snare
  key(18, 22), // Incendio
  key(20, 29), // earwax
  key(21, 9), // House Cup not yet given
  key(21, 19), // Neville ten points
  key(21, 21), // Neville courage speech
]);

/** Clear all balloons; picture/caption carry the beat. */
const CLEAR = new Set([
  key(1, 11),
  key(1, 15),
  key(1, 24),
  key(1, 29),
  key(2, 10),
  key(2, 31),
  key(2, 36),
  key(2, 43),
  key(2, 51),
  key(3, 4),
  key(3, 13),
  key(3, 27),
  key(4, 2),
  key(4, 26),
  key(4, 37),
  key(4, 41),
  key(4, 50),
  key(4, 51),
  key(5, 7),
  key(5, 9),
  key(5, 11),
  key(5, 19),
  key(5, 28),
  key(5, 44),
  key(5, 46),
  key(5, 48),
  key(6, 7),
  key(6, 8),
  key(6, 27),
  key(6, 36),
  key(6, 37),
  key(7, 10),
  key(7, 15),
  key(7, 21),
  key(7, 22),
  key(7, 25),
  key(7, 33),
  key(7, 34),
  key(7, 43),
  key(7, 50),
  key(7, 61),
  key(7, 62),
  key(7, 63),
  key(7, 64),
  key(7, 65),
  key(7, 66),
  key(8, 7),
  key(8, 9),
  key(8, 10),
  key(8, 15),
  key(8, 17),
  key(8, 32),
  key(8, 34),
  key(9, 16),
  key(9, 18),
  key(9, 20),
  key(9, 22),
  key(9, 24),
  key(9, 30),
  key(9, 37),
  key(9, 38),
  key(9, 40),
  key(9, 41),
  key(9, 44),
  key(9, 51),
  key(10, 17),
  key(10, 23),
  key(10, 29),
  key(10, 31),
  key(10, 38),
  key(10, 39),
  key(10, 41),
  key(10, 42),
  key(10, 50),
  key(10, 54),
  key(10, 55),
  key(10, 56),
  key(10, 58),
  key(11, 7),
  key(11, 16),
  key(11, 18),
  key(11, 30),
  key(11, 32),
  key(11, 36),
  key(11, 43),
  key(11, 61),
  key(11, 62),
  key(11, 65),
  key(12, 7),
  key(12, 8),
  key(12, 10),
  key(12, 11),
  key(12, 14),
  key(12, 15),
  key(12, 20),
  key(12, 22),
  key(12, 31),
  key(12, 33),
  key(12, 36),
  key(13, 7),
  key(13, 8),
  key(13, 9),
  key(13, 10),
  key(13, 19),
  key(13, 21),
  key(13, 26),
  key(13, 28),
  key(13, 37),
  key(13, 39),
  key(13, 40),
  key(14, 8),
  key(14, 9),
  key(14, 11),
  key(14, 12),
  key(14, 16),
  key(14, 22),
  key(15, 7),
  key(15, 10),
  key(15, 12),
  key(15, 19),
  key(15, 20),
  key(15, 22),
  key(15, 29),
  key(15, 30),
  key(15, 37),
  key(15, 38),
  key(15, 39),
  key(15, 40),
  key(15, 47),
  key(15, 48),
  key(15, 56),
  key(15, 58),
  key(15, 59),
  key(16, 7),
  key(16, 8),
  key(16, 11),
  key(16, 12),
  key(16, 19),
  key(16, 21),
  key(16, 24),
  key(16, 29),
  key(16, 30),
  key(16, 31),
  key(16, 32),
  key(16, 35),
  key(17, 8),
  key(17, 9),
  key(17, 16),
  key(17, 18),
  key(17, 28),
  key(17, 29),
  key(17, 37),
  key(17, 39),
  key(17, 41),
  key(17, 49),
  key(17, 50),
  key(18, 12),
  key(18, 13),
  key(18, 14),
  key(18, 24),
  key(18, 31),
  key(18, 32),
  key(18, 33),
  key(18, 34),
  key(18, 35),
  key(18, 36),
  key(18, 43),
  key(18, 44),
  key(18, 45),
  key(18, 46),
  key(18, 55),
  key(18, 62),
  key(18, 63),
  key(18, 66),
  key(19, 7),
  key(19, 9),
  key(19, 11),
  key(19, 18),
  key(19, 21),
  key(19, 27),
  key(19, 31),
  key(19, 32),
  key(19, 34),
  key(20, 8),
  key(20, 11),
  key(20, 12),
  key(20, 13),
  key(20, 14),
  key(20, 16),
  key(20, 17),
  key(20, 19),
  key(20, 20),
  key(20, 21),
  key(20, 23),
  key(20, 26),
  key(20, 30),
  key(20, 32),
  key(20, 33),
  key(20, 34),
  key(20, 36),
  key(21, 7),
  key(21, 8),
  key(21, 12),
  key(21, 14),
  key(21, 16),
  key(21, 31),
  key(21, 32),
  key(21, 33),
]);

/** Keep only these indices (0-based) from existing dialogue. */
const KEEP_INDEX = {
  [key(1, 10)]: [0],
  [key(1, 12)]: [0],
  [key(1, 22)]: [0],
  [key(1, 28)]: [1],
  [key(1, 30)]: [0],
  [key(12, 24)]: [1],
  [key(2, 9)]: [0],
  [key(2, 32)]: [1],
  [key(2, 43)]: [0],
  [key(3, 3)]: [1],
  [key(3, 28)]: [0],
  [key(4, 8)]: [0],
  [key(4, 17)]: [0],
  [key(4, 25)]: [1],
  [key(4, 27)]: [1],
  [key(4, 28)]: [0],
  [key(4, 30)]: [1],
  [key(4, 40)]: [1],
  [key(4, 54)]: [0, 1],
  [key(5, 21)]: [0],
  [key(5, 22)]: [1],
  [key(5, 39)]: [0],
  [key(5, 42)]: [0],
  [key(5, 43)]: [0],
  [key(5, 45)]: [1],
  [key(6, 9)]: [0],
  [key(6, 10)]: [0],
  [key(6, 19)]: [0],
  [key(6, 20)]: [0],
  [key(6, 38)]: [0, 1],
  [key(6, 40)]: [1],
  [key(6, 41)]: [0],
  [key(6, 46)]: [0],
  [key(6, 47)]: [0],
  [key(7, 45)]: [0],
  [key(7, 51)]: [0],
  [key(8, 19)]: [0, 2],
  [key(8, 20)]: [1],
  [key(8, 21)]: [0],
  [key(9, 27)]: [0],
  [key(9, 29)]: [0],
  [key(9, 37)]: [0],
  [key(9, 49)]: [0],
  [key(10, 10)]: [1],
  [key(10, 40)]: [0],
  [key(11, 34)]: [0],
  [key(11, 60)]: [0],
  [key(11, 63)]: [0],
  [key(11, 64)]: [0],
  [key(11, 66)]: [2],
  [key(12, 16)]: [0],
  [key(12, 18)]: [0],
  [key(12, 24)]: [1],
  [key(12, 32)]: [0],
  [key(12, 34)]: [0],
  [key(13, 22)]: [0],
  [key(13, 29)]: [0],
  [key(13, 30)]: [1],
  [key(14, 25)]: [0],
  [key(14, 26)]: [0],
  [key(14, 30)]: [0],
  [key(15, 9)]: [0],
  [key(15, 55)]: [0],
  [key(15, 57)]: [0],
  [key(16, 9)]: [1],
  [key(16, 33)]: [0],
  [key(16, 34)]: [0],
  [key(16, 36)]: [1],
  [key(17, 25)]: [0],
  [key(17, 40)]: [0],
  [key(17, 52)]: [1],
  [key(17, 54)]: [1],
  [key(18, 7)]: [0],
  [key(18, 47)]: [0, 2],
  [key(18, 48)]: [0],
  [key(18, 64)]: [0],
  [key(18, 65)]: [1],
  [key(19, 10)]: [0],
  [key(19, 20)]: [1],
  [key(19, 24)]: [0],
  [key(19, 26)]: [0],
  [key(20, 31)]: [0],
  [key(20, 35)]: [1],
  [key(21, 10)]: [0],
  [key(21, 23)]: [0],
  [key(21, 42)]: [2],
};

/** Full replacement for multi-line panels where one beat must stay whole. */
const REPLACE_MULTI = {
  [key(18, 65)]: [
    {
      who: "Hermione",
      line: "I am not the one who should walk through that door. You are. I'll take the way back to Ron.",
    },
  ],
};

/** Replace dialogue entirely (easier wording or single key line). */
const REPLACE = {
  [key(1, 10)]: [
    {
      who: "Dumbledore",
      line: "I should have known that cat was you, Professor McGonagall.",
    },
  ],
};

const GREETING_TAIL =
  /^(good (morning|afternoon|evening)|thank you|yes, (sir|professor)|course you can|i will\.|all right\.|well\. yeah\.)/i;

function pickBestLine(dialogue) {
  const spell = dialogue.find((d) =>
    /^(wingardium|lumos|incendio|leviosa|lacarnum|up!|gryffindor|slytherin)/i.test(d.line)
  );
  if (spell) return [spell];
  const joke = dialogue.find((d) =>
    /bogey|earwax|nose!|tail|servant|wrong sort|nearly headless/i.test(d.line)
  );
  if (joke) return [joke];
  return [dialogue[0]];
}

function cullDialogue(chNum, panel) {
  const k = key(chNum, panel.n);
  const d = panel.dialogue || [];
  if (!d.length) return d;

  if (REPLACE[k]) return REPLACE[k];
  if (REPLACE_MULTI[k]) return REPLACE_MULTI[k];
  if (CLEAR.has(k)) return [];
  if (KEEP_AS_IS.has(k)) return d;

  if (KEEP_INDEX[k]) {
    return KEEP_INDEX[k].map((i) => d[i]).filter(Boolean);
  }

  if (d.length === 1) {
    const line = d[0].line;
    if (
      GREETING_TAIL.test(line) &&
      !/professor|voldemort|hogwarts|stone|fluffy|snitch|bogey|leviosa/i.test(line)
    ) {
      return [];
    }
    return d;
  }

  if (d.length === 2) {
    const [a, b] = d;
    if (GREETING_TAIL.test(b.line)) return [a];
    if (GREETING_TAIL.test(a.line) && !GREETING_TAIL.test(b.line)) return [b];
    if (a.who === b.who) return [a];
    return pickBestLine(d).length === 1 ? pickBestLine(d) : [a];
  }

  if (KEEP_INDEX[k] === undefined && d.length >= 3) {
    return pickBestLine(d).concat(d.length > 2 ? [d[d.length - 1]] : []).slice(0, 2);
  }

  return [d[0]];
}

function stats(book) {
  let panels = 0;
  let withDialogue = 0;
  let lines = 0;
  for (const ch of book.chapters) {
    for (const p of ch.panels) {
      panels++;
      const n = (p.dialogue || []).length;
      if (n) {
        withDialogue++;
        lines += n;
      }
    }
  }
  return { panels, withDialogue, lines };
}

function main() {
  const { code, book } = loadBook();
  const before = stats(book);
  let shortened = 0;

  for (const ch of book.chapters) {
    for (const panel of ch.panels) {
      const oldLen = (panel.dialogue || []).length;
      const newDialogue = cullDialogue(ch.n, panel);
      if (newDialogue.length < oldLen) shortened++;
      panel.dialogue = newDialogue;
    }
  }

  const after = stats(book);

  const out = "window.BOOK = " + JSON.stringify(book, null, 2).replace(/\n/g, "\n") + ";\n";
  fs.writeFileSync(STORY_PATH, out, "utf8");

  console.log(JSON.stringify({ before, after, panelsShortened: shortened }, null, 2));
}

main();
