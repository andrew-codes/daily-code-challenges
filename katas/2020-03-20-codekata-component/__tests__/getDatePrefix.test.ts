import { getDatePrefix } from '../getDatePrefix'

test('a date with a double digit month is converted to a string with a leading zero for the month', () => {
  const date = new Date(2020, 10, 16)
  expect(getDatePrefix(date)).toEqual('2020-11-16')
})
test('a date with a double digit date is converted to a string with a leading zero for the date', () => {
  const date = new Date(2020, 10, 16)
  expect(getDatePrefix(date)).toEqual('2020-11-16')
})
test('a date with a single digit date is converted to a string with a leading zero for the date', () => {
  const date = new Date(2020, 10, 6)
  expect(getDatePrefix(date)).toEqual('2020-11-06')
})
test('a date with a single digit date is converted to a string with a leading zero for the date', () => {
  const date = new Date(2020, 1, 16)
  expect(getDatePrefix(date)).toEqual('2020-02-16')
})
