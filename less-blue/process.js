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

  checkForWin(cell,playfield) {
    if (cell) {
      const win = this.checkForWinSmart(cell,playfield);
    
      return win;
    }



    const win = this.checkForWinDumb();

    return;
  }

}
