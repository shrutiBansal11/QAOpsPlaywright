/**
 * Selects a future date from a calendar popup widget.
 * Assumes: clicking the input opens a calendar, with a "Next month" button
 * and day cells rendered with role="gridcell" or as buttons with the day number.
 */
async function selectDateFromCalendar(page, targetDayjsDate, inputLabel = 'Event Date') {
  const targetMonthYear = targetDayjsDate.format('MMMM YYYY'); // "October 2026"
  const targetDay = targetDayjsDate.format('D');               // "21"

  // Open the calendar
  await page.getByLabel(inputLabel).click();

  // Click "Next month" until the header matches our target month/year
  const maxAttempts = 24; // safety limit — avoid infinite loop
  let attempts = 0;
  while (!(await page.getByText(targetMonthYear).isVisible()) && attempts < maxAttempts) {
    await page.getByRole('button', { name: 'Next month' }).click();
    attempts++;
  }

  if (attempts === maxAttempts) {
    throw new Error(`Could not navigate calendar to ${targetMonthYear}`);
  }

  // Click the exact day (exact match avoids clicking a "greyed out" adjacent-month 21)
  await page.getByRole('gridcell', { name: targetDay, exact: true }).click();
}

module.exports = { selectDateFromCalendar };