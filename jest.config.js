module.exports = {
  collectCoverageFrom: ['**/*.js'],
  coverageDirectory: 'coverage',
  roots: ['lib'],
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80,
    },
  },
};