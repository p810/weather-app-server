module.exports = {
    roots: [
        './',
    ],
    transform: {
        '^.+\\.ts$': 'ts-jest',
    },
    testRegex: '(\/?tests\/.*|(\\.|\/))(test|spec)\.ts$',
    moduleFileExtensions: ['ts', 'js', 'json'],
    setupFilesAfterEnv: ['./jest.setup.js'],
}
