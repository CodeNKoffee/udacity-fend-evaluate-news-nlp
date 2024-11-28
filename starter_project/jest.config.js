module.exports = {
  testEnvironment: 'jsdom', 
  setupFilesAfterEnv: [
    '<rootDir>/jest.setup.js' 
  ],
  modulePathIgnorePatterns: ['<rootDir>/dist/'],
  transform: {
    '^.+\\.(js|jsx|coffee)$': 'babel-jest'
  },
  moduleFileExtensions: ['js', 'mjs', 'cjs', 'jsx', 'ts', 'tsx', 'json', 'node', 'coffee']  // Include coffee files
};