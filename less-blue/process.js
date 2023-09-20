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

  checkForWin(cell,playField = this.gameData.getPlayField()) {
    return this.checkForWinDumb( playField);
    if (cell) {
      return this.checkForWinSmart(cell, playField);
    } else {
      return this.checkForWinDumb(playField);
    }
  }

  choseCell(){
    const algorithm = this.algorithm;
    return algorithm.choseCell();
  }


}
