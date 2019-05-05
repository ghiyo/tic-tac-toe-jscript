
var originalBoard;
var playerOne = {"sign":"O", "color":"lightgreen"};
var playerTwo = {"sign":"X", "color":"wheat"};
var currentPlayer;

var winConditions = [
    [0,1,2],[3,4,5],[6,7,8],
    [0,3,6],[1,4,7],[2,5,8],
    [0,4,8],[2,4,6]
];

const cells = document.querySelectorAll(".cell");
const gameOverMsgBox = document.querySelector(".end-game");

startGame();

function startGame() {
    currentPlayer = playerOne;
    originalBoard = [];
    gameOverMsgBox.style.display = "none";
    for (var i = 0; i < cells.length; i++) originalBoard.push(i);
    for (var i = 0; i < cells.length; i++) {
        cells[i].innerText = '';
        cells[i].addEventListener('click', turnClick, false);
        cells[i].style.removeProperty('background-color');
        cells[i].style.pointerEvents = "auto";
    }
    
}

function turnClick(square) {
    square.target.innerText = currentPlayer.sign;
    square.target.style.backgroundColor = currentPlayer.color;
    originalBoard[square.target.id] = currentPlayer.sign;
    currentPlayer = turn(currentPlayer);
    square.target.removeEventListener('click', turnClick, false);
    let gameWon = checkWin(originalBoard);
    if (gameWon) gameOver(gameWon);
}

function turn(player) {
    if (player.sign === playerOne.sign) {
        return playerTwo;
    }
    return playerOne;
}

function checkWin(originalBoard) {
    let playerOneSquares = [];
    let playerTwoSquares = [];
    let gameWon = null;
    for (var i = 0; i < originalBoard.length; i++) {
        if (originalBoard[i] === playerOne.sign) playerOneSquares.push(i);
        else if (originalBoard[i] === playerTwo.sign) playerTwoSquares.push(i);
    }
    for (win in winConditions) {
        if (winConditions[win].every(cell => playerOneSquares.indexOf(cell) > -1)) {
            gameWon = playerOne;
            break;
        } else if (winConditions[win].every(cell => playerTwoSquares.indexOf(cell) > -1)) {
            gameWon = playerTwo;
            break;
        }
    }
    if ((playerOneSquares.length + playerTwoSquares.length) === originalBoard.length && gameWon === null) gameWon = "Tie";
    return gameWon;
}

function gameOver(winner) {
    let msg;
    gameOverMsgBox.style.display = "block";
    if (winner == playerOne) {
        msg = "The winner is player one!";
    } else if (winner == playerTwo) {
        msg = "The winner is player two!";
    } else {
        msg = "The game is a Tie!";
    }
    gameOverMsgBox.querySelector(".text").innerText = msg
    for (var i = 0; i < cells.length; i++) {
        cells[i].style.pointerEvents = "none";
    }
}