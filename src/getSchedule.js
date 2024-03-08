const data = require('../data/zoo_data');

const getDailyExhibition = (day) => {
  if (day === 'Monday') {
    return {
      officeHour: 'CLOSED',
      exhibition: 'The zoo will be closed!',
    };
  }

  const openingHour = Object.values(data.hours[day])[0];
  const ClosingHour = Object.values(data.hours[day])[1];
  return {
    officeHour: `Open from ${openingHour}am until ${ClosingHour}pm`,
    exhibition: data.species
      .filter((specie) => specie.availability.includes(day))
      .map((currentSpecie) => currentSpecie.name),
  };
};

const getWeekExhibition = () => Object.keys(data.hours).reduce((acc, currDay) => {
  acc[currDay] = getDailyExhibition(currDay);
  return acc;
}, {});

const getSchedule = (scheduleTarget) => {
  const findSpecie = data.species.find((specie) => scheduleTarget === specie.name);
  const findDay = Object.keys(data.hours).find((day) => scheduleTarget === day);

  if (findSpecie) return findSpecie.availability;
  if (findDay) return { [scheduleTarget]: getDailyExhibition(scheduleTarget) };
  return getWeekExhibition();
};
module.exports = getSchedule;
