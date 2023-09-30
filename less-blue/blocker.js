import { ComboUtils } from "./combo-utils.js";
import { Utils } from "./utils.js";
export class Blocker extends ComboUtils {
  constructor(gameData,threshold) {
    super(gameData);
    this.gameData = gameData;
    this.defaultThreshold = Math.floor(this.gameData.getComboLength()/2) ;
    this.threshold;
    if(!threshold){
      this.threshold = this.defaultThreshold;
    }
  }

  /**
   check if blocks needed and return all possible blocks
   if no blocks needed, return an empty array
   */
  blocks(threshold = this.threshold) {
    const blocks = this.efficientBlockingPossibilities(threshold);
    if(blocks.length === 0){
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
    let emergingSorted = this.emergingSortedByThresholds(playerId, threshold)
   // console.log("alllEmerging",emergingSorted)
    let emergingsWithOne = this.emergingSortedByThresholds(playerId, 1)
    const firstComboValues = this.comboEntryIds(allCombos[0])
   // console.log(firstComboValues)


    if (emergingSorted.length === 0) {
      return [];
    }
    
    //priorityBlocks are the blocks for emerging oponent combos with highest threshold
    let priorityBlocks = this.emptyCellsInMultipleCombos(emergingSorted[0]);

    let finalBlocks = [...priorityBlocks];

    for(let i = 0; i < emergingsWithOne.length; i++){
        console.log("emergings ",i ,emergingsWithOne[i].length)
    }

    // for (let i = 0; i < emergingSorted.length; i++) {
    //   let possibilities = this.singleComboBlockingPossibilities(emergingSorted[i], playerId);
    //   priorityBlocks.push(...possibilities);
    // }[]]]]]]]]]]]]]]

    let blocks = this.mostFrequentElements(priorityBlocks);
    console.log("blocks needed",blocks.length)
    return blocks;
  }
}
