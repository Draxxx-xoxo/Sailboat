const {MessageEmbed} = require("discord.js");

module.exports = {
  async reportlog(res, emoji) {
    const embed = new MessageEmbed()
      .setTitle("Report #" + res.id)
      .addFields(
        {name: "User", value: res.reported_user_tag + "\n`" + res.reported_user_id + "`", inline: true},
        {name: "Reporter", value: res.reporter_tag + "\n`" + res.reporter_id + "`", inline: true},
        {name: "\u200b", value: "\u200b", inline: true},
        {name: "Reason", value: res.reason, inline: true},
      )
      .setFooter({text:"Status: " + res.status + " " + emoji})
        
    return embed
  },

  async notelog(report_id) {
    const embed = new MessageEmbed()
      .setTitle("Notes for #" + report_id)
      .setFooter({text:"Only moderators or admins are able to add notes"})
        
    return embed
  }
    
}