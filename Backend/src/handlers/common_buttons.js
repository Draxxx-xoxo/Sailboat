const { MessageActionRow, MessageButton } = require('discord.js');

module.exports = {

    async reportbuttons(disabled) {
        let warn = new MessageButton()
        .setLabel('Warn')
        .setDisabled(disabled)
        .setStyle('blurple')
        .setID('warn');

        let mute = new MessageButton()
        .setLabel('Mute')
        .setDisabled(disabled)
        .setStyle('blurple')
        .setID('mute');

        let kick = new MessageButton()
        .setLabel('Kick')
        .setDisabled(disabled)
        .setStyle('blurple')
        .setID('kick');

        let ban = new MessageButton()
        .setLabel('Ban')
        .setDisabled(disabled)
        .setStyle('blurple')
        .setID('ban');

        let deny = new MessageButton()
        .setLabel('Deny')
        .setDisabled(disabled)
        .setStyle('blurple')
        .setID('deny');

        return [warn, mute, kick, ban, deny]
    },

    async destroyinf(disabled) {
        const buttons = new MessageActionRow()
        .addComponents(
        new MessageButton()
        .setCustomId('yes')
        .setLabel('Yes')
        .setDisabled(disabled)
        .setStyle('PRIMARY'),
        new MessageButton()
        .setCustomId('no')
        .setLabel('No')
        .setDisabled(disabled)
        .setStyle('PRIMARY'),
        );

        return(buttons)
    },
}
