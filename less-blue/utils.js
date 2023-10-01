export class Utils {
  constructor() {}

  arrayOccurrences(array, id) {
    return array.reduce((count, val) => (val === id ? count + 1 : count), 0);
  }

  rand(min = 0, max = 9) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  randArray(min = 0, max = 9, length = 1) {
    let uniqueArray = [];

    for (let i = 0; i < length; i++) {
      let random = rand(0, length - 1);
      while (uniqueArray.some((element) => element === random)) {
        random = rand(0, length - 1);
      }
      uniqueArray.push(random);
    }
    return uniqueArray;
  }

  stringifyArrayElements(array) {
    return array.map((element) => JSON.stringify(element));
  }

  //returns most frequent element
  mostFrequent(array) {
    let newArr = this.stringifyArrayElements(array);
    let resultIndex = 0;
    let maxCount = 0;

    for (let i = 0; i < newArr.length; i++) {
      let occurances = this.arrayOccurences(newArr, newArr[i]);
      if (occurances > maxCount) {
        maxCount = occurances;
        resultIndex = i;
      }
    }
    return array[resultIndex];
  }

  //returns an array of all most frequent elements
 mostFrequentElements(array) {
  let newArr = this.stringifyArrayElements(array);
  let maxCount = 0;
  let indexes = new Set();

  // Find the maximum occurrence count
  for (let i = 0; i < newArr.length; i++) {
    let occurances = this.arrayOccurrences(newArr, newArr[i]);

    if (occurances > maxCount) {
      maxCount = occurances;
    }
  }

  // Find elements that match the maximum occurrence count
  for (let i = 0; i < newArr.length; i++) {
    let occurances = this.arrayOccurrences(newArr, newArr[i]);

    if (occurances === maxCount) {
      indexes.add(i);
    }
  }

  return Array.from(indexes).map((i) => array[i]);
}

  //returns one of the most requent elements at random
  mostFrequentRandom(array) {
    let values = this.mostFrequentElements(array);
    let result = values[rand(0, values.length - 1)];
    return result;
  }

  deepCopyWithStringify(obj) {
    return JSON.parse(JSON.stringify(obj));
  }

  deepCopy(obj) {
    if (obj === null || typeof obj !== "object") {
      return obj;
    }

    if (Array.isArray(obj)) {
      const arrCopy = [];
      for (let i = 0; i < obj.length; i++) {
        arrCopy[i] = this.deepCopy(obj[i]);
      }
      return arrCopy;
    }

    const objCopy = {};
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        objCopy[key] = this.deepCopy(obj[key]);
      }
    }

    return objCopy;
  }

  //distinct aint workin
  distinct(array){
    const strArr = this.stringifyArrayElements(array);
    const strArrSet = new Set(strArr);
    const backToArr = Array.from(strArrSet)
    try {
       const result = backToArr.map(el => JSON.parse(el))
        return result
    } catch (error) {
      console.log(error)
      return array;
    }
  }
}
