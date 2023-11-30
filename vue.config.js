const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  pwa: {
    iconPaths: {
      favicon32: 'img/logo.png',
      favicon16: 'img/logo.png',
      appleTouchIcon: 'images/logo.png',
      maskIcon: 'images/logo.png',
      msTileImage: 'images/logo.png',
    },
     
  }
})
