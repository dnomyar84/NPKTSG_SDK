(function () {
  const data = window.LANTERN;
  const root = document.getElementById("plan");
  const titles = Object.fromEntries(data.pageTitles.map((p) => [p.n, p.title]));

  const toc = data.chapters.map((chapter) => {
    const start = chapter.pages[0];
    return `<li><a href="#page-${start}">${escapeHtml(chapter.title)}</a> <span class="meta">pages ${chapter.pages[0]}–${chapter.pages[chapter.pages.length - 1]}</span></li>`;
  }).join("");

  const chapters = data.chapters.map((chapter) => {
    const pages = chapter.pages.map((page) => pageBlock(page)).join("");
    return `<section class="chapter" id="page-${chapter.pages[0]}">
      <h2>${escapeHtml(chapter.title)}</h2>
      <p>${escapeHtml(chapter.summary)}</p>
      ${pages}
    </section>`;
  }).join("");

  root.innerHTML = `
    <header class="plan-hero">
      <p class="meta">${escapeHtml(data.book)} · for readers about age 7 · ${data.pageCount} pages · ${data.panelsPerPage} panels on every page</p>
      <h1>${escapeHtml(data.title)}</h1>
      <p>${escapeHtml(data.intro)}</p>
      <p>Read panels in number order. <strong>Scene</strong> is what the picture shows. <strong>Expressions</strong> are faces and feelings. <strong>Dialogue</strong> is the spoken words, kept in simple language. Pages 1–6 are drawn in the <a href="index.html">flip book</a> so you can check the art style. Later pages are script only, ready for your notes.</p>
    </header>
    <section class="chapter">
      <h2>People</h2>
      <div class="chars">
        <figure class="character"><img src="art/ref-lila-grandad.jpg" alt="Lila, her cat Biscuit, and Grandad Moss"><figcaption>Lila Moss, Biscuit, and Grandad Moss.</figcaption></figure>
        <figure class="character"><img src="art/ref-friends-conductor.jpg" alt="Pip, Sera, and Conductor Bramble"><figcaption>Pip Quinn, Sera Voss, and Conductor Bramble.</figcaption></figure>
      </div>
      ${data.characters.map((c) => `<p><strong>${escapeHtml(c.name)}.</strong> ${escapeHtml(c.blurb)}</p>`).join("")}
    </section>
    <section class="chapter">
      <h2>World rules</h2>
      <ul>${data.rules.map((rule) => `<li>${escapeHtml(rule)}</li>`).join("")}</ul>
      <h2>Chapters</h2>
      <ol class="toc">${toc}</ol>
    </section>
    ${chapters}
  `;

  function pageBlock(page) {
    const cards = data.panels.filter((p) => p.page === page).map((panel) => {
      const art = panel.art ? `<img class="thumb" src="${panel.art}" alt="Drawn panel ${panel.n}">` : `<p class="meta">Art not drawn yet.</p>`;
      const lines = panel.dialogue.length
        ? panel.dialogue.map((d) => `<dd><strong>${escapeHtml(d.who)}:</strong> “${escapeHtml(d.line)}”</dd>`).join("")
        : `<dd>None.</dd>`;
      return `<article class="panel-card" id="panel-${panel.n}">
        <h3><span class="tag">Panel ${panel.n}</span><span class="tag">Page ${panel.page}</span></h3>
        ${art}
        <dl>
          <dt>Scene</dt><dd>${escapeHtml(panel.scene)}</dd>
          <dt>Expressions</dt><dd>${escapeHtml(panel.expressions)}</dd>
          <dt>Dialogue</dt>${lines}
        </dl>
      </article>`;
    }).join("");
    return `<h3 id="page-block-${page}">Page ${page} · ${escapeHtml(titles[page] || "")}</h3>${cards}`;
  }

  function escapeHtml(value) {
    return String(value)
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;");
  }
})();
