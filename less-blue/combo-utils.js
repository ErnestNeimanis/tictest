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
  getAllEmergingCombos(entryId, threshold) {


    const { allCombos,instanceId } = this.gameData.get();
 

    this.logPlayField("in combo utils");

    const allEmerging  = allCombos.filter((combo) => {
    const isEmerging = this.isEmergingCombo(combo, entryId, threshold)
    if(isEmerging){
 
    }
    
 
    //  "result:",isEmerging,"-----")
      return this.isEmergingCombo(combo, entryId, threshold)
    }
      
    );
    
 
   return allEmerging
  };

  //bool
  isEmergingCombo(combo, entryId, threshold) {
    const { playField,allCombos,playerId } = this.gameData.get();
 
    const possible =  this.comboPossible(combo, entryId)
    const arrayOccurrences = this.arrayOccurrences(this.comboEntryIds(combo), entryId)
    if(possible){
 
    }
 
 
    if(arrayOccurrences > 0){
 
    }
   

    return (
      this.comboPossible(combo, entryId) &&
      this.arrayOccurrences(this.comboEntryIds(combo), entryId) >= threshold
    );
  }

  //bool
  comboPossible(combo, entryId) {
    let combinationLength = combo.length;
    const { playField, emptyCellValue } = this.gameData.get();
   
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
    const { playField,emptyCellValue } = this.gameData.get();
    return combo.filter(
      (cell) => playField[cell.row][cell.col] === emptyCellValue
    );
  }


  emptyCellsFromMultipleCombos(combos) {
    const cells = [];
    if(combos.length ===0) return []
    combos.forEach(combo => cells.push(...this.emptyCellsInCombo(combo)));
    return cells;
  }

  comboEntryIds(combo) {
 
 
 
    const {playField} = this.gameData.get();

 

    let values = combo.map((cell,i) => {
 
 
     const row = cell.row;
     const col = cell.col;
     if(row === undefined || col === undefined){
 
      throw new Error("ONE OF THESE IS UNDEFINED")
     }
      return playField[row][col]
    });
 
    return values;
  }

  // getAllEmergingCombos(entryId, threshold){
  //   const { playField, allCombos } = this.gameData.get();
  //   return allCombos.filter((combo) =>
  //     this.isEmergingCombo(combo, entryId, threshold)
  //   );
  // };

//thesame combo will be emerging with different thersholds
//thats polluting the data
   emergingSortedByThresholds(id, threshold) {
    const { allCombos, comboLength } = this.gameData.get();
    const combos = [];

    for (let i = comboLength-1; i >= threshold; i--) {
      const tempThreshold = i;
      let emerging = [];
      emerging = allCombos.filter((combo) =>
        this.isEmergingCombo(combo, id, tempThreshold)
      );

      if (emerging.length > 0) {
        combos.push(this.distinct(emerging));
      }
    }

    return combos;
  }

getNeighbourCells(cell) {
  const {playField,fieldSize} = this.gameData.get();
  const {row,col} = cell
  const cells = [];
  for(let i = -1;i <=1;i++){
    const currentRow = row+i;
    if(currentRow >= 0 && currentRow < fieldSize ){
      for(let j = -1; j <=1; j++){
        const currentCol = col+j;
        if(currentCol >= 0 && currentCol < fieldSize){
          if(row === currentRow && col === currentCol){
            continue;
          }
          cells.push(new Cell(currentRow,currentCol))
        }
      }
    }
    
  }
  
return cells;

}

cellsWithMostNeighbours(cells,id){
  const {playField} = this.gameData.get();
 let result = [];
 
  cells.forEach((cell,i) => {
    const neighbours = this.getNeighbourCells(cell);
    neighbours.filter((n) => playField[n.row][n.col] === id)
    neighbours.forEach((n) => result.push(cell))
  })
  if(result.length === 0){
    return cells
  }
  result = this.mostFrequentElements(result)
  console.log(result)
  return result;

}


  checkForWinDumb() {

    // const { allCombos, playField, emptyCellValue } = this.gameData.get();
    const { allCombos, emptyCellValue,playField } = this.gameData.get();
 
    let result = {};
 
    for (let i = 0; i < allCombos.length; i++) {
 
      const comboValues = this.comboEntryIds(allCombos[i]);
 
      const allEqual = comboValues.every(
        (val) => { 
        return val != emptyCellValue && val === comboValues[0]
        }
      );

      if (allEqual) {
        
 
        return new Winner(allCombos[i],comboValues[0]);
      }
    }
    return null;
  }

  checkForWinSmart(cell, playField = this.gameData.getPlayField()) {
    if (!playField) throw new Error("no playfield");
 

    let inRowEntryCount = 1;
    const { row, col } = cell;
    let winnerId = playField[row][col];
    let winningCombo = [];
    const countToWin = this.gameData.getComboLength();
    const { emptyCellValue } = this.gameData.get();
 


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
 
           return new Winner(winningCombo,winnerId)
        }
      } else {
        break;
      }
    }
    if (winnerId === 2) {
 
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
 
    }
 
    return null;
  }


logPlayField(msg){
    if(msg){
 
    }
    const {playField} = this.gameData.get();
     playField.forEach(row => row.forEach( (cell) => { 
 
    }))
  }

}
