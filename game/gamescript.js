const GAME_WIDTH = 288
const GAME_HEIGHT = 512
const BASE_HEIGHT = 112
const BASE_WIDTH = 336
const CASHMAN_HEIGHT = 100
const CASHMAN_WIDTH = 49
const IMAGES_PATH = '/game/img/'
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

*/

function Coin (x,y) {
    this.initX = x
    this.initY = y
    // this.reset()
}

Coin.prototype = {
    draw: function(context){

    },
    move: function(){
        this.x = this.x + this.vx
        this.y = this.y + this.vy
        this.vy = this.vy + GRAVITY
    },
    reset: function(){
        this.x = this.initX
        this.y = this.initY


    },
    bouncing: function() { 
        // TODO: (option) add bouncing coin when touchead ground i.e. 3 times, then disappears

    }

}

/* TODO:  
    1. [ ] draw player on the floor
    2. [ ] move player
    */

function CashBakeManPlayer (x, move = 1, direction = 1) {
    this.initX = x
    this.step = move // TODO: how fast this Player go by frame
    this.direction = direction // left move -1; rigth move 1
}

CashBakeManPlayer.prototype = {
/* TODO:  
    1. draw player on the floor
    2. move player
    */
    draw: function(context) {

    },
    move: function() {
        this.x += move 
    },
    jump: function() {
        // TODO: (optional) - when press spacebar or tap screen 
    },
    restartPosition: function() {

    }

}
let backgroundImage

function GameArea (width, height, difficultyLevel = 'easy' /* values: 'easy', 'hard' */) {
    this.width = width
    this.height = height
    this.difficultyLevel = difficultyLevel //TODO: add difficulty choice in begin game
    this.createCanvas()

}
function drawImage (imageUrl, x, y, w, h) {
        const image = new Image()
        image.src = `${IMAGES_PATH}${imageUrl}`
        image.onload = function () {
            this.context.drawImage(image, x = 0, y = 0, w = 0, h = 0)
            // onload()
            return image
        }
    
}

GameArea.prototype = {
    drawMyImage: function (context,imageUrl, x, y, w, h, onload = () => {}) {
        this.x = x
        this.y = y
        this.w = w
        // this.dh = dh

        const image = new Image()
        image.src = `${IMAGES_PATH}${imageUrl}`
        image.onload = function () {
            // console.log(context)
            // context.drawImage(image, x = 0, y = 0) // it works
            context.drawImage(image, x, y, w, h)
            onload()
            // return image
        }
        // console.log(context)
            
        // console.log("drawImage fn" + image)
    },
    drawFloor: function(context) {
        floorImage = this.drawMyImage(context, "base.png", 0, GAME_HEIGHT-BASE_HEIGHT,BASE_WIDTH, BASE_HEIGHT)
    },
    drawBackground: function(context) {
        // backgroundImage = this.drawMyImage("background-day.png", 0, 0, GAME_WIDTH, GAME_HEIGHT)
        // console.log("I'm in drawBackground and this is my context" + context)
        const image = new Image()
        image.src = `${IMAGES_PATH}background-day.png`
        image.onload = function () {
            // console.log(image + "-- image")
            // console.log("this is context" + context)
            context.drawImage(image, 0, 0)
            // onload()
        }
        // return image

        // this.context.drawImage(image, 0, 0, 0, 0)

    },
    clearCanvas: function(){

    },
    createCanvas: function() {
        // TODO: end this
        const canvas = document.createElement('canvas')
        canvas.setAttribute('height', `${GAME_HEIGHT}px`)
        canvas.setAttribute('width', `${GAME_WIDTH}px`)

        this.context = canvas.getContext('2d')
        const body = document.querySelector('#game')
        body.append(canvas)
        
        this.drawBackground(this.context)
        this.drawFloor(this.context)
        
    },
    gameLoop: function(time) { 
        /*  TODO: add game simulation metod
        [x] czy gra sie uruchamia
        [ ] dodaj playera
        [ ] dodaj ruch playera
        [ ]     dodaj animacje playera
        [ ] 
         */
        // this.createCanvas()
        requestAnimationFrame(this.gameLoop.bind(this))
    },
    gameOver: function() { 
        //TODO: add gameOver metod

    },
    goToInstruction: function(){
        // 
    },
    pauseGame: function() {
        // button in rigth top place, maybe out of canvas. Check it!
    }
}

const game = new GameArea(600,500, 'easy')
game.gameLoop()
//TODO: add  loop function

//TODO: idea: paralaxa move base, background and falling money when player run





// game-end(Damian)



// score (Asia)




// score-end
