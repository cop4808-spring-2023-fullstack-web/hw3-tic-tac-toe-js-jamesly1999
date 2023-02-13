const statusDisplay = document.querySelector('.status');

let gameActive = true;
let currentPlayer = "X";
let gameState = ["", "", "", "", "", "", "", "", ""];

const winningMessage = () => `Player ${currentPlayer} has won!`;
const drawMessage = () => `Game ended in a draw!`;
const currentPlayerTurn = () => `It's ${currentPlayer}'s turn`;

statusDisplay.innerHTML = currentPlayerTurn();

const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

function handleCellPlayed(clickedCell, clickedCellIndex) {
    handleResultValidation();
    gameState[clickedCellIndex] = currentPlayer;
    clickedCell.innerHTML = currentPlayer;
}

function handlePlayerChange() {
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    statusDisplay.innerHTML = currentPlayerTurn();
}

function checkWin(){

       var one;
       var two;
       var three;
      let roundWon = false;
    for (let i = 0; i <= 7; i++) {
        const winCondition = winningConditions[i];
        let a = gameState[winCondition[0]];
        let b = gameState[winCondition[1]];
        let c = gameState[winCondition[2]];
        if (a === '' || b === '' || c === '') {
            continue;
        }
        if (a === b && b === c) {          
            one = a;
            two = b;
            three = c;
            roundWon = true;          
            break;
        }
    }

    if (roundWon) {
        statusDisplay.innerHTML = `<span class="text-success">${winningMessage()}</span>`;
        document.getElementById(`${one}`).style.backgroundColor = "blue";
        document.getElementById(`${two}`).style.backgroundColor = "blue";
        document.getElementById(`${three}`).style.backgroundColor = "blue";
        gameActive = false;
        statusDisplay.style.color = "rgb(251,100,204)";
        return roundWon;
    }
  
    

    let roundDraw = !gameState.includes("");
    if (roundDraw) {
        statusDisplay.innerHTML =  `<span class="text-warning">${drawMessage()}</span>`;
        gameActive = false;
        statusDisplay.style.color = "rgb(251,100,204)";
        return roundDraw;
    }

return false;
}

function handleResultValidation() {
    checkWin();
    if(gameActive){
        handlePlayerChange();
        handleComputerMove();
    }
}

function handleComputerMove(){
    pickComputerMove();
    if(!checkWin())    {
        handlePlayerChange();
    }
        
    
}

function pickComputerMove(){
    while(true){
        //loop through gameState and randomly find an available spot
       var m = Math.floor(Math.random()*8)
        if(gameState[m]=='')//looking for empty spot
            break;
    }
     //m will have the computer move
    gameState[m]=currentPlayer;
    document.getElementById(m).innerHTML = currentPlayer;
    //getAttributeNode(m).value=currentPlayer

   
}

//function handleComputerMove()
  

function handleCellClick(clickedCellEvent) {
    const clickedCell = clickedCellEvent.target;
    const clickedCellIndex = parseInt(clickedCell.getAttribute('data-cell-index'));

    //Check to se  id current cell is an available cell and game is active
    if (gameState[clickedCellIndex] !=="" || !gameActive) {
        return;
    }

    //This handles the updating of the board of who played
    handleCellPlayed(clickedCell, clickedCellIndex);
    handleResultValidation();
}

function handleRestartGame() {
    gameActive = true;
    currentPlayer = "X";
    gameState = ["", "", "", "", "", "", "", "", ""];
    statusDisplay.style.color = "rgb(65, 65, 65)";
    statusDisplay.innerHTML = currentPlayerTurn();
    document.querySelectorAll('.cell').forEach(cell => cell.innerHTML = "");
}

document.querySelectorAll('.cell').forEach(cell => cell.addEventListener('click', handleCellClick));
document.querySelector('.restart').addEventListener('click', handleRestartGame);