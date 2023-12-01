// vue.config.js
const { defineConfig } = require('@vue/cli-service');

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
    manifestOptions: {
      name: 'Fabricator',
      short_name: 'Fabricator',
      description: 'Fabricator',
      start_url: './',
      display: 'standalone',
      background_color: '#ffffff',
      theme_color: '#000000',
      orientation: 'portrait',
      icons: [
        {
          src: 'img/logo.png',
          sizes: '72x72',
          type: 'image/png',
        },
        {
          src: 'img/logo.png',
          sizes: '96x96',
          type: 'image/png',
        },
        {
          src: 'img/logo.png',
          sizes: '192x192',
          type: 'image/png',
        },
      ],
      related_applications: [
        {
          platform: 'play',
          url: 'https://65697b40e2501f5f8fdf4e45--radiant-mermaid-5d059e.netlify.app/',
        },
        {
          platform: 'itunes',
          url: 'https://itunes.apple.com/app/example-myapp/id123456789',
        },
      ],
      prefer_related_applications: true,
      workboxPluginMode: 'InjectManifest',
      workboxOptions: {
        swSrc: 'src/sw.js', // path to your customized service worker file
        swDest: 'service-worker.js', // output path in the dist folder
      },
      deepLinks: [
        // Add deep linking configuration here
        {
          start_url: 'https://65697b40e2501f5f8fdf4e45--radiant-mermaid-5d059e.netlify.app/',
          end_url: '/',
          id: 'com.example.myapp',
        },
      ],
    },
  },
});
