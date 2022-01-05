// For a detailed explanation regarding each configuration property, visit:
// https://jestjs.io/docs/en/configuration.html

module.exports = {
  preset: 'ts-jest',
  bail: 4,
  clearMocks: true,
  collectCoverage: true,
  coverageDirectory: 'coverage',
  errorOnDeprecated: false,
  globalSetup: './tests/jest.setup.js',

  // A path to a module which exports an async function that is triggered once after all test suites
  // globalTeardown: null,

  // A set of global variables that need to be available in all test environments
  // globals: {},

  resetMocks: true,
  roots: ['./tests'],

  // Allows you to use a custom runner instead of Jest's default test runner
  // runner: "jest-runner",

  // The paths to modules that run some code to configure or set up the testing environment before each test
  // setupFiles: [],

  // A list of paths to modules that run some code to configure or set up the testing framework before each test
  // setupFilesAfterEnv: [],

  // A list of paths to snapshot serializer modules Jest should use for snapshot testing
  // snapshotSerializers: [],

  // The test environment that will be used for testing
  testEnvironment: 'node',

  // Options that will be passed to the testEnvironment
  // testEnvironmentOptions: {},

  // Adds a location field to test results
  // testLocationInResults: false,

  // The glob patterns Jest uses to detect test files
  // testMatch: [
  //   "**/__tests__/**/*.[jt]s?(x)",
  //   "**/?(*.)+(spec|test).[tj]s?(x)"
  // ],

  // An array of regexp pattern strings that are matched against all test paths, matched tests are skipped
  // testPathIgnorePatterns: [
  //   "/node_modules/"
  // ],

  // The regexp pattern or array of patterns that Jest uses to detect test files
  // testRegex: [],

  testURL: 'http://localhost',
  transform: {
    '^.+\\.(ts|tsx)?$': 'ts-jest',
  },
  coveragePathIgnorePatterns: ['index.ts'],

  // Setting this value to "fake" allows the use of fake timers for functions such as "setTimeout"
  // timers: "real",
};
