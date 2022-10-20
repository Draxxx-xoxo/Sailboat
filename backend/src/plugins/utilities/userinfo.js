const {MessageEmbed} = require("discord.js");
const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {
  name: "userinfo",
  category: "botinfo",
  enable: true,
  description: "Returns bot and API latency in milliseconds.",
  execute: async (message, args, client) => {
    const user = message.options.getUser('user');        
    var member = ""

    if(user){
      member = await message.guild.members.fetch(user.id)
    }
    else{
      member =  await message.guild.members.fetch(message.user.id)
    }
    
    const userinfo_embed = new MessageEmbed()
      .setAuthor({name: `User infomation for ${member.user.username.toString()}`, iconURL: member.displayAvatarURL()})
      .setThumbnail(member.displayAvatarURL())
      .addFields(
        { name: "Profile", value: "<@!"+ member.id +">", inline: true},
        { name: "ID", value: member.id, inline: true},
        { name: "Roles(" + `${member.roles.cache.size - 1}` +")", value: member.roles.cache.map(r => "<@&"+r.id+">").join(" - ").slice(0,-24) || "No Roles"},
        { name: "Account Created", value: new Date (member.user.createdTimestamp).toLocaleString(), inline: true },
        { name: `Joined ${message.member.guild.name}`, value: new Date (member.joinedTimestamp).toLocaleString(), inline: true },
      )
    
    message.reply({embeds: [userinfo_embed]})
  },
  data: new SlashCommandBuilder()
  .setName("userinfo")
  .setDescription("Returns information about the user in the server")
  .addUserOption(option => option.setName("user").setDescription("The user to get info about"))
};
