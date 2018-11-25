const path = require('path');

module.exports = {
  chainWebpack: config => {
    config.module
      .rule('eslint')
      .use('eslint-loader')
      .tap(options => {
        options.configFile = path.resolve(__dirname, ".eslintrc.json");

        return options;
      })
  }
}