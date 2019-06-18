// instruction (Lucyna)
var modal = document.getElementById("myModal");
var opensModal = document.getElementById("instrukcja");
opensModal.onclick = function() {
  modal.style.display = "block";
};
var closeButton = document.getElementsByClassName("exit")[0];
closeButton.onclick = function() {
  modal.style.display = "none";
};
//var wynikiButton = document.getElementsByClassName("wyniki")[0];
//wynikiButton.onclick = function() {

//}
// instruction-end

// game (Damian)

// game-end(Damian)

// score (Asia)

// pobranie  scoreboard z localstorage lub dodanie pustej tablicy
let scoreboard = JSON.parse(localStorage.getItem("scoreboard")) || [];

// przygotowanie wyniku do dodania
const getScore = (playerName, score) => {
  return {
    name: playerName,
    score
  };
};

// aktualizowanie scorbordu
let updatedScoreboard = [...scoreboard, getScore("Asia", 10)];

//przygotowanie funkcji dodawania do localstorage
const addToScoreboard = newScoreboard =>
  localStorage.setItem("scoreboard", JSON.stringify(newScoreboard));
//dodanie do localstorage
addToScoreboard(updatedScoreboard);

// score-end
