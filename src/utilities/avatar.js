const fs = require('fs');
const Discord = require('discord.js');
const { mainprefix, token } = require('../../config.json');

const client = new Discord.Client();
client.commands = new Discord.Collection();

client.once('ready', () => {
	console.log('Ready!');

	client.user.setActivity(`Watching EVEE`)
});


client.on('message', message => {
if (message.content.startsWith(`${mainprefix}avatar`)) {

    var user = message.mentions.users.first() || message.member.user
    const member = message.guild.members.cache.get(user.id)

    const avatar_embed = new Discord.MessageEmbed()
    .setTitle(`${user.username} Avatar`)
    .setImage(user.displayAvatarURL());

    message.channel.send(avatar_embed)
}
});


client.login(process.env.token);