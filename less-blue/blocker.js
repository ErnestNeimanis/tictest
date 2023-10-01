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
   // console.log("*********overlap start********");
    // const overlapping = this.overlappingBlockingPossibilities(emergingsWithOne);
    const res =this.firstPriorityBlocksWithMostOverlaps(emergingsWithOne)
   // console.log(res);
   // console.log("*********overlap end********");

    for (let i = 0; i < emergingsWithOne.length; i++) {
     // console.log("emergings ", i, emergingsWithOne[i].length);
    }

    let blocks = this.mostFrequentElements(priorityBlocks);
    //console.log("blocks needed", blocks.length);
    
    //return res;
    console.log("blocks before neighbours searched",res)
    return this.cellsWithMostNeighbours(res,playerId);
  }
  //Cell[][][]


  firstPriorityBlocksWithMostOverlaps(allEmergingSorted) {
   const { playerId} = this.gameData.get()
    if(allEmergingSorted.length === 0) {
      return []
    }
console.log("allemergingSorted",allEmergingSorted)
    const firstPriorityEmerging = allEmergingSorted[0];
    let firstPriorityBlocks = this.mostFrequentElements(
      this.emptyCellsFromMultipleCombos(firstPriorityEmerging)
    );
  
    for (let i = 1; i < allEmergingSorted.length; i++) {
      const secondPriorityBlocks = this.emptyCellsFromMultipleCombos(
        allEmergingSorted[i]
      );
      console.log("priority iteration:",i)
      const newPriorityBlocks = this.fileterOverlappingWithLowerPriorityBlocks(firstPriorityBlocks, secondPriorityBlocks);
      firstPriorityBlocks = newPriorityBlocks;
  
    }
    console.log("firstPriority after filtering",this.sort(firstPriorityBlocks))
    const frequent = this.mostFrequentElements(firstPriorityBlocks);
    const result = this.distinct(frequent);
    console.log("result",result)
    return result;
  }

  fileterOverlappingWithLowerPriorityBlocks(firstPriorityBlocks, secondPriorityBlocks) {
  //  console.log("===fileterOverlappingWithLowerPriorityBlocks start======")
    const combined = [...firstPriorityBlocks, ...secondPriorityBlocks];
    const mostFrequent = this.mostFrequentElements(combined);
    const newPriorityBlocks = firstPriorityBlocks.filter((block) =>
      mostFrequent.includes(block)
    );
    firstPriorityBlocks = [...firstPriorityBlocks,...newPriorityBlocks]
   // console.log("overlaps found",newPriorityBlocks.length)
   // console.log("modified firstpriority",this.sort(firstPriorityBlocks))
   
    //console.log("===fileterOverlappingWithLowerPriorityBlocks end======")
    return firstPriorityBlocks;
  }

  mostNeighbours(blocks){
    const {playerId} = this.gameData.get();
    const closest = blocks.filter((block)=>{
        let neighbourCount = 0;

        const {row,col} = block;





    })
  }

  sort(array){
    return array.sort((a, b) => a.row - b.row);
  }
}
