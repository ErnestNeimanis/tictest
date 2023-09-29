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
    
    let allEmerging = this.getAllEmergingCombos(playerId, threshold,"from blocker")
   // console.log("alllEmerging",allEmerging)
    
    const firstComboValues = this.comboEntryIds(allCombos[0])
   // console.log(firstComboValues)


    if (allEmerging.length === 0) {
      return [];
    }
    /**
     * @type {Array<{row:number,col:number}>}
     */
    let allBlocks = [];

    for (let i = 0; i < allEmerging.length; i++) {
      let possibilities = this.singleComboBlockingPossibilities(allEmerging[i], playerId);
      allBlocks.push(...possibilities);
    }

    let blocks = this.mostFrequentElements(allBlocks);
    return blocks;
  }
}
