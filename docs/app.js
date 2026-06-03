const navLinks = Array.from(document.querySelectorAll(".section-nav a"));
const sections = navLinks
  .map((link) => document.querySelector(link.getAttribute("href")))
  .filter(Boolean);

const observer = new IntersectionObserver(
  (entries) => {
    const visible = entries
      .filter((entry) => entry.isIntersecting)
      .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

    if (!visible) {
      return;
    }

    navLinks.forEach((link) => {
      link.classList.toggle("is-active", link.getAttribute("href") === `#${visible.target.id}`);
    });
  },
  {
    rootMargin: "-20% 0px -60% 0px",
    threshold: [0.1, 0.25, 0.5]
  }
);

sections.forEach((section) => observer.observe(section));

document.querySelector("#section-search").addEventListener("input", (event) => {
  const query = event.target.value.trim().toLowerCase();

  navLinks.forEach((link) => {
    const matches = !query || link.textContent.toLowerCase().includes(query);
    link.hidden = !matches;
  });
});

document.querySelectorAll("[data-copy]").forEach((button) => {
  button.addEventListener("click", async () => {
    const target = document.getElementById(button.dataset.copy);

    if (!target) {
      return;
    }

    const text = target.textContent;

    try {
      await navigator.clipboard.writeText(text);
      button.textContent = "Copied";
      window.setTimeout(() => {
        button.textContent = "Copy";
      }, 1100);
    } catch {
      const range = document.createRange();
      range.selectNodeContents(target);
      const selection = window.getSelection();
      selection.removeAllRanges();
      selection.addRange(range);
    }
  });
});
