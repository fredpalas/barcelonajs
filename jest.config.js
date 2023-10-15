module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  cacheDirectory: '.tmp/jestCache',
  moduleNameMapper: {
    "@/(.*)": "<rootDir>/src/$1"
  }
};
