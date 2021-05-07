const challenge = require('./challenge')

test('1', () => {
  expect(challenge.search([1, 2, 3, 4, 5, 6, 7, 8, 9, 10], 10)).toBe(9)
})

test('2', () => {
  expect(challenge.search([1, 2, 3, 4, 5, 6, 7, 8, 9], 10)).toBe(-1)
})

test('3', () => {
  expect(challenge.search([1, 2, 3, 4, 5, 6, 7, 8, 9, 10], 1)).toBe(0)
})

test('4', () => {
  expect(challenge.search([2, 3, 4, 5, 6, 7, 8, 9, 10], 1)).toBe(-1)
})

test('5', () => {
  expect(challenge.search([1, 2, 3, 4, 5, 6, 7, 8, 9], 9)).toBe(8)
})

test('6', () => {
  expect(challenge.search([1, 2, 3, 4, 5, 6, 7, 8, 9], 1)).toBe(0)
})