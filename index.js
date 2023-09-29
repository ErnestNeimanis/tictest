import {
  horizontalCombinations,
  verticalCombinations,
  diagonalCombinationsLeft,
  diagonalCombinationsRight,
  createAllCombinations,
  rand,
  randArray,
  comboPossible,
  randomEntryInCombo,
  choseRandomCombo,
  comboValuesFromIndexes,
  arrayOccurances,
  isEmergingCombo,
  randomBlock,
  mostFrequent,
  mostFrequentMultiple,
  mostFrequentMultipleRandom,
  prioratizedBlocking,
  prioratizeNewComboWithRandom,
} from "./gameAI.js";

import { LessBlue } from "./less-blue/less-blue.js";

const gameSize = document.querySelector("#gameSize");

const container = document.querySelector("#playFieldContainer");

const restartBtn = document.querySelector("#restartBtn");
const playerTurnText = document.querySelector("#playerTurnText");

//input field size and combi lenth
let size = 15;
let countToWin = 7;
//

//two platyers or against computer
let playingAgainstComputer = true;

let player1Turn = 1;
let player2Turn = 2;

let computersTurnId = player2Turn;
let humanPlayersTurn = player1Turn;

//player names
let player1Name = "player1";
let player2Name = "computer";

let playerTurn = player1Turn;

let gameOver = false;

const player1Symbol = "o";
const player1Color = " rgb(4, 59, 107)";
const player2Symbol = "x";
const player2Color = "rgba(146, 114, 16, 0.596)";
let playerSymbol = player1Symbol;
let playerColor = player1Color;

let computerPlayed = false;
//-----
let playField = [];
let playFieldValues;

let winningColorIndecies = [];

//-----------

//let containerWidth = size * 5 + size +0.5;
//squareSize = containerWidth / size;
let squareBorder = 1;
let squareSize =
  parseFloat(window.getComputedStyle(container).width) / size -
  squareBorder * 2;

let squares = [];

const lessBlue = new LessBlue(size,countToWin);
playFieldValues = lessBlue.getPlayFieldCopy();



function generateGameField() {
  window.addEventListener("resize", () => {
    resize();
  });

  let cont = document.querySelector("#playFieldContainer");
  for (let i = 0; i < size ** 2; i++) {
    let ts = document.createElement("div");
    ts.classList.add("square");
    ts.style.height = squareSize + "px";
    ts.style.width = squareSize + "px";
    squares.push(ts);

    cont.appendChild(squares[i]);
  }
}

function initGame() {
  initGameField();
  initGameControls();
  changePlayerTurnText();
}

function initGameField() {
  addIdToSquares();

  for (let i = 0; i < size; i++) {
    playField[i] = [];
    playFieldValues[i] = [];
    for (let j = 0; j < size; j++) {
      playField[i][j] = squares[i * size + j];
      playField[i][j].addEventListener("mousedown", () =>{
          processGameStepWithLessBlue(playField[i][j])
      }
      );
    }
  }
}


function addIdToSquares() {
  for (let i = 0; i < squares.length; i++) {
    squares[i].id = i;
  }
}

function initGameControls() {
  restartBtn.addEventListener("mousedown", () => {
    restartGame();
  });
}

function inputPlayfieldValue(element) {
  let i = parseInt(element.id / size);
  let j = element.id % size;

  playFieldValues[i][j] = playerTurn;
}

//
function resize() {
  squareSize =
    parseFloat(window.getComputedStyle(container).width) / size -
    squareBorder * 2;

  for (let i = 0; i < playField.length; i++) {
    for (let j = 0; j < playField[i].length; j++) {
      playField[i][j].style.width = squareSize + "px";
      playField[i][j].style.height = squareSize + "px";
    }
  }
}


function processGameStepWithLessBlue(element) {
  if (gameOver) {
    return;
  }
  if (element.hasChildNodes()) {
    return;
  }


  const {row,col} = getCell(element)


  inputPlayfieldValue(element);
  addSymbolToParent(element);
  swapPlayers()

  const response = lessBlue.nextMove(row,col);
  
  console.log("response",response)
  if(response.winner){
    const {combo,id} = response.winner;
    insertWinningColors(combo);
    gameOver = true;
    return;
  }
  
  const newElement = playField[response.row][response.col];
  inputPlayfieldValue(newElement);
  addSymbolToParent(newElement);
  swapPlayers();

}

// function processGameStep(element) {
//   console.log(element)
//   if (gameOver) {
//     return;
//   }
//   if (element.hasChildNodes()) {
//     return;
//   }


 
//   inputPlayfieldValue(element);
//   addSymbolToParent(element);

//   const cell = getCell(element)
//   const response = gameAlg.nextMove(cell.row,cell.col);
//   const win = gameAlg.checkForWin(getCell(element),playFieldValues);
 
//   if (win) {
  
//     insertWinningColors(win.combo);
//     gameOver = true;
//   }

//   swapPlayers();

//   if (playingAgainstComputer && playerTurn === player2Turn) {
//     setTimeout(() => {
//       playTurn_AI(response.cell);
//     }, 200);
//   }
// }

function addSymbolToParent(parent) {
  let symbol = document.createElement("span");
  symbol.classList.add("symbol");
  symbol.innerHTML = playerSymbol;

  symbol.style.color = playerColor;
  parent.appendChild(symbol);
}

//gameAlg.nextMove() here
function writeToPlayField(i, j) {
  if (i === undefined || j === undefined) {
    console.log("writeToPlayField() has incorrect params");
    return;
  }

  gameAlg.nextMove(i, j);

  addSymbolToParent(playField[i][j]);
  inputPlayfieldValue(playField[i][j]);
}

function swapColors() {
  if (playerTurn == player1Turn) {
    playerColor = player1Color;
  } else if (playerTurn == player2Turn) {
    playerColor = player2Color;
  } else {
    console.log("swapColors() player turns not asigned correctly");
  }
}

function swapPlayersTurn() {
  if (playerTurn == player1Turn) {
    playerTurn = player2Turn;
  } else if (playerTurn == player2Turn) {
    playerTurn = player1Turn;
  } else {
    console.log("swapPlayersTurn() player turns not asigned correctly");
  }
}

function swapPlayerSymbol() {
  if (playerTurn == player1Turn) {
    playerSymbol = player1Symbol;
  } else if (playerTurn == player2Turn) {
    playerSymbol = player2Symbol;
  } else {
    console.log("swapPlayerSymbol() player turns not asigned correctly");
  }
}

function changePlayerTurnText() {
  if (playerTurn == player1Turn) {
    playerTurnText.innerHTML = player1Name;
  } else if (playerTurn == player2Turn) {
    playerTurnText.innerHTML = player2Name;
  } else {
    console.log("changePlayerTurnText() player turns not asigned correctly");
  }
}

function swapPlayers() {
  swapPlayersTurn();
  swapColors();
  swapPlayerSymbol();
  changePlayerTurnText();
}

function swapToPlayerOne() {
  while (playerTurn != player1Turn) {
    swapPlayers();
  }
}

function getCell(element) {
  let row = parseInt(element.id / size);
  let col = parseInt(element.id % size);
  const cell = {
    row,
    col,
  };
  return cell;
}

function checkForWin(cell) {
  let inRowEntryCount = 1;

  let row = cell.row;
  let col = cell.col;



  let entry = playFieldValues[row][col];
  let winningIndecies = [[row, col]];

  let j = col + 1;
  while (j < playFieldValues[row].length) {
    if (playFieldValues[row][j] != 0 && playFieldValues[row][j] == entry) {
      winningIndecies.push([row, j]);

      inRowEntryCount++;
      j++;
      if (inRowEntryCount == countToWin) {
        winningColorIndecies = winningIndecies;
        return true;
      }
    } else {
      break;
    }
  }

  //searches for matching to the left
  j = col - 1;
  while (j >= 0) {
    if (playFieldValues[row][j] != 0 && playFieldValues[row][j] == entry) {
      winningIndecies.push([row, j]);
      inRowEntryCount++;
      j--;
      if (inRowEntryCount == countToWin) {
        winningColorIndecies = winningIndecies;
        return true;
      }
    } else {
      break;
    }
  }

  //if the correct amount of matching entries not horizontally,
  // starts over from the clicked field and searches vertically

  inRowEntryCount = 1;
  winningIndecies = [[row, col]];

  //upward search
  j = col;
  let i = row - 1;
  while (i >= 0) {
    if (playFieldValues[i][col] != 0 && playFieldValues[i][col] == entry) {
      winningIndecies.push([i, col]);
      inRowEntryCount++;
      i--;
      if (inRowEntryCount == countToWin) {
        winningColorIndecies = winningIndecies;
        return true;
      }
    } else {
      break;
    }
  }

  //downward search
  i = row + 1;
  while (i < playFieldValues.length) {
    if (playFieldValues[i][col] != 0 && playFieldValues[i][col] == entry) {
      winningIndecies.push([i, col]);
      inRowEntryCount++;
      i++;
      if (inRowEntryCount == countToWin) {
        winningColorIndecies = winningIndecies;
        return true;
      }
    } else {
      break;
    }
  }

  inRowEntryCount = 1;
  winningIndecies = [[row, col]];

  //if the correct amount of matching entries not found vertically
  //starts searching diagonally

  //up - right

  i = row - 1;
  j = col + 1;
  while (i >= 0 && j < playField[row].length) {
    if (playFieldValues[i][j] != 0 && playFieldValues[i][j] == entry) {
      winningIndecies.push([i, j]);
      inRowEntryCount++;
      i--;
      j++;

      if (inRowEntryCount == countToWin) {
        winningColorIndecies = winningIndecies;
        return true;
      }
    } else {
      break;
    }
  }

  //down - left

  i = row + 1;
  j = col - 1;
  while (i < playFieldValues.length && j >= 0) {
    if (playFieldValues[i][j] != 0 && playFieldValues[i][j] == entry) {
      winningIndecies.push([i, j]);
      inRowEntryCount++;
      i++;
      j--;
      if (inRowEntryCount == countToWin) {
        winningColorIndecies = winningIndecies;
        return true;
      }
    } else {
      break;
    }
  }

  //diagonally other direction
  //up left

  inRowEntryCount = 1;
  winningIndecies = [[row, col]];

  i = row - 1;
  j = col - 1;
  while (i >= 0 && j >= 0) {
    if (playFieldValues[i][j] != 0 && playFieldValues[i][j] == entry) {
      winningIndecies.push([i, j]);
      inRowEntryCount++;
      i--;
      j--;

      if (inRowEntryCount == countToWin) {
        winningColorIndecies = winningIndecies;
        return true;
      }
    } else {
      break;
    }
  }

  //down right

  i = row + 1;
  j = col + 1;
  while (i < playFieldValues.length && j < playFieldValues[row].length) {
    if (playFieldValues[i][j] != 0 && playFieldValues[i][j] == entry) {
      winningIndecies.push([i, j]);
      inRowEntryCount++;
      i++;
      j++;
      if (inRowEntryCount == countToWin) {
        winningColorIndecies = winningIndecies;
        return true;
      }
    } else {
      break;
    }
  }

  winningColorIndecies = [];
  return false;
}

// function insertWinningColors() {

//   for (let i = 0; i < winningColorIndecies.length; i++) {
//     playField[winningColorIndecies[i][0]][
//       winningColorIndecies[i][1]
//     ].firstChild.style.color = "green";
//   }
// }

function insertWinningColors(winningCombo) {
  console.log("winning",winningCombo)
  console.log(playField[0][0])
  winningCombo.forEach((cell) => {
    playField[cell.row][cell.col].firstChild.style.color = "green";
  })
}

//

function clearGameField() {
  playField.forEach(function (row) {
    row.forEach(function (col) {
      if (col.hasChildNodes()) {
        col.removeChild(col.firstChild);
      }
    });
  });
}
function clearPlayfieldValues() {
  for (let i = 0; i < playField.length; i++) {
    for (let j = 0; j < playFieldValues[i].length; j++) {
      playFieldValues[i][j] = 0;
    }
  }
}

function restartGame() {
  clearGameField();
  clearPlayfieldValues();
  swapToPlayerOne();
  gameOver = false;
  winningColorIndecies = [];
}

//

//onload

generateGameField();
initGame();







//var allCombinations = [...gameAlg.getAllCombos()];
// var activeCombination = [
//   ...prioratizeNewComboWithRandom(
//     playFieldValues,
//     allCombinations,
//     countToWin,
//     computersTurnId
//   ),
// ];

//let combo = activeCombination;

const threshold = Math.floor(countToWin / 2);

function playTurn_AI(cell) {



function processGameStep_AI(indecies) {
  let row = indecies.row;
  let col = indecies.col;

  processGameStep(playField[row][col]);
}
}
//testDisp(100)
function testDisp(ms) {
  let i = 0;
  let j = 0;

  let k = 0;

  setInterval(() => {
    if (k > 0) {
      clearGameField();
    }
    if (i < allCombinations.length) {
      for (let j = 0; j < allCombinations[i].length; j++) {
        writeToPlayField(allCombinations[i][j].row, allCombinations[i][j].col);
      }
      i++;
    }
    k++;
  }, ms);
}

function testDisp1(ms, combos) {
  let i = 0;
  let j = 0;

  let k = 0;

  setInterval(() => {
    if (k > 0) {
      clearGameField();
    }
    if (i < combos.length) {
      for (let j = 0; j < combos[i].length; j++) {
        writeToPlayField(combos[i][j].row, combos[i][j].col);
      }
      i++;
    }
    k++;
  }, ms);
}


function stringlog(obj,msg){
  if(msg){
    console.log(msg,JSON.parse(JSON.stringify(obj)))
    return;
  }
  console.log(JSON.parse(JSON.stringify(obj)))
}

//welcome screen

// const userData = {
//     payer1: "payer1",
//     player2: "player2",
//     fieldSize: 3,
//     countToWin: 3,
// }

// const startGameButton =  document.querySelector('#startGameBtn');
// const inputForm = document.querySelector('#inputForm');
// inputForm.addEventListener('submit',(e)=>{e.preventDefault()})
// startGameButton.addEventListener('click', (e) =>{
//   console.log(document.querySelector('#player1Input').value)
// })
