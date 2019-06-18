// function mobileLogoDisplay() {

let burgerButton = document.querySelector("#burger");
let menuList = document.querySelector("ul");

burgerButton.addEventListener("click", toggleMenu);

function toggleMenu() {
  menuList.classList.toggle("menu-fold");
}

let scrollButton = document.querySelector("#scrollButton");
scrollButton.addEventListener("click", backToTop);

window.onscroll = function() {
  scrollFunction();
};

function scrollFunction() {
  if (
    document.body.scrollTop > 500 ||
    document.documentElement.scrollTop > 500
  ) {
    scrollButton.style.opacity = 0.8;
  } else {
    scrollButton.style.opacity = 0;
  }
}

function backToTop() {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
}
