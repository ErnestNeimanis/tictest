export class ComboAnalisizer {
  constructor(gameData) {
    this.gameData = gameData;
  }


  
cellAvailable(pfv, cell) {
  return pfv[cell.row][cell.col] === 0;
}

comboPossible(combo, turnId) {
  
    let combinationLength = combo.length;
    const pfv = this.gameData.playField;
    for (let i = 0; i < combinationLength; i++) {
      let row = combo[i].row;
      let col = combo[i].col;
      let pfVal = pfv[row][col];

      if (pfVal != 0 && pfVal != turnId) {
        return false;
      }
    }
    return true;
  }

comboValuesFromIndexes(pfv, combo) {
  console.log("comboValuesFromIndexes,", combo)
  let r = combo.map((element) => pfv[element.row][element.col]);
  console.log("r",r)
  return r
}


getAllEmergingCombos = (pfv, allCombos, turnId, threshold) => {
  return allCombos.filter((combo) =>
    isEmergingCombo(pfv, combo, turnId, threshold)
  );
};

getAllCombos(){
  return this.gameData.allCombinations;
}

  checkForWin(cell, playField = this.playField) {
    let inRowEntryCount = 1;

    let row = cell.row;
    let col = cell.col;

    let entry = playField[row][col];
    let winningIndecies = [[row, col]];

    let result = {
      winningIndecies: winningIndecies,
      winnerId: entry,
    };

    let j = col + 1;
    while (j < playField[row].length) {
      if (playField[row][j] != 0 && playField[row][j] == entry) {
        winningIndecies.push([row, j]);
        inRowEntryCount++;
        j++;
        if (inRowEntryCount == countToWin) {
          return result;
        }
      } else {
        break;
      }
    }

    //searches for matching to the left
    j = col - 1;
    while (j >= 0) {
      if (playField[row][j] != 0 && playField[row][j] == entry) {
        winningIndecies.push([row, j]);
        inRowEntryCount++;
        j--;
        if (inRowEntryCount == countToWin) {
          return result;
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
      if (playField[i][col] != 0 && playField[i][col] == entry) {
        winningIndecies.push([i, col]);
        inRowEntryCount++;
        i--;
        if (inRowEntryCount == countToWin) {
          return result;
        }
      } else {
        break;
      }
    }

    //downward search
    i = row + 1;
    while (i < playField.length) {
      if (playField[i][col] != 0 && playField[i][col] == entry) {
        winningIndecies.push([i, col]);
        inRowEntryCount++;
        i++;
        if (inRowEntryCount == countToWin) {
          return result;
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
      if (playField[i][j] != 0 && playField[i][j] == entry) {
        winningIndecies.push([i, j]);
        inRowEntryCount++;
        i--;
        j++;

        if (inRowEntryCount == countToWin) {
          return result;
        }
      } else {
        break;
      }
    }

    //down - left

    i = row + 1;
    j = col - 1;
    while (i < playField.length && j >= 0) {
      if (playField[i][j] != 0 && playField[i][j] == entry) {
        winningIndecies.push([i, j]);
        inRowEntryCount++;
        i++;
        j--;
        if (inRowEntryCount == countToWin) {
          return result;
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
      if (playField[i][j] != 0 && playField[i][j] == entry) {
        winningIndecies.push([i, j]);
        inRowEntryCount++;
        i--;
        j--;

        if (inRowEntryCount == countToWin) {
          return result;
        }
      } else {
        break;
      }
    }

    //down right

    i = row + 1;
    j = col + 1;
    while (i < playField.length && j < playField[row].length) {
      if (playField[i][j] != 0 && playField[i][j] == entry) {
        winningIndecies.push([i, j]);
        inRowEntryCount++;
        i++;
        j++;
        if (inRowEntryCount == countToWin) {
          return result;
        }
      } else {
        break;
      }
    }

    return false;
  }
}
