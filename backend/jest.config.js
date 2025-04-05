module.exports = {
  preset: 'ts-jest', // Tells Jest to use ts-jest for compiling TypeScript
  testEnvironment: 'node', // Specifies that tests will run in a Node.js environment
  rootDir: './', // Specifies the root directory for Jest
  transform: {
    '^.+\\.ts$': 'ts-jest' // Transform TypeScript files using ts-jest
  },
  moduleFileExtensions: ['ts', 'js'], // Define extensions to look for when testing
  testMatch: ['**/src/test/**/*.test.ts'] // Define where your test files are
}
