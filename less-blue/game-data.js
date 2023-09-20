import { CombinationGenerator } from "./combination-generator.js";
import { Winner } from "./winner.js";
export class GameData {
  //  allCombinations;

  //  fieldSize;
  //comboLength;
  //playField = [];
  //combo = [];
  //playerId;
  //lessBlueId;

  //Cell is {row,col}
  //entryId is like an enum. emptyCellValue,PlayerId,lessBlueId


  constructor(initialData) {
    this.fieldSize = initialData.fieldSize;
    this.comboLength = initialData.comboLength;
    this.playerId = initialData.playerId;
    this.lessBlueId = initialData.lessBlueId;
    this.allCombos = new CombinationGenerator(initialData); //Cell[]
    this.playField = this._createPlayField(0); //any[][]
    this.emptyCellValue = 0;
    this.activeCombos = [];
    this.turnId = this._initialTurn(initialData.start); //???


    this.winner = {},
    this.playerWin = false;
    this.lessBlueWin = false;
    this.winnerId =  undefined;
    this.loserId = undefined;
    this.winningCombos = [];

  }

   get() {
    return {
      fieldSize: this.fieldSize,
      comboLength: this.comboLength,
      playerId: this.playerId,
      lessBlueId: this.lessBlueId,
      allCombos: this.allCombos,
      playField: this.playField,
      emptyCellValue: this.emptyCellValue,
      activeCombos: this.activeCombos,
      turnId: this.turnId,
    };
  }

  _createPlayField(emptyCellValue = 0) {
    const fieldSize = this.fieldSize;
    return Array(fieldSize)
      .fill(emptyCellValue)
      .map(() => Array(fieldSize).fill(emptyCellValue));
  }

  _initialTurn(start) {
    return start ? this.playerId : this.lessBlueId;
  }
  setActiveCombination(index, combo) {
    this.activeCombinations[index] = combo;
  }

  swapTurn(turnId) {
    if (turnId) {
      this.turnId = turnId;
      return;
    }
    this.turnId = !this.turnId;
  }

  getActiveCombination(index) {
    return this.activeCombos[index];
  }
  getAllActiveCombinations() {
    return this.activeCombinations;
  }
  getAllCombos() {
    return this.allCombos;
  }
  getPlayField() {
    return this.playField;
  }

  getPlayerId() {
    return this.playerId;
  }
  getLessBlueId() { 
    return this.lessBlueId}

  getEmptyCellValue() {
    return this.emptyCellValue;
  }

  getComboLength() {
    return this.comboLength;
  }
  inputCell(cell, id) {
    if (!cell.row || !cell.col || !id) {
      throw new Error("missing input");
    }
    this.playField[(cell.row, cell.col)] = id;
  }
}
