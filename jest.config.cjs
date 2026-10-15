const nextJest = require('next/jest.js');

const createJestConfig = nextJest({
  dir: './',
});

module.exports = createJestConfig({
  setupFilesAfterEnv: ['<rootDir>/src/jest.setup.ts'],
  testEnvironment: 'jsdom',
  testPathIgnorePatterns: ['/node_modules/', '/.next/'],
});
