
import { LessBlueGame } from "./lessBlueGame.js";
import { GameData } from "./lessBlueGameData.js";

export class LessBlue {
  constructor(fieldSize, comboLength, playerId, lessBlueId) {
    this.initialData = {
      fieldSize: fieldSize,
      comboLength: comboLength,
      playerId: playerId,
      lessBlueId: lessBlueId,
    };
    this.gameData = new GameData(this.initialData);
    this.lessBlueGame = new LessBlueGame(this.gameData);
  }

  getPlayField(){
    return this.gameData.getPlayField();
  }

  nextMove(row,col) {

  }

  //if win, return the winning combo, winners entry id, and the gamefield
  //else return false 
  checkForWin(){

  }



  getAllCombinations() {
    if (!this.gameData.allCombinations)
      throw new Error("'all combinations' not set");
    return this.gameData.allCombinations;
  }
}
