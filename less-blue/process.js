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

  checkForWin(playField,cell) {
    
    if(cell){
       return this.checkForWinSmart(cell,playField);
    } else {
      return this.checkForWinDumb(playField)
    }
 
  }

  getInputFromAlgorithm(gameData = this.gameData){
    const algorithm = this.algorithm;
    const block = algorithm.block();
  }




}
