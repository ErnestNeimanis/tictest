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

  checkForWin(playField = this.gameData.getPlayField(), cell) {
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
  winnerData() {
    const winner = {
      winnerId:"",
      loserId:"",
      combo:""
    }
  }

  getInputFromAlgorithm(gameData = this.gameData) {
    const algorithm = this.algorithm;
    const block = algorithm.block();

  }
}
