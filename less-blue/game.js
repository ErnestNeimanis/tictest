import { ComboinationAnalisizer } from "./combination-analizer.js";
import { GameData } from "./game-data.js";
export class Game {
  constructor(gameData) {
    this.combinationAnalizer = new ComboinationAnalisizer();
    this.gameData = new GameData(gameData);
  }

  /*
  check if blocking is necessary and respond if true
  check if less blue has emerging combos and respond if true
  begin a random combo 
  
  */
  response(inputRow, inputCol) {
    let playerWin = this._playerWin(inputRow, inputCol);
    if(playerWin){
        return playerWin;
    }

    /*
    preform analysis of the field and chose a cell
    1.check if opponent has an emerging combo
        if yes, chose an efficient block
    2.check if you have emerging combo/combos

    then either chose the best combo or start at random
    input in cell
    check for win again
*/


    

    let row = 0;
    let col = 0;

    let lessBlueWin = this._lessBlueWin(row,col)
    if(lessBlueWin){
        return lessBlueWin;
    }

    /*
      if here then its time to swap player turn
    */
      this.swapPlayerTurn()
      const r = {
        playField: this.gameData.getPlayField(),
        entry: {row:row, col:col},
        row,
        col,
        gameOver: false
      }
      return r;
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
    this.checkForWin(inputRow, inputCol);
    if (lessBlueWin) {
      return {
        playField: this.gameData.getPlayField(),
        entry: {row:row, col:col},
        row,
        col,
        gameOver: true,
        winnerId: lessBlueWin.winnerId,
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
        console.log("starting prioritized combo with threshold: ", i);
        comboChoice = emCombos[rand(0, emCombos.length - 1)];
        this.activeCombination = comboChoice;
        return comboChoice;
      }
    }
    //throw new Error('didnt find prioritized combos')
    //console.log('chosing new combo at random')
    comboChoice = choseRandomCombo(pfv, allCombos, AI_id);
    this.activeCombination = comboChoice;
    return comboChoice;
  }

  // prioratizeNewComboWithRandom = (pfv,allCombos,comboLength,AI_id) =>{
  //     let threshold = 1;
  //     let emCombos = [];

  //     for(let i = comboLength; i >= threshold; i--){
  //         emCombos = allCombos.filter(combo => isEmergingCombo(pfv,combo,AI_id,i))
  //         if(emCombos.length > 0){
  //             console.log('starting prioritized combo with threshold: ' , i)
  //             return emCombos[rand(0,emCombos.length-1)];
  //         }
  //         emCombos =[];
  //     }
  //     //throw new Error('didnt find prioritized combos')
  //     console.log('chosing new combo at random')
  //     return choseRandomCombo(pfv,allCombos,AI_id)
  // }
}
