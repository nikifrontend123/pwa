<template>
  <div v-if="showPrompt" class="pwa-prompt">
    <p>Do you want to use our PWA for a better experience?</p>
    <button @click="redirectToApp">Yes, switch to PWA</button>
    <button @click="dismissPrompt">No, thanks</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      showPrompt: false,
    };
  },
  mounted() {
    this.checkPwaStatus();
  },
  methods: {
    checkPwaStatus() {
      // Check if the browser supports service workers and the app is not in standalone mode
      if ('serviceWorker' in navigator && !window.matchMedia('(display-mode: standalone)').matches) {
        this.showPrompt = true;
      }
    },
    redirectToApp() {
      console.log('Redirecting to the app');
      
      // Check if the browser supports service workers and Notifications
      if ('serviceWorker' in navigator && 'Notification' in window) {
        navigator.serviceWorker.ready.then((registration) => {
          // Check if navigation preload is available
          if (registration.navigationPreload) {
            // PWA is installed, redirect to PWA
            window.location.href = '/radiant-mermaid-5d059e.netlify.app';
          } else {
            // Fallback for browsers that do not support navigation preload
            // You might want to provide instructions or navigate to a specific URL
            window.location.href = '/fallback-url';
          }
        });
      } else {
        // Fallback for browsers that do not support service workers or Notifications
        // You might want to provide instructions or navigate to a specific URL
        window.location.href = '/fallback-url';
      }

      // Optionally, you can use a deep link or a custom URL scheme to open the app
      // window.location.href = 'your-custom-scheme://path/to/content';
    },
    dismissPrompt() {
      this.showPrompt = false;
      // Optionally set a flag in local storage to remember this choice
    },
  },
};
</script>
