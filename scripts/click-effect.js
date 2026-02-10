// Sparks template
function createSparks() {
  const container = document.createElement("div");
  container.className = "sparkclick-effect";

  const spikes = [
    { angle: 5, distance: 30 },
    { angle: 55, distance: 31 },
    { angle: 75, distance: 27 },
    { angle: 135, distance: 30 },
    { angle: 190, distance: 28 },
    { angle: 210, distance: 32 },
    { angle: 280, distance: 31 },
    { angle: 330, distance: 30 },
  ];

  spikes.forEach((s) => {
    const spike = document.createElement("div");
    spike.className = "spike";
    spike.style.setProperty("--angle", s.angle + "deg");
    spike.style.setProperty("--distance", s.distance + "px");
    container.appendChild(spike);
  });

  return container;
}

// Attach click effect to elements with class "sparkclick"
document.querySelectorAll(".sparkclick").forEach((btn) => {
  let animationInProgress = false;
  let animationId;
  const sparkEffect = createSparks();
  document.body.appendChild(sparkEffect);

  btn.addEventListener("click", (e) => {
    if (animationInProgress) {
      clearTimeout(animationId);
      sparkEffect.classList.remove("effect");
      void sparkEffect.offsetWidth; // reflow
    }

    sparkEffect.style.top = e.clientY + window.scrollY + "px";
    sparkEffect.style.left = e.clientX + window.scrollX + "px";
    sparkEffect.classList.add("effect");
    animationInProgress = true;

    animationId = setTimeout(() => {
      sparkEffect.classList.remove("effect");
      animationInProgress = false;
    }, 750);
  });
});
