const characters = [
    {
      name: "Luke Skywalker",
      height: 172,
      mass: 77,
      eye_color: "blue",
      gender: "male",
    },
    {
      name: "Darth Vader",
      height: 202,
      mass: 136,
      eye_color: "yellow",
      gender: "male",
    },
    {
      name: "Leia Organa",
      height: 150,
      mass: 49,
      eye_color: "brown",
      gender: "female",
    },
    {
      name: "Anakin Skywalker",
      height: 188,
      mass: 84,
      eye_color: "blue",
      gender: "male",
    },
  ];

  const names = characters.map((character) => character.name);
  const height = characters.map((character) => character.height);
  const obj = characters.map((character) => ({name: character.name, height: character.height}))

  const totalMass = characters.reduce((acc, character) => acc+character.mass,0)
  const totalHeight = characters.reduce((acc, character) => acc+character.height,0)
  const getByEyeColor = (eyeColor) => characters.reduce((acc, character) => character.eye_color === eyeColor ? acc+= 1 : acc, 0)

  const largerThan100 = characters.filter(character => character.mass > 100)
  const lessThan100 =  characters.filter(character => character.mass < 100)
  const male = characters.filter(character => character.gender === "male")
  const female = characters.filter(character => character.gender = 'female')

  const sortByName = characters.map(character => character.name).sort()
  const sortByMass = characters.map(character => character.mass).sort((a,b) => a-b)
  const sortByHeight = characters.map(character => character.height).sort((a,b) => a-b)
  const sortByGender = characters.map(character => character.height).sort()

  const everyBlue =  characters.every(character => character.eye_color === 'blue')
  const everyLargerThan40 =  characters.every(character => character.mass > 40)
  const everyLessThan200 =  characters.every(character => character.mass < 200)
  const allMale = characters.every(character => character.gender === 'male')

  const someMale = characters.some(character => character.gender === 'male')
  const someBlue =  characters.some(character => character.eye_color === 'blue')
  const someTallerThan200 =  characters.some(character => character.height > 200)
  const someLigherThan50=  characters.some(character => character.weight < 50)

  
