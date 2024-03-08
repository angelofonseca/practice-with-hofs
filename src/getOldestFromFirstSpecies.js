const data = require('../data/zoo_data');

const getOldestFromFirstSpecies = (id) => {
  const findEmployee = data.employees.find((employee) => employee.id === id);
  const findSpecieId = findEmployee.responsibleFor[0];
  const findSpecieByEmployee = data.species.find((specie) => specie.id === findSpecieId);
  const getOldestAnimal = findSpecieByEmployee.residents
    .reduce((acc, resident) => (acc.age < resident.age ? resident : acc));
  return Object.values(getOldestAnimal);
};
module.exports = getOldestFromFirstSpecies;
