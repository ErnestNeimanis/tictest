
export class LessBlueUtils {

    constructor(){
  
    }


comboPossible(combo ,turnId){
    console.log(combo)
    playfield = this.playField
    let combinationLength = combo.length
   
    for(let i = 0; i < combinationLength; i++){
        let row = combo[i].row;
        let col = combo[i].col;
        let pfVal = playfield[row][col];
    
        if(pfVal != 0 && pfVal != turnId){
            return false;
        } 
        if(i === combinationLength - 1 && pfVal != 0 && pfVal != turnId){
            return false;
        }
    }
    return true;
}


    
  rand(min = 0, max = 9) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min); 
}

randArray(min = 0, max = 9, length = 1) {

    let uniqueArray = [];

    for (let i = 0; i < length; i++){
        let random = rand(0,length - 1);
        while(uniqueArray.some(element => element === random)){
            random = rand(0,length - 1);
        }
        uniqueArray.push(random);
    }
    return uniqueArray;
}
}