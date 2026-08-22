const dayjs = require('dayjs');

function futureDate(amount = 1, unit = 'day', format = 'YYYY-MM-DD') {
  return dayjs().add(amount, unit).format(format);
}

function futureDateTimeLocal(amount = 1, unit = 'hour') {
  return dayjs().add(amount, unit).format('YYYY-MM-DDTHH:mm');
}

// Returns a dayjs object (not a string) — useful when the calendar
// helper needs to navigate month by month
function futureDateObject(amount = 1, unit = 'day') {
  return dayjs().add(amount, unit);
}

module.exports = { futureDate, futureDateTimeLocal, futureDateObject };