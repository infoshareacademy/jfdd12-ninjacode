// instruction (Lucyna)
const instructionModal = document.getElementById("instruction-modal");
const scoresModal = document.getElementById("scores-modal");
const instructionBtn = document.getElementById("instruction-btn");
const scoresBoardBtn = document.getElementById("scores-board-btn");
const scoresBtn = document.getElementById("scores-btn");
const scoreTxt = document.getElementById("score-number");
const startGameButton = document.getElementById("start-game");
const pauseBtn = document.getElementById("pause-btn");
const replayBtn = document.getElementById("replay-btn");
const closeButton = document.getElementById("exit-btn");
const scoreCloseButton = document.getElementById("score-exit-btn");
const timeDisplay = document.getElementById("timeDisplay");
const scoreDisplay = document.getElementById("yourScore");
const difficultyModal = document.getElementById("difficulty-modal");
const easyButton = document.getElementById("easy-btn");
const hardButton = document.getElementById("hard-btn");

let currentScore = 0;
let coinGet = 0;
let isGamePaused = false;

const GAME_WIDTH = document.querySelector("#game").offsetWidth; //600
const GAME_HEIGHT = 512;
const BG_WIDTH = 288;
const BG_HEIGHT = 512;
const FLOOR_HEIGHT = 112;
const FLOOR_WIDTH = 336;
const FLOOR_START = GAME_HEIGHT - FLOOR_HEIGHT;
const PLAYER_HEIGHT = 100;
const PLAYER_WIDTH = 49;
const IMAGES_PATH = "/game/img/";
const GRAVITY = 2;
let gravityMult = 1;
let gravityAccWithTime = 0.0005;
const COIN_WIDTH = 44;
const COIN_HEIGHT = 40;
let game;
let gameId;
const TIME_PLAY = 10;
const TIME_COIN_SPAWN = 0.5;

var timer = TIME_PLAY * 1000; // 10 seconds

// top game buttons

startGameButton.addEventListener("click", function() {
  instructionModal.style.display = "none";
  difficultyModal.style.display = "block";
});

pauseBtn.addEventListener("click", function() {
  togglePause();
});

window.addEventListener("keydown", function(event) {
  var key = event.keyCode;
  if (key === 80) {
    togglePause();
  } // shortcut key p for pause
});

replayBtn.addEventListener("click", function() {
  pauseGame();
  difficultyModal.style.display = "block";
});

easyButton.addEventListener("click", function() {
  gravityMult = 1;
  difficultyModal.style.display = "none";
  resetGame();
});

hardButton.addEventListener("click", function() {
  gravityMult = 2;
  difficultyModal.style.display = "none";
  resetGame();
});

scoresBtn.addEventListener("click", function() {
  instructionModal.style.display = "none";
  scoresModal.style.display = "block";
});

scoresBoardBtn.addEventListener("click", function() {
  pauseGame();
  scoresModal.style.display = "block";
});

instructionBtn.addEventListener("click", function() {
  pauseGame();
  instructionModal.style.display = "block";
});

closeButton.addEventListener("click", function() {
  instructionModal.style.display = "none";
  resumeGame();
});

scoreCloseButton.addEventListener("click", function() {
  scoresModal.style.display = "none";
  resumeGame();
});

instructionModal.style.display = "block";
difficultyModal.style.display = "none";

// load assets

let backgroundImage;
let floorImage;
let cashBakeManImage;
let coinImage;

function loadImage(imageUrl, x, y, w, h) {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.src = `/game/img/${imageUrl}`;
    image.onload = function() {
      resolve(image);
    };
    image.onabort = function() {
      reject(`Couldn't load image from /game/img/${imageUrl}`);
    };
  });
}

function loadAllImages() {
  Promise.all([
    loadImage("background-day.png"),
    loadImage("floor.png"),
    loadImage("cashBakeMan.png"),
    loadImage("coin-sprite.png")
  ])
    .then(values => {
      const [background, floor, cashBakeMan, coinSprite] = values;
      backgroundImage = background;
      floorImage = floor;
      cashBakeManImage = cashBakeMan;
      coinImage = coinSprite;
    })
    .finally(function() {
      game = new GameArea(1200, 500, "easy");
    });
}

loadAllImages();

// Canvas on global
const canvas = document.createElement("canvas");
canvas.setAttribute("height", `${GAME_HEIGHT}px`);
canvas.setAttribute("width", `${GAME_WIDTH}px`);
this.context = canvas.getContext("2d");
const gameCanvas = document.querySelector("#game");
gameCanvas.append(canvas);

const body = document.querySelector("body");

body.addEventListener("keydown", event => {
  if (event.key === "ArrowRight") {
    moveRight();
  } else if (event.key === "ArrowLeft") {
    moveLeft();
  } else direction = 0;
});

let lastTime = 0; //time last loop was executed

let timeToRotateCoinCounter = 0; //is it time to rotate the coin
const timeToRotateCoin = 100; //coin frame changed every 100 ms
let timeToSpawnCoin = TIME_COIN_SPAWN * 1000; //a coin is spawned every 5s
let timeToSpawnCoinCounter = 0; //is it time to spawn a new coin

let player = {
  x: (GAME_WIDTH - PLAYER_WIDTH) / 2,
  y: GAME_HEIGHT - FLOOR_HEIGHT - PLAYER_HEIGHT
};

let coins = [];

function drawPlayer() {
  context.drawImage(
    cashBakeManImage,
    player.x,
    player.y,
    PLAYER_WIDTH,
    PLAYER_HEIGHT
  );
}

function drawCoins() {
  coins.forEach(coin => {
    context.drawImage(
      coinImage,
      coin.frame * COIN_WIDTH,
      0,
      COIN_WIDTH,
      COIN_HEIGHT,
      coin.x,
      coin.y,
      COIN_WIDTH,
      COIN_HEIGHT
    );
  });
}

function coinFall() {
  coins.forEach(coin => {
    coin.y += GRAVITY * gravityMult;
  });
}

function rotateCoins() {
  coins.forEach(coin => {
    if (coin.frame == 9) {
      coin.frame = 0;
    } else {
      coin.frame++;
    }
  });
}

function checkCoinPlayerCollision(coin) {
  let coinx1 = coin.x + COIN_WIDTH;
  let coiny1 = coin.y + COIN_HEIGHT;

  let playerx1 = player.x + PLAYER_WIDTH;
  let playery1 = player.y + PLAYER_HEIGHT;

  if (
    coin.x < playerx1 &&
    player.x < coinx1 &&
    coin.y < playery1 &&
    coiny1 > player.y
  ) {
    currentScore++;
    scoreTxt.innerText = currentScore;
    return true;
  } else {
    return false;
  }
}

function spawnCoins() {
  let coinX = Math.random() * (GAME_WIDTH - COIN_WIDTH);
  coinX = coinX < 0 ? 0 : coinX;
  coins.push({
    x: coinX,
    y: 0,
    forRemoval: false,
    frame: Math.floor(Math.random() * 10)
  });
}

function removeCoins() {
  coins = coins.filter(coin => {
    return !coin.forRemoval;
  });
}

function moveRight() {
  if (player.x < GAME_WIDTH - PLAYER_WIDTH) {
    player.x = player.x + 10;
  } else {
    player.x = GAME_WIDTH - PLAYER_WIDTH;
  }
}
function moveLeft() {
  if (player.x > 0) {
    player.x -= 10;
  } else {
    player.x = 0;
  }
}

function GameArea(
  width,
  height,
  difficultyLevel = "easy" /* values: 'easy', 'hard' */
) {
  this.generateCanvas();
}

GameArea.prototype = {
  drawFloor: function() {
    const howManyTimesDraw = GAME_WIDTH / FLOOR_WIDTH;
    for (let i = 0; i < howManyTimesDraw; i++) {
      context.drawImage(
        floorImage,
        FLOOR_WIDTH * i,
        FLOOR_START,
        FLOOR_WIDTH,
        FLOOR_HEIGHT
      );
    }
  },

  drawBackground: function() {
    let howManyTimesDraw = GAME_WIDTH / BG_WIDTH;
    for (let i = 0; i < howManyTimesDraw; i++) {
      context.drawImage(
        backgroundImage,
        BG_WIDTH * i,
        0,
        BG_WIDTH,
        GAME_HEIGHT
      );
    }
  },
  generateCanvas: function() {
    this.drawBackground();
    this.drawFloor();
    drawPlayer();
  },
  gameLoop: function(time) {
    let delta = 0;
    if (time) {
      delta = time - lastTime;
      lastTime = time;
      timeToRotateCoinCounter += delta;
      timeToSpawnCoinCounter += delta;
    }

    coinFall();

    gravityMult += gravityAccWithTime;

    if (timeToRotateCoinCounter >= timeToRotateCoin) {
      rotateCoins();
      timeToRotateCoinCounter = 0;
    }

    coins.forEach(coin => {
      if (coin.y >= FLOOR_START - COIN_HEIGHT) {
        console.log("coin lost");
        coin.forRemoval = true;
      }
    });

    coins.forEach(coin => {
      if (checkCoinPlayerCollision(coin)) {
        console.log("coin successfuly caught");
        console.log(currentScore);
        coin.forRemoval = true;
      }
    });

    removeCoins();

    if (timeToSpawnCoinCounter >= timeToSpawnCoin) {
      spawnCoins();
      timeToSpawnCoinCounter = 0;
    }

    this.drawBackground();
    this.drawFloor();
    drawPlayer();
    drawCoins();
    timerClock(delta, !isGamePaused);
    drawFps(delta);
    if (!isGamePaused && timer > 0) {
      gameId = requestAnimationFrame(this.gameLoop.bind(this));
    }
    if (timer <= 0) {
      scoresModal.style.display = "block";
      scoreDisplay.innerText = currentScore; // score display for now
    }
  }
};

// game-end(Damian)

// score (Asia)

// incrementScore = num => {
//   currentScore += num;
//   scoreTxt.innerHTML = currentScore;
// };

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

function togglePause() {
  if (!isGamePaused) {
    pauseGame();
  } else {
    resumeGame();
  }
}

function pauseGame() {
  isGamePaused = true;
  pauseBtn.innerHTML = ">";
  console.log("game is paused");
}

function resumeGame() {
  isGamePaused = false;
  pauseBtn.innerHTML = "| |";
  game.gameLoop();
  console.log("game is playing");
}

function resetGame() {
  console.log("restarted the game");
  cancelAnimationFrame(gameId);
  currentScore = 0;
  scoreTxt.innerText = currentScore;
  console.log(currentScore);
  timer = TIME_PLAY * 1000; // 10 seconds again
  // remove coins
  coins = [];
  // reset dude position
  player.x = (GAME_WIDTH - PLAYER_WIDTH) / 2;
  resumeGame();
}

function timerClock(delta, isGamePlaying) {
  if (isGamePlaying && delta < 40) {
    timer -= delta;
  }

  if (delta > 40) {
    console.log("Duza Delta!!! " + delta + " \n isPlaying: " + isGamePlaying);
  }
  let timerShort = Math.trunc(timer / 1000 + 1);
  timeDisplay.innerHTML = Math.ceil(timerShort);
}
function drawFps(delta) {
  delta > 0 ? Math.floor(delta) : 1;
  context.fillStyle = "#fff";
  context.font = "24px Arial";
  // context.textAlign = "center";
  context.textBaseline = "middle";
  context.fillText(
    `${Math.floor(1000 / Math.round(delta))}fps`,
    10,
    BG_HEIGHT - 10,
    GAME_WIDTH
  );
}
