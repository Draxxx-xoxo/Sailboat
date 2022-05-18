const {MessageEmbed} = require('discord.js');

module.exports = {
	name: "avatar",
	category: "botinfo",
	description: "Returns bot and API latency in milliseconds.",
	execute: async (message, args, client) => {
        var user = message.mentions.users.first() || message.member.user
        const member = message.guild.members.cache.get(user.id)

        const avatar_embed = new MessageEmbed()
        .setTitle(`${user.username} Avatar`)
        .setImage(user.displayAvatarURL());

        message.channel.send({embeds: [avatar_embed]})
	},
};
