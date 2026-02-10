const avatarWrapper = document.querySelector(".avatar-wrapper");
const avatarInitialOffset = avatarWrapper.offsetTop;

window.addEventListener("scroll", () => {
  const scrollY = window.scrollY;

  if (scrollY > avatarInitialOffset - 40) {
    avatarWrapper.classList.add("is-stuck");
  } else {
    avatarWrapper.classList.remove("is-stuck");
  }
});
