import { ComboUtils } from "./combo-utils.js";
import { Utils } from "./utils.js";
export class Blocker extends ComboUtils {
  constructor(gameData) {
    this.gameData = gameData;
    this.utils = new Utils();
    this.defaultThreshold = Math.floor(this.gameData.getComboLength()/2) ;
  }

  /**
   check if blocks needed and return all possible blocks
   if no blocks needed, return an empty array
   */
  blocks() {
    const { playerId } = this.gameData.get();
  }

  blockingPossibilities(combo, id) {
    const { playField, emptyCellValue } = this.gameData.get();

    if (comboPossible(combo, id)) {
      return combo.filter(
        (cell) => playField[cell.row][cell.col] === emptyCellValue
      );
    }
    throw new Error("no blocking possibilities for impossible combo");
  }

  efficientBlockingPossibilities(threshold) {
    const utils = this.utils;
    const { playField, playerId, allCombos } = this.gameData.get();

    let allEmerging = [
      ...getAllEmergingCombos(playField, allCombos, playerId, threshold),
    ];
    if (allEmerging.length === 0) {
      return false;
    }
    /**
     * @type {Array<{row:number,col:number}>}
     */
    let allBlocks = [];

    for (let i = 0; i < allEmerging.length; i++) {
      let possibilities = [
        ...blockingPossibilities(playField, allEmerging[i], opponentId),
      ];
      allBlocks.push(...possibilities);
    }

    let blocks = utils.mostFrequentElements(allBlocks);
    return blocks;
  }
}
