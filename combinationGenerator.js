import { LessBlueGame } from "./lessBlueGame.js";
export class CombinationGenerator {

  
    allCombinations = [];
    constructor(initialData){
       this.fieldSize = initialData.fieldSize;
        this.comboLength = initialData.comboLength;
        this.playerId = initialData.playerId;
        this.lessBlueId = initialData.lessBlueId;
        

        this.allCombinations = this.createAllCombinations();
        return this.allCombinations;
    }

    horizontalCombinations() {
    const fieldSize = this.fieldSize;
    const comboLength = this.comboLength;
    let tempArray = [];
    let startingCol = 0;
    let startingRow = 0;

    while (startingCol < fieldSize - comboLength + 1) {
      while (startingRow < fieldSize) {
        let combination = [];
        for (let i = startingCol; i < startingCol + comboLength; i++) {
          combination.push({ row: startingRow, col: i });
        }
        //allCombos.push(combination)
        tempArray.push(combination);
        startingRow++;
      }
      startingCol++;
      startingRow = 0;
    }

    return tempArray;
  }

  verticalCombinations() {
    const fieldSize = this.fieldSize;
    const comboLength = this.comboLength;
    let tempArray = [];
    let startingCol = 0;
    let startingRow = 0;

    while (startingRow <= fieldSize - comboLength) {
      while (startingCol < fieldSize) {
        let combination = [];
        for (let i = startingRow; i < startingRow + comboLength; i++) {
          combination.push({ row: i, col: startingCol });
        }
        //allCombos.push(combination)

        tempArray.push(combination);
        startingCol++;
      }
      startingCol = 0;
      startingRow++;
    }

    return tempArray;
  }

  diagonalCombinationsLeft() {
    const fieldSize = this.fieldSize;
    const comboLength = this.comboLength;
    let tempArray = [];
    let startingCol = 0;
    let startingRow = 0;

    while (startingRow <= fieldSize - comboLength) {
      while (startingCol <= fieldSize - comboLength) {
        let combination = [];
        for (let i = startingRow; i < startingRow + comboLength; i++) {
          combination.push({ row: i, col: startingCol + i - startingRow });
        }
        tempArray.push(combination);
        startingCol++;
      }
      startingCol = 0;
      startingRow++;
    }
    return tempArray;
  }
  diagonalCombinationsRight() {
    const fieldSize = this.fieldSize;
    const comboLength = this.comboLength;
    let tempArray = [];
    let startingCol = comboLength - 1;
    let startingRow = 0;

    while (startingRow <= fieldSize - comboLength) {
      while (startingCol < fieldSize) {
        let combination = [];
        for (let i = startingRow; i < startingRow + comboLength; i++) {
          combination.push({ row: i, col: startingCol - (i - startingRow) });
        }
        tempArray.push(combination);
        startingCol++;
      }
      startingCol = comboLength - 1;
      startingRow++;
    }
    return tempArray;
  }

  createAllCombinations() {
    return [
      ...this.horizontalCombinations(),
      ...this.verticalCombinations(),
      ...this.diagonalCombinationsLeft(),
      ...this.diagonalCombinationsRight(),
    ];
  }
}