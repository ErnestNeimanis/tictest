import { CombinationGenerator } from "./combination-generator.js";
export class GameData {
  //  allCombinations;

  //  fieldSize;
  //comboLength;
  //playField = [];
  //combo = [];
  //playerId;
  //lessBlueId;

  constructor(initialData) {
    this.fieldSize = initialData.fieldSize;
    this.comboLength = initialData.comboLength;
    this.playerId = initialData.playerId;
    this.lessBlueId = initialData.lessBlueId;
    this.allCombinations = new CombinationGenerator(initialData);
    this.playField = this._createPlayField();

    this.activeCombinations = [];
    this.turnId = this._initialTurn(initialData.start);

    return this;
  }

  _createPlayField() {
    const fieldSize = this.fieldSize;
    return Array(fieldSize)
      .fill(0)
      .map(() => Array(fieldSize).fill(0));
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
    return this.activeCombinations[index];
  }
  getAllActiveCombinations() {
    return this.activeCombinations;
  }

  getPlayField() {
    return this.playField;
  }
  inputCell(entry, id) {
    if (!entry.row || !entry.col || !id) {
      throw new Error("missing input");
    }
    this.playField[(entry.row, entry.col)] = id;
  }
}
