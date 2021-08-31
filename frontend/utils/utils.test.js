import { diceRoller } from "./utils";

test('returns a number', () => {
  const roll = diceRoller();
  expect(roll).not.toBeNaN()
});
