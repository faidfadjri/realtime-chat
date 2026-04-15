import consumer from "channels/consumer"

const chatChannel = consumer.subscriptions.create("ChatChannel", {
  connected() {
    console.log("ChatChannel connected");
  },

  disconnected() {
    console.log("ChatChannel disconnected");
  },

  received(data) {
    if (window.spawnMessage) {
      window.spawnMessage(data.content);
    }
  }
});

export default chatChannel;