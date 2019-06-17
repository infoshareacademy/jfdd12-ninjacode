const GAME_WIDTH = 288
const GAME_HEIGHT = 512
const FLOOR_HEIGHT = 112
const FLOOR_WIDTH = 336
const CASHMAN_HEIGHT = 100
const CASHMAN_WIDTH = 49
const IMAGES_PATH = "/game/img/"
const GRAVITY = 0.2
const COIN_WIDTH = 440
const COIN_HEIGHT = 40
// instruction (Lucyna)

// instruction-end

// game (Damian)
/* 
TODO: 
[x] requestAnimationFrame 
[x] rewrite image onload() to prototype GameArea
[x] draw background image
[x] draw floor image
[ ] draw Player on floor
[ ] draw Coin
[ ] add move player on dx direction
[ ] add animation player
[ ] add animation Coin (sprite)
[ ] multipy background image
[ ] multipy floor image
[ ] paralaxa move floor, background and falling money when player run

*/

function Coin(x, y) {
  this.initX = x
  this.initY = y
}

Coin.prototype = {
  draw: function (context) { },
  move: function () {
    this.x = this.x + this.vx
    this.y = this.y + this.vy
    this.vy = this.vy + GRAVITY
  },
  reset: function () {
    this.x = this.initX
    this.y = this.initY
  },
  bouncing: function () {
    // TODO: (option) add bouncing coin when touchead ground i.e. 3 times, then disappears
  }
}

function CashBakeManPlayer(x, move = 1, direction = 1) {
  this.initX = x
  this.step = move // TODO: how fast this Player go by frame
  this.direction = direction // left move -1; rigth move 1
}

CashBakeManPlayer.prototype = {
  draw: function (context, imageUrl, x, y, w, h, onload = () => { }) {
    this.x = x
    this.y = y
    this.w = w
    console.log(context)

    const image = new Image()
    image.src = `${IMAGES_PATH}${imageUrl}`
    image.onload = function () {
      context.drawImage(image, x, y, w, h)
      onload()
    }
  },
  move: function () {
    this.x += move
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
  drawMyImage: function (context, imageUrl, x, y, w, h, onload = () => { }) {
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
      context,
      "floor.png",
      0,
      GAME_HEIGHT - FLOOR_HEIGHT,
      FLOOR_WIDTH,
      FLOOR_HEIGHT
    )
  },
  drawBackground: function (context) {
    const backgroundImage = this.drawMyImage(
      context,
      "background-day.png",
      0,
      0,
      GAME_WIDTH,
      GAME_HEIGHT
    )

    // const image = new Image()
    // image.src = `${IMAGES_PATH}background-day.png`
    // image.onload = function() {
    //   context.drawImage(image, 0, 0)
  },
  clearCanvas: function () { },
  generateCanvas: function () {
    // TODO: end this
    const canvas = document.createElement("canvas")
    setCanvasSize(canvas)

    this.context = canvas.getContext("2d")
    const body = document.querySelector("#game")
    body.append(canvas)

    this.drawBackground(this.context)
    this.drawFloor(this.context)

    let player = new CashBakeManPlayer(10, 1, 1)
    player.draw(this.context, 'cashBakeMan.png', (GAME_WIDTH - CASHMAN_WIDTH) / 2, GAME_HEIGHT - FLOOR_HEIGHT - CASHMAN_HEIGHT, CASHMAN_WIDTH, CASHMAN_HEIGHT)
  },
  gameLoop: function (time) {
    /*  TODO: add game simulation metod
        [x] czy gra sie uruchamia
        [ ] dodaj playera
        [ ] dodaj ruch playera
        [ ]     dodaj animacje playera
         */


    requestAnimationFrame(this.gameLoop.bind(this))
  },
  gameOver: function () {
    //TODO: add gameOver metod
  },
  goToInstruction: function () {
    //
  },
  pauseGame: function () {
    // button in rigth top place, maybe out of canvas. Check it!
  }
}

const game = new GameArea(600, 500, "easy")
game.gameLoop()

function setCanvasSize(canvas) {
  canvas.setAttribute("height", `${GAME_HEIGHT}px`)
  canvas.setAttribute("width", `${GAME_WIDTH}px`)
}
//TODO: add  loop function

// game-end(Damian)

// score (Asia)

// score-end
