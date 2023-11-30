<template>
  <img alt="Vue logo" src="./assets/logo.png">
  <!-- <button class="btn btn-info w-100" v-if="showInstallButton" @click="installApp">Install App</button> -->
  <HelloWorld msg="Welcome to Your Vue.js App" />
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'

export default {
  name: 'App',
  data() {
    return {
      deferredPrompt: null,
      // showInstallButton: false,
      // showInstallPopup: false,
    };
  },
  components: {
    HelloWorld
  },
  created() {
    window.addEventListener('beforeinstallprompt', this.handleInstallPrompt);
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
      // You can customize the alert message
      const isConfirmed = window.confirm('Do you want to install this app?');

      if (isConfirmed) {
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
</style>
