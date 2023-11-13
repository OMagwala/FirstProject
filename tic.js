const blocks = document.querySelectorAll(".cellBlock");
const playerX = "X";
const playerO = "O";

//Player turn
let playerTurn = playerX;

//Game board state
const boardState = Array(blocks.length);
boardState.fill(null);

//Game elements 
const strike = document.getElementById("strike");
const winnerText = document.getElementById("winner");
const restart = document.getElementById("reset");
const announce = document.getElementById("announcer");
restart.addEventListener("click", restartGame);

blocks.forEach((cellBlock) => cellBlock.addEventListener("click", clickBlock));

//Hovering over blocks
function blocksHover() {
    //removing existing hover classes 
    blocks.forEach((cellBlock) => {
        cellBlock.classList.remove("hoverO");
        cellBlock.classList.remove("hoverX");
    });

    const hoverOnBlock = `hover${playerTurn}`;
    blocks.forEach((cellBlock) => {
        if (cellBlock.innerText == "") {
            cellBlock.classList.add(hoverOnBlock);
        }
    });
}

function clickBlock(e) {
    if (announce.classList.contains("visible")) {
        return;
    }
    
    const clickedBlock = e.target;
    const blockIndex = clickedBlock.dataset.index;
    if (clickedBlock.innerText != "") {
        return;
    }

    if (playerTurn === playerX) {
        clickedBlock.innerText = playerX;
        boardState[blockIndex - 1] = playerX;
        playerTurn = playerO;
    } else {
        clickedBlock.innerText = playerO;
        boardState[blockIndex - 1] = playerO;
        playerTurn = playerX;
    }

    blocksHover();
    whoWon();
}

function restartGame() {
    strike.className = "strike";
    announce.className = "hide";
    boardState.fill(null);
    blocks.forEach((cellBlock) => (cellBlock.innerText = ""));
    playerTurn = playerX;
    blocksHover();
}

function whoWon() {
    for (const winningCombo of winningCombos) {
        const { combination, strikeClass } = winningCombo;
        const blockValue = boardState[combination[0] - 1];
        const blockValue1 = boardState[combination[1] - 1];
        const blockValue2 = boardState[combination[2] - 1];

        if (blockValue != null && blockValue === blockValue1 && blockValue === blockValue2) {
            strike.classList.add(strikeClass);
            winnerIs(blockValue);
            return;
        }
    }
    //announcing a tie if all blocks are filled
    const blocksFilled = boardState.every((cellBlock) => cellBlock != null);
    if (blocksFilled) {
        winnerIs(null);
    }
}

//Announcing the winner
function winnerIs(winner) {
    let result = "Tie";
    if (winner != null) {
        result = `Player ${winner} Won!!!`;
    }
    announce.className = "visible";
    winnerText.innerText = result; 
    return;
}

const winningCombos = [
    //Row combinations
    { combination: [1, 2, 3], strikeClass: "strikeRow1" },
    { combination: [4, 5, 6], srikeClass: "strikeRow2" },
    { combination: [7, 8, 9], strikeClass: "strikeRow3" },
    //Column combinations
    { combination: [1, 4, 7], strikeClass: "strikeCol1" },
    { combination: [2, 5, 8], strikeClass: "strikeCol2" },
    { combination: [3, 6, 9], strikeClass: "strikeCol3" },
    //Diagonal combinations
    { combination: [1, 5, 9], strikeClass: "strikeDiag1" },
    { combination: [3, 5, 7], strikeClass: "strikeDiag2" },
];