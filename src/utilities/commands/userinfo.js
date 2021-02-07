const fs = require('fs');
const Discord = require('discord.js');
const { mainprefix, token } = require('../../../config.json');

const client = new Discord.Client();
client.commands = new Discord.Collection();

client.once('ready', () => {
	console.log('Userinfo Ready');

	client.user.setActivity(`Watching EVEE`)
});


client.on('message', message => {
if (message.content.startsWith(`${mainprefix}userinfo`)) {


    

    var user = message.mentions.users.first() || message.member.user
    const member = message.guild.members.cache.get(user.id)

    const userinfo_embed = new Discord.MessageEmbed()
    .setAuthor(`User infomation for ${user.username}`, user.displayAvatarURL())
    .setThumbnail(user.displayAvatarURL())
    .addFields(
        { name: 'Profile', value: '<@!'+ user.id +'>', inline: true},
        { name: 'ID', value: user.id, inline: true},
        { name: "Roles(" + `${member.roles.cache.size - 1}` +")", value: member.roles.cache.map(r => '<@&'+r.id+'>').join(' - ').slice(0,-24)},
        { name: 'Account Created', value: new Date (user.createdTimestamp).toLocaleString(), inline: true },
        { name: `Joined ${message.member.guild.name}`, value: new Date (member.joinedTimestamp).toLocaleString(), inline: true },
    )

    message.channel.send(userinfo_embed)

    }
});


client.login(process.env.token);