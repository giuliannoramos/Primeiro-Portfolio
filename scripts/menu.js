document.addEventListener("DOMContentLoaded", function () {
  const menuButton = document.querySelector(".menu__menu");
  const menuItems = document.querySelectorAll(".menu__item");

  menuButton.addEventListener("click", function (event) {
    event.preventDefault();
    menuItems.forEach((item) => {
      item.classList.toggle("active");
    });
  });
});

const menu = document.querySelector(".menu");

window.addEventListener("scroll", () => {
  const scrollPosition = window.scrollY;

  const scrollThreshold = 100;

  if (scrollPosition > scrollThreshold) {
    menu.style.backgroundColor = "rgba(0, 0, 0, 1)";
  } else {
    menu.style.backgroundColor = "transparent";
  }
});
