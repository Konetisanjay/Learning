const root = document.documentElement;
const topicCards = document.querySelectorAll(".topic-card");
const reveals = document.querySelectorAll(".capabilities, .signals, .stories, .footer");

document.addEventListener("pointermove", (event) => {
  const x = `${(event.clientX / window.innerWidth) * 100}%`;
  const y = `${(event.clientY / window.innerHeight) * 100}%`;
  root.style.setProperty("--cursor-x", x);
  root.style.setProperty("--cursor-y", y);
});

topicCards.forEach((card) => {
  card.style.setProperty("--card-accent", hexToRgba(card.dataset.accent, 0.32));

  card.addEventListener("mouseenter", () => {
    root.style.setProperty("--accent-glow", hexToRgba(card.dataset.accent, 0.24));
  });

  card.addEventListener("mouseleave", () => {
    root.style.setProperty("--accent-glow", "rgba(159, 255, 217, 0.18)");
  });
});

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
      }
    });
  },
  { threshold: 0.18 }
);

reveals.forEach((section) => {
  section.classList.add("reveal");
  observer.observe(section);
});

function hexToRgba(hex, alpha) {
  const clean = hex.replace("#", "");
  const [r, g, b] = [0, 2, 4].map((index) => parseInt(clean.slice(index, index + 2), 16));
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}
