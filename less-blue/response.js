import { Cell } from "./cell.js";
import { Entry } from "./entry.js";
import { Winner } from "./winner.js";
import { ComboUtils } from "./combo-utils.js";
export class Response extends ComboUtils{
  constructor(gameData, responseData) {
    super(gameData)
    this._checkArguments(gameData,responseData);

    this.gameData = gameData;
    this.responseData = responseData;
    
   
    this.playField = gameData.getPlayField();
    this.turnId = this.gameData.getTurnId();
 
   
    this.response = {

      playField: this.playField,
      turnId: this.turnId,
      
      row: undefined,
      col: undefined,
      id: undefined,
      cell: null,
      entry: null,

      winner: null,
      winnerId: undefined,
      winningCombo: null,
      playerWin: false,
      lessBlueWin: false,
      loserId: undefined,
    
    };

    this._createResponse();

    return this.deepCopy(this.response);
  }
// if less blue wins, response must have a response cell and winner
  _createResponse() {
    if(typeof this.responseData.row ==="number" && typeof this.responseData.col === "number"){
      this._fillInCellData(new Cell(this.responseData.row, this.responseData.col));
    }
    if(this.responseData.combo && typeof this.responseData.id !== "undefined"){
      this._fillInWinnerData(new Winner(this.responseData.combo,this.responseData.id))
    } else{
      console.log("invalid data",this.gameData,this.responseData)
      throw new Error("'responseData' has invalid argument");
    
    }
  }

  // __createResponse(){
  //   const responseData = this.responseData;
    
  // }

  _fillInCellData(cell) {
  
    const response = this.response;
    const gameData = this.gameData;
    const entryId = gameData.getPlayField()[cell.row][cell.col];
   

    response.row = cell.row;
    response.col = cell.col;
    response.id = entryId;
    response.cell = cell;
    response.entry = new Entry(cell.row, cell.col, entryId);
  }
  _fillInWinnerData(winner) {
  
    const response = this.response;
    const { playerId, lessBlueId } = this.gameData.get();
    const winnerId = winner.id
    const loserId = winner.id === playerId ? lessBlueId : playerId;
   
    response.winner = winner;
    response.winnerId = winner.id;
    response.winningCombo = winner.combo;
    response.loserId = loserId;
    response.playerWin = winnerId === playerId;
    response.lessBlueWin = winnerId === lessBlueId;

  }


  _checkArguments(gameData, responseData) {
    if (!gameData) {
      throw new Error("'Response' must have argument of type 'gameData'!");
    }
    if(!responseData){
       throw new Error("'Response' must have argument 'responseData' of type 'Cell' or 'Winner'!");
    }
  }
}
