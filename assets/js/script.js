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
  '> library(survival)\n> library(tableone)\n> library("please-let-this-balance")\nError in library("please-let-this-balance") :\n  there is no package called "please-let-this-balance"',
  '> cobalt::bal.tab(ps_model)$Balance |> subset(Diff.Adj < 0.1) |> nrow()\n[1] 42',
  '> cohort %>%\n+   dplyr::mutate(index_date = pmax(rx_date, dx_date)) %>%\n+   dplyr::filter(!is.na(index_date))\n# time zero has entered the chat',
  '> fit <- survival::coxph(Surv(time, event) ~ trt + age + baseline_risk, data = analysis)\n> broom::glance(fit)$concordance\n[1] "respectable"',
  '> ifelse(all(abs(smd) < 0.1), "ship it", "revisit design")\n[1] "revisit design"',
  '> targets::tar_make()\n▶ started target propensity_model\n▶ started target km_plot\n✔ ended target reviewer_2_concern',
  '> here::here("programs", "analysis_v17_final_final.R")\n[1] "/projects/rwe/programs/analysis_v17_final_final.R"',
  '> renv::snapshot()\nThe following package(s) will be updated in the lockfile:\n# one package you forgot would break everything',
  '> gtsummary::tbl_regression(fit, exponentiate = TRUE)\nError:\n! 95% CI overlaps with stakeholder expectations',
  '> purrr::map(models, safely(run_model)) |> purrr::transpose()\n$errors\n[1] "1 immortal time bias" "1 factor level issue" "0 surprises"',
  '> shiny::runApp("rwe-ops-dashboard")\nListening on http://127.0.0.1:3838\nWarning: package "shinydashboard" was built under mild deadline pressure',
  '> usethis::use_package("dplyr")\n> usethis::use_package("rlang")\n> usethis::use_package("a little self control")\nError: package not available',
  '> ggplot(analysis, aes(x = follow_up, color = treatment)) +\n+   geom_density()\nWarning:\nGroups appear balanced, statistician remains unconvinced',
  '> tidyr::drop_na(endpoint)\n> nrow(analysis)\n[1] 18342\n> attr(analysis, "feeling")\n[1] "underpowered for the subgroup someone will ask about"',
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
