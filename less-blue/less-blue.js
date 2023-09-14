
import { Game } from "./game.js";
import { GameData } from "./game-data.js";

export class LessBlue {
  constructor(fieldSize, comboLength,start = true, playerId =1, lessBlueId=2) {
    this.initialData = {
      fieldSize: fieldSize,
      comboLength: comboLength,
      start:start,
      playerId: playerId,
      lessBlueId: lessBlueId,
    };
    
    this.game = new Game(this.initialData);
    this.gameData = this.game.getGameData();
  }

  getPlayField(){
    return this.gameData.getPlayField();
  }

  nextMove(row,col) {
    return this.game.response(row,col)
  }

  //if win, return the winning combo, winners entry id, and the gamefield
  //else return false 
  checkForWin(cell,playField){
   
   return this.game.checkForWinTest(cell,playField)
  }



  getAllCombos() {
    if (!this.gameData.allCombos)
      throw new Error("'all combinations' not set");
    return this.gameData.allCombos;
  }
}
