
export class Utils {

    constructor(){
  
    }




arrayOccurances(array, id) {
  return array.reduce((count, val) => (val === id ? count + 1 : count), 0);
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

stringifyArrayElements(array){
    return  array.map((element) => JSON.stringify(element));
  }

//returns most frequent element
mostFrequent(array) {
  let newArr = this.stringifyArrayElements(array);
  let resultIndex = 0;
  let maxCount = 0;

  for (let i = 0; i < newArr.length; i++) {
    let occurances = this.arrayOccurances(newArr, newArr[i]);
    if (occurances > maxCount) {
      maxCount = occurances;
      resultIndex = i;
    }
  }
  return array[resultIndex];
}

//returns an array of all most frequent elements
mostFrequentElements(array) {

  let newArr = stringifyArrayElements(array)
  let maxCount = 0;
  let indexes = new Set();

  for (let i = 0; i < newArr.length; i++) {
    /**
     * @type {number}
     */
    let occurances = this.arrayOccurances(newArr, newArr[i]);
    
    if (occurances > maxCount) {
      maxCount = occurances;
      indexes = [i];
    }
    if (occurances === maxCount) {
      indexes.push(i);
    }
  }
  return Array.from(new Set(indexes.map((i) => array[i])));
}

//returns one of the most requent elements at random
mostFrequentRandom (array) {
  let values = this.mostFrequentElements(array);
  let result = values[rand(0, values.length - 1)];
  return result;
}



}

