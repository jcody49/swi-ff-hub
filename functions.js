document.addEventListener("DOMContentLoaded", () => {
  const toggle = document.querySelector(".nav-toggle");
  const menu = document.querySelector(".navbar");

  toggle.addEventListener("click", () => {
    menu.classList.toggle("active");
  });
});
