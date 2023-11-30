const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  pwa: {
    name: 'Brand App',
    themeColor: '#4DBA87',
    msTileColor: '#000000',
    appleMobileWebAppCapable: 'yes',
    appleMobileWebAppStatusBarStyle: 'black',
    workboxPluginMode: 'GenerateSW',
    iconPaths: {
      favicon32: 'img/logo.png',
      favicon16: 'img/logo.png',
      appleTouchIcon: 'img/logo.png',
      maskIcon: 'img/logo.png',
      msTileImage: 'img/logo.png',
    },
    manifestOptions: {
      name: "Fabricator",
      short_name: "Fabricator",
      description: "Fabricator",
      start_url: "./",
      display: "standalone",
      background_color: "#ffffff",
      theme_color: "#000000",
      orientation: "portrait",
      "icons": [
        {
          "src": "img/logo.png",
          "sizes": "72x72",
          "type": "image/png"
        },
        {
          "src": "img/logo.png",
          "sizes": "96x96",
          "type": "image/png"
        } 
      ],
      workboxPluginMode: 'InjectManifest',
      workboxOptions: {
        swSrc: 'src/sw.js', // path to your customized service worker file
        swDest: 'service-worker.js', // output path in the dist folder
      },
      // Add more options as needed
    }, 
  }
})
