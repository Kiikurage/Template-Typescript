module.exports = {
    testPathIgnorePatterns: ['/node_modules/', 'build'],
    transform: {
        '^.+\\.(t|j)sx?$': '@swc/jest',
    },
};
