#!/usr/bin/env node
/** Regenerate reference/panel-script.md from flipbook/story.js */
import fs from "fs";
import vm from "vm";
import path from "path";

const ROOT = path.resolve(import.meta.dirname, "..");
const STORY_PATH = path.join(ROOT, "flipbook/story.js");
const OUT_PATH = path.join(ROOT, "reference/panel-script.md");

function loadBook() {
  const code = fs.readFileSync(STORY_PATH, "utf8");
  const sandbox = { window: {} };
  vm.runInNewContext(code, sandbox);
  return sandbox.window.BOOK;
}

function countPanels(book) {
  let pages = 0;
  let panels = 0;
  for (const ch of book.chapters) {
    pages += ch.pageTitles?.length || 0;
    panels += ch.panels.length;
  }
  return { chapters: book.chapters.length, pages, panels };
}

function artNote(panel) {
  if (panel.art) return `Art file: \`${panel.art}\`.`;
  return "No art file yet. The frame stays empty and still shows this caption and any dialogue.";
}

function dialogueBlock(dialogue) {
  if (!dialogue?.length) return "";
  const lines = dialogue
    .map((d) => `**${d.who}:** ${d.line}`)
    .join("\n\n");
  return `\nBalloon (not the drawing):\n\n${lines}\n`;
}

function main() {
  const book = loadBook();
  const { chapters, pages, panels } = countPanels(book);

  const lines = [
    "# Panel script",
    "",
    "Draw-ready script for every chapter of *Harry Potter and the Philosopher’s Stone* in this book. Twenty-one chapters. First Lessons is its own chapter. Nicolas Flamel stays before the Mirror of Erised.",
    "",
    "Image generation uses the picture brief: what is physically happening, what each person feels, and what the face and body show. The balloon underneath is restricted speech. Do not pass the balloon to the image model, and do not treat a heard line as the drawing instruction.",
    "",
    "Image generation has not been started. Panels with no file stay empty frames. The flipbook shows the caption and the dialogue in that frame. Existing files stay on the panel they already belong to.",
    "",
    "A scene is one place and one stretch of time, and it takes at least one page. A new place opens with the outside, then the threshold, then what people were already doing, then talk. Magic is a sequence: who aims, the thin link, the result, and a follow-through when a body changes.",
    "",
    `Counts: ${chapters} chapters, ${pages} pages, ${panels} panels.`,
    "",
    "## Chapters",
    "",
  ];

  for (const ch of book.chapters) {
    const pageCount = ch.pageTitles?.length || 0;
    lines.push(`- ${ch.n}. ${ch.title} — ${pageCount} pages`);
  }

  for (const ch of book.chapters) {
    lines.push("", `## Chapter ${ch.n} — ${ch.title}`, "");

    const byPage = new Map();
    for (const p of ch.panels) {
      if (!byPage.has(p.page)) byPage.set(p.page, []);
      byPage.get(p.page).push(p);
    }

    for (const pt of ch.pageTitles || []) {
      lines.push(`### Page ${pt.n} — ${pt.title}`, "");
      const pagePanels = byPage.get(pt.n) || [];
      for (const panel of pagePanels) {
        const cap = panel.caption || "";
        lines.push(
          `**Panel ${panel.n}.** ${cap} ${artNote(panel)}`,
          "",
          panel.picture || panel.scene || "",
          dialogueBlock(panel.dialogue),
          ""
        );
      }
    }
  }

  fs.writeFileSync(OUT_PATH, lines.join("\n"), "utf8");
  console.log(`Wrote ${OUT_PATH} (${panels} panels)`);
}

main();
