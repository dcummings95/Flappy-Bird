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

let bird = {
    x : birdX,
    y : birdY,
    width : birdWidth,
    height : birdHeight
}


window.onload = function() {
    //getting element id from html canvas id
    board = document.getElementById('board');
    board.height = boardHeight;
    board.width = boardWidth;
    //used for drawing on the board
    context = board.getContext('2d'); 
}

