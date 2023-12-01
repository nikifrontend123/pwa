<template>
  <div v-if="showPrompt" class="pwa-prompt">
    <p>Do you want to use our PWA for a better experience?</p>
    <button @click="handleBeforeInstallPrompt">Yes, switch to PWA</button>
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
      if ('serviceWorker' in navigator && !window.matchMedia('(display-mode: standalone)').matches) {
        this.showPrompt = true;
      }
    },
    async handleBeforeInstallPrompt(event) {
      try {
        const relatedApps = await navigator.getInstalledRelatedApps();

        // Search for a specific installed platform-specific app
        const psApp = relatedApps.find((app) => app.id === "lmjpkknnlcmaaghpglnpjmpaggklbkpp");

        if (psApp) {
          event.preventDefault();
          // Update UI as appropriate
        }
      } catch (error) {
        console.error("Error fetching installed related apps:", error);
      }
    },
    redirectToPwa() {



      // Logic to redirect to the PWA
      // This might involve navigating to a URL or providing instructions
    },
    dismissPrompt() {
      this.showPrompt = false;
      // Optionally set a flag in local storage to remember this choice
    },
  },
};
</script>
