// function mobileLogoDisplay() {

let burgerButton = document.querySelector("#burger");
let menuList = document.querySelector("ul");

burgerButton.addEventListener("click", toggleMenu);

function toggleMenu() {
  menuList.classList.toggle("menu-fold");
}
