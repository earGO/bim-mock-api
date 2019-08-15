module.exports = {
  cacheDirectory: '.jest-cache',
  coverageDirectory: '.jest-coverage',
  coveragePathIgnorePatterns: [
    '<rootDir>/packages/(?:.+?)/lib/',
    '/node_modules/',
    'dist'
  ],
  coverageReporters: ['lcov', 'html', 'text'],
  coverageThreshold: {
    global: {
      branches: 100,
      functions: 100,
      lines: 100,
      statements: 100
    }
  },
  testPathIgnorePatterns: [
    '<rootDir>/packages/(?:.+?)/lib/',
    '<rootDir>/packages/apps/'
  ],
  transformIgnorePatterns: ['<rootDir>/node_modules/', '/node_modules/'],
  moduleFileExtensions: ['js', 'jsx', 'json'],
  transform: {
    '^.+\\.js$': '<rootDir>/jest.transform.js'
  },
  moduleNameMapper: {
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
      '<rootDir>/.mock/fileMock.js',
    '\\.(css|less)$': 'identity-obj-proxy'
  },
  setupFilesAfterEnv: ['./test-setup.js']
}
