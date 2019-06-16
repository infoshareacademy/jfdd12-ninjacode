const GAME_WIDTH = 288
const GAME_HEIGHT = 512
const BASE_HEIGHT = 112
const BASE_WIDTH = 336
const CASHMAN_HEIGHT = 100
const CASHMAN_WIDTH = 49
const IMAGES_PATH = '/game/img/'
// instruction (Lucyna)




// instruction-end


// game (Damian)
/* 
TODO: 
    1. Ludzik chodzacy po ziemi
    2. Wgranie obrazków -- onload() kopia z flappy bird
    3. 
    
*/

const canvas = document.createElement('canvas')
canvas.setAttribute('height', `${GAME_HEIGHT}px`)
canvas.setAttribute('width', `${GAME_WIDTH}px`)

const body = document.querySelector('#game')
body.append(canvas)

const context = canvas.getContext('2d')

// FIXME: Images : find another solution onload multiImages. Think about slow internet connections

let backgroundImage
let baseImage
let cashManPlayer

backgroundImage = drawImage("background-day.png", 0, 0, GAME_WIDTH, GAME_HEIGHT, () => {
    baseImage = drawImage("base.png", 0, GAME_HEIGHT-BASE_HEIGHT, BASE_WIDTH, BASE_HEIGHT, () => {})
    cashManPlayer = drawImage("cashBakeMan.png", (GAME_WIDTH-CASHMAN_WIDTH)/2, GAME_HEIGHT-BASE_HEIGHT-CASHMAN_HEIGHT, CASHMAN_WIDTH, CASHMAN_HEIGHT)

})

function drawImage(imageUrl, x, y, w, h, onload = () => {}) {
    const image = new Image()
    image.src = `${IMAGES_PATH}${imageUrl}`
    image.onload = function () {
        context.drawImage(image, x, y, w, h)
        onload()
        return image
    }
}






// game-end(Damian)



// score (Asia)




// score-end
