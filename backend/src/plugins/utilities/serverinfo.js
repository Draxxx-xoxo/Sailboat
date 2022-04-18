const {MessageEmbed} = require('discord.js');

module.exports = {
	name: "serverinfo",
	category: "botinfo",
	description: "Returns bot and API latency in milliseconds.",
	execute: async (message, args, client) => {

        const guildid = args[0]

        const guild = client.guilds.cache.get(guildid) || message.guild
    
        const serverinfo_embed = new MessageEmbed()
        .setAuthor(message.guild.name, message.guild.iconURL())
        .setThumbnail(message.guild.iconURL())
        .addFields(
            { name: 'Owner', value: '<@!'+ guild.ownerID +'>', inline: true},
            { name: 'Owner ID', value: guild.ownerID, inline: true},
            { name: 'Server ID', value: guild.id, inline: true},
            { name: 'Region', value: guild.region, inline: true },
            { name: `Text Channels`, value: guild.channels.cache.size, inline: true },
            //{ name: `Voice Channels`, value: message.guild.channels.filter(c => c.type === 'voice').cache.size,inline: true },
            { name: `Members`, value: guild.memberCount, inline: true },
            { name: `Roles`, value: `${guild.roles.cache.size - 1}`, inline: true },
            { name: `Server Creation`, value: new Date (guild.createdTimestamp).toLocaleString()},
        )
    
        message.channel.send(serverinfo_embed)
	},
};
