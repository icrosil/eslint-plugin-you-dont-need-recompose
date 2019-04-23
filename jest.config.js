module.exports = {
  collectCoverageFrom: ['**/*.js'],
  coverageDirectory: 'coverage',
  roots: ['lib'],
  collectCoverage: false,
  coverageThreshold: {
    global: {
      branches: 70,
      functions: 70,
      lines: 70,
      statements: 70,
    },
  },
};
