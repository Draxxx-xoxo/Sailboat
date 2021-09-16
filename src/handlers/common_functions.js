const yaml = require('js-yaml');
const fs = require('fs');

module.exports = {

    async yamlfile(message) {
        const doc = yaml.load(fs.readFileSync(`./configuation_files/${message.guild.id}.yml`, 'utf8'));
        return doc
    },

    async getPreix(message) {
        const doc = yaml.load(fs.readFileSync(`./configuation_files/${message.guild.id}.yml`, 'utf8'));
        return doc.guild_settings.prefix
    },

    async muteRole(message) {
        const doc = yaml.load(fs.readFileSync(`./configuation_files/${message.guild.id}.yml`, 'utf8'));
        return doc.plugins.mute_settings.role
    },

    async censorWords(message) {
        const doc = yaml.load(fs.readFileSync(`./configuation_files/${message.guild.id}.yml`, 'utf8'));
        return doc.plugins.censor.censor_words
    },

    async censorIgnoreUser(message) {
        const doc = yaml.load(fs.readFileSync(`./configuation_files/${message.guild.id}.yml`, 'utf8'));
        return doc.plugins.censor.ignore_users
    },

    async censorIgnoreChannel(message) {
        const doc = yaml.load(fs.readFileSync(`./configuation_files/${message.guild.id}.yml`, 'utf8'));
        return doc.plugins.censor.ignore_channels
    },


    async welcomechannel(guildid) {
        const doc = yaml.load(fs.readFileSync(`./configuation_files/${guildid}.yml`, 'utf8'));
        return doc.plugins.welcome_channel.channel
    },

    async join_message(guildid) {
        const doc = yaml.load(fs.readFileSync(`./configuation_files/${guildid}.yml`, 'utf8'));
        return doc.plugins.welcome_channel.join_message
    },

    async leave_message(guildid) {
        const doc = yaml.load(fs.readFileSync(`./configuation_files/${guildid}.yml`, 'utf8'));
        return doc.plugins.welcome_channel.leave_message
    },

    async command_logging(guildid) {
        const doc = yaml.load(fs.readFileSync(`./configuation_files/${guildid}.yml`, 'utf8'));
        return doc.plugins.logging.command_logging
    },
    async command_logging(guildid) {
        const doc = yaml.load(fs.readFileSync(`./configuation_files/${guildid}.yml`, 'utf8'));
        return doc.plugins.logging.infractions_logging
    },
}