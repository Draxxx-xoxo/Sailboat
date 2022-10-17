const {MessageEmbed} = require("discord.js");
const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {
  name: "roleinfo",
  category: "botinfo",
  description: "Returns bot and API latency in milliseconds.",
  execute: async (message, args, client) => {
    let role = message.options.getRole('role');        

    const embed = new MessageEmbed()
      .setTitle(`Role Info __${role.name.toString()}__`)
      .addFields(
        {name: "Role ID:", value: role.id.toString(), inline: true},
        {name :"Role name:", value: role.name.toString(), inline: true},
        {name :"Member(s) in role:", value: role.members.size.toString(), inline: true},
        {name: "Mentionable:", value: role.mentionable.toString(), inline: true},
        {name: "Role postion", value: role.position.toString(), inline: true},
        {name : "Role postion", value: role.position.toString(), inline: true},
        {name: "Role Color:", value: role.hexColor, inline: true}
        )
      .setColor(role.hexColor);
        
    message.reply({embeds: [embed]});
  },
  data: new SlashCommandBuilder()
  .setName("roleinfo")
  .setDescription("Returns information about the role in the server")
  .addRoleOption(option => option.setName("role").setDescription("The role to get info about").setRequired(true))
};
