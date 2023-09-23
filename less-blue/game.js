
import { Process } from "./process.js";
import { GameData } from "./game-data.js";
import { Cell } from "./cell.js";
import { Winner } from "./winner.js";
import { Response } from "./response.js";

export class Game {
  constructor(gameData) {
    this.gameData = new GameData(gameData);
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
 
    const {playField,playerId,lessBlueId} = this.gameData.get();

    this.checkCellAvailability(cell)
 

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
     if(this.gameData.getEmptyCellValue()!= this.gameData.getPlayField()[0][0]){
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

  _choseCell(){

  }

  _inputCell(entry,id){
    
  }

  checkForWin(row, col) {
    ca = this.combinationAnalizer;
    pf = this.gameData.getPlayField();



    return ca.checkForWin({ row, col }, pf);
  }

  _playerWin(row, col) {
    this.checkForWin(row, col);
    if (playerWin) {
      return {
        playField: this.gameData.getPlayField(),
        entry: {},
        gameOver: true,
        winnerId: playerWin.winnerId,
      };
    }
    return false;
  }

  _lessBlueWin(row,col) {
    const lessBlueWin = this.checkForWin(inputRow, inputCol);
    if (lessBlueWin) {
      return {
        playField: this.gameData.getPlayField(),
        entry: {row:row, col:col},
        row,
        col,
        gameOver: true,
        winnerId: lessBlueWin.id,
      };
    }
    return false;
  }

  //UTIL
  //if one of the playfield values defined in the combo
  //does not equal turn id, returns false
  //meaning the combo is blocked by other players symbol
  //only values from possible combos can be passed in
  //UTIL
  //you pass in a combo and it choses a space at random
  randomEntryInCombo(pfv, comboArray) {
    const availableCells = comboArray.filter((cell) =>
      cellAvailable(pfv, cell)
    );
    return availableCells[rand(0, availableCells.length - 1)];
  }

  //chose random combo from all possible combos
  choseRandomCombo(pfv, allCombos, turnId) {
    turnId = this.lessBlueId;
    let random = rand(0, allCombos.length - 1);
    while (!comboPossible(pfv, allCombos[random], turnId)) {
      random = rand(0, allCombos.length - 1);
    }
    return allCombos[random];
  }

  //check if there is an emergin combo
  // and return a random one from the emerging ones
  //else chose a random one
  prioratizeNewComboWithRandom(pfv, allCombos, turnId) {
    let threshold = 1;
    let comboLength = allCombos[0].length;
    let emCombos = [];
    let comboChoice;

    for (let i = comboLength; i >= threshold; i--) {
      emCombos = allCombos.filter((combo) =>
        isEmergingCombo(pfv, combo, turnId, i)
      );
      if (emCombos.length > 0) {
 
        comboChoice = emCombos[rand(0, emCombos.length - 1)];
        this.activeCombination = comboChoice;
        return comboChoice;
      }
    }
    //throw new Error('didnt find prioritized combos')
 
    comboChoice = choseRandomCombo(pfv, allCombos, AI_id);
    this.activeCombination = comboChoice;
    return comboChoice;
  }

fullResponse(){
  //if no win
  const response = {
    row,
    col,
    id,
    cell:{row,col},
    entry:{row,col,id},
    playField,
    winner: {},
    turnId,
    playerWin:false,
    lessBlueWin:false,
    winnerId:undefined,
    loserId:undefined,
    winningCombo:{}
  }

  //if playerWin

  response = {
    row:undefined,
    col:undefined,
    cell:{},
    playField,
    winner: {
      id,
      combo
    },
    turnId,
    playerWin:true,
    lessBlueWin:false,
    winnerId,
    loserId,
    winningCombo
  }
}
  
}
