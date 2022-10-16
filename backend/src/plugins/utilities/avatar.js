const { MessageEmbed } = require("discord.js")
const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {
  name: "avatar",
  category: "botinfo",
  description: "Returns bot and API latency in milliseconds.",
  enable: false,
  execute: async (message, client) => {
    const user = message.options.getUser("user") || message.user;
    const avatarEembed = new MessageEmbed()
      .setTitle(`${user.username} Avatar`)
      .setImage(user.displayAvatarURL())

    await message.reply({ embeds: [avatarEembed] })
  },
  data: new SlashCommandBuilder()
    .setName("avatar")
    .setDescription("Returns the avatar of the user")
    .addUserOption(option => option.setName("user").setDescription("Select a user"))

}
