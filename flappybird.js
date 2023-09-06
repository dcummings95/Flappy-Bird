//board
let board;

//Pixels set to size of background image
let boardWidth = 360;
let boardHeight = 640;
let context;

//bird
//birds width/height ratio 408/228 = 17/12 
let birdWidth = 34; 
let birdHeight = 24;
//starting position for bird 
let birdX = boardWidth/8;
let birdY = boardHeight/2;
let birdImg;

let bird = {
    x : birdX,
    y : birdY,
    width : birdWidth,
    height : birdHeight
}

//pipes
//Store all the pipes in the game
let pipeArray = [];
let pipeWidth = 64; //width/height ratio = 384/3072 = 1/8
let pipeHeight = 512;
//Start pipe in top right corner
let pipeX = boardWidth;
let pipeY = 0;

let topPipeImg;
let bottomPipeImg;

//physics
let velocityX = -2; //Pipes moving left speed
let velocityY = 0; //Bird jump speed
let gravity = 0.4; //Create gravity to keep bird from flying forever upwards

window.onload = function() {
    //getting element id from html canvas id
    board = document.getElementById('board');
    board.height = boardHeight;
    board.width = boardWidth;
    //used for drawing on the board
    context = board.getContext('2d'); 
 
    /*  draw flappy bird hit box
        context.fillStyle = 'green';
        context.fillRect(bird.x, bird.y, bird.width, bird.height);
    */

    //load images
    birdImg = new Image();
    birdImg.src = "./flappybird.png";
    birdImg.onload = function() {
        context.drawImage(birdImg, bird.x, bird.y, bird.width, bird.height);
    }

    topPipeImg = new Image();
    topPipeImg.src = "./toppipe.png";
    bottomPipeImg = new Image();
    bottomPipeImg.src = "./bottompipe.png";

    requestAnimationFrame(update);
    //Place the pipes every 1.5 seconds (1500 milliseconds)
    setInterval(placePipes, 1500);
    //every time you tap on a key its going to call moveBird function
    document.addEventListener("keydown", moveBird);
}

function update() {
    requestAnimationFrame(update);
    //Clear frame after each frame
    context.clearRect(0, 0, board.width, board.height);

    //bird
    bird.y += velocityY;
    context.drawImage(birdImg, bird.x, bird.y, bird.width, bird.height);

    //pipes
    for (let i = 0; i < pipeArray.length; i++) {
        let pipe = pipeArray[i];
        //update pipe x position before its drawn every time
        pipe.x += velocityX; //shifting x position from each pipe 2 px to the let
        context.drawImage(pipe.img, pipe.x, pipe.y, pipe.width, pipe.height);
    }
}


function placePipes() {
    /*
    (0-1) * pipeHeight/2
    0 -> -128 (pipeHeight/4)
    1 -> -128 - 256 (pipeHeight/4 - pipeHeight/2) = -3/4 pipeHeight
    */
    let randomPipeY = pipeY - pipeHeight/4 - Math.random()*(pipeHeight/2);
    //Make opening space enough room for bird to travel through
    let openingSpace = board.height/4;

    let topPipe = {
        img: topPipeImg,
        x : pipeX,
        y : randomPipeY,
        width : pipeWidth,
        height : pipeHeight,
        //Check if flappy passed pipe
        passed : false
    }
    //Place first pipe in the array
    //Will add a new pipe to the array every 1.5 seconds due to line 64
    pipeArray.push(topPipe);

    let bottomPipe = {
        img : bottomPipeImg,
        x : pipeX,
        //Make y the distance from the top to the bottom of opening space to get top of the bottom pipe
        y : randomPipeY + pipeHeight + openingSpace,
        width : pipeWidth,
        height : pipeHeight,
        passed : false
    }
    pipeArray.push(bottomPipe);

}
//param e is the key event
function moveBird(e){
    if (e.code == "Space" || e.code == "ArrowUp" || e.code == "KeyX") {
        //jump
        velocityY = -6;
    }
}