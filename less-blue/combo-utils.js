import { Utils } from "./utils.js";
import { Cell } from "./cell.js";
import { Winner } from "./winner.js";
export class ComboUtils extends Utils {
  constructor(gameData) {
    super();
    this.gameData = gameData;
  }

  cellAvailable(cell) {
    const { playField, emptyCellValue } = this.gameData.get();
    return playField[cell.row][cell.col] === emptyCellValue;
  }

  //{row,coll}[][]
  getAllEmergingCombos = (entryId, threshold) => {
    const { allCombos } = this.gameData.get();
    return allCombos.filter((combo) =>
      isEmergingCombo(combo, entryId, threshold)
    );
  };

  //bool
  isEmergingCombo(combo, entryId, threshold) {
    const { playField } = this.gameData.get();
    return (
      comboPossible(combo, entryId) &&
      arrayOccurances(comboEntryIds(playField, combo), entryId) >= threshold
    );
  }

  //bool
  comboPossible(combo, entryId) {
    let combinationLength = combo.length;
    const { playField, emptyCellValue } = this.gameData.playField;
    for (let i = 0; i < combinationLength; i++) {
      let row = combo[i].row;
      let col = combo[i].col;
      let cellValue = playField[row][col];

      if (cellValue != emptyCellValue && cellValue != entryId) {
        return false;
      }
    }
    return true;
  }
  emptyCellsInCombo(combo) {
    const { playField } = this.gameData.get();
    return combo.filter(
      (cell) => playField[cell.row][cell.col] === emptyCellValue
    );
  }

  comboEntryIds(combo, playField = this.gameData.getPlayField()) {
    // console.log("combofromin combo",combo)
    // console.log("playfield in cvfi",playField)
    let values = combo.map((element) => playField[element.row][element.col]);
    return values;
  }

  getAllEmergingCombos(entryId, threshold){
    const { playField, allCombos } = this.gameData.get();
    return allCombos.filter((combo) =>
      isEmergingCombo(playField, combo, entryId, threshold)
    );
  };

  getAllCombos() {
    return this.gameData.allCombinations;
  }

  checkForWinDumb(playField = this.gameData.getPlayField()) {
    // const { allCombos, playField, emptyCellValue } = this.gameData.get();
    const { allCombos, emptyCellValue } = this.gameData.get();

    let result = {};
    for (let i = 0; i < allCombos.length; i++) {
      const comboValues = this.comboEntryIds(allCombos[i], playField);
      const allEqual = comboValues.every(
        (val) => val != emptyCellValue && val === comboValues[0]
      );
      if (allEqual) {
        result = {
          combo: allCombos[i],
          entryId: comboValues[0],
        };
        return new Winner(allCombos[i],comboValues[0]);
      }
    }
    return {};
  }

  checkForWinSmart(cell, playField = this.gameData.getPlayField()) {
    if (!playField) throw new Error("no playfield");
    //console.log("playfield in checkforwin lesslblue",playField)

    let inRowEntryCount = 1;
    const { row, col } = cell;
    let winnerId = playField[row][col];
    let winningCombo = [];
    const countToWin = this.gameData.getComboLength();
    const { emptyCellValue } = this.gameData.get();
    // console.log("countToWin",countToWin)


    let result = {
      combo: winningCombo,
      entryId: winnerId,
    };

    winningCombo.push(cell);
    //to right
    let j = col + 1;
    while (j < playField[row].length) {
      if (
        playField[row][j] != emptyCellValue &&
        playField[row][j] == winnerId
      ) {
        winningCombo.push(new Cell(row, j));

        inRowEntryCount++;
        j++;
        if (inRowEntryCount == countToWin) {
          //console.log("result",result)
          return new Winner(winningCombo,winnerId)
      
        }
      } else {
        break;
      }
    }

    //searches for matching to the left
    j = col - 1;
    while (j >= 0) {
      if (playField[row][j] != 0 && playField[row][j] == winnerId) {
        winningCombo.push(new Cell(row, j));
        inRowEntryCount++;
        j--;
        if (inRowEntryCount == countToWin) {
          console.log("result", result);
           return new Winner(winningCombo,winnerId)
        }
      } else {
        break;
      }
    }
    if (winnerId === 2) {
      console.log("horizontal", inRowEntryCount);
    }

    //if the correct amount of matching entries not horizontally,
    // starts over from the clicked field and searches vertically

    inRowEntryCount = 1;
    winningCombo = [];
    winningCombo.push(cell);
    //upward search
    j = col;
    let i = row - 1;
    while (i >= 0) {
      if (playField[i][col] != 0 && playField[i][col] == winnerId) {
        winningCombo.push(new Cell(i, col));

        inRowEntryCount++;
        i--;

        if (inRowEntryCount == countToWin) {
           return new Winner(winningCombo,winnerId)
        }
      } else {
        break;
      }
    }

    //downward search
    i = row + 1;
    while (i < playField.length) {
      if (playField[i][col] != 0 && playField[i][col] == winnerId) {
        winningCombo.push(new Cell(i, col));
        inRowEntryCount++;
        i++;
        if (inRowEntryCount == countToWin) {
          return new Winner(winningCombo,winnerId)
        }
      } else {
        break;
      }
    }

   

    inRowEntryCount = 1;
    winningCombo = [];
    winningCombo.push(cell);
    //if the correct amount of matching entries not found vertically
    //starts searching diagonally

    //up - right

    i = row - 1;
    j = col + 1;
    while (i >= 0 && j < playField[row].length) {
      if (playField[i][j] != 0 && playField[i][j] == winnerId) {
        winningCombo.push(new Cell(i, j));
        inRowEntryCount++;
        i--;
        j++;

        if (inRowEntryCount == countToWin) {
            return new Winner(winningCombo,winnerId)
        }
      } else {
        break;
      }
    }

    //down - left

    i = row + 1;
    j = col - 1;
    while (i < playField.length && j >= 0) {
      if (playField[i][j] != 0 && playField[i][j] == winnerId) {
        winningCombo.push(new Cell(i, j));
        inRowEntryCount++;
        i++;
        j--;
        if (inRowEntryCount == countToWin) {
            return new Winner(winningCombo,winnerId)
        }
      } else {
        break;
      }
    }

    if (winnerId === 2) {
      console.log("diag right", inRowEntryCount);
    }

    //diagonally other direction
    //up left

    inRowEntryCount = 1;
    winningCombo = [];
    winningCombo.push(cell);
    i = row - 1;
    j = col - 1;
    while (i >= 0 && j >= 0) {
      if (playField[i][j] != 0 && playField[i][j] == winnerId) {
        winningCombo.push(new Cell(i, j));
        inRowEntryCount++;
        i--;
        j--;

        if (inRowEntryCount == countToWin) {
           return new Winner(winningCombo,winnerId)
        }
      } else {
        break;
      }
    }

    //down right

    i = row + 1;
    j = col + 1;
    while (i < playField.length && j < playField[row].length) {
      if (playField[i][j] != 0 && playField[i][j] == winnerId) {
        winningCombo.push(new Cell(i, j));
        inRowEntryCount++;
        i++;
        j++;
        if (inRowEntryCount == countToWin) {
           return new Winner(winningCombo,winnerId)
        }
      } else {
        break;
      }
    }

    if (winnerId === 2) {
      console.log("diag left", inRowEntryCount);
    }
    console.log("-----------");
    return {};
  }
}
