/** @type {import('ts-jest').JestConfigWithTsJest} **/
export default {
  verbose: true,
  testEnvironment: "jsdom",
  transform: {
    "^.+\.tsx?$": ["ts-jest",{}],
  },
  roots: ["<rootDir>/src"],
  preset: "ts-jest",
  testEnvironment: 'jsdom',
  testPathIgnorePatterns: ["<rootDir>/node_modules/", "<rootDir>/dist/"],
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
};