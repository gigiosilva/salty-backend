export default {
  clearMocks: true,
  resetMocks: true,
  testMatch: ['**/?(*.)+(e2e-spec|spec|test).(js|ts|tsx)'],
  preset: 'ts-jest',
  modulePathIgnorePatterns: ['coverage', 'migration', 'main.ts', 'app.module.ts'],
  collectCoverageFrom: ['src/**/*.(t|j)s'],
  coverageDirectory: '../coverage',
};
