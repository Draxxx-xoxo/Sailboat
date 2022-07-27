const {MessageEmbed} = require('discord.js');

module.exports = {
	name: "avatar",
	category: "botinfo",
	description: "Returns bot and API latency in milliseconds.",
	execute: async (message, args, client) => {
        var user = message.mentions.users.first() || await message.guild.members.fetch(args[0]) ||message.member.user

        const avatar_embed = new MessageEmbed()
        .setTitle(`${user.user.username} Avatar`)
        .setImage(user.displayAvatarURL());

        message.channel.send({embeds: [avatar_embed]})
	},
};
