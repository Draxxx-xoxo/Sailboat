const fs = require('fs');
const Discord = require('discord.js');
const { mainprefix, token, pgkey } = require('../../config.json');
const {Client} = require('pg')
const functions = require('../common_functions')
const yaml = require('js-yaml')

const discordclient = new Discord.Client();
discordclient.commands = new Discord.Collection();



discordclient.once('ready', () => {
	console.log('Serverinfo Ready');

	discordclient.user.setActivity(`Watching EVEE`)
});


discordclient.on('message', async message => {

    const prefix = await functions.getPreix(fs, yaml)

    if (message.content.startsWith(`${prefix}serverinfo`)) {

    var user = message.mentions.users.first() || message.member.user
    const member = message.guild.members.cache.get(user.id)

    const serverinfo_embed = new Discord.MessageEmbed()
    .setAuthor(message.guild.name, message.guild.iconURL())
    .setThumbnail(message.guild.iconURL())
    .addFields(
        { name: 'Owner', value: '<@!'+ message.guild.ownerID +'>', inline: true},
        { name: 'Owner ID', value: message.guild.ownerID, inline: true},
        { name: 'Server ID', value: message.guild.id, inline: true},
        { name: 'Region', value: message.guild.region, inline: true },
        { name: `Text Channels`, value: message.guild.channels.cache.size, inline: true },
        //{ name: `Voice Channels`, value: message.guild.channels.filter(c => c.type === 'voice').cache.size,inline: true },
        { name: `Members`, value: message.guild.memberCount, inline: true },
        { name: `Roles`, value: `${message.guild.roles.cache.size - 1}`, inline: true },
        { name: `Server Creation`, value: new Date (message.guild.createdTimestamp).toLocaleString()},
    )

    message.channel.send(serverinfo_embed)
    }
});



discordclient.login(process.env.token);