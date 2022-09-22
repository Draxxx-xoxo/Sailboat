const { MessageEmbed } = require("discord.js")

module.exports = {
  name: "avatar",
  category: "botinfo",
  description: "Returns bot and API latency in milliseconds.",
  execute: async (message, args, client) => {
    const user = message.mentions.users.first() || await message.guild.members.fetch(args[0]) || message.member.user

    const avatarEembed = new MessageEmbed()
      .setTitle(`${user.user.username} Avatar`)
      .setImage(user.displayAvatarURL())

    message.channel.send({ embeds: [avatarEembed] })
  }
}
