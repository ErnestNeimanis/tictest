export class Winner {
  constructor(combo, id) {
    this._checkArguments(combo,id)
    this.combo = combo;
    this.id = id;
  }

  _checkArguments(combo, id) {
    if (!combo) {
      throw new Error("Winner must have argument 'combo'");
    }
    if (!id) {
      throw new Error("Winner must have argument 'id'");
    }
  }
}
