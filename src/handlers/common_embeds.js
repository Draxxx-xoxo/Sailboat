const {MessageEmbed} = require("discord.js");

module.exports = {
    async reportlog(res, emoji) {
        const embed = new MessageEmbed()
        .setTitle('Report #' + res.report_id)
        .addFields(
            {name: 'User', value: res.reported_user_tag + '\n`' + res.reported_user_id + '`', inline: true},
            {name: 'Reporter', value: res.reporter_tag + '\n`' + res.reporter_id + '`', inline: true},
            {name: 'Reason', value: res.reason}
        )
        .setFooter('Status: ' + res.status + ' ' + emoji)
        
        return embed
    }
    
}