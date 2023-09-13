import Cell from './cell.js';
export class Entry {
  constructor(row, col,id) {

    this.row = row;
    this.col = col;
    this.cell = new Cell(this.row, this.col);
    this.id = id;
  }
}
