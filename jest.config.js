module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  cacheDirectory: '.tmp/jestCache',
  moduleNameMapper: {
    "@/(.*)": "<rootDir>/src/$1"
  },
  testPathIgnorePatterns: [
    "/node_modules/",
    "/dist/",
    "src/apps/Todo/frontend/"
  ]
};
