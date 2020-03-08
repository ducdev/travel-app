import { checkForDate } from '../src/client/js/dateChecker';

test('correct format of date', () => {
  expect(checkForDate('03/05/2021')).toBeTruthy();
});