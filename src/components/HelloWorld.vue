<template>
  <div v-if="showPrompt" class="pwa-prompt">
    <p>Do you want to use our PWA for a better experience?</p>
    <button @click="handleBeforeInstallPrompt">Yes, switch to PWA</button>
    <button @click="dismissPrompt">No, thanks</button>
    <button @click="test">Test</button>
  </div>
</template>

<script>
import Pusher from 'pusher-js';
export default {
  data() {
    return {
      showPrompt: false,
    };
  },

  mounted() {
    console.log('mounted')
    this.checkPwaStatus();
    // this.pusher = new Pusher('376226d34fa363ee0c8d', {
    //   cluster: 'ap2',
    //   debug: true
    // });

    // const channel = this.pusher.subscribe('Test-channel');
    // console.log('notification aa gya')
    // channel.bind('fpaipl-event')

    try {
      const pusher = new Pusher('376226d34fa363ee0c8d', {
        cluster: 'ap2',
        // Remove debug mode in production
        debug: false
      });

      const channel = pusher.subscribe('Test-channel');

      channel.bind('Test-event', function (data) {
        // Handle the event data
        console.log('Notification received:', data);
      });

    } catch (error) {
      console.error('Error initializing Pusher:', error);
    }


  },
  methods: {
    checkPwaStatus() {
      if ('serviceWorker' in navigator && !window.matchMedia('(display-mode: standalone)').matches) {
        this.showPrompt = true;
      }
    },
    test() {


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
