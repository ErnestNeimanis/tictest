
import { Game } from "./game.js";
import { GameData } from "./game-data.js";
import { Utils } from "./utils.js";

export class LessBlue extends Utils{
  constructor(fieldSize, comboLength,start = true, playerId ="pl", lessBlueId="lb") {
    super();
    this.initialData = {
      fieldSize: fieldSize,
      comboLength: comboLength,
      start:start,
      playerId: playerId,
      lessBlueId: lessBlueId,
    };
    
    this.game = new Game(this.initialData);
    this.gameData = this.game.getGameData();
    console.log(this.gameData.instanceId)

 
  }

  getPlayField(){
    
    return this.gameData.getPlayField();
  }
  getPlayFieldCopy(){
    const copy = this.deepCopy(this.gameData.getPlayField())
    return copy;
  }

  nextMove(row,col) { 
    const {playField} = this.gameData.get();
 
    return this.game.response(row,col)
  }


  restart(fieldSize, comboLength,start = true, playerId =1, lessBlueId=2){
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
