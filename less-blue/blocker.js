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
    //console.log("threshold",threshold)
    let emergingSorted = this.emergingSortedByThresholds(playerId, threshold);
    // console.log("alllEmerging",emergingSorted)
    const emergingsWithOne = this.emergingSortedByThresholds(playerId, 1);
    const firstComboValues = this.comboEntryIds(allCombos[0]);
    // console.log(firstComboValues)

    if (emergingSorted.length === 0) {
      return [];
    }
    const emergingWithHighestThreshold = emergingSorted[0];
    //console.log("emergin sorted",emergi)
    //priorityBlocks are the blocks for emerging oponent combos with highest threshold
    let priorityBlocks = this.emptyCellsFromMultipleCombos(
      emergingWithHighestThreshold
    );

    //

    let finalBlocks = [...priorityBlocks];
    //console.log("emergings with one", emergingsWithOne);
    console.log("*********overlap start********");
    // const overlapping = this.overlappingBlockingPossibilities(emergingsWithOne);
    const res =this.ov(emergingsWithOne)
    console.log(res);
    console.log("*********overlap end********");

    for (let i = 0; i < emergingsWithOne.length; i++) {
     // console.log("emergings ", i, emergingsWithOne[i].length);
    }

    let blocks = this.mostFrequentElements(priorityBlocks);
    //console.log("blocks needed", blocks.length);
    

    return res;
  }
  //Cell[][][]
  overlappingBlockingPossibilities(blocks, i = 0) {
    console.log("blocks as argument", blocks);
    if (i > 1000) {
      throw new Error("stack overflow approaching");
    }
    if (blocks.length < 2) {
      return blocks;
    }
    console.log("rec interation", i);
    const highestPriority = blocks[0];
    const testForOverlaps = blocks[i + 1];

    console.log("highes prior", highestPriority);
    console.log("testforoverlaps", testForOverlaps);

    if (i === blocks.length - 1) {
      const combined = [...highestPriority, ...testForOverlaps];
      const mostFrequent = this.mostFrequentElements(combined);

      console.log("basecase length-1---");
      if (mostFrequent.length === 0) {
        return blocks;
      }
      return mostFrequent;
    }

    const combined = [...highestPriority, ...testForOverlaps];
    const mostFrequent = this.mostFrequentElements(combined);
    return this.overlappingBlockingPossibilities(mostFrequent, ++i);
  }

  ov(allEmergingSorted) {
   
    if(allEmergingSorted.length === 0) {
      return []
    }

    const firstPriorityEmerging = allEmergingSorted[0];
    let firstPriorityBlocks = this.mostFrequentElements(
      this.emptyCellsFromMultipleCombos(firstPriorityEmerging)
    );
    for (let i = 1; i < allEmergingSorted.length; i++) {
      const secondPriorityBlocks = this.emptyCellsFromMultipleCombos(
        allEmergingSorted[i]
      );
      const newPriorityBlocks = this.ovr(firstPriorityBlocks, secondPriorityBlocks);
      firstPriorityBlocks = newPriorityBlocks;
    }
    console.log("firstPriority after filtering",this.sort(firstPriorityBlocks))
    const frequent = this.mostFrequentElements(firstPriorityBlocks);
    const result = this.distinct(frequent);
    console.log("result",result)
    return result;
  }

  ovr(firstPriorityBlocks, secondPriorityBlocks) {
    console.log("===ovr start======")
    const combined = [...firstPriorityBlocks, ...secondPriorityBlocks];
    const mostFrequent = this.mostFrequentElements(combined);
    const newPriorityBlocks = firstPriorityBlocks.filter((block) =>
      mostFrequent.includes(block)
    );
    firstPriorityBlocks = [...firstPriorityBlocks,...newPriorityBlocks]
    console.log("overlaps found",newPriorityBlocks.length)
    console.log("modified firstpriority",this.sort(firstPriorityBlocks))
   
    console.log("===ovr end======")
    return firstPriorityBlocks;
  }

  sort(array){
    return array.sort((a, b) => a.row - b.row);
  }
}
