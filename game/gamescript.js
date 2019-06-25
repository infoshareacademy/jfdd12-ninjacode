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
const difficultyModal = document.getElementById("difficulty-modal");
const easyButton = document.getElementById("easy-btn");
const hardButton = document.getElementById("hard-btn");

// scoreModal places
const scoreDisplay = document.getElementById("yourScore");
const scoreNickForm = document.querySelector(".score-modal_nick--form");
const scoreNickInput = document.querySelector(".score-modal_nick--input");
const scoreNickBtn = document.querySelector(".score-modal_nick--btn");
const nickModal = document.querySelector(".nick-modal");

// pobranie  scoreboard z localstorage lub dodanie pustej tablicy
let scoreboard = JSON.parse(localStorage.getItem("scoreboard")) || [];
let updatedScoreboard;
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
let gravityMult = 0.8;
let goldCoinGravityMult = 2;
let goldCoinChance = 0.2;
let gravityAccWithTime = 0.0005;
const COIN_WIDTH = 44;
const COIN_HEIGHT = 40;
let game;
let gameId;
let isEndGame;
const TIME_PLAY = 5;
const TIME_COIN_SPAWN = 0.1;

var timer = TIME_PLAY * 1000; // 10 seconds

const KEY_RIGHT_ARROW = 39;
const KEY_LEFT_ARROW = 37;
let keyHeldLeft = false;
let keyHeldRight = false;
let playerXSpeed = 0;
let playerMaxSpeed = 10;

document.addEventListener("keydown", keyPressed);
document.addEventListener("keyup", keyReleased);

function keyPressed(evt) {
  if (evt.keyCode == KEY_LEFT_ARROW) {
    console.log("left");
    keyHeldLeft = true;
  }
  if (evt.keyCode == KEY_RIGHT_ARROW) {
    console.log("right");
    keyHeldRight = true;
  }
  // evt.preventDefault();
}

function keyReleased(evt) {
  if (evt.keyCode == KEY_LEFT_ARROW) {
    keyHeldLeft = false;
  }
  if (evt.keyCode == KEY_RIGHT_ARROW) {
    keyHeldRight = false;
  }
}

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
  gravityMult = 1.6;
  difficultyModal.style.display = "none";
  resetGame();
});

scoresBtn.addEventListener("click", function() {
  scoresModal.style.display = "block";
});

scoresBoardBtn.addEventListener("click", function() {
  pauseGame();
  scoresModal.style.display = "block";
});

instructionBtn.addEventListener("click", function() {
  pauseGame();
  continueGame();
  instructionModal.style.display = "block";
});

closeButton.addEventListener("click", function() {
  window.location.pathname = "index.html";
});

// nickModal feature/70
scoreNickBtn.addEventListener("click", function() {
  let myScore = getScore(scoreNickInput.value, currentScore);
  console.log(myScore);
  // aktualizowanie scorebordu
  // updateScoreboard()
  let updatedScoreboard = [...scoreboard, myScore];
  //dodanie do localstorage
  addToScoreboard(updatedScoreboard);
  scoresModalFill.innerText = "";
  scoresModalFill.appendChild(createScoreTable(updatedScoreboard));
  nickModal.style.display = "none";
});

scoreCloseButton.addEventListener("click", function() {
  scoresModal.style.display = "none";

  if (isGamePaused && timer > 0 && instructionModal.style.display === "block") {
    console.log("Powrot do instrukcji w trakcie pauzy.");
  } else if (timer <= 0) {
    isGamePaused = false;
    cancelAnimationFrame(gameId);
    instructionModal.style.display = "block";
    console.log("exit z scoreModalu Koniec gry");
  } else {
    console.log("exit z scoreModalu do gry");
    cancelAnimationFrame(gameId);
    resumeGame();
  }
});

function continueGame() {
  isGamePaused = true;
  startGameButton.innerHTML = "WZNÓW GRĘ";
  startGameButton.addEventListener("click", function() {
    instructionModal.style.display = "none";
    difficultyModal.style.display = "none";
    cancelAnimationFrame(gameId);
    resumeGame();
  });
  console.log("game to be continued");
}
// WTF??
instructionModal.style.display = "block";
// difficultyModal.style.display = "none";

// load assets

let backgroundImage;
let floorImage;
let cashBakeManImage;
let coinImage;
let coinGoldImage;
let backgroundNightImage;

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
    loadImage("coin-sprite.png"),
    loadImage("coin-silver-sprite.png"),
    loadImage("background-night.png")
  ])
    .then(values => {
      const [
        background,
        floor,
        cashBakeMan,
        coinGoldSprite,
        coinSprite,
        backgroundNight
      ] = values;
      backgroundImage = background;
      floorImage = floor;
      cashBakeManImage = cashBakeMan;
      coinGoldImage = coinGoldSprite;
      coinImage = coinSprite;
      backgroundNightImage = backgroundNight;
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
    if (coin.isGolden == false) {
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
    } else {
      context.drawImage(
        coinGoldImage,
        coin.frame * COIN_WIDTH,
        0,
        COIN_WIDTH,
        COIN_HEIGHT,
        coin.x,
        coin.y,
        COIN_WIDTH,
        COIN_HEIGHT
      );
    }
  });
}

function coinFall() {
  coins.forEach(coin => {
    if (!coin.isGolden) {
      coin.y += GRAVITY * gravityMult;
    } else {
      coin.y += GRAVITY * gravityMult * goldCoinGravityMult;
    }
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
    if (coin.isGolden) {
      currentScore += 5;
    } else {
      currentScore++;
    }
    scoreTxt.innerText = currentScore;
    return true;
  } else {
    return false;
  }
}

function spawnCoins() {
  let coinX = Math.random() * (GAME_WIDTH - COIN_WIDTH);
  let isGolden = Math.random() < goldCoinChance;
  coinX = coinX < 0 ? 0 : coinX;
  coins.push({
    x: coinX,
    y: 0,
    forRemoval: false,
    isGolden: isGolden,
    frame: Math.floor(Math.random() * 10)
  });
  // console.log("silver coin spawned");
}

function removeCoins() {
  coins = coins.filter(coin => {
    return !coin.forRemoval;
  });
}

// function moveRight() {
//   if (player.x < GAME_WIDTH - PLAYER_WIDTH) {
//     player.x = player.x + 1;
//   } else {
//     player.x = GAME_WIDTH - PLAYER_WIDTH;
//   }
// }
// function moveLeft() {
//   if (player.x > 0) {
//     player.x -= 1;
//   } else {
//     player.x = 0;
//   }
// }

function movePlayer() {
  if (player.x < 0) {
    player.x = 0;
    playerXSpeed *= -0.2;
  }
  if (player.x > GAME_WIDTH - PLAYER_WIDTH) {
    player.x = GAME_WIDTH - PLAYER_WIDTH;
    playerXSpeed *= -0.2;
  }

  if (playerXSpeed > 0) {
    playerXSpeed -= 0.7;
  } else if (playerXSpeed < 0) {
    playerXSpeed += 0.7;
  }
  if (playerXSpeed < 0.3 && playerXSpeed > -0.3) {
    playerXSpeed = 0;
  }
  if (keyHeldLeft) {
    playerXSpeed -= 1.2;
  }
  if (keyHeldRight) {
    playerXSpeed += 1.2;
  }

  if (playerXSpeed < 0) {
    player.x += Math.max(playerXSpeed, -playerMaxSpeed);
  } else if (playerXSpeed >= 0) {
    player.x += Math.min(playerXSpeed, playerMaxSpeed);
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
      if (gravityMult < 1.5) {
        context.drawImage(
          backgroundImage,
          BG_WIDTH * i,
          0,
          BG_WIDTH,
          GAME_HEIGHT
        );
      } else {
        context.drawImage(
          backgroundNightImage,
          BG_WIDTH * i,
          0,
          BG_WIDTH,
          GAME_HEIGHT
        );
      }
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
    movePlayer();
    coinFall();

    gravityMult += gravityAccWithTime;

    if (timeToRotateCoinCounter >= timeToRotateCoin) {
      rotateCoins();
      timeToRotateCoinCounter = 0;
    }

    coins.forEach(coin => {
      if (coin.y >= FLOOR_START - COIN_HEIGHT) {
        // console.log("coin lost");
        coin.forRemoval = true;
      }
    });

    coins.forEach(coin => {
      if (checkCoinPlayerCollision(coin)) {
        // console.log("coin successfuly caught");
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
      nickModal.style.display = "block";
      isEndGame = true;
      scoreDisplay.innerText = currentScore; // score display for now
    }
  }
};

// game-end(Damian)

// score (Asia)
function createScoreTable(scoreboard) {
  // scoreboard: nick, wynik
  const scores = scoreboard
    .slice(0, 10) // take first 10 objects from scoreboard
    .map((row, index) => {
      return `
      <div class="Rtable-cell"><h3>${index + 1}</h3></div>
      <div class="Rtable-cell"><h3>${row.name}</h3></div>
      <div class="Rtable-cell">${row.score}</div>  
  `;
    })
    .join("\n");

  const cardBody = `
  <h2>Ściana chwały</h2>
  <div class="Rtable Rtable--3cols">
  ${scores}
  </div>
`;

  const div = document.createElement("div");
  div.innerHTML = cardBody;
  div.className = "scoretable";
  return div;
}
const scoresModalFill = document.querySelector("#score-table-modal");

scoresModalFill.appendChild(createScoreTable(scoreboard));

// incrementScore = num => {

//   currentScore += num;
//   scoreTxt.innerHTML = currentScore;

// };

// przygotowanie wyniku do dodania
const getScore = (playerName, score) => {
  return {
    name: playerName,
    score
  };
};

//przygotowanie funkcji dodawania do localstorage
const addToScoreboard = newScoreboard =>
  localStorage.setItem("scoreboard", JSON.stringify(newScoreboard));

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
  cancelAnimationFrame(gameId);
  pauseBtn.innerHTML = ">";
  console.log("game is paused");
}

function resumeGame() {
  isGamePaused = false;
  cancelAnimationFrame(gameId);
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
