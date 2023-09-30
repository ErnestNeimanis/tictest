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
 
   // console.log("blocks in alg",blocks)
    //console.log("=======================================================")
    if(blocks.length > 0){
      console.log("blocking")
      return blocks[this.rand(0,blocks.length-1)]
    }
    const entries = builder.entries(1);
    //console.log("entries in alg",entries)
     console.log("building")
    return entries[this.rand(0,entries.length-1)];
  }
  



}
