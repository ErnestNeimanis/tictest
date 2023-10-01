import { ComboUtils } from "./combo-utils.js";
import { Blocker } from "./blocker.js";
import { Builder } from "./builder.js";
import { GameData } from "./game-data.js";
export class Algorithm extends ComboUtils {
  constructor(gameData) {
    /**
     * playField,emptyCellId,playerId,lessBlueId
     */
    super(gameData);
    this.gameData = gameData;
    this.builder = new Builder(this.gameData);
    this.blocker = new Blocker(this.gameData);
  }

  choseCell(){
    const blocker =  this.blocker;
    const builder = this.builder;
    const blocks = blocker.blocks();
    const entries = builder.entries(1);

   const critical = this.critical();
   if(critical){
    return critical;
   }

    if(blocks.length > 0){
      const mostOverlaps = 
      this.fileterOverlappingWithLowerPriority(blocks,entries);
      const mostFrequent = this.mostFrequentElements(mostOverlaps)
      const result = mostFrequent[this.rand(0,mostFrequent.length-1)]
      console.log("blocking")
      return result;
    }

    //console.log("entries in alg",entries)
     console.log("building")
    return entries[this.rand(0,entries.length-1)];
  }
  

critical(){

    const {playerId,lessBlueId} = this.gameData.get();

 const critical = this.comobsWithCriticalThreshold(lessBlueId);
    if(critical.length > 0){
        console.log("critical",critical)
      const randomCombo = critical[this.rand(0,critical.length-1)];
      const empty = this.emptyCellsInCombo(randomCombo)
      if(empty.length > 0){
        return empty[0]
      }
      return [];
    }
}

}
