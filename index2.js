const container = document.querySelector("#playFieldContainer");

const squares = Array.from(container.children);
const restartBtn = document.querySelector("#restartBtn");
const playerTurnText = document.querySelector("#playerTurnText");




let size = 3;

let playFieldCols = size;
let playFieldRows = size;

let player1Turn = 1;
let player2Turn = 2;

let player1Name = "player1";
let player2Name = "player2";

let playerTurn = player1Turn;

let gameOver = false;

const player1Symbol = "o";
const player2Symbol = "x"
let playerSymbol = player1Symbol;

let countToWin = 3;


//-----
let playField = [];
let playFieldValues = [];

let winningColorIndecies = [];

let squareCountInRow =4
let containerWidth = squareCountInRow * 10 + squareCountInRow +1;
let containerHeight = squareCountInRow * 10 + 2;
let testSquares = [];
function generateGameField() {

    let cont =document.querySelector("#testContainer");
    for (let i = 0; i < squareCountInRow**2; i++) {
        ts =document.createElement("div");
        ts.classList.add("test-squares");
        testSquares.push(ts)
       
        cont.appendChild(testSquares[i]);
    }
   cont.style.width = containerWidth + "vh";
    
}

generateGameField();

function initGame(){
    initGameField();
    initGameControls();
    changePlayerTurnText();
}
function initGameField() {
    addIdToSquares();
    for (let i = 0; i < playFieldRows; i++) {
        playField[i] = [];
        playFieldValues[i] = [];
        for(let j = 0; j < playFieldCols; j++){
            playField[i][j] = squares[(i*playFieldRows)+j];
            playField[i][j].addEventListener("mousedown" ,()=> processGameStep(playField[i][j]))
            playFieldValues[i][j] = 0;
        }
    }
}

function addIdToSquares() {
    for (let i = 0; i < squares.length; i++) {
        squares[i].id = i;
    }
}

function initGameControls() {
    restartBtn.addEventListener("mousedown",()=>{
        restartGame();
    })
}

function inputPlayfieldValue(element) {
    let i = parseInt(element.id / size);
    let j = element.id % size;

    playFieldValues[i][j] = playerTurn;
}


//

function processGameStep(element){
    if(gameOver){
        return
    }
    if(element.hasChildNodes()) {
        return;
       }
    inputPlayfieldValue(element);
    addSymbolToParent(element);

    if(checkForWin(element)){
        insertWinningColors();
        gameOver = true;
       }
    swapPlayers()
       
}

function addSymbolToParent(parent){
    let player1Symbol = document.createElement("span");
    player1Symbol.classList.add("symbol");
    player1Symbol.innerHTML = playerSymbol;
    parent.appendChild(player1Symbol);

}

function swapPlayersTurn(){
    if(playerTurn == player1Turn ){
        playerTurn = player2Turn;
    }else if(playerTurn == player2Turn){
        playerTurn = player1Turn;
    } else{
        console.log("swapPlayersTurn() player turns not asigned correctly")
    }
}


function swapPlayerSymbol(){
    if(playerTurn == player1Turn){
        playerSymbol = player1Symbol;
    }else if(playerTurn == player2Turn){
        playerSymbol = player2Symbol;
    } else{
        console.log("swapPlayerSymbol() player turns not asigned correctly")
    }
}

function changePlayerTurnText(){
    if(playerTurn == player1Turn){
        playerTurnText.innerHTML = player1Name;
    }else if(playerTurn == player2Turn){
        playerTurnText.innerHTML = player2Name;
    } else{
        console.log("changePlayerTurnText() player turns not asigned correctly")
    }
}
 
function swapPlayers(){
    swapPlayersTurn();
    swapPlayerSymbol();
    changePlayerTurnText();
}

function checkForWin(element) {
    inRowEntryCount = 1;
   
    let row = parseInt(element.id / size);
    let col = element.id % size;

    let entry = playFieldValues[row][col];

    let winningIndecies = [[row,col]];
    
    //right
    let j = col+1;
    while(j < playFieldValues[row].length){
       
       if(playFieldValues[row][j] != 0 && playFieldValues[row][j] == entry){
            winningIndecies.push([row,j]);
         
            inRowEntryCount++;
            j++;
        if(inRowEntryCount == countToWin){
            console.log("right " + inRowEntryCount)
            winningColorIndecies = winningIndecies;
            return true;
        }
       } else{
        break;
       }
    }

    //left
    j = col -1;
    while(j >= 0){
        if(playFieldValues[row][j] != 0 && playFieldValues[row][j] == entry){
            winningIndecies.push([row,j]);
            inRowEntryCount++;
            j--;
            if(inRowEntryCount == countToWin){
                console.log("left " + inRowEntryCount)
                winningColorIndecies = winningIndecies;
                return true;
            }
           } else{
            break;
           }
    }

    
    inRowEntryCount =1;
    winningIndecies = [[row,col]];

    //up
    j = col;
    i = row-1;
    while(i >= 0){
       
       if(playFieldValues[i][col] != 0 && playFieldValues[i][col] == entry){
            winningIndecies.push([i,col])
            inRowEntryCount++;
            i--;
                if(inRowEntryCount == countToWin){
                    console.log("up " + inRowEntryCount)
                    winningColorIndecies = winningIndecies;
                    return true;
                }
       } else{
        break;
       }
    }

    //down
    i = row + 1;
    while(i < playFieldValues.length){
        if(playFieldValues[i][col] != 0 && playFieldValues[i][col] == entry){
            winningIndecies.push([i,col])
            inRowEntryCount++;
            i++;
                if(inRowEntryCount == countToWin){
                    console.log("down " + inRowEntryCount)
                    winningColorIndecies = winningIndecies;
                    return true;
                }
        } else{
         break;
        }
     }

     inRowEntryCount = 1;
     winningIndecies = [[row,col]];

     //up - right

     i = row - 1;
     j = col + 1;
     while(i >= 0  && j < playField[row].length){
   
         if(playFieldValues[i][j] != 0 && playFieldValues[i][j] == entry){
            winningIndecies.push([i,j])
            inRowEntryCount++;
            i--;
            j++;
            
                if(inRowEntryCount == countToWin){
                    console.log("up right " + inRowEntryCount)
                    winningColorIndecies = winningIndecies;
                    return true;
                }
         } else{
          break;
         }
      }

      //down - left

     i = row + 1;
     j = col - 1;
     while(i < playFieldValues.length && j >= 0){
   
         if(playFieldValues[i][j] != 0 && playFieldValues[i][j] == entry){
             winningIndecies.push([i,j])
             inRowEntryCount++;
             i++;
             j--;
             if(inRowEntryCount == countToWin){
                console.log("down left " + inRowEntryCount)
                winningColorIndecies = winningIndecies;
                 return true;
             }
         } else{
          break;
         }
      }

      //up left

      inRowEntryCount = 1;
      winningIndecies = [[row,col]];

     i = row - 1;
     j = col - 1;
     while(i >= 0  && j >= 0){
   
         if(playFieldValues[i][j] != 0 && playFieldValues[i][j] == entry){
            winningIndecies.push([i,j])
          inRowEntryCount++;
          i--;
          j--;
          
             if(inRowEntryCount == countToWin){
                console.log("up left " + inRowEntryCount)
                winningColorIndecies = winningIndecies;
                return true;
             }
         } else{
          break;
         }
      }

      //down right

     i = row + 1;
     j = col + 1;
     while(i < playFieldValues.length && j < playFieldValues[row].length){
   
         if(playFieldValues[i][j] != 0 && playFieldValues[i][j] == entry){
             winningIndecies.push([i,j])
             inRowEntryCount++;
             i++;
             j++;
             if(inRowEntryCount == countToWin){
                console.log("down right " + inRowEntryCount)
                winningColorIndecies = winningIndecies;
                 return true;
             }
         } else{
          break;
         }
      }
      
    winningColorIndecies = [];
return false;
}

function insertWinningColors(){
    console.log(winningColorIndecies.length)
    for(let i=0; i < winningColorIndecies.length; i++){
       playField[winningColorIndecies[i][0]][winningColorIndecies[i][1]].firstChild.style.color = "green";

    }

}

//

function clearGameField(){
   playField.forEach(function(row){
        row.forEach(function(col){
            if(col.hasChildNodes()){
                col.removeChild(col.firstChild);
            }
        })
   })


}

function clearPlayfieldValues(){
   for(let i = 0; i < playField.length; i++){
        for(let j = 0; j < playFieldValues[i].length;j++){
            playFieldValues[i][j] = 0;
        }
   }
}



function restartGame(){
    clearGameField();
    clearPlayfieldValues();
    gameOver = false;
    winningColorIndecies = [];
}

//



//onload

initGame();