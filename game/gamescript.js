const GAME_WIDTH = 288
const GAME_HEIGHT = 512
const FLOOR_HEIGHT = 112
const FLOOR_WIDTH = 336
const PLAYER_HEIGHT = 100
const PLAYER_WIDTH = 49
const IMAGES_PATH = "/game/img/"
const GRAVITY = 0.2
const COIN_WIDTH = 440
const COIN_HEIGHT = 40
// instruction (Lucyna)

// instruction-end

// Canvas on global
const canvas = document.createElement("canvas")
canvas.setAttribute("height", `${GAME_HEIGHT}px`)
canvas.setAttribute("width", `${GAME_WIDTH}px`)
this.context = canvas.getContext("2d")
const gameCanvas = document.querySelector("#game")
gameCanvas.append(canvas)

const body = document.querySelector("body")
let direction

body.addEventListener('keydown', event => {
  console.log(event)
  if (event.key === 'ArrowRight') {
    moveRight();
    direction = 1
  } else if (event.key === 'ArrowLeft') {
    moveLeft()

  } else
    direction = 0
})

function draw(imageUrl, x, y, w, h, onload = () => { }) {

  const image = new Image()
  image.src = `${IMAGES_PATH}${imageUrl}`
  image.onload = function () {
    context.drawImage(image, x, y, w, h)
    onload()
  }
}
// game (Damian)
const player = {
  x: GAME_WIDTH / 2,
  y: GAME_HEIGHT - FLOOR_HEIGHT - PLAYER_HEIGHT
}

function drawPlayer() {
  draw('cashBakeMan.png', player.x, player.y, PLAYER_WIDTH, PLAYER_HEIGHT);
}

function moveRight() {
  if (player.x < GAME_WIDTH - PLAYER_WIDTH) {
    player.x = player.x + 10;
    console.log(player);
  } else {
    player.x = GAME_WIDTH - PLAYER_WIDTH
  }

}
function moveLeft() {
  if (player.x > 0) {
    player.x -= 10
    console.log(player)
  } else {
    player.x = 0
  }
}
function Player(positionX, step = 10, direction = 1) {
  this.x = positionX
  this.step = step // TODO: how fast this Player go by frame
  this.direction = direction // left move -1; rigth move 1
  this.draw("cashBakeMan.png", 0, 400, 400, 0)
}

Player.prototype = {

  move: function () {
    this.x += this.step * this.direction
    console.log("Player move: " + this.x)
  },
  jump: function () {
    // TODO: (optional) - when press spacebar or tap screen
  },
  restartPosition: function () { }
}

function GameArea(
  width,
  height,
  difficultyLevel = "easy" /* values: 'easy', 'hard' */
) {
  this.width = width
  this.height = height
  this.difficultyLevel = difficultyLevel //TODO: add difficulty choice in begin game
  this.generateCanvas()

}

GameArea.prototype = {
  drawMyImage: function (imageUrl, x, y, w, h, onload = () => { }) {
    this.x = x
    this.y = y
    this.w = w

    const image = new Image()
    image.src = `${IMAGES_PATH}${imageUrl}`
    image.onload = function () {
      context.drawImage(image, x, y, w, h)
      onload()
    }
  },
  drawFloor: function (context) {
    const floorImage = this.drawMyImage(
      "floor.png",
      0,
      GAME_HEIGHT - FLOOR_HEIGHT,
      FLOOR_WIDTH,
      FLOOR_HEIGHT
    )
  },
  drawBackground: function (context) {
    const backgroundImage = this.drawMyImage(
      "background-day.png",
      0,
      0,
      GAME_WIDTH,
      GAME_HEIGHT
    )
  },
  generateCanvas: function () {

    this.drawBackground(this.context)
    this.drawFloor(this.context)


  },
  gameLoop: function (time) {

    drawPlayer();
    requestAnimationFrame(this.gameLoop.bind(this))
  }
}

const game = new GameArea(600, 500, "easy")
game.gameLoop()





//TODO: add  loop function

// game-end(Damian)

// score (Asia)

// score-end
