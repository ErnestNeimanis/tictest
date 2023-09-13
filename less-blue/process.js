import { ComboUtils } from "./combo-utils.js";
import { Algorithm } from "./algorithm.js";
export class Process extends ComboUtils {
  constructor(gameData) {
    super(gameData);
    this.gameData = gameData;
    this.algorithm = new Algorithm(this.gameData);
  }


  insert(entry){
    this.gameData.insert(entry)
  }

  checkForWin(cell) {
    if (cell) {
      const win = this.checkForWinSmart(cell);
      return;
    }



    const win = this.checkForWinDumb();

    return;
  }

}
