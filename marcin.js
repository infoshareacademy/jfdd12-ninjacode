// function mobileLogoDisplay() {

let burgerButton = document.querySelector("#burger");
let menuList = document.querySelector("ul");

burgerButton.addEventListener("click", toggleMenu);

function toggleMenu() {
  menuList.classList.toggle("menu-fold");
}

let scrollButton = document.querySelector("#scrollButton");
scrollButton.addEventListener("click", topFunction);

window.onscroll = function() {
  scrollFunction();
};

function scrollFunction() {
  if (
    document.body.scrollTop > 500 ||
    document.documentElement.scrollTop > 500
  ) {
    scrollButton.style.display = "block";
  } else {
    scrollButton.style.display = "none";
  }
}

// When the user clicks on the button, scroll to the top of the document
function topFunction() {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
}
