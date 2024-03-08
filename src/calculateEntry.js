const data = require('../data/zoo_data');

const countEntrants = (entrants) => entrants.reduce((acc, entrant) => {
  if (entrant.age < 18) {
    acc.child += 1;
  } else if (entrant.age > 17 && entrant.age < 50) {
    acc.adult += 1;
  } else if (entrant.age > 49) {
    acc.senior += 1;
  }
  return acc;
}, { child: 0, adult: 0, senior: 0 });

const calculateEntry = (entrants) => {
  if (!entrants) return 0;
  const totalEntrants = Object.entries(countEntrants(entrants));
  return totalEntrants.reduce((acc, curr) => {
    const currentPrice = data.prices[curr[0]];
    const currentAgeGroup = curr[1];
    return acc + currentPrice * currentAgeGroup;
  }, 0);
};
module.exports = { calculateEntry, countEntrants };
