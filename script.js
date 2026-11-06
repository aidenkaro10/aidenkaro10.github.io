// Tells the CSS that JavaScript is on, so the scroll-in animation can run.
// (Without JavaScript, everything simply shows up as normal.)
document.documentElement.classList.add("js");

// Puts the current year in the footer
document.getElementById("year").textContent = new Date().getFullYear();

// True if the visitor asked their device for less motion
const calm = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

// Fade things up as they scroll into view
const items = document.querySelectorAll(".reveal");
if ("IntersectionObserver" in window) {
  const watcher = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("in");
        watcher.unobserve(entry.target); // only animate once
      }
    });
  }, { rootMargin: "0px 0px -8% 0px" });
  items.forEach((el) => watcher.observe(el));
} else {
  items.forEach((el) => el.classList.add("in"));
}

/* ==========================================================
   ANIMATED "HOW IT WORKS" DIAGRAMS
   Each diagram is a row of steps joined by wires.
   A glowing dot travels down the wires, lighting each step,
   and the caption underneath says what is happening.
   The steps themselves come from projects.js.
   ========================================================== */

// Small helper to make an element with a class and some text
function el(tag, className, text) {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (text) node.textContent = text;
  return node;
}

// Builds the diagram's HTML from a list of steps
function buildFlow(box, steps) {
  box.textContent = "";
  const flow = el("div", "flow");
  // Screen readers get one plain sentence instead of the animation
  flow.setAttribute("role", "img");
  flow.setAttribute("aria-label", "How it works: " + steps.map((s) => s.label).join(", then "));

  steps.forEach((step, i) => {
    const node = el("div", "node");
    node.appendChild(el("span", "label", step.label));
    // "many" is for a step that fans out, like 4 AI models at once
    if (step.many) {
      const group = el("span", "many");
      step.many.forEach((m) => group.appendChild(el("span", "", m)));
      node.appendChild(group);
    }
    node.appendChild(el("span", "tool", step.tool));
    flow.appendChild(node);

    // a wire between this step and the next one
    if (i < steps.length - 1) {
      const wire = el("div", "wire");
      wire.appendChild(el("span", "packet"));
      flow.appendChild(wire);
    }
  });

  const caption = el("p", "caption");
  caption.setAttribute("aria-hidden", "true");
  box.appendChild(flow);
  box.appendChild(caption);
  box._steps = steps;
}

// Waits a bit, but wakes up early if the animation gets stopped
function pause(ms, run) {
  return new Promise((done) => {
    const t = setTimeout(done, ms);
    run.cancel = () => { clearTimeout(t); done(); };
  });
}

// Plays one diagram on a loop until it's stopped
async function play(box) {
  stop(box);
  const run = { stopped: false };
  box._run = run;

  const nodes = box.querySelectorAll(".node");
  const wires = box.querySelectorAll(".wire");
  const caption = box.querySelector(".caption");
  const steps = box._steps;

  // Less-motion mode: show everything lit up, no movement
  if (calm) {
    nodes.forEach((n) => n.classList.add("on"));
    wires.forEach((w) => w.classList.add("on"));
    return;
  }

  while (!run.stopped) {
    // reset to dark
    nodes.forEach((n) => n.classList.remove("on"));
    wires.forEach((w) => w.classList.remove("on"));
    await pause(500, run);

    for (let i = 0; i < nodes.length && !run.stopped; i++) {
      // light up this step and say what it does
      nodes[i].classList.add("on");
      caption.textContent = steps[i].say || steps[i].label;
      nodes[i].animate(
        [{ transform: "scale(1)" }, { transform: "scale(1.06)" }, { transform: "scale(1)" }],
        { duration: 420, easing: "ease-out" }
      );
      await pause(1400, run);

      // send the dot along the wire to the next step
      const wire = wires[i];
      if (wire && !run.stopped) {
        wire.classList.add("on");
        const packet = wire.querySelector(".packet");
        // the wire runs sideways on wide screens and downward on phones
        const sideways = wire.offsetWidth > wire.offsetHeight;
        const to = sideways ? `translateX(${wire.offsetWidth}px)` : `translateY(${wire.offsetHeight}px)`;
        packet.animate(
          [{ transform: "none", opacity: 0 }, { opacity: 1, offset: 0.15 }, { opacity: 1, offset: 0.85 }, { transform: to, opacity: 0 }],
          { duration: 600, easing: "cubic-bezier(.5,0,.5,1)" }
        );
        await pause(600, run);
      }
    }
    if (!run.stopped) caption.textContent = "Done. Running it again.";
    await pause(2400, run);
  }
}

// Stops a diagram that's playing
function stop(box) {
  if (box._run) {
    box._run.stopped = true;
    if (box._run.cancel) box._run.cancel();
    box._run = null;
  }
}

// Only animate diagrams that are on screen (saves battery)
const flowWatcher = "IntersectionObserver" in window
  ? new IntersectionObserver((entries) => {
      entries.forEach((e) => (e.isIntersecting ? play(e.target) : stop(e.target)));
    }, { threshold: 0.35 })
  : null;

function watchFlow(box) {
  if (flowWatcher) flowWatcher.observe(box);
  else play(box);
}

// Diagrams that sit right in the page, like Rekko's in Experience
document.querySelectorAll("[data-flow]").forEach((box) => {
  const steps = window.FLOWS && window.FLOWS[box.dataset.flow];
  if (!steps) return;
  buildFlow(box, steps);
  watchFlow(box);
});

/* ==========================================================
   PROJECTS: a list on the left, a big "stage" on the right
   ========================================================== */
const list = document.getElementById("project-list");
const stage = document.getElementById("stage");
const projects = window.PROJECTS || [];

// The little status label, like "Live" or "In progress"
function badge(text) {
  // awards like "3rd place" or "Winner" get the gold style
  const kind = /place|winner|best/i.test(text) ? "award" : text.toLowerCase().replace(/[^a-z]/g, "");
  return el("span", "badge " + kind, text);
}

// A looping video clip (with a pause button) or a screenshot
function buildMedia(p) {
  if (!p.video && !p.image) return null;
  const fig = el("figure", "media");

  if (p.video) {
    const v = el("video");
    v.src = p.video;
    if (p.poster) v.poster = p.poster;
    v.muted = true;
    v.loop = true;
    v.playsInline = true;
    v.preload = "metadata";
    v.setAttribute("aria-label", p.mediaAlt || p.name + " video");
    fig.appendChild(v);

    // play/pause button. Videos don't play on their own for people who asked for less motion
    const btn = el("button", "media-btn");
    btn.type = "button";
    const sync = () => { btn.textContent = v.paused ? "Play" : "Pause"; };
    btn.addEventListener("click", () => { v.paused ? v.play() : v.pause(); });
    v.addEventListener("play", sync);
    v.addEventListener("pause", sync);
    sync();
    fig.appendChild(btn);
    if (!calm) v.play().catch(() => {});
  } else {
    const img = el("img");
    img.src = p.image;
    img.alt = p.mediaAlt || p.name + " screenshot";
    fig.appendChild(img);
  }

  if (p.mediaCaption) fig.appendChild(el("figcaption", "", p.mediaCaption));
  return fig;
}

function showProject(index) {
  const p = projects[index];
  if (!p) return;

  // mark the chosen one in the list
  list.querySelectorAll("button").forEach((b, i) => {
    b.setAttribute("aria-selected", i === index ? "true" : "false");
    b.tabIndex = i === index ? 0 : -1;
  });

  // stop the old diagram before swapping it out
  const old = stage.querySelector(".flow-box");
  if (old) { stop(old); if (flowWatcher) flowWatcher.unobserve(old); }
  stage.textContent = "";

  const top = el("div", "stage-top");
  top.appendChild(el("h3", "", p.name));
  top.appendChild(badge(p.status));
  stage.appendChild(top);
  stage.appendChild(el("p", "meta", p.tag + ", " + p.year));

  // the real thing: a short video or a screenshot
  const media = buildMedia(p);
  if (media) stage.appendChild(media);

  stage.appendChild(el("p", "stage-blurb", p.blurb));

  // big numbers, if the project has them
  if (p.stats) {
    const row = el("div", "stats");
    p.stats.forEach(([big, small]) => {
      const s = el("div", "stat");
      s.appendChild(el("strong", "", big));
      s.appendChild(el("span", "", small));
      row.appendChild(s);
    });
    stage.appendChild(row);
  }

  // the animated diagram
  const box = el("div", "flow-box");
  stage.appendChild(box);
  buildFlow(box, p.steps);
  watchFlow(box);

  // the tech it uses
  const chips = el("p", "chips");
  p.stack.forEach((s) => chips.appendChild(el("span", "", s)));
  stage.appendChild(chips);

  // links
  const links = el("div", "links");
  if (p.live) { const a = el("a", "", p.liveText || "Try it"); a.href = p.live; links.appendChild(a); }
  if (p.code) { const a = el("a", "", "Code"); a.href = p.code; links.appendChild(a); }
  if (links.children.length) stage.appendChild(links);

  // a quick fade-in when switching
  if (!calm) stage.animate([{ opacity: 0, transform: "translateY(6px)" }, { opacity: 1, transform: "none" }], { duration: 300, easing: "ease-out" });
}

if (list && stage && projects.length) {
  projects.forEach((p, i) => {
    const b = el("button", "pick");
    b.type = "button";
    b.setAttribute("role", "tab");
    b.setAttribute("aria-controls", "stage");
    const head = el("span", "pick-head");
    head.appendChild(el("span", "pick-name", p.name));
    head.appendChild(badge(p.status));
    b.appendChild(head);
    b.appendChild(el("span", "pick-line", p.line));
    b.addEventListener("click", () => showProject(i));
    // arrow keys move through the list
    b.addEventListener("keydown", (e) => {
      const step = { ArrowDown: 1, ArrowRight: 1, ArrowUp: -1, ArrowLeft: -1 }[e.key];
      if (!step) return;
      e.preventDefault();
      const next = (i + step + projects.length) % projects.length;
      showProject(next);
      list.children[next].focus();
    });
    list.appendChild(b);
  });
  showProject(0);
}

/* ==========================================================
   THE EDIT AT THE TOP: a short looping video of photos of me, with music.
   Sound is on by default. Browsers block sound until the visitor clicks or
   presses a key, so if that happens it plays muted and the sound comes on
   at their first click. Clicking the video pauses or plays it.
   ========================================================== */
const edit = document.getElementById("edit");
if (edit) {
  edit.addEventListener("click", () => {
    if (edit.paused) { edit.muted = false; edit.play().catch(() => {}); }
    else edit.pause();
  });

  if (!calm) {
    edit.muted = false;
    edit.play().catch(() => {
      edit.muted = true;
      edit.play().catch(() => {});
      const unmute = (e) => {
        stopListening();
        if (e.target === edit) return; // a click on the video itself pauses it instead
        edit.muted = false;
        if (edit.paused) edit.play().catch(() => {});
      };
      const stopListening = () => {
        document.removeEventListener("pointerdown", unmute, true);
        document.removeEventListener("keydown", unmute, true);
      };
      document.addEventListener("pointerdown", unmute, true);
      document.addEventListener("keydown", unmute, true);
    });
  }
}
