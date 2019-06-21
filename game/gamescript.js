// instruction (Lucyna)
const instructionModal = document.getElementById("instruction-modal");
const scoresModal = document.getElementById("scores-modal");
const instructionBtn = document.getElementById("instruction-btn");
const scoresBtn = document.getElementById("scores-btn");
const closeButton = document.getElementById("exit-btn");

function displayScores() {
  instructionModal.style.display = "none";
  scoresModal.classList.toggle("scores-modal-shown");
}

scoresBtn.addEventListener("click", displayScores);

instructionBtn.addEventListener("click", function () {
  instructionModal.style.display = "block";
});

closeButton.addEventListener("click", function () {
  instructionModal.style.display = "none";
});

//var wynikiButton = document.getElementsByClassName("wyniki")[0];
//wynikiButton.onclick = function() {

//}
// instruction-end

// game (Damian)
const GAME_WIDTH = 288;
const GAME_HEIGHT = 512;
const FLOOR_HEIGHT = 112;
const FLOOR_WIDTH = 336;
const PLAYER_HEIGHT = 100;
const PLAYER_WIDTH = 49;
const IMAGES_PATH = "/game/img/";
const GRAVITY = 0.2;
const COIN_WIDTH = 440;
const COIN_HEIGHT = 40;

// instruction-end

// Canvas on global
const canvas = document.createElement("canvas");
canvas.setAttribute("height", `${GAME_HEIGHT}px`);
canvas.setAttribute("width", `${GAME_WIDTH}px`);
this.context = canvas.getContext("2d");
const gameCanvas = document.querySelector("#game");
gameCanvas.append(canvas);

const body = document.querySelector("body");
let direction;

body.addEventListener("keydown", event => {
  console.log(event);
  if (event.key === "ArrowRight") {
    moveRight();
    // direction = 1;
  } else if (event.key === "ArrowLeft") {
    moveLeft();
  } else direction = 0;
});

function draw(imageUrl, x, y, w, h, onload = () => { }) {
  const image = new Image();
  image.src = `${IMAGES_PATH}${imageUrl}`;
  image.onload = function () {
    context.drawImage(image, x, y, w, h);
    onload();
  };
}
// game (Damian)
const player = {
  x: (GAME_WIDTH - PLAYER_WIDTH) / 2,
  y: GAME_HEIGHT - FLOOR_HEIGHT - PLAYER_HEIGHT
};

function drawPlayer() {
  draw("cashBakeMan.png", player.x, player.y, PLAYER_WIDTH, PLAYER_HEIGHT);
}

function drawCoin() {

}

function moveRight() {
  if (player.x < GAME_WIDTH - PLAYER_WIDTH) {
    player.x = player.x + 10;
    // console.log(player);
  } else {
    player.x = GAME_WIDTH - PLAYER_WIDTH;
  }
}
function moveLeft() {
  if (player.x > 0) {
    player.x -= 10;
    // console.log(player);
  } else {
    player.x = 0;
  }
}

function GameArea(
  width,
  height,
  difficultyLevel = "easy" /* values: 'easy', 'hard' */
) {
  // this.width = width;
  // this.height = height;
  // this.difficultyLevel = difficultyLevel; //TODO: add difficulty choice in begin game
  this.generateCanvas();
}

GameArea.prototype = {
  drawMyImage: function (imageUrl, x, y, w, h, onload = () => { }) {
    this.x = x;
    this.y = y;
    this.w = w;

    const image = new Image();
    image.src = `${IMAGES_PATH}${imageUrl}`;
    image.onload = function () {
      context.drawImage(image, x, y, w, h);
      onload();
    };
  },
  drawFloor: function (context) {
    const floorImage = this.drawMyImage(
      "floor.png",
      0,
      GAME_HEIGHT - FLOOR_HEIGHT,
      FLOOR_WIDTH,
      FLOOR_HEIGHT
    );
  },
  drawBackground: function (context) {
    const backgroundImage = this.drawMyImage(
      "background-day.png",
      0,
      0,
      GAME_WIDTH,
      GAME_HEIGHT
    );
  },
  generateCanvas: function () {
    this.drawBackground(this.context);
    this.drawFloor(this.context);
    drawPlayer();
  },
  gameLoop: function (time) {
    this.drawBackground()
    this.drawFloor()
    drawPlayer();

    requestAnimationFrame(this.gameLoop.bind(this));
  }
};

const game = new GameArea(1200, 500, "easy");
// game.gameLoop();

//TODO: add  loop function

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
