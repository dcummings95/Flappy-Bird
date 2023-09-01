//board
let board;
let boardWidth = 360;
let boardHeight = 640;
let context;

window.onload = function() {
    //getting element id from html canvas id
    board = document.getElementById('board');
    board.height = boardHeight;
    board.width = boardWidth;
    //used for drawing on the board
    context = board.getContext('2d'); 
}

