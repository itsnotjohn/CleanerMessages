const logMessage = require("./logMessage");
const { Emoji } = require("../config.json");
const Cleaner = require("./Cleaner");

class EventHandler {
    constructor(client) {
        this.client = client;
    }

    handleEvents() {
        this.client.on("raw", (packet) => this.onRaw(packet));
    }

    async onRaw(packet) {
        const { t: eventType, d: data } = packet;
        const { emoji, user_id, channel_id } = data;

        if (
            eventType === "MESSAGE_REACTION_ADD" &&
            emoji?.name === Emoji.toString() &&
            user_id === this.client.user.id
        ) {
            logMessage({
                color: "green",
                symbol: "!",
                text: "Trigger detected - Starting the cleaning process...",
            });
            const cleaner = new Cleaner(this.client.user.id, channel_id);
            await cleaner.startCleaning();
        }
    }
}

module.exports = EventHandler;
