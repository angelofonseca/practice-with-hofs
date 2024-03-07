const data = require('../data/zoo_data');

const getSpeciesByIds = (...ids) => {
  if (!ids) return [];
  const findSpecieById = data.species.filter((specie) => ids.includes(specie.id));
  return findSpecieById;
};
module.exports = getSpeciesByIds;
