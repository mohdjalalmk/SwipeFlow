module.exports = {
  presets: ['module:@react-native/babel-preset'],

  plugins: [
    [
      require.resolve('babel-plugin-module-resolver'),
      {
        alias: {
          'react-native-swipflow': '../src/index',  // Alias for your package (currently not working due to an error, TODO: fix the issue)
        },
      },
    ],
  ],
};
