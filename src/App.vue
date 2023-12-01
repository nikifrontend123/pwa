<template>
  <div>
    <div class="p-2 text-bg-dark w-100">
      Version 1.25
    </div>
    <img alt="Vue logo" src="./assets/logo.png">
    <div v-if="showInstallPopup" class="install-popup">
      <div class="install-popup-content">
        <p>Do you want to install this app?</p>
        <button @click="installApp">Install</button>
        <button @click="dismissInstall">Dismiss</button>
      </div>
    </div>
    <!-- Example deep links -->
    <!-- <a  href="fabricator://">Open PWA App</a> -->
    <a  href="/radiant-mermaid-5d059e.netlify.app">Open PWA App</a>
    
    <HelloWorld msg="Welcome to Your Vue.js App" />
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'

export default {
  name: 'App',
  data() {
    return {
      deferredPrompt: null,
      showInstallButton: false,
      showInstallPopup: false,
      isAppInstalled: false,
    };
  },
  components: {
    HelloWorld
  },
  created() {
    window.addEventListener('beforeinstallprompt', this.handleInstallPrompt);

    self.addEventListener('fetch', function(event) {
      if (event.request.url.startsWith('pwa:')) {
        event.respondWith(navigator.serviceWorker.ready.then(function(registration) {
          return registration.showNotification('PWA available', {
            body: 'Click to open the PWA',
            tag: 'pwa-open'
          });
        }));
      }
    });

    self.addEventListener('notificationclick', function(event) {
      if (event.notification.tag === 'pwa-open') {
        event.notification.close();
        event.waitUntil(self.clients.openWindow('pwa:http://radiant-mermaid-5d059e.netlify.app'));
      }
    });
  },
  unmounted() {
    window.removeEventListener('beforeinstallprompt', this.handleInstallPrompt);
  },
  methods: {
    handleInstallPrompt(event) {

      // Prevent the default behavior to show the browser's install prompt
      event.preventDefault();

      // Store the event for later use
      this.deferredPrompt = event;

      // Show the install button
      this.showInstallButton = true;

      // Show a browser-style alert immediately
      this.showInstallAlert();

      // Check if the app is installed
      this.checkAppInstalled();
    },
    showInstallAlert() {
      // Set the flag to true to show the install popup
      this.showInstallPopup = true;
    },
    installApp() {
      if (this.deferredPrompt) {
        // If the user confirms, show the browser's install prompt
        this.deferredPrompt.prompt();

        // Wait for the user to respond to the prompt
        this.deferredPrompt.userChoice.then((choiceResult) => {
          if (choiceResult.outcome === 'accepted') {
            console.log('User accepted the install prompt');
          } else {
            console.log('User dismissed the install prompt');
          }

          // Reset the deferredPrompt
          this.deferredPrompt = null;
        });
      }
    },
    dismissInstall() {
      // If the user clicks "Dismiss," close the install popup
      this.showInstallPopup = false;
    },
    checkAppInstalled() {
      console.log('Checking if the app is installed');
      if ('getInstalledRelatedApps' in navigator) {
        navigator.getInstalledRelatedApps().then((relatedApps) => {
          if (relatedApps.length > 0) {
            console.log('App is installed');
            this.redirectToApp();
          } else {
            console.log('App is not installed');
            // Optionally, you can show the install button here
          }
        });
      }
    },
    redirectToApp() {
      if (this.isAppInstalled) {
        // Try to open the app using deep linking
        window.location.href = 'pwa:http://radiant-mermaid-5d059e.netlify.app';

        // Set a longer timeout for the fallback URL if the app doesn't open
        // setTimeout(() => {
        //   window.location.href = 'https://radiant-mermaid-5d059e.netlify.app/';
        // }, 5000); // 5 seconds timeout (adjust as needed)
      } else {
        // Show the install prompt
        this.installApp();
      }
    },
  },
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

.install-popup {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: #fff;
  padding: 20px;
  border: 1px solid #ccc;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.install-popup-content {
  text-align: center;
}

.install-popup button {
  margin: 10px;
  padding: 8px 16px;
  cursor: pointer;
}
</style>
