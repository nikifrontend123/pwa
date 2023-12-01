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
    };
  },
  components: {
    HelloWorld
  },
  created() {
    window.addEventListener('beforeinstallprompt', this.handleInstallPrompt);
    // this.installApp(); // Remove this line, as we want to show the button only when the user clicks it
    navigator.getInstalledRelatedApps()
      .then((relatedApps) => {
        // Dump all the returned related apps into a table in the console
        console.table(relatedApps);

        // Search for a specific installed platform-specific app
        const psApp = relatedApps.find((app) => app.id === "lmjpkknnlcmaaghpglnpjmpaggklbkpp");

        if (psApp && this.doesVersionSendPushMessages(psApp.version)) {
          // There’s an installed platform-specific app that handles sending push messages
          // No need to handle this via the web app
          return;
        }
      })
      .catch((error) => {
        console.error("Error fetching installed related apps:", error);
      });
  },
  mounted() {
    var browserName = '';
    var userAgent = navigator.userAgent.toLowerCase();

    if (userAgent.indexOf('firefox') > -1) {
      browserName = 'Mozilla Firefox';
    } else if (userAgent.indexOf('chrome') > -1) {
      browserName = 'Google Chrome';
    } else if (userAgent.indexOf('safari') > -1) {
      browserName = 'Apple Safari';
    } else if (userAgent.indexOf('opera') > -1 || userAgent.indexOf('opr') > -1) {
      browserName = 'Opera';
    } else if (userAgent.indexOf('edge') > -1) {
      browserName = 'Microsoft Edge';
    } else if (userAgent.indexOf('msie') > -1 || userAgent.indexOf('trident') > -1) {
      browserName = 'Internet Explorer';
    } else {
      browserName = 'Unknown';
    }

    console.log('Browser: ' + browserName);

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

      // Show a browser-style alert immediately
      this.showInstallAlert();
    },
    showInstallAlert() {
      // Set the flag to true to show the install popup
      this.showInstallPopup = true;
    },
    installApp() {
      // If the user clicks "Install," show the browser's install prompt
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

        // Close the install popup
        this.showInstallPopup = false;
      });
    },
    dismissInstall() {
      // If the user clicks "Dismiss," close the install popup
      this.showInstallPopup = false;
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
