var modal = document.getElementById("myModal");

document
  .getElementById("emailForm")
  .addEventListener("submit", function(event) {
    event.preventDefault();
    document.getElementById("client-email");
    var clientEmail = document.getElementById("client-email").value;
    var currentEmails = JSON.parse(localStorage.getItem("client-email")) || [];
    if (currentEmails.includes(clientEmail)) {
      window.location.pathname = "game/index.html";
    } else {
      const updatedEmails = [...new Set([...currentEmails, clientEmail])];
      localStorage.setItem("client-email", JSON.stringify(updatedEmails));
      modal.style.display = "block";
      const closeButtons = document.getElementsByClassName("close");
      closeButtons[1].onclick = function() {
        modal.style.display = "none";
      };
    }
  });
const openPageButton = document.getElementsByClassName("open-page")[0];
openPageButton.onclick = function() {
  window.location.pathname = "game/index.html";
};

var closeButton = document.getElementsByClassName("close");

var span = document.getElementsByClassName("close")[0];

span.onclick = function() {
  modal.style.display = "none";
};

window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
};
