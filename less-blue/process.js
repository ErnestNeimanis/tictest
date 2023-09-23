import { ComboUtils } from "./combo-utils.js";
import { Algorithm } from "./algorithm.js";
export class Process extends ComboUtils {
  constructor(gameData) {
    super(gameData);
    this.gameData = gameData;
    this.algorithm = new Algorithm(this.gameData);
  }

  insert(entry) {
    this.gameData.insert(entry);
  }

  checkForWin(cell) {
    //  return this.checkForWinDumb( playField);
    const { playField } = this.gameData.get();
    if (cell) {
      return this.checkForWinSmart(cell, playField);
    } else {
      return this.checkForWinDumb(playField);
    }
  }

  choseCell() {
    return this.algorithm.choseCell();
  }
}
