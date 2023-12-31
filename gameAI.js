export function horizontalCombinations(fieldSize, comboLength) {
  let tempArray = [];
  let startingCol = 0;
  let startingRow = 0;

  while (startingCol < fieldSize - comboLength + 1) {
    while (startingRow < fieldSize) {
      let combination = [];
      for (let i = startingCol; i < startingCol + comboLength; i++) {
        combination.push({ row: startingRow, col: i });
      }
      //allCombos.push(combination)
      tempArray.push(combination);
      startingRow++;
    }
    startingCol++;
    startingRow = 0;
  }

  return tempArray;
}

export function verticalCombinations(fieldSize, comboLength) {
  let tempArray = [];
  let startingCol = 0;
  let startingRow = 0;

  while (startingRow <= fieldSize - comboLength) {
    while (startingCol < fieldSize) {
      let combination = [];
      for (let i = startingRow; i < startingRow + comboLength; i++) {
        combination.push({ row: i, col: startingCol });
      }
      //allCombos.push(combination)

      tempArray.push(combination);
      startingCol++;
    }
    startingCol = 0;
    startingRow++;
  }

  return tempArray;
}

export function diagonalCombinationsLeft(fieldSize, comboLength) {
  let tempArray = [];
  let startingCol = 0;
  let startingRow = 0;

  while (startingRow <= fieldSize - comboLength) {
    while (startingCol <= fieldSize - comboLength) {
      let combination = [];
      for (let i = startingRow; i < startingRow + comboLength; i++) {
        combination.push({ row: i, col: startingCol + i - startingRow });
      }
      tempArray.push(combination);
      startingCol++;
    }
    startingCol = 0;
    startingRow++;
  }
  return tempArray;
}
export function diagonalCombinationsRight(fieldSize, comboLength) {
  let tempArray = [];
  let startingCol = comboLength - 1;
  let startingRow = 0;

  while (startingRow <= fieldSize - comboLength) {
    while (startingCol < fieldSize) {
      let combination = [];
      for (let i = startingRow; i < startingRow + comboLength; i++) {
        combination.push({ row: i, col: startingCol - (i - startingRow) });
      }
      tempArray.push(combination);
      startingCol++;
    }
    startingCol = comboLength - 1;
    startingRow++;
  }
  return tempArray;
}

export function createAllCombinations(fieldSize, comboLength) {
  return [
    ...horizontalCombinations(fieldSize, comboLength),
    ...verticalCombinations(fieldSize, comboLength),
    ...diagonalCombinationsLeft(fieldSize, comboLength),
    ...diagonalCombinationsRight(fieldSize, comboLength),
  ];
}

export function rand(min = 0, max = 9) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min);
}

export function randArray(min = 0, max = 9, length = 1) {
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

export function comboPossible(pfv, combo, turnId) {
  // console.log('3 len ' , combo.length)
  let combinationLength = combo.length;

  for (let i = 0; i < combinationLength; i++) {
    let row = combo[i].row;
    let col = combo[i].col;
    let pfVal = pfv[row][col];

    if (pfVal != 0 && pfVal != turnId) {
      return false;
    }
    if (i === combinationLength - 1 && pfVal != 0 && pfVal != turnId) {
      //  processGameStep_AI(rand(0,size -1),rand(0, size -1));
      return false;
    }
  }
  return true;
}

function cellAvailable(pfv, cell) {
  return pfv[cell.row][cell.col] === 0;
}

export function randomEntryInCombo(pfv, comboArray) {
  const availableCells = comboArray.filter((cell) => cellAvailable(pfv, cell));
  return availableCells[rand(0, availableCells.length - 1)];
}

const allPossibleEntriesInCombo = (pfv, combo) => {
  return combo.map((element) => pfv[element.row][element.col] === 0);
};

//what is all combos???
export function choseRandomCombo(pfv, allCombos, turnId = 2) {
  let random = rand(0, allCombos.length - 1);
  while (!comboPossible(pfv, allCombos[random], turnId)) {
    random = rand(0, allCombos.length - 1);
  }
  return allCombos[random];
}

export function isEmergingCombo(pfv, combo, turnId, threshold) {
  return (
    comboPossible(pfv, combo, turnId) &&
    arrayOccurances(comboValuesFromIndexes(pfv, combo), turnId) >= threshold
  );
}
//turns the {row,col} array into array of the values in playfield that are
//that are entry ids
export function comboValuesFromIndexes(pfv, combo) {
  let r = combo.map((element) => pfv[element.row][element.col]);
  return r
}

export function arrayOccurances(array, id) {
  return array.reduce((count, val) => (val === id ? count + 1 : count), 0);
}

export const allEmergingCombos = (pfv, allCombos, turnId, threshold) => {
  return allCombos.filter((combo) =>
    isEmergingCombo(pfv, combo, turnId, threshold)
  );
};

export const blockingPossibilities = (pfv, combo, opponentId) => {
 
  if (comboPossible(combo, opponentId)) {
    //  console.log(combo)
    return combo.filter((element) => pfv[element.row][element.col] === 0);
  }
  throw new Error("no blocking possibilities for impossible combo");
};

export const blockNecessary = (pfv, allCombos, opponentId, threshold) => {
  return allEmergingCombos(pfv, allCombos, opponentId, threshold) > 0;
};

export const randomBlock = (
  pfv,
  allCombos,
  opponentId,
  threshold,
  callback
) => {
  let emergingComboos = allEmergingCombos(
    pfv,
    allCombos,
    opponentId,
    threshold
  );
  if (emergingComboos.length == 0) {
    return false;
  }
  let combo = emergingComboos[rand(0, emergingComboos.length - 1)];
  //  console.log("in randomblock  ",combo)
  let possibilities = blockingPossibilities(pfv, combo, opponentId);

  if (typeof callback == "function") {
    callback(possibilities[rand(0, possibilities.length - 1)]);
  }
  return true;
  // return possibilities[rand(0,possibilities.length)]
};


//finds the most fequent blocking possibility
//thus trying to block more then one emerging
//oponents combo if possible
export function efficientBlock (
  pfv,
  allCombos,
  opponentId,
  threshold,
) {


  let allEmerging = allEmergingCombos(pfv, allCombos, opponentId, threshold)
  
  console.log("allEmerging",allEmerging)
  if (allEmerging.length == 0) {
    return false;
  }
  /**
   * @type {Array<{row:number,col:number}>}
   */
  let allBlocks = [];

  for (let i = 0; i < allEmerging.length; i++) {
    let possibilities = [
      ...blockingPossibilities(pfv, allEmerging[i], opponentId),
    ];
   
    allBlocks.push(...possibilities);
  }

  let block =  mostFrequentMultipleRandom(allBlocks);
  return block;
};

export function mostFrequent(array) {
  let newArr = array.map((element) => JSON.stringify(element));
  let resultIndex = 0;
  let maxCount = 0;

  for (let i = 0; i < newArr.length; i++) {
    let occurances = arrayOccurances(newArr, newArr[i]);
    if (occurances > maxCount) {
      maxCount = occurances;
      resultIndex = i;
    }
  }
  return array[resultIndex];
}

  function stringifyArrayElements(array){
    return  array.map((element) => JSON.stringify(element));
  }
  /**
   * @param {Array<{row:number,col:number}>}
   * 
   * returns an array containing the most frequent elements
   * there will be more the one element in the array
   * only if there are two or more elements that have been the most frequent
   */
export function mostFrequentMultiple(array) {

  let newArr = stringifyArrayElements(array)
  let maxCount = 0;
  let indexes = new Set();

  for (let i = 0; i < newArr.length; i++) {
    /**
     * @type {number}
     */
    let occurances = arrayOccurances(newArr, newArr[i]);
    
    if (occurances > maxCount) {
      maxCount = occurances;
      indexes = [i];
    }
    if (occurances === maxCount) {
      indexes.push(i);
    }
  }
  //  console.log(indexes)
  return Array.from(new Set(indexes.map((i) => array[i])));
};

export function mostFrequentMultipleRandom (array) {
  let values = mostFrequentMultiple(array);
  let result = values[rand(0, values.length - 1)];
  return result;
};

export const prioratizedBlocking = (
  pfv,
  allCombos,
  comboLength,
  opponentId,
  threshold
) => {
  for (let i = comboLength; i >= threshold; i--) {
    const efficient = efficientBlock(pfv, allCombos, opponentId, i)
    if (efficient) {
      return efficient;
    }
  }
  return false;
};

//of all emerging combos chose the one with least possible entries
export const prioratizeNewComboWithRandom = (
  pfv,
  allCombos,
  comboLength,
  AI_id
) => {
  let threshold = 1;
  let emCombos = [];

  for (let i = comboLength; i >= threshold; i--) {
    emCombos = allCombos.filter((combo) =>
      isEmergingCombo(pfv, combo, AI_id, i)
    );
    if (emCombos.length > 0) {
      console.log("starting prioritized combo with threshold: ", i);
      return emCombos[rand(0, emCombos.length - 1)];
    }
    emCombos = [];
  }
  //throw new Error('didnt find prioritized combos')
  //console.log('chosing new combo at random')
  return choseRandomCombo(pfv, allCombos, AI_id);
};
