const data = require('../data/zoo_data');

const getSpeciesByIds = (...ids) => {
  if (!ids) return [];
  return data.species.filter((specie) => ids.includes(specie.id));
};
module.exports = getSpeciesByIds;
