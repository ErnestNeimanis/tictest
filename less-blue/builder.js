import { ComboUtils } from "./combo-utils.js";
import { Cell } from "./cell.js";
export class Builder extends ComboUtils {
  constructor(gameData) {
    super(gameData);
    this.gameData = gameData;
    this.defaultThreshold = 1
  }

  entries(threshold = this.defaultThreshold) {
    return this.efficientEntryPossibilities(threshold);
  }

  singleComboEntryPossibilities(combo, id) {
    if (this.comboPossible(combo, id)) {
      return this.emptyCellsInCombo(combo);
    }
  }

  efficientEntryPossibilities(threshold) {
    threshold = 1;
    const {
      playField,
      playerId,
      lessBlueId,
      allCombos,
      fieldSize,
    } = this.gameData.get();


    let allEmerging = this.getAllEmergingCombos(lessBlueId,threshold);
    

    if(allEmerging.length === 0){
        let randomCell = new Cell(this.rand(fieldSize-1),this.rand(fieldSize-1))
        return [randomCell];
    }

    let allEntries = []

    for(let i = 0; i < allEmerging.length; i++){
        let possibilities = this.singleComboEntryPossibilities(allEmerging[i]);
        allEntries.push(...possibilities);
    }

    let possibilities = this.mostFrequentElements(allEntries);
    return possibilities;
  }
}
