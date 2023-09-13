import { ComboUtils } from "./combo-utils.js";
import { Blocker } from "./blocker.js";
import { Builder } from "./builder.js";
import { GameData } from "./game-data.js";
export class Algorithm extends ComboUtils {
  constructor(gameData) {
    super(gameData);
    this.gameData = new GameData(gameData);
    this.builder = new Builder(this.gameData);
    this.blocker = new Blocker(this.gameData);
  }

  



}
