class Entry{
    constructor(row,col,id){
        this.row = row;
        this.col = col;
        this.id = id;
        return {
            row:this.row,
            col:this.col,
            id:this.id};
    }
}