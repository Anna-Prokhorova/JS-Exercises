// @ts-check
export const WORK_HOURS_A_DAY = 8;
export const BILLABLE_DAYS = 22;
/**
 * The day rate, given a rate per hour
 *
 * @param {number} ratePerHour
 * @returns {number} the rate per day
 */
export function dayRate(ratePerHour) {
  return ratePerHour * WORK_HOURS_A_DAY;
}
/**
 * Calculates the number of days in a budget, rounded down
 *
 * @param {number} budget: the total budget
 * @param {number} ratePerHour: the rate per hour
 * @returns {number} the number of days
 */
export function daysInBudget(budget, ratePerHour) {
  return Math.floor(budget / dayRate(ratePerHour));
}
/**
 * Calculates the discounted rate for large projects, rounded up
 *
 * @param {number} ratePerHour
 * @param {number} numDays: number of days the project spans
 * @param {number} discount: for example 20% written as 0.2
 * @returns {number} the rounded up discounted rate
 */
export function priceWithMonthlyDiscount(ratePerHour, numDays, discount) {
  let pricePerMonth = dayRate(ratePerHour)*BILLABLE_DAYS;
  let numberOfWholeMonthes = Math.floor(numDays / BILLABLE_DAYS);
  let remainingDays = numDays - numberOfWholeMonthes*BILLABLE_DAYS;
  let priceWithDiscount = pricePerMonth*(1 - discount);
  return Math.ceil(remainingDays*dayRate(ratePerHour) + numberOfWholeMonthes*priceWithDiscount);
}
