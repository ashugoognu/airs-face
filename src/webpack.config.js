module.exports = {
  module: {
    rules: [
      {
        test: /\.js$/,
        use: ['source-map-loader'],
        enforce: 'pre',
        options: {
          filterSourceMappingUrl: (url, context) => false,
        },
      },
    ],
  },
};
