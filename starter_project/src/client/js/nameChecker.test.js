import { checkForName } from './nameChecker';

describe('Name Checker', () => {
  beforeEach(() => {
    global.alert = jest.fn();
    global.console.log = jest.fn();
  });

  const validCaptains = ['Picard', 'Janeway', 'Kirk', 'Archer', 'Georgiou'];
  const invalidCaptains = ['Sisko', 'Burnham', 'Riker'];

  test.each(validCaptains)('welcomes valid captain %s', (captain) => {
    checkForName(captain);
    expect(global.alert).toHaveBeenCalledWith('Welcome, Captain!');
  });

  test.each(invalidCaptains)('alerts for invalid captain %s', (captain) => {
    checkForName(captain);
    expect(global.alert).toHaveBeenCalledWith('Enter a valid captain name');
  });
});