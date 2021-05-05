module.exports = {
  reporters: [
    'default',
    [
      'jest-junit',
      { outputDirectory: './coverage/jest', outputName: 'results.xml' }
    ]
  ],
  moduleFileExtensions: ['js', 'json', 'ts'],
  testRegex: '.spec.ts$',
  setupFiles: ['./tests/config/jest-spec-mock'],
  transform: {
    '^.+\\.(t|j)s$': 'ts-jest'
  },
  collectCoverage: true,
  collectCoverageFrom: ['<rootDir>/src/**/*.ts', '!<rootDir>/src/**/index.ts'],
  coverageDirectory: './coverage/jest/lcov',
  testEnvironment: 'node'
};
