import Pusher from 'pusher-js';

const pusherApi = {
    data() {
        return {
            pusher: null
        };
    },
    methods: {
        connect(callApi) {
            if (this.pusher) {
                // Disconnect Pusher if it's already connected
                this.pusher.disconnect();
            }

            this.pusher = new Pusher('376226d34fa363ee0c8d', {
                cluster: 'ap2',
                debug: true
            });

            const channel = this.pusher.subscribe('fpaipl-channel');

            // Unbind any existing event handlers
            channel.unbind('fpaipl-event');

            channel.bind('fpaipl-event', debouncedCallApi);
        }
    }
};

export default pusherApi;