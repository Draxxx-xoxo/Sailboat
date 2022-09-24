const {MessageEmbed} = require("discord.js");

module.exports = {
  name: "list_role",
  category: "botinfo",
  description: "Returns bot and API latency in milliseconds.",
  execute: async (message, args, client) => {

    const role = await message.guild.roles.fetch(args[0]) || message.guild.roles.cache.find(r => r.name === args.join(" ")) || message.mentions.roles.first()
        
    if (!role) {
      return message.reply("Please mention a role.");
    }
        
    let rolecheck = message.guild.roles.cache.find(r => r.name.toLowerCase() == role.name.toLowerCase());
        
    if (!rolecheck) {
      return message.reply("I cant find that role!");
    }

    const list_role = message.guild.roles.cache.get(`${role.id}`).members.map(m=>m.user.tag + " `" + m.user.id + "`").join("\n")

    const embed = new MessageEmbed()
      .setTitle("Members who have " + role.name)
      .setDescription(list_role)
      .setFooter({text: message.guild.roles.cache.get(`${role.id}`).members.map(m=>m).length + " Members with the role"})
		
        
    message.channel.send({embeds: [embed]})
  },
};
