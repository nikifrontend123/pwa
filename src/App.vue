<template>
  <img alt="Vue logo" src="./assets/logo.png">
  <button class="btn btn-info w-100" v-if="showInstallButton" @click="installApp">Install App</button>
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
  mounted() {
    // Delay the installation prompt by 1 second
    setTimeout(() => {
      this.showInstallPopup = true;
    }, 1000);

    // Add event listener for beforeinstallprompt
    window.addEventListener('beforeinstallprompt', this.handleInstallPrompt);
  },
  unmounted() {
    // Remove event listener when the component is unmounted
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
    },
    installApp() {
      if (this.deferredPrompt) {
        // Show the browser's install prompt
        this.deferredPrompt.prompt();

        // Wait for the user to respond to the prompt
        this.deferredPrompt.userChoice.then((choiceResult) => {
          if (choiceResult.outcome === 'accepted') {
            console.log('User accepted the install prompt');
          } else {
            console.log('User dismissed the install prompt');
          }

          // Reset the deferredPrompt and hide the install button
          this.deferredPrompt = null;
          this.showInstallButton = false;
        });
      }
    },
  }
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
