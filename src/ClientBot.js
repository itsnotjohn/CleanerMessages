const { Client } = require("discord.js-selfbot-v13");
const { Token } = require("../config.json");
const { Loading } = require("./Utils");
const logMessage = require("./logMessage");
const EventHandler = require("./EventHandler");

class ClientBot {
    constructor() {
        this.client = new Client({ checkUpdate: false });
        this.loader = Loading();
        this.eventHandler = new EventHandler(this.client);

        this.init();
    }

    init() {
        console.clear();
        process.title = "Verifying Token";
        this.loader.start();

        this.client.once("ready", () => {
            this.onReady();
        });

        this.client.on("warn", () => null);
        this.client.on("error", () => null);

        this.client.login(Token).catch((error) => {
            this.onLoginError(error);
        });
    }

    onReady() {
        this.loader.stop({ error: false });
        console.clear();
        process.title = `Cleaner | Connected as ${this.client.user.username}`;
        this.eventHandler.handleEvents();
    }

    onLoginError(error) {
        console.clear();
        this.loader.stop({ error: true });
        logMessage({
            color: "red",
            symbol: "x",
            text: "Invalid token, please provide another one.",
        });
        logMessage({ color: "red", symbol: "x", text: "Real cause:" });
        console.error(error);
    }
}

module.exports = ClientBot;
