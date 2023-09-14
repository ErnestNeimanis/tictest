import { Utils } from "./utils.js";
import { Cell } from "./cell.js";
export class ComboUtils extends Utils {
  constructor(gameData) {
    super();
    this.gameData = gameData;
  }

  cellAvailable(playField, cell) {
    return playField[cell.row][cell.col] === 0;
  }

  comboPossible(combo, turnId) {
    let combinationLength = combo.length;
    const playField = this.gameData.playField;
    for (let i = 0; i < combinationLength; i++) {
      let row = combo[i].row;
      let col = combo[i].col;
      let pfVal = playField[row][col];

      if (pfVal != 0 && pfVal != turnId) {
        return false;
      }
    }
    return true;
  }

  comboValuesFromIndexes(combo, playField = this.gameData.getPlayField()) {
    // console.log("combofromin combo",combo)
    // console.log("playfield in cvfi",playField)
    let values = combo.map((element) => playField[element.row][element.col]);
    return values;
  }

  getAllEmergingCombos = (playField, allCombos, turnId, threshold) => {
    return allCombos.filter((combo) =>
      isEmergingCombo(playField, combo, turnId, threshold)
    );
  };

  getAllCombos() {
    return this.gameData.allCombinations;
  }

  checkForWinDumb(playField = this.gameData.getPlayField()) {
   // const { allCombos, playField, emptyCellValue } = this.gameData.get();
    const {allCombos,emptyCellValue} = this.gameData.get();
  
    let result = {};
    for (let i = 0; i < allCombos.length; i++) {
      const comboValues = this.comboValuesFromIndexes(allCombos[i],playField);
      const allEqual = comboValues.every(
        (val) => val != emptyCellValue && val === comboValues[0]
      );
      if (allEqual) {
        result = {
          combo: allCombos[i],
          id: comboValues[0],
        };
        return result;
      }
    }
    return result;
  }

  


  checkForWinSmart(cell, playField = this.gameData.getPlayField()) {
    if (!playField) throw new Error("no playfield");
    //console.log("playfield in checkforwin lesslblue",playField)

    let inRowEntryCount = 1;
    const { row, col } = cell;
    let winnderId = playField[row][col];
    let winningCells = [];
    const countToWin = this.gameData.getComboLength();
    const { emptyCellValue } = this.gameData.get();
    // console.log("countToWin",countToWin)

    let result = {
      combo:winningCells,
      id:winnderId
    }
    
    winningCells.push(cell)
    //to right
    let j = col + 1;
    while (j < playField[row].length) {
      if (
        playField[row][j] != emptyCellValue &&
        playField[row][j] == winnderId
      ) {
        winningCells.push(new Cell(row, j));

        inRowEntryCount++;
        j++;
        if (inRowEntryCount == countToWin) {
           //console.log("result",result)
          return {
            combo:winningCells,
            id:winnderId
          };
        } 
      } else {
        break;
      }
    }

    //searches for matching to the left
    j = col - 1;
    while (j >= 0) {
      if (playField[row][j] != 0 && playField[row][j] == winnderId) {
        winningCells.push(new Cell(row, j));
        inRowEntryCount++;
        j--;
        if (inRowEntryCount == countToWin) {
           console.log("result",result)
          return {
            combo:winningCells,
            id:winnderId
          };
        }
      } else {
        break;
      }
    }
    if (winnderId === 2) {
      console.log("horizontal",  inRowEntryCount);
    }

    //if the correct amount of matching entries not horizontally,
    // starts over from the clicked field and searches vertically

    inRowEntryCount = 1;
    winningCells = [];
  winningCells.push(cell)
    //upward search
    j = col;
    let i = row - 1;
    while (i >= 0) {
      if (playField[i][col] != 0 && playField[i][col] == winnderId) {
     
        winningCells.push(new Cell(i, col));

        inRowEntryCount++;
        i--;
      
        if (inRowEntryCount == countToWin) {
          console.log("result",result)
          return {
            combo:winningCells,
            id:winnderId
          };
        }
      } else {
        break;
      }
    }

    //downward search
    i = row + 1;
    while (i < playField.length) {
      if (playField[i][col] != 0 && playField[i][col] == winnderId) {
        winningCells.push(new Cell(i, col));
        inRowEntryCount++;
        i++;
        if (inRowEntryCount == countToWin) {
           console.log("result",result)
          return {
            combo:winningCells,
            id:winnderId
          };
        }
      } else {
        break;
      }
    }

    if (winnderId === 2) {
      console.log("vertical",  inRowEntryCount);
    }

    inRowEntryCount = 1;
    winningCells = [];
winningCells.push(cell)
    //if the correct amount of matching entries not found vertically
    //starts searching diagonally

    //up - right

    i = row - 1;
    j = col + 1;
    while (i >= 0 && j < playField[row].length) {
      if (playField[i][j] != 0 && playField[i][j] == winnderId) {
        winningCells.push(new Cell(i, j));
        inRowEntryCount++;
        i--;
        j++;

        if (inRowEntryCount == countToWin) {
           console.log("result",result)
          return {
            combo:winningCells,
            id:winnderId
          };
        }
      } else {
        break;
      }
    }

    //down - left

    i = row + 1;
    j = col - 1;
    while (i < playField.length && j >= 0) {
      if (playField[i][j] != 0 && playField[i][j] == winnderId) {
        winningCells.push(new Cell(i, j));
        inRowEntryCount++;
        i++;
        j--;
        if (inRowEntryCount == countToWin) {
           console.log("result",result)
          return {
            combo:winningCells,
            id:winnderId
          };
        }
      } else {
        break;
      }
    }

    if (winnderId === 2) {
      console.log("diag right",  inRowEntryCount);
    }

    //diagonally other direction
    //up left

    inRowEntryCount = 1;
    winningCells = [];
   winningCells.push(cell);
    i = row - 1;
    j = col - 1;
    while (i >= 0 && j >= 0) {
      if (playField[i][j] != 0 && playField[i][j] == winnderId) {
        winningCells.push(new Cell(i, j));
        inRowEntryCount++;
        i--;
        j--;

        if (inRowEntryCount == countToWin) {
           console.log("result",result)
          return {
            combo:winningCells,
            id:winnderId
          };
        }
      } else {
        break;
      }
    }

    //down right

    i = row + 1;
    j = col + 1;
    while (i < playField.length && j < playField[row].length) {
      if (playField[i][j] != 0 && playField[i][j] == winnderId) {
        winningCells.push(new Cell(i, j));
        inRowEntryCount++;
        i++;
        j++;
        if (inRowEntryCount == countToWin) {
           console.log("result",result,"winningCells",winningCells)
          return {
            combo:winningCells,
            id:winnderId
          };
        }
      } else {
        break;
      }
    }

    if (winnderId === 2) {
      console.log("diag left", inRowEntryCount);
    }
    console.log("-----------");
    return {};
  }
}
