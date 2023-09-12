import { ComboAnalisizer } from "./combo-analizer";
import { Utils } from "./utils";
class Blocker extends ComboAnalisizer {
  constructor(gameData) {
    this.gameData = gameData;
    this.utils = new Utils();
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
