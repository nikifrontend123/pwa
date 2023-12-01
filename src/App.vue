<template>
  <img alt="Vue logo" src="./assets/logo.png">
  <div v-if="showInstallPopup" class="install-popup">
    <div class="install-popup-content">
      <p>Do you want to install this app?</p>
      <button @click="installApp">Install</button>
      <button @click="dismissInstall">Dismiss</button>
    </div>
  </div>
  <HelloWorld msg="Welcome to Your Vue.js App" />
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

  // Check if the app is already installed
  if ('getInstalledRelatedApps' in navigator) {
    navigator.getInstalledRelatedApps().then(apps => {
      this.isAppInstalled = apps.length > 0;

      // Check whether to redirect or show the install button
      this.checkAppInstalled();
    });
  }
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
      // Check if the app is installed
      if (this.isAppInstalled) {
        // Redirect to the app URL
        window.location.href = 'https://65696ff4bb909255ee04d781--radiant-mermaid-5d059e.netlify.app/';
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
