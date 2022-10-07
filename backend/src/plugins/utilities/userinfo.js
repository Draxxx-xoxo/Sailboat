const {MessageEmbed} = require('discord.js');

module.exports = {
	name: "userinfo",
	category: "botinfo",
	description: "Returns bot and API latency in milliseconds.",
	execute: async (message, args, client) => {
        var member = message.mentions.users.first() || await message.guild.members.fetch(args[0] || message.author.id)  
        const userinfo_embed = new MessageEmbed()
        .setAuthor({name: `User infomation for ${member.user.username}`, iconURL: member.displayAvatarURL()})
        .setThumbnail(member.displayAvatarURL())
        .addFields(
            { name: 'Profile', value: '<@!'+ member.id +'>', inline: true},
            { name: 'ID', value: member.id, inline: true},
            { name: "Roles(" + `${member.roles.cache.size - 1}` +")", value: member.roles.cache.map(r => '<@&'+r.id+'>').join(' - ').slice(0,-24) || 'No Roles'},
            { name: 'Account Created', value: new Date (member.user.createdTimestamp).toLocaleString(), inline: true },
            { name: `Joined ${message.member.guild.name}`, value: new Date (member.joinedTimestamp).toLocaleString(), inline: true },
        )
    
        message.channel.send({embeds: [userinfo_embed]})
	},
};
