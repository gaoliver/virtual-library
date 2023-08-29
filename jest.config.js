module.exports = {
  preset: 'react-native',
  // transformIgnorePatterns: [
  //   '<rootDir>/node_modules/(redux-persist|react-native-linear-gradient|react-native-vector-icons|react-navigation|@react-navigation/.*|@unimodules/.*|native-base)',
  // ],
  // transform: {
  //   '^.+\\.tsx?$': 'ts-jest',
  // },
  transform: {
    '^.+\\.[jt]sx?$': 'babel-jest',
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
};
