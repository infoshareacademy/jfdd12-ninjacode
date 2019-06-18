// function mobileLogoDisplay() {

let burgerButton = document.querySelector("#burger");
let menuList = document.querySelector("ul");

burgerButton.addEventListener("click", toggleMenu);

function toggleMenu() {
  console.log(menuList);
  if (menuList.style.display === "flex") {
    menuList.style.display = "none";
    menuList.style.transition = "0.5s";
  } else {
    menuList.style.display = "flex";
    menuList.style.transition = "0.5s";
  }

  console.log("im togglging!");
}
