module.exports = {
  testEnvironment: 'jsdom',  // Change to jsdom for browser-like testing
  setupFilesAfterEnv: [
    '<rootDir>/jest.setup.js'  // Create a separate setup file
  ],
  modulePathIgnorePatterns: ['<rootDir>/dist/'],
  transform: {
    '^.+\\.(js|jsx|coffee)$': 'babel-jest'
  },
  moduleFileExtensions: ['js', 'mjs', 'cjs', 'jsx', 'ts', 'tsx', 'json', 'node', 'coffee']  // Include coffee files
};