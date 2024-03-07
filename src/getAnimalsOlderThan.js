const data = require('../data/zoo_data');

const getAnimalsOlderThan = (animal, age) => {
  const result = data.species.find((specie) => specie.name === animal).residents
    .filter((resident) => resident.age < age).length;
  if (result) return false;
  return true;
};
module.exports = getAnimalsOlderThan;
