document.querySelector(".scroll-indicator").addEventListener("click", () => {
  window.scrollBy({ top: window.innerHeight, behavior: "smooth" });
});

// -------------------------
// Bottom Progress Bar
// -------------------------
function updateProgressBar() {
  const progressBar = document.querySelector(".progress-bar");
  const totalHeight = document.body.scrollHeight - window.innerHeight;
  const progress = (window.pageYOffset / totalHeight) * 100;
  progressBar.style.width = progress + "%";
}

window.addEventListener("scroll", updateProgressBar);
window.addEventListener("resize", updateProgressBar);
updateProgressBar();

// -------------------------
// Circular Progress & Scroll-to-top
// -------------------------
function updateProgressCircle() {
  const circle = document.querySelector(".progress-circle-bar");
  const scrollBtn = document.querySelector(".scroll-to-top");
  const radius = 45;
  const circumference = 2 * Math.PI * radius;
  const totalHeight = document.body.scrollHeight - window.innerHeight;
  let progress = (window.pageYOffset / totalHeight) * circumference;

  circle.style.strokeDashoffset = circumference - progress;

  // Show button after scrolling 100px
  scrollBtn.style.opacity = window.pageYOffset > 100 ? "1" : "0";
}

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: "smooth" });
}

document.querySelector(".scroll-to-top").addEventListener("click", scrollToTop);

window.addEventListener("scroll", updateProgressCircle);
window.addEventListener("resize", updateProgressCircle);
updateProgressCircle();
