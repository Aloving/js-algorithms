module.exports = {
  bail: false,
  verbose: true,
  testPathIgnorePatterns: ['/node_modules/'],
  testRegex: '(/__test__/.*|\\.(test|spec))\\.js$',
  testEnvironment: 'node',
};
