const yaml = require('js-yaml');
const fs = require('fs');

module.exports = {
    async getPreix(message) {
        const doc = yaml.load(fs.readFileSync(`./configuation_files/${message.guild.id}.yml`, 'utf8'));
        return doc.guild_settings.prefix
    },

    async muteRole(message) {
        const doc = yaml.load(fs.readFileSync(`./configuation_files/${message.guild.id}.yml`, 'utf8'));
        return doc.mute_settings.role
    },

    async censorWords(message) {
        const doc = yaml.load(fs.readFileSync(`./configuation_files/${message.guild.id}.yml`, 'utf8'));
        return doc.plugins.censor.censor_words
    },
}