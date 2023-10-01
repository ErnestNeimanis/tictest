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


     if (emergingSorted.length < threshold) {
      let randomCell = this.randomCell()
      return [randomCell];
    }

    const possibilitiesWithMostOverlaps = this.firstPriorityWithMostOverlaps(emergingSorted)
    const possibilitiesWithMostNeighbours =this.cellsWithMostNeighbours(possibilitiesWithMostOverlaps,lessBlueId);
    const result =  possibilitiesWithMostNeighbours;
    return result;

    let allEntries = this.emptyCellsFromMultipleCombos(emergingSorted[0]);
    const emergingWithHighestThreshold = emergingSorted[0];
 
    let possibilities = this.mostFrequentElements(allEntries);
    console.log("builder returningpossibviltioes", possibilities);
    return possibilities;
  }

 

   firstPriorityWithMostOverlaps(allEmergingSorted) {
   
    if(allEmergingSorted.length === 0) {
      return []
    }

    const firstPriorityEmerging = allEmergingSorted[0];
    let firstPriorityCells = this.mostFrequentElements(
      this.emptyCellsFromMultipleCombos(firstPriorityEmerging)
    );
    for (let i = 1; i < allEmergingSorted.length; i++) {
      const secondPriority = this.emptyCellsFromMultipleCombos(
        allEmergingSorted[i]
      );
      console.log("priority iteration:",i)
      const newPriorityCells = this.fileterOverlappingWithLowerPriority(firstPriorityCells, secondPriority);
      firstPriorityCells = newPriorityCells;
    }
    console.log("firstPriority after filtering",this.sort(firstPriorityCells))
    const frequent = this.mostFrequentElements(firstPriorityCells);
    const result = this.distinct(frequent);
    console.log("result",result)
    return result;
  }

  fileterOverlappingWithLowerPriority(firstPriorityCells, secondPriority) {
    console.log("===fileterOverlappingWithLowerPriorityEntries start======")
    const combined = [...firstPriorityCells, ...secondPriority];
    const mostFrequent = this.mostFrequentElements(combined);
    const newPriorityCells = firstPriorityCells.filter((block) =>
      mostFrequent.includes(block)
    );
    firstPriorityCells = [...firstPriorityCells,...newPriorityCells]
    console.log("overlaps found",newPriorityCells.length)
   // console.log("modified firstpriority",this.sort(firstPriorityCells))
   
    console.log("===fileterOverlappingWithLowerPriorityEntries end======")
    return firstPriorityCells;
  }

  sort(array){
    return array.sort((a, b) => a.row - b.row);
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
