
import { Process } from "./process.js";
import { GameData } from "./game-data.js";
import { Cell } from "./cell.js";
import { Winner } from "./winner.js";
import { Response } from "./response.js";

export class Game {
  constructor(initialData) {
    this.gameData = new GameData(initialData,"instance-game");
    this.process = new Process(this.gameData);
  }
  

  /*
  check if blocking is necessary and respond if true
  check if less blue has emerging combos and respond if true
  begin a random combo 
  
  */
  response(inputRow, inputCol) {
 
    const gameData = this.gameData;
    const process = this.process
    const cell = new Cell(inputRow, inputCol);
    const {playField,playerId,lessBlueId,instanceId} = this.gameData.get();
 
    this.checkCellAvailability(cell)
      
    console.log(instanceId)
    this.gameData.inputCell(cell,playerId);
    
 


    let playerWin = process.checkForWin();
    if(playerWin){
        return new Response(this.gameData,playerWin)
    }

    this.swapPlayerTurn();                                                     
    
    const cellChosenByLessBlue = process.choseCell();
 
    gameData.inputCell(cellChosenByLessBlue,lessBlueId);

    let lessBlueWin = process.checkForWin(cellChosenByLessBlue);
    if(lessBlueWin){
      return new Response(this.gameData,lessBlueWin);
    }
    return new Response(this.gameData,cellChosenByLessBlue);

  }


  checkCellAvailability(cell){  
    const {playField,emptyCellValue} = this.gameData.get();
     if(playField[cell.row][cell.col] != emptyCellValue){
      throw new Error("attepting to input into an occupied cell")
    }
  }

  responseTest(){

  }
  checkForWinTest(cell,playField){
    return this.process.checkForWin(cell,playField);
  }

  swapPlayerTurn(turnId){
    this.gameData.swapTurn();
  }

  setNewGameData(initialData){

  }
  getGameData(){
    return this.gameData;
  }

  logPlayField(msg){
    if(msg){
      console.log(msg)
    }
    const {playField} = this.gameData.get();
     playField.forEach(row => row.forEach( (cell) => { 
      console.log(cell)
    }))
  }
 




  
}
