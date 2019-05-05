
/* This variable will be used to figure out which 
   squares are used by which players to determine the winner. */
var originalBoard; 

/* Simple letters are used for player signs when they play
   and each color is to a distinguish background color of cells
   belonging to each respective player. */
var playerOne = {"sign":"O", "color":"lightgreen"};
var playerTwo = {"sign":"X", "color":"wheat"};

/* This variable is used to check which player's turn it is */  
var currentPlayer;

/* List of all combinations of cells that represent a win condition */
var winConditions = [
    [0,1,2],[3,4,5],[6,7,8],
    [0,3,6],[1,4,7],[2,5,8],
    [0,4,8],[2,4,6]
];

/* Grab all cells in the board */
const cells = document.querySelectorAll(".cell");

/* Grab the end game message box */
const gameOverMsgBox = document.querySelector(".end-game");

startGame();

/* Initialize all variables for the start of a game */
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

/* Each time a player clicks on a cell on their turn the following
   will happen:
   - set the cell sign to be player's sign
   - set the cell's background color to player's background color
   - keep track of the cell that was taken by the player by saving
     it in a list
   - turn off the clickability of the cell
   - check to see whether the game should be over */
function turnClick(square) {
    square.target.innerText = currentPlayer.sign;
    square.target.style.backgroundColor = currentPlayer.color;
    originalBoard[square.target.id] = currentPlayer.sign;
    currentPlayer = turn(currentPlayer);
    square.target.removeEventListener('click', turnClick, false);
    let gameWon = checkWin(originalBoard);
    if (gameWon) gameOver(gameWon);
}

/* This method will pass the turn to the other player from the 
 * current player. */
function turn(player) {
    if (player.sign === playerOne.sign) {
        return playerTwo;
    }
    return playerOne;
}

/* This method checks to see who has won by doing the following:
   - save all cells pressed by each player in their own lists
   - for each list check to see if the player has won by checking
     against the win conditions list
   - if a player has won return the winner if no player has won and
     all cells have been used up then the game is a tie.*/
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

/* This is the game over routine where end game message box
   becomes visible and the text within is set to whatever the
   outcome was from the checkWin function */
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