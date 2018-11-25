const path = require('path');

module.exports = {
  devServer: {
    open: true
  },
  chainWebpack: config => {
    config
      .plugin('define')
      .tap(opts => {
        // opts[0]['process.env']['HOST_APP'] = true

        return opts
      })

    config.module
      .rule('eslint')
      .exclude
        .add(path.resolve(__dirname, '../../lib/*'))
        .end()
      .use('eslint-loader')
      .tap(options => {
        options.configFile = path.resolve(__dirname, ".eslintrc.json");

        return options;
      })
  }
}