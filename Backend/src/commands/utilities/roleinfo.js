const {MessageEmbed} = require('discord.js');

module.exports = {
	name: "roleinfo",
	category: "botinfo",
	description: "Returns bot and API latency in milliseconds.",
	execute: async (message, args, client) => {
        let role = message.guild.roles.cache.get(args[0]) || message.guild.roles.cache.find(r => r.name === args.join(" ") || message.mentions.roles.first())

        {
        
            if (!role) {
              return message.reply(`Please mention a role.`);
            }
        
            let rolecheck = message.guild.roles.cache.find(r => r.name === role.name);
        
            if (!rolecheck) {
              return message.reply(`I cant find that role!`);
            }
        
            const embed = new MessageEmbed()
              .setTitle(`Role Info __${role.name}__`)
              .addField("Role ID:", role.id, true)
              .addField("Role name:", role.name, true)
              .addField("Member(s) in role:", role.members.size, true)
              .addField("Mentionable:", role.mentionable, true)
              .addField("Role postion", role.position, true)
              .addField("Role Color:", role.hexColor, true)
              .setColor(role.hexColor);
        
            message.channel.send(embed);
          }
	},
};
