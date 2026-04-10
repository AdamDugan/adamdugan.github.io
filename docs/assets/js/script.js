const revealItems = document.querySelectorAll(".reveal");

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.18,
  },
);

revealItems.forEach((item) => observer.observe(item));

const yearNode = document.querySelector("#year");

if (yearNode) {
  yearNode.textContent = new Date().getFullYear();
}

const currentPath = window.location.pathname.split("/").pop() || "index.html";
const siteTabs = document.querySelectorAll(".site-tab");

siteTabs.forEach((tab) => {
  const targetPath = tab.getAttribute("href");

  if (targetPath === currentPath) {
    tab.classList.add("is-active");
    tab.setAttribute("aria-current", "page");
  }
});
