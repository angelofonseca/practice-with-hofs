const data = require('../data/zoo_data');

const isManager = (id) => {
  const findManager = data.employees.find((employee) => employee.managers.includes(id));
  if (findManager) return true;
  return false;
};

const getRelatedEmployees = (managerId) => {
  if (isManager(managerId)) {
    const result = data.employees.filter((employee) => employee.managers.includes(managerId));
    return result.map((employee) => `${employee.firstName} ${employee.lastName}`);
  }
  throw new Error('O id inserido não é de uma pessoa colaboradora gerente!');
};

module.exports = { isManager, getRelatedEmployees };
