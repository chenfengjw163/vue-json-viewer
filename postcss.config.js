module.exports = {
  sourceMap: false,
  plugins: [
    require('autoprefixer')({
      browsers: ['> 1%', 'android >=4', 'ios >=8']
    })
  ]
};
