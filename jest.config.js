const config = require(`@unional/devpkg-node/simple/config/jest.common`)
module.exports = {
  ...config,
  'testMatch': [
    '**/*.spec.ts'
  ],
  'testEnvironment': 'node',
}
