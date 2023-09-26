export class Cell{
    /** 
    @param {number} row
    @param {number} col

    */
    constructor(row,col){
 
        if(typeof row !== 'number' || typeof col !== 'number'){
            if(!row && !col){
                throw new Error("Cell must have arguments 'row' and 'col'")
            }
            else if(!row){
                throw new Error("Cell must have argument 'row'")
            } else if(!col){
                 throw new Error("Cell must have argument 'col'")
            }
        }
        this.row = row;
        this.col = col;
    }


}