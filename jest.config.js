module.exports = {
  collectCoverageFrom: ['**/*.js'],
  coverageDirectory: 'coverage',
  roots: ['lib'],
  collectCoverage: false,
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80,
    },
  },
};
