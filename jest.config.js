module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testMatch: ['<rootDir>/test/**/*.test.ts'],
  moduleFileExtensions: ['ts', 'js', 'json', 'node'],
  collectCoverage: true,
  coverageDirectory: 'coverage',
  coveragePathIgnorePatterns: ['/I.*\\.ts$'],
  coverageProvider: 'v8',
  collectCoverageFrom: ['./src/**'],
  coverageThreshold: {
    global: {
      statements: 90,
      branches: 90,
      functions: 90,
      lines: 90,
    },
  },
}
