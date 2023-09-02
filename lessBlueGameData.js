import { CombinationGenerator } from "./combinationGenerator.js";
export class GameData {
//  allCombinations;

//  fieldSize;
  //comboLength;
  //playField = [];
  //combo = [];
  //playerId;
  //lessBlueId;


    constructor(initialData){
        this.fieldSize = initialData.fieldSize;
        this.comboLength = initialData.comboLength;
        this.playerId = initialData.playerId;
        this.lessBlueId = initialData.lessBlueId;
        this.allCombinations = new CombinationGenerator(initialData);
        this.playField = this._createPlayField()
        this.activeCombinations = [];
   
        return this;
    }

    _createPlayField(){
        const fieldSize = this.fieldSize;
        return Array(fieldSize).fill(0).map(() => Array(fieldSize).fill(0));
    }

    setActiveCombination(index,combo){
        this.activeCombinations[index] = combo;
    }
    getActiveCombination(index){
        return this.activeCombinations[index]
    }
    getAllActiveCombinations(){
        return this.activeCombinations;
    }

    getPlayField(){
        return this.playField;
    }
}
