const { MessageActionRow, MessageButton } = require('discord.js');

module.exports = {

    async reportbuttons(disabled) {

        const buttons = new MessageActionRow()
        .addComponents(
        new MessageButton()
        .setCustomId('warn')
        .setLabel('Warn')
        .setDisabled(disabled)
        .setStyle('PRIMARY'),
        new MessageButton()
        .setCustomId('mute')
        .setLabel('Mute')
        .setDisabled(disabled)
        .setStyle('PRIMARY'),
        new MessageButton()
        .setCustomId('kick')
        .setLabel('Kick')
        .setDisabled(disabled)
        .setStyle('PRIMARY'),
        new MessageButton()
        .setCustomId('ban')
        .setLabel('Ban')
        .setDisabled(disabled)
        .setStyle('PRIMARY'),
        new MessageButton()
        .setCustomId('deny')
        .setLabel('Deny')
        .setDisabled(disabled)
        .setStyle('PRIMARY'),
        );

        return (buttons)
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
