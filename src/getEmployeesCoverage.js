const data = require('../data/zoo_data');

const getEmployeesInfo = () => data.employees.map((employee) => {
  const findCurrSpecie = employee.responsibleFor
    .map((animalId) => data.species
      .find((specie) => specie.id === animalId).name);

  const findCurrLocation = employee.responsibleFor
    .map((animalId) => data.species
      .find((specie) => specie.id === animalId).location);

  return {
    id: employee.id,
    fullName: `${employee.firstName} ${employee.lastName}`,
    species: findCurrSpecie,
    locations: findCurrLocation,
  };
});

const validateInfo = (param) => {
  const paramValues = Object.values(param);
  const checkInfo = data.employees
    .find((employee) => paramValues.includes(employee.firstName)
      || paramValues.includes(employee.lastName)
      || paramValues.includes(employee.id));
  if (!checkInfo) throw new Error('Informações inválidas');
  return getEmployeesInfo().find((employee) => employee.id === checkInfo.id);
};

const getEmployeesCoverage = (param) => {
  if (param === undefined) return getEmployeesInfo();
  return validateInfo(param);
};

module.exports = getEmployeesCoverage;
