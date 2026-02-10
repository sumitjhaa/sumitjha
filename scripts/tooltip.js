const tooltip = document.getElementById("tooltip");
const usernameEl = tooltip.querySelector(".username");
const platformEl = tooltip.querySelector(".platform");

function colorToRgba(color, alpha = 0.25) {
  const hex = color?.match(/^#([0-9a-f]{3}|[0-9a-f]{6})$/i);
  if (!hex) return `rgba(0,0,0,${alpha})`;

  const h = hex[1];
  const r = parseInt(h.length === 3 ? h[0] + h[0] : h.slice(0, 2), 16);
  const g = parseInt(h.length === 3 ? h[1] + h[1] : h.slice(2, 4), 16);
  const b = parseInt(h.length === 3 ? h[2] + h[2] : h.slice(4, 6), 16);

  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

function positionTooltip(x, y) {
  const offset = 14;
  let left = x + offset;
  let top = y + offset;

  if (left + 270 > window.innerWidth) left = x - 270 - offset;
  if (top + 80 > window.innerHeight) top = y - 80 - offset;

  tooltip.style.left = `${left}px`;
  tooltip.style.top = `${top}px`;
}

document.querySelectorAll(".action-buttons a").forEach((link) => {
  link.addEventListener("mouseenter", () => {
    const color = link.dataset.color;

    usernameEl.textContent = link.dataset.username;
    platformEl.textContent = link.dataset.platform;

    usernameEl.style.background = `linear-gradient(transparent 65%, ${colorToRgba(
      color
    )} 65%)`;

    tooltip.style.borderColor = color;
    tooltip.classList.add("show");
  });

  link.addEventListener("mousemove", (e) => {
    positionTooltip(e.clientX, e.clientY);
  });

  link.addEventListener("mouseleave", () => {
    tooltip.classList.remove("show");
  });
});
