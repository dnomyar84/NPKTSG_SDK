(function () {
  const data = window.BOOK;
  const chapters = data.chapters || [{
    n: 1,
    title: String(data.title || "").replace(/^Chapter \d+ — /, ""),
    pageTitles: data.pageTitles,
    panels: data.panels
  }];
  const catalog = [null];
  chapters.forEach((chapter) => {
    const maxPage = Math.max(...chapter.pageTitles.map((p) => p.n));
    for (let local = 1; local <= maxPage; local += 1) {
      const found = chapter.pageTitles.find((p) => p.n === local);
      catalog.push({
        chapter,
        local,
        chapterPages: maxPage,
        title: found ? found.title : "",
        panels: chapter.panels.filter((p) => p.page === local)
      });
    }
  });
  const pageCount = catalog.length - 1;

  const leftEl = document.getElementById("leftPage");
  const rightEl = document.getElementById("rightPage");
  const leaf = document.getElementById("leaf");
  const leafFront = document.getElementById("leafFront");
  const leafBack = document.getElementById("leafBack");
  const status = document.getElementById("status");
  const notes = document.getElementById("notes");
  const notesBtn = document.getElementById("notesBtn");
  const chapterLine = document.getElementById("chapterLine");
  const sceneLine = document.getElementById("sceneLine");
  const fontDown = document.getElementById("fontDown");
  const fontUp = document.getElementById("fontUp");
  const fullBtn = document.getElementById("fullBtn");
  const wrap = document.querySelector(".book-wrap");
  const book = document.getElementById("book");
  const turnSheet = document.getElementById("mobileTurn");
  const FONT_KEY = "flipbook-font-step";
  // Previous saves are indexes into this list. Scale 1 stays the unsaved default.
  const LEGACY_FONT_STEPS = [0.88, 1, 1.14, 1.3];
  // Two steps under the old 0.88 floor. 0.72 keeps dialogue at 9px (12.5px * scale).
  const FONT_STEPS = [0.72, 0.8, 0.88, 1, 1.14, 1.3];
  const DEFAULT_FONT_STEP = FONT_STEPS.indexOf(1);

  let spread = 0;
  let busy = false;
  let endMobileTurn = () => {};
  const spreadCount = Math.ceil(pageCount / 2);
  const mobile = () => window.matchMedia("(max-width: 800px)").matches;
  const reduceMotion = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  function panelsFor(page) {
    return (catalog[page] && catalog[page].panels) || [];
  }

  function openPages() {
    const leftPage = spread * 2 + 1;
    const rightPage = leftPage + 1;
    if (mobile()) {
      const current = document.body.classList.contains("mobile-right") ? rightPage : leftPage;
      return catalog[current] ? [catalog[current]] : [];
    }
    const pages = [];
    if (catalog[leftPage]) pages.push(catalog[leftPage]);
    if (rightPage <= pageCount && catalog[rightPage]) pages.push(catalog[rightPage]);
    return pages;
  }

  function chapterLabel(pages) {
    if (!pages.length) return data.book || "End of the book";
    const first = pages[0].chapter;
    const last = pages[pages.length - 1].chapter;
    if (first.n === last.n) return `Chapter ${first.n} — ${first.title}`;
    return `Chapter ${first.n} — ${first.title} · ${last.n} — ${last.title}`;
  }

  function sceneLabel(pages) {
    if (!pages.length) return "End of the book";
    const one = (info) => `Scene ${info.local}, page ${info.local} of ${info.chapterPages}`;
    if (pages.length === 1) return one(pages[0]);
    const [a, b] = pages;
    if (a.chapter.n !== b.chapter.n) return `${one(a)} · ${one(b)}`;
    return `Scenes ${a.local}–${b.local}, pages ${a.local}–${b.local} of ${a.chapterPages}`;
  }

  function positionLabel(pages) {
    if (!pages.length) return "End of the book";
    if (pages.length === 1) return `Page ${pages[0].local} of ${pages[0].chapterPages}`;
    const [a, b] = pages;
    if (a.chapter.n !== b.chapter.n) {
      return `Page ${a.local} of ${a.chapterPages}, then page ${b.local} of ${b.chapterPages}`;
    }
    return `Pages ${a.local}–${b.local} of ${a.chapterPages}`;
  }

  function showPlace() {
    const pages = openPages();
    const title = chapterLabel(pages);
    if (chapterLine) chapterLine.textContent = title;
    if (sceneLine) sceneLine.textContent = sceneLabel(pages);
    document.title = title;
  }

  // Wide panels are marked in the story. A row stays half and half unless one
  // side needs the long frame. Close-ups and conversations stay even.
  function isScenery(panel) {
    return panel.wide === true;
  }

  function rowPlan(items) {
    const rows = [];
    for (let i = 0; i < items.length; i += 2) {
      const pair = items.slice(i, i + 2);
      const left = isScenery(pair[0]);
      const right = pair[1] ? isScenery(pair[1]) : false;
      let split = "split-1-1";
      if (pair[1] && left !== right) split = left ? "split-2-1" : "split-1-2";
      rows.push({ split, grow: split === "split-1-1" ? "grow-mid" : "grow-tall", panels: pair });
    }
    return rows;
  }

  function missingFrame() {
    return `<div class="missing">Art not drawn yet</div>`;
  }

  // A missing picture still keeps its caption and dialogue in the frame.
  function bindMissingArt(root) {
    if (!root || !root.querySelectorAll) return;
    root.querySelectorAll(".panel img").forEach((img) => {
      const fail = () => {
        if (!img.parentNode) return;
        const frame = document.createElement("div");
        frame.className = "missing";
        frame.textContent = "Art not drawn yet";
        img.replaceWith(frame);
      };
      if (img.complete && img.naturalWidth === 0) fail();
      else img.addEventListener("error", fail);
    });
  }

  function setHtml(el, html) {
    el.innerHTML = html;
    bindMissingArt(el);
  }

  function panelHtml(panel) {
    const picture = panel.art
      ? `<img src="${escapeHtml(panel.art)}" alt="Panel ${panel.n}. ${escapeHtml(panel.scene)}">`
      : missingFrame();
    const caption = panel.caption
      ? `<p class="caption">${escapeHtml(panel.caption)}</p>`
      : "";
    const lines = panel.dialogue.map((d) =>
      `<p><span class="who">${escapeHtml(d.who)}</span>${escapeHtml(d.line)}</p>`
    ).join("");
    const text = `${caption}${lines}`;
    const fig = text ? `<figcaption class="lines">${text}</figcaption>` : "";
    return `<figure class="panel"><span class="num">${panel.n}</span>${picture}${fig}</figure>`;
  }

  function pageHtml(page) {
    const info = catalog[page];
    if (!info) {
      return `<div class="page-inner"><header><span>End of sample</span><strong>Script continues</strong></header></div>`;
    }
    const items = info.panels;
    const rows = rowPlan(items).map((row) =>
      `<div class="row ${row.split} ${row.grow}">${row.panels.map(panelHtml).join("")}</div>`
    ).join("");
    return `<div class="page-inner"><header><strong>${escapeHtml(info.title)}</strong></header><div class="rows">${rows}</div></div>`;
  }

  function escapeHtml(value) {
    return String(value)
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;");
  }

  function renderStatic() {
    const leftPage = spread * 2 + 1;
    const rightPage = leftPage + 1;
    setHtml(leftEl, pageHtml(leftPage));
    setHtml(rightEl, rightPage <= pageCount ? pageHtml(rightPage) : pageHtml(rightPage));
    const pages = openPages();
    showPlace();
    const hint = mobile()
      ? "Tap the left half to turn back, the right half to turn forward."
      : "Click the right page to turn forward, the left page to turn back.";
    status.textContent = pages.length ? `${positionLabel(pages)}. ${hint}` : "End of the book.";
    if (mobile()) {
      leftEl.title = "Left half turns back. Right half turns forward.";
      rightEl.title = "Left half turns back. Right half turns forward.";
    } else {
      leftEl.title = "Turn back";
      rightEl.title = "Turn page";
    }
    renderNotes();
  }

  function renderNotes() {
    const pages = [spread * 2 + 1];
    if (!mobile() || document.body.classList.contains("mobile-right")) {
      if (mobile() && document.body.classList.contains("mobile-right")) pages[0] = spread * 2 + 2;
      else if (!mobile()) pages.push(spread * 2 + 2);
    }
    notes.innerHTML = `<div class="notes-grid">${pages.filter((p) => p <= pageCount).map(noteCard).join("")}</div>`;
  }

  function noteCard(page) {
    const body = panelsFor(page).map((panel) => `
      <article>
        <p><span class="k">Panel ${panel.n}.</span> ${escapeHtml(panel.scene)}</p>
        <p><span class="k">Expressions.</span> ${escapeHtml(panel.expressions)}</p>
        <p><span class="k">Dialogue.</span> ${panel.dialogue.length ? panel.dialogue.map((d) => `${escapeHtml(d.who)}: “${escapeHtml(d.line)}”`).join(" ") : "None."}</p>
      </article>`).join("");
    const info = catalog[page];
    return `<section class="note-card"><h3>Chapter ${info.chapter.n} · Page ${info.local} · ${escapeHtml(info.title)}</h3>${body}</section>`;
  }

  function fit() {
    if (mobile()) {
      wrap.style.transform = "none";
      return;
    }
    const stage = document.querySelector(".stage");
    const scale = Math.min((stage.clientWidth - 4) / wrap.offsetWidth, (stage.clientHeight - 4) / wrap.offsetHeight);
    wrap.style.transform = `scale(${Math.max(scale, 0.2)})`;
  }

  function afterFlip(nextSpread) {
    spread = nextSpread;
    leaf.hidden = true;
    leaf.classList.remove("turned");
    leaf.style.transition = "";
    busy = false;
    renderStatic();
  }

  function whenTurnEnds(done) {
    let finished = false;
    const finish = () => {
      if (finished) return;
      finished = true;
      leaf.removeEventListener("transitionend", onEnd);
      done();
    };
    const onEnd = (event) => {
      if (event.propertyName !== "transform") return;
      finish();
    };
    leaf.addEventListener("transitionend", onEnd);
    window.setTimeout(finish, 1100);
  }

  function showingRight() {
    return document.body.classList.contains("mobile-right");
  }

  function mobileCanForward() {
    if (!showingRight()) return true;
    return spread < spreadCount - 1;
  }

  function mobileCanBack() {
    if (showingRight()) return true;
    return spread > 0;
  }

  function applyMobileForward() {
    if (!showingRight()) {
      document.body.classList.add("mobile-right");
      renderStatic();
      return;
    }
    document.body.classList.remove("mobile-right");
    spread += 1;
    renderStatic();
  }

  function applyMobileBack() {
    if (showingRight()) {
      document.body.classList.remove("mobile-right");
      renderStatic();
      return;
    }
    spread -= 1;
    document.body.classList.add("mobile-right");
    renderStatic();
  }

  // Phones hide the 3D leaf. Slide the sheet the reader was just on so a
  // tap still shows whether the book moved forward or back.
  function playMobileTurn(direction, applyChange) {
    const source = showingRight() ? rightEl : leftEl;
    if (!turnSheet || source.offsetWidth < 2) {
      applyChange();
      return;
    }
    busy = true;
    const forward = direction === "forward";
    setHtml(turnSheet, source.innerHTML);
    turnSheet.classList.remove("turn-forward", "turn-back", "turn-reduce");
    const bookRect = book.getBoundingClientRect();
    const pageRect = source.getBoundingClientRect();
    turnSheet.style.top = `${pageRect.top - bookRect.top}px`;
    turnSheet.style.left = `${pageRect.left - bookRect.left}px`;
    turnSheet.style.width = `${pageRect.width}px`;
    turnSheet.style.height = `${pageRect.height}px`;
    turnSheet.hidden = false;
    applyChange();

    const incoming = showingRight() ? rightEl : leftEl;
    leftEl.classList.remove("settle-from-left", "settle-from-right");
    rightEl.classList.remove("settle-from-left", "settle-from-right");

    let finished = false;
    const finish = () => {
      if (finished) return;
      finished = true;
      turnSheet.removeEventListener("animationend", onEnd);
      turnSheet.hidden = true;
      turnSheet.classList.remove("turn-forward", "turn-back", "turn-reduce");
      turnSheet.innerHTML = "";
      leftEl.classList.remove("settle-from-left", "settle-from-right");
      rightEl.classList.remove("settle-from-left", "settle-from-right");
      if (endMobileTurn === finish) endMobileTurn = () => {};
      busy = false;
    };
    endMobileTurn = finish;
    const onEnd = (event) => {
      if (event.target !== turnSheet) return;
      finish();
    };
    turnSheet.addEventListener("animationend", onEnd);
    void turnSheet.offsetWidth;
    if (reduceMotion()) turnSheet.classList.add("turn-reduce");
    turnSheet.classList.add(forward ? "turn-forward" : "turn-back");
    if (!reduceMotion()) incoming.classList.add(forward ? "settle-from-right" : "settle-from-left");
    const seconds = Number.parseFloat(getComputedStyle(turnSheet).animationDuration) || 0.5;
    window.setTimeout(finish, seconds * 1000 + 140);
  }

  function turnForward() {
    if (busy) return;
    if (mobile()) {
      if (!mobileCanForward()) return;
      playMobileTurn("forward", applyMobileForward);
      return;
    }
    if (spread >= spreadCount - 1) return;
    busy = true;
    const next = spread + 1;
    setHtml(leafFront, rightEl.innerHTML);
    setHtml(leafBack, pageHtml(next * 2 + 1));
    leaf.hidden = false;
    leaf.classList.remove("turned");
    void leaf.offsetWidth;
    setHtml(rightEl, pageHtml(next * 2 + 2));
    requestAnimationFrame(() => leaf.classList.add("turned"));
    whenTurnEnds(() => {
      setHtml(leftEl, pageHtml(next * 2 + 1));
      afterFlip(next);
    });
  }

  function turnBack() {
    if (busy) return;
    if (mobile()) {
      if (!mobileCanBack()) return;
      playMobileTurn("back", applyMobileBack);
      return;
    }
    if (spread === 0) return;
    busy = true;
    const next = spread - 1;
    setHtml(leafFront, pageHtml(next * 2 + 2));
    setHtml(leafBack, leftEl.innerHTML);
    leaf.hidden = false;
    leaf.style.transition = "none";
    leaf.classList.add("turned");
    void leaf.offsetWidth;
    setHtml(leftEl, pageHtml(next * 2 + 1));
    leaf.style.transition = "";
    requestAnimationFrame(() => leaf.classList.remove("turned"));
    whenTurnEnds(() => {
      setHtml(rightEl, pageHtml(next * 2 + 2));
      afterFlip(next);
    });
  }

  function fontStepForScale(scale) {
    let best = DEFAULT_FONT_STEP;
    let bestDiff = Infinity;
    FONT_STEPS.forEach((step, index) => {
      const diff = Math.abs(step - scale);
      if (diff < bestDiff) {
        best = index;
        bestDiff = diff;
      }
    });
    return bestDiff < 0.02 ? best : DEFAULT_FONT_STEP;
  }

  let fontStep = DEFAULT_FONT_STEP;
  try {
    const raw = localStorage.getItem(FONT_KEY);
    const text = raw === null ? "" : String(raw).trim();
    const saved = text === "" ? NaN : Number(text);
    if (Number.isFinite(saved)) {
      // Older readers stored 0..3. "1.00" is the scale, so the old minimum stays put
      // until minus is pressed. Scale 1 and legacy index 1 are the same size.
      const legacyIndex = /^(0|1|2|3)$/.test(text);
      fontStep = fontStepForScale(legacyIndex ? LEGACY_FONT_STEPS[saved] : saved);
    }
  } catch (error) {
    fontStep = DEFAULT_FONT_STEP;
  }

  function applyFont() {
    document.documentElement.style.setProperty("--panel-scale", String(FONT_STEPS[fontStep]));
    if (fontDown) fontDown.disabled = fontStep === 0;
    if (fontUp) fontUp.disabled = fontStep === FONT_STEPS.length - 1;
  }

  function storeFont() {
    try {
      localStorage.setItem(FONT_KEY, FONT_STEPS[fontStep].toFixed(2));
    } catch (error) {
      /* private mode can block storage */
    }
  }

  if (fontDown) {
    fontDown.addEventListener("click", () => {
      if (fontStep === 0) return;
      fontStep -= 1;
      storeFont();
      applyFont();
    });
  }
  if (fontUp) {
    fontUp.addEventListener("click", () => {
      if (fontStep === FONT_STEPS.length - 1) return;
      fontStep += 1;
      storeFont();
      applyFont();
    });
  }
  applyFont();

  function fullscreenElement() {
    return document.fullscreenElement || document.webkitFullscreenElement || null;
  }

  function syncFullButton() {
    if (!fullBtn) return;
    const on = Boolean(fullscreenElement());
    fullBtn.textContent = on ? "Exit" : "Full";
    fullBtn.setAttribute("aria-label", on ? "Exit full screen" : "Full screen");
  }

  // iOS Safari often rejects Fullscreen for a page. A short scroll still
  // asks the browser to collapse the URL bar where it allows that.
  function collapseUrlBar() {
    if (!mobile()) return;
    document.documentElement.classList.add("url-nudge");
    const nudge = () => window.scrollTo(0, 1);
    nudge();
    requestAnimationFrame(nudge);
    window.setTimeout(() => {
      window.scrollTo(0, 0);
      document.documentElement.classList.remove("url-nudge");
      fit();
    }, 300);
  }

  function requestPageFullscreen() {
    const el = document.documentElement;
    if (el.requestFullscreen) return el.requestFullscreen();
    if (el.webkitRequestFullscreen) return el.webkitRequestFullscreen();
    return Promise.reject(new Error("fullscreen unavailable"));
  }

  function exitPageFullscreen() {
    if (document.exitFullscreen) return document.exitFullscreen();
    if (document.webkitExitFullscreen) return document.webkitExitFullscreen();
    return Promise.reject(new Error("fullscreen unavailable"));
  }

  if (fullBtn) {
    fullBtn.addEventListener("click", () => {
      const leave = Boolean(fullscreenElement());
      const done = leave ? exitPageFullscreen() : requestPageFullscreen();
      Promise.resolve(done).catch(() => {}).finally(() => {
        if (!leave) collapseUrlBar();
        syncFullButton();
        fit();
      });
    });
  }
  document.addEventListener("fullscreenchange", () => {
    syncFullButton();
    fit();
  });
  document.addEventListener("webkitfullscreenchange", () => {
    syncFullButton();
    fit();
  });
  syncFullButton();

  notesBtn.addEventListener("click", () => {
    document.body.classList.toggle("show-notes");
    notesBtn.textContent = document.body.classList.contains("show-notes") ? "Hide script notes" : "Show script notes";
    fit();
  });
  document.addEventListener("keydown", (event) => {
    if (event.key === "ArrowRight") turnForward();
    if (event.key === "ArrowLeft") turnBack();
  });
  function onPageClick(event) {
    const pageEl = event.currentTarget;
    if (mobile()) {
      const rect = pageEl.getBoundingClientRect();
      const x = event.clientX - rect.left;
      if (x < rect.width / 2) turnBack();
      else turnForward();
      return;
    }
    if (pageEl === leftEl) turnBack();
    else turnForward();
  }
  leftEl.addEventListener("click", onPageClick);
  rightEl.addEventListener("click", onPageClick);
  let narrow = mobile();
  window.addEventListener("resize", () => {
    const now = mobile();
    if (now !== narrow) {
      narrow = now;
      endMobileTurn();
      renderStatic();
    }
    fit();
  });
  if (window.visualViewport) {
    window.visualViewport.addEventListener("resize", fit);
  }

  renderStatic();
  fit();
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(fit);
})();
