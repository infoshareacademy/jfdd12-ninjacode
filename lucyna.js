// Get the modal
var modal = document.getElementById("myModal");

document.getElementById("emailForm").addEventListener('submit', function(event) {
    event.preventDefault();

    modal.style.display = "block";
    const closeButtons = document.getElementsByClassName('close')
    closeButtons[1].onclick = function() {
      modal.style.display = "none"
    }
});
const openPageButton = document.getElementsByClassName('open-page')[0]
openPageButton.onclick = function(){
  window.location.pathname = "game/index.html"
}


// Get the button that opens the modal
// var btn = document.getElementById("myBtn");

// Get the <span> element that closes the modal
var closeButton = document.getElementsByClassName("close");

// When the user clicks the button, open the modal 
// btn.onclick = function() {
//   modal.style.display = "block";
// }
var span = document.getElementsByClassName("close")[0]
// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
}
  //window.location.pathname = 'game.html';dodać do buttona YES


// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}

// 
/* document.getElementById('emailForm').addEventListener('submit', (e) => {
    e.preventDefault();
    alert('Thanks');
    window.location.pathname="/gra"
    }) */