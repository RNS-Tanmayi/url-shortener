export default {
    testEnvironment: "node",
    transform: {},
    testMatch: ["**/tests/**/*.test.js"],
    setupFilesAfterEnv: ["<rootDir>/tests/setup.js"],
    testTimeout: 30000,
    collectCoverageFrom: [
        "routes/**/*.js",
        "models/**/*.js",
        "!**/node_modules/**"
    ]
};