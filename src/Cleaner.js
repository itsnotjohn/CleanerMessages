const request = require('request-promise-native');
const logMessage = require('./logMessage');
require('colors');

class Cleaner {
    constructor(authorId, channelId) {
        this.authorId = authorId;
        this.channelId = channelId;
        this.messageDeletedCount = 0;
        this.headers = { Authorization: require("../config.json").Token };
    }

    async wait(ms) {
        return new Promise((resolve) => setTimeout(resolve, ms));
    }

    async deleteMessage(messageId) {
        const url = `https://discord.com/api/v9/channels/${this.channelId}/messages/${messageId}`;
        try {
            const result = await request.delete({ url, headers: this.headers, json: true });
            if (result?.retry_after) {
                logMessage('red', '-', `Rate-limited! Waiting ${result.retry_after}ms to continue.`);
                await this.wait(result.retry_after + 5000);
                return this.deleteMessage(messageId);
            }
        } catch (error) {
            logMessage('yellow', '!', 'Error deleting message, retrying...');
            await this.wait(5000);
            return this.deleteMessage(messageId);
        }

        this.messageDeletedCount++;
        await this.logProgress();
    }

    async logProgress() {
        if (this.messageDeletedCount % 5 === 0) {
            logMessage('green', '*', `Deleted ${this.messageDeletedCount} messages. Waiting 3500ms...`);
            await this.wait(3500);
        }
        
        if (this.messageDeletedCount % 25 === 0) {
            logMessage('cyan', '*', `Deleted ${this.messageDeletedCount} messages. Waiting 15000ms...`);
            await this.wait(15000);
        }
    }

    async processMessages(before = null) {
        const url = `https://discord.com/api/v9/channels/${this.channelId}/messages${before ? `?before=${before}` : ''}`;
        try {
            const result = await request({ url, headers: this.headers, json: true });

            if (result?.retry_after) {
                logMessage('red', '!', `Channel not indexed. Waiting ${result.retry_after}ms to retry.`);
                await this.wait(result.retry_after);
                return this.processMessages(before);
            }

            if (result.length === 0) {
                logMessage('green', '+', `Channel cleaned. Total deleted messages: ${this.messageDeletedCount}`);
                return;
            }

            for (const message of result) {
                if (message.author.id === this.authorId && message.type !== 3) {
                    await this.deleteMessage(message.id);
                }
            }

            return this.processMessages(result[result.length - 1].id);
        } catch (error) {
            logMessage('yellow', '!', 'Error fetching messages, retrying...');
            await this.wait(5000);
            return this.processMessages(before);
        }
    }

    async startCleaning() {
        await this.processMessages();
    }
}

module.exports = Cleaner;