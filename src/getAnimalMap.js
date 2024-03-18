const data = require('../data/zoo_data');

const locations = ['NE', 'NW', 'SE', 'SW'];

const getSpeciesByLocation = () => {
  const result = locations.reduce((acc, location) => {
    acc[location] = data.species
      .filter((specie) => specie.location === location)
      .map((curr) => curr.name);
    return acc;
  }, {});
  return result;
};
const mapAnimalNames = (speciesName, options) => {
  // includesName
  let result = data.species
    .find((specie) => specie.name === speciesName).residents
    .map(({ name }) => name);
  if (options.sex) {
    // includesName && sex
    result = data.species
      .find((specie) => specie.name === speciesName).residents
      .filter(({ sex }) => sex === options.sex).map(({ name }) => name);
  }
  if (options.sorted === true) {
    // (includesName && sorted) || (includesName && sex && sorted)
    return result.sort((a, b) => a.localeCompare(b));
  }
  return result;
};
const filterSpecies = (options) => {
  // Verifica se inclui nomes
  if (!(options.includeNames)) return getSpeciesByLocation();
  // Retorna objeto com informaçoes dos animais
  const result = locations.reduce((acc, location) => {
    acc[location] = data.species
      .reduce((acc2, specie) => {
        if (specie.location === location) {
          const obj = {
            [specie.name]: mapAnimalNames(specie.name, options),
          };
          acc2.push(obj);
        }
        return acc2;
      }, []);
    return acc;
  }, {});
  return result;
};

const getAnimalMap = (options) => {
  if (!options) {
    return getSpeciesByLocation();
  }
  return filterSpecies(options);
};

module.exports = getAnimalMap;
