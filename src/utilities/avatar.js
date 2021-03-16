const fs = require('fs');
const Discord = require('discord.js');
const { mainprefix, token, pgkey } = require('../../config.json');
const {Client} = require('pg')
const functions = require('../common_functions')
const yaml = require('js-yaml');

const discordclient = new Discord.Client();
discordclient.commands = new Discord.Collection();



discordclient.once('ready', () => {
	console.log('Avatar!');

	discordclient.user.setActivity(`Watching EVEE`)
});


discordclient.on('message', async message => {

    
    const prefix = await functions.getPreix(fs, yaml)

    if (message.content.startsWith( prefix + `avatar`)) {

        var user = message.mentions.users.first() || message.member.user
        const member = message.guild.members.cache.get(user.id)

        const avatar_embed = new Discord.MessageEmbed()
        .setTitle(`${user.username} Avatar`)
        .setImage(user.displayAvatarURL());

        message.channel.send(avatar_embed)
        }
    });


discordclient.login(process.env.token);