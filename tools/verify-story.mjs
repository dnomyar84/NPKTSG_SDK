#!/usr/bin/env node
import fs from "fs";
import vm from "vm";
import path from "path";

const ROOT = path.resolve(import.meta.dirname, "..");
const code = fs.readFileSync(path.join(ROOT, "flipbook/story.js"), "utf8");
const sandbox = { window: {} };
vm.runInNewContext(code, sandbox);
const B = sandbox.window.BOOK;

let panels = 0;
let withDialogue = 0;
let lines = 0;
let badPicture = 0;
let picEqDialogue = 0;

for (const ch of B.chapters) {
  for (const p of ch.panels) {
    panels++;
    const d = p.dialogue || [];
    if (d.length) {
      withDialogue++;
      lines += d.length;
    }
    if (!p.picture?.trim()) badPicture++;
    for (const b of d) {
      if (p.picture?.trim() === b.line.trim()) picEqDialogue++;
    }
  }
}

const titles = B.chapters.map((c) => c.title);
const checks = {
  chapters: B.chapters.length,
  panels,
  withDialogue,
  lines,
  badPicture,
  picEqDialogue,
  firstLessons: titles.includes("First Lessons"),
  flamelBeforeMirror:
    titles.indexOf("Nicolas Flamel") < titles.indexOf("The Mirror of Erised"),
  houseCupLast: titles[titles.length - 1] === "The House Cup",
};

console.log(JSON.stringify(checks, null, 2));
if (badPicture || picEqDialogue) process.exit(1);
