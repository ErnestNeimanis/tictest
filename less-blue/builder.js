import { ComboUtils } from "./combo-utils.js";
import { Cell } from "./cell.js";
export class Builder extends ComboUtils {
  constructor(gameData) {
    super(gameData);
    this.gameData = gameData;
    this.defaultThreshold = 1;
  }

  entries(threshold = this.defaultThreshold) {
    return this.efficientEntryPossibilities(threshold);
  }

  singleComboEntryPossibilities(combo, id) {
    const possible = this.comboPossible(combo, id);

    if (possible) {
      const emptyCells = this.emptyCellsInCombo(combo);

      return emptyCells;
    }

    // if (this.comboPossible(combo, id)) {
    //   return this.emptyCellsInCombo(combo);
    // }
  }

  efficientEntryPossibilities(threshold = this.defaultThreshold) {
    threshold = 1;
    const {
      playField,
      playerId,
      lessBlueId,
      allCombos,
      fieldSize,
      comboLength,
    } = this.gameData.get();

    const emergingSorted = this.emergingSortedByThresholds(lessBlueId, 1);

    let allEmerging = this.getAllEmergingCombos(lessBlueId, threshold);

    if (emergingSorted.length === 0) {
      let randomCell = new Cell(
        this.rand(fieldSize - 1),
        this.rand(fieldSize - 1)
      );
      return [randomCell];
    }

    let allEntries = this.emptyCellsFromMultipleCombos(emergingSorted[0]);

 
    let possibilities = this.mostFrequentElements(allEntries);
    console.log("builder returningpossibviltioes", possibilities);
    return possibilities;
  }

 

  emergingWithHighestThershold(threshold = this.defaultThreshold) {
    const { lessBlueId, comboLength } = this.gameData.get();
    for (let i = comboLength; i < threshold; i--) {
      const tempThreshold = i;
      const emerging = this.getAllEmergingCombos(lessBlueId, tempThreshold);
      if (emerging.length > 0) {
        return emerging;
      }
    }
    return [];
  }
}
