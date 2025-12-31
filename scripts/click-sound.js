const clickSound = document.getElementById("clickSound");

document.addEventListener("click", (e) => {
  if (e.target.closest("button, a, .clickable")) {
    clickSound.currentTime = 0;
    clickSound.play();
  }
});
