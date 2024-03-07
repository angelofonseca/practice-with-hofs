const data = require('../data/zoo_data');

const countAnimals = (animal) => {
  if (!animal) {
    return data.species.reduce((acc, specie) => {
      acc[specie.name] = specie.residents.length;
      return acc;
    }, {});
  }
  const parameterArray = Object.values(animal);
  const getAnimalBySpecies = data.species
    .find((specie) => parameterArray
      .includes(specie.name)).residents;

  const getAnimalBySpeciesAndGender = getAnimalBySpecies
    .filter((resident) => parameterArray
      .includes(resident.sex));

  if (parameterArray.length === 1) return getAnimalBySpecies.length;
  if (parameterArray.length === 2) return getAnimalBySpeciesAndGender.length;
};
module.exports = countAnimals;
