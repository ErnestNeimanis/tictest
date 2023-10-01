import { ComboUtils } from "./combo-utils.js";
import { Utils } from "./utils.js";
export class Blocker extends ComboUtils {
  constructor(gameData, threshold) {
    super(gameData);
    this.gameData = gameData;
    this.defaultThreshold = Math.floor(this.gameData.getComboLength() / 2);
    this.threshold;
    if (!threshold) {
      this.threshold = this.defaultThreshold;
    }
  }

  /**
   check if blocks needed and return all possible blocks
   if no blocks needed, return an empty array
   */
  blocks(threshold = this.threshold) {
    const blocks = this.efficientBlockingPossibilities(threshold);
    if (blocks.length === 0) {
      return [];
    }
    return blocks;
  }

  singleComboBlockingPossibilities(combo, opponentId) {
    if (this.comboPossible(combo, opponentId)) {
      return this.emptyCellsInCombo(combo);
    }
    throw new Error("no blocking possibilities for impossible combo");
  }

  efficientBlockingPossibilities(threshold) {
    const { playField, playerId, allCombos } = this.gameData.get();
    const emergingSorted = this.emergingSortedByThresholds(playerId, 1);

    if (emergingSorted.length < threshold) {
      return [];
    }
    const blocksWithMostOverlaps = this.firstPriorityWithMostOverlaps(
      emergingSorted
    );
    const blocksWithMostNeighbours = this.cellsWithMostNeighbours(
      blocksWithMostOverlaps,
      playerId
    );
    const result = blocksWithMostNeighbours;
    return result;
  }
  //Cell[][][]

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

  mostNeighbours(blocks) {
    const { playerId } = this.gameData.get();
    const closest = blocks.filter((block) => {
      let neighbourCount = 0;

      const { row, col } = block;
    });
  }

  sort(array) {
    return array.sort((a, b) => a.row - b.row);
  }
}
