const {MessageButton} = require("discord-buttons");

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
        .setID('Kick');

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
}
