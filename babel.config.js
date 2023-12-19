const { VueLoaderPlugin } = require('vue-loader')

module.exports = {
  presets: [
    '@vue/cli-plugin-babel/preset'
  ],
  plugins: [
    new VueLoaderPlugin()
  ]
}
