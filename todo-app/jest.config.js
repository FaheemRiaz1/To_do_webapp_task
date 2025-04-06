module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  globals: {
    'ts-jest': {
      useESM: true
    }
  },
  transform: {
    '^.+\\.(ts|mjs|js|html)$': 'ts-jest'
  },
  moduleNameMapper: {
    '^(\\.{1,2}/.*)\\.js$': '$1' // handle JS imports without needing .js at the end
  },
  moduleFileExtensions: ['ts', 'js', 'mjs', 'html'],
  testMatch: ['**/?(*.)+(spec|test).ts'],
  transformIgnorePatterns: ['node_modules/(?!@angular|rxjs)']
}
