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

const consoleOutput = document.querySelector("#console-output");
const consoleButton = document.querySelector("#console-button");
const consoleMessages = [
  '> warning("correlation is not causation")\nWarning message:\ncorrelation is not causation',
  '> model_status$caffeine <- TRUE\n> fit$model\n[1] "converged"',
  '> regulatory_grade_rwe(design = "thoughtful")\n[1] "more plausible"',
  '> residual_confounding\n[1] "still invited to the meeting"',
  '> launch_shiny_prototype()\nListening on http://127.0.0.1:3838',
  '> propensity_score_balance\nAll SMDs < 0.1\nReviewer mood improved',
];

if (consoleOutput && consoleButton) {
  consoleButton.addEventListener("click", () => {
    const nextMessage =
      consoleMessages[Math.floor(Math.random() * consoleMessages.length)];
    consoleOutput.textContent = nextMessage;
  });
}

const studyCards = {
  comparator: [
    { label: "Active comparator", score: 22 },
    { label: "Historical control", score: 9 },
    { label: "Poorly matched external cohort", score: 7 },
    { label: "Clinically relevant standard of care", score: 20 },
  ],
  index: [
    { label: "Clearly anchored", score: 18 },
    { label: "A little vague", score: 9 },
    { label: "Time zero mismatch", score: 4 },
    { label: "Protocol-aligned start", score: 20 },
  ],
  confounding: [
    { label: "Propensity score weighting", score: 20 },
    { label: "Minimal covariate adjustment", score: 10 },
    { label: "Unclear confounding strategy", score: 5 },
    { label: "Target trial emulation mindset", score: 22 },
  ],
  endpoint: [
    { label: "Clinically meaningful", score: 16 },
    { label: "Convenient proxy only", score: 8 },
    { label: "Hard outcome", score: 18 },
    { label: "Somewhat fuzzy endpoint", score: 9 },
  ],
  sensitivity: [
    { label: "Multiple falsification checks", score: 18 },
    { label: "Single sensitivity analysis", score: 10 },
    { label: "Sensitivity analyses pending", score: 4 },
    { label: "Robust negative-control package", score: 20 },
  ],
};

const noteMessages = [
  "A thoughtful comparator and strong sensitivity checks tend to travel well.",
  "Time zero clarity quietly saves a lot of future pain.",
  "The strongest studies usually look careful before they look flashy.",
  "If the endpoint is fuzzy, the conclusion usually gets fuzzy too.",
  "A better design often beats a fancier model.",
];

const shuffleButton = document.querySelector("#shuffle-button");
const scoreNode = document.querySelector("#confidence-score");
const noteNode = document.querySelector("#game-note");

function drawStudyCard(category, targetId) {
  const options = studyCards[category];
  const selection = options[Math.floor(Math.random() * options.length)];
  const target = document.querySelector(targetId);

  if (target) {
    target.textContent = selection.label;
  }

  return selection.score;
}

if (shuffleButton && scoreNode && noteNode) {
  const mappings = [
    ["comparator", "#card-comparator"],
    ["index", "#card-index"],
    ["confounding", "#card-confounding"],
    ["endpoint", "#card-endpoint"],
    ["sensitivity", "#card-sensitivity"],
  ];

  shuffleButton.addEventListener("click", () => {
    const totalScore = mappings.reduce((sum, [category, targetId]) => {
      return sum + drawStudyCard(category, targetId);
    }, 0);

    scoreNode.textContent = String(Math.min(99, totalScore));
    noteNode.textContent =
      noteMessages[Math.floor(Math.random() * noteMessages.length)];
  });
}

const trailCanvas = document.querySelector("#mouse-trail-canvas");

if (trailCanvas) {
  const ctx = trailCanvas.getContext("2d");
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  let width = 0;
  let height = 0;
  let points = [];
  let animationFrame = 0;

  function resizeCanvas() {
    width = window.innerWidth;
    height = window.innerHeight;
    trailCanvas.width = width * window.devicePixelRatio;
    trailCanvas.height = height * window.devicePixelRatio;
    trailCanvas.style.width = `${width}px`;
    trailCanvas.style.height = `${height}px`;
    ctx.setTransform(window.devicePixelRatio, 0, 0, window.devicePixelRatio, 0, 0);
  }

  function addPoint(event) {
    if (prefersReducedMotion.matches) {
      return;
    }

    points.push({
      x: event.clientX,
      y: event.clientY,
      life: 1,
    });

    if (points.length > 36) {
      points = points.slice(points.length - 36);
    }
  }

  function drawRegressionLine() {
    if (points.length < 8) {
      return;
    }

    let sumX = 0;
    let sumY = 0;
    let sumXY = 0;
    let sumXX = 0;

    points.forEach((point) => {
      sumX += point.x;
      sumY += point.y;
      sumXY += point.x * point.y;
      sumXX += point.x * point.x;
    });

    const n = points.length;
    const denominator = n * sumXX - sumX * sumX;

    if (denominator === 0) {
      return;
    }

    const slope = (n * sumXY - sumX * sumY) / denominator;
    const intercept = (sumY - slope * sumX) / n;
    const x1 = Math.max(0, points[0].x - 20);
    const x2 = Math.min(width, points[points.length - 1].x + 20);
    const y1 = slope * x1 + intercept;
    const y2 = slope * x2 + intercept;

    ctx.strokeStyle = "rgba(87, 180, 171, 0.22)";
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.stroke();
  }

  function renderTrail() {
    ctx.clearRect(0, 0, width, height);
    points = points.filter((point) => point.life > 0.02);

    points.forEach((point) => {
      ctx.beginPath();
      ctx.fillStyle = `rgba(215, 164, 91, ${point.life * 0.22})`;
      ctx.arc(point.x, point.y, 3.2, 0, Math.PI * 2);
      ctx.fill();
      point.life *= 0.965;
    });

    drawRegressionLine();
    animationFrame = window.requestAnimationFrame(renderTrail);
  }

  resizeCanvas();
  renderTrail();
  window.addEventListener("resize", resizeCanvas);
  window.addEventListener("pointermove", addPoint, { passive: true });
}
