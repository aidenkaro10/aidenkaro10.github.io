// Tells the CSS that JavaScript is on, so the scroll-in animation can run.
// (Without JavaScript, everything simply shows up as normal.)
document.documentElement.classList.add("js");

// Puts the current year in the footer
document.getElementById("year").textContent = new Date().getFullYear();

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
