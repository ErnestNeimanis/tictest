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
    this.gameData = new GameData(gameData);
    this.builder = new Builder(this.gameData);
    this.blocker = new Blocker(this.gameData);
  }

  choseCell(){
    const blocker =  this.blocker;
    const builder = this.builder;
    const blocks = blocker.blocks();
    if(blocks){
      return blocks[this.rand(0,blocks.length-1)]
    }

    





  }
  



}
