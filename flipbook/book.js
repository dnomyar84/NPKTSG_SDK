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
  const prevBtn = document.getElementById("prevBtn");
  const nextBtn = document.getElementById("nextBtn");
  const status = document.getElementById("status");
  const notes = document.getElementById("notes");
  const notesBtn = document.getElementById("notesBtn");
  const wrap = document.querySelector(".book-wrap");

  let spread = 0;
  let busy = false;
  const spreadCount = Math.ceil(pageCount / 2);
  const mobile = () => window.matchMedia("(max-width: 800px)").matches;

  function panelsFor(page) {
    return (catalog[page] && catalog[page].panels) || [];
  }

  function showChapter(page) {
    const info = catalog[page];
    if (!info) return;
    const strong = document.querySelector(".brand strong");
    const sub = document.querySelector(".brand span");
    if (strong) {
      strong.textContent = `Chapter ${info.chapter.n} — ${info.chapter.title}`;
      document.title = strong.textContent;
    }
    if (sub) {
      const word = chapters.length === 1 ? "chapter" : "chapters";
      sub.textContent = `${data.book} · ${chapters.length} ${word} in the book`;
    }
  }

  // Place and wide-view panels. A row stays half and half unless one of these
  // needs the long frame (2:1 or 1:2). Close-ups and conversations stay even.
  const SCENERY = new Set([1, 10, 11, 14, 22, 23]);

  function isScenery(panel) {
    return SCENERY.has(panel.n);
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

  function panelHtml(panel) {
    const picture = panel.art
      ? `<img src="${panel.art}" alt="Panel ${panel.n}. ${escapeHtml(panel.scene)}">`
      : `<div class="missing">Art not drawn yet</div>`;
    const lines = panel.dialogue.map((d) =>
      `<p><span class="who">${escapeHtml(d.who)}</span>${escapeHtml(d.line)}</p>`
    ).join("");
    return `<figure class="panel"><span class="num">${panel.n}</span>${picture}<figcaption class="lines">${lines}</figcaption></figure>`;
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
    return `<div class="page-inner"><header><span>Chapter ${info.chapter.n} · Page ${info.local} of ${info.chapterPages}</span><strong>${escapeHtml(info.title)}</strong></header><div class="rows">${rows}</div></div>`;
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
    leftEl.innerHTML = pageHtml(leftPage);
    rightEl.innerHTML = rightPage <= pageCount ? pageHtml(rightPage) : pageHtml(rightPage);
    showChapter(mobile() && document.body.classList.contains("mobile-right") ? rightPage : leftPage);
    if (mobile()) {
      const showingRight = document.body.classList.contains("mobile-right");
      const current = showingRight ? rightPage : leftPage;
      const info = catalog[current];
      status.textContent = info
        ? `Chapter ${info.chapter.n}, page ${info.local} of ${info.chapterPages}. Tap the page to turn it.`
        : "End of the book.";
      leftEl.title = "Turn page";
      rightEl.title = "Turn page";
      prevBtn.disabled = current <= 1;
      nextBtn.disabled = current >= pageCount;
    } else {
      const leftInfo = catalog[leftPage];
      const rightInfo = catalog[rightPage];
      let label = `Chapter ${leftInfo.chapter.n}, page ${leftInfo.local} of ${leftInfo.chapterPages}`;
      if (rightInfo && rightInfo.chapter.n === leftInfo.chapter.n) {
        label = `Chapter ${leftInfo.chapter.n}, pages ${leftInfo.local}–${rightInfo.local} of ${leftInfo.chapterPages}`;
      } else if (rightInfo) {
        label = `Chapter ${leftInfo.chapter.n} page ${leftInfo.local}, then Chapter ${rightInfo.chapter.n} page ${rightInfo.local}`;
      }
      status.textContent = `${label}. Click the right page to turn forward, the left page to turn back.`;
      leftEl.title = "Turn back";
      rightEl.title = "Turn page";
      prevBtn.disabled = spread === 0;
      nextBtn.disabled = spread >= spreadCount - 1;
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

  function turnForward() {
    if (busy) return;
    if (mobile()) {
      if (!document.body.classList.contains("mobile-right")) {
        document.body.classList.add("mobile-right");
        renderStatic();
        return;
      }
      if (spread >= spreadCount - 1) return;
      document.body.classList.remove("mobile-right");
      spread += 1;
      renderStatic();
      return;
    }
    if (spread >= spreadCount - 1) return;
    busy = true;
    const next = spread + 1;
    leafFront.innerHTML = rightEl.innerHTML;
    leafBack.innerHTML = pageHtml(next * 2 + 1);
    leaf.hidden = false;
    leaf.classList.remove("turned");
    void leaf.offsetWidth;
    rightEl.innerHTML = pageHtml(next * 2 + 2);
    requestAnimationFrame(() => leaf.classList.add("turned"));
    whenTurnEnds(() => {
      leftEl.innerHTML = pageHtml(next * 2 + 1);
      afterFlip(next);
    });
  }

  function turnBack() {
    if (busy) return;
    if (mobile()) {
      if (document.body.classList.contains("mobile-right")) {
        document.body.classList.remove("mobile-right");
        renderStatic();
        return;
      }
      if (spread === 0) return;
      spread -= 1;
      document.body.classList.add("mobile-right");
      renderStatic();
      return;
    }
    if (spread === 0) return;
    busy = true;
    const next = spread - 1;
    leafFront.innerHTML = pageHtml(next * 2 + 2);
    leafBack.innerHTML = leftEl.innerHTML;
    leaf.hidden = false;
    leaf.style.transition = "none";
    leaf.classList.add("turned");
    void leaf.offsetWidth;
    leftEl.innerHTML = pageHtml(next * 2 + 1);
    leaf.style.transition = "";
    requestAnimationFrame(() => leaf.classList.remove("turned"));
    whenTurnEnds(() => {
      rightEl.innerHTML = pageHtml(next * 2 + 2);
      afterFlip(next);
    });
  }

  prevBtn.addEventListener("click", turnBack);
  nextBtn.addEventListener("click", turnForward);
  notesBtn.addEventListener("click", () => {
    document.body.classList.toggle("show-notes");
    notesBtn.textContent = document.body.classList.contains("show-notes") ? "Hide script notes" : "Show script notes";
    fit();
  });
  document.addEventListener("keydown", (event) => {
    if (event.key === "ArrowRight") turnForward();
    if (event.key === "ArrowLeft") turnBack();
  });
  leftEl.addEventListener("click", () => {
    if (mobile()) turnForward();
    else turnBack();
  });
  rightEl.addEventListener("click", () => turnForward());
  window.addEventListener("resize", fit);

  renderStatic();
  fit();
})();
