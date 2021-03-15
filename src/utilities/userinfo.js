const fs = require('fs');
const Discord = require('discord.js');
const { mainprefix, token, pgkey } = require('../../config.json');
const {Client} = require('pg')
const functions = require('../common_functions')

const discordclient = new Discord.Client();
discordclient.commands = new Discord.Collection();

discordclient.once('ready', () => {
	console.log('Userinfo Ready');

	discordclient.user.setActivity(`Watching EVEE`)
});


discordclient.on('message', async message => {


    const client = new Client({
        connectionString: pgkey,
            ssl: {
            rejectUnauthorized: false
            }
        });      

    client.connect()

    const prefix = await functions.getPreix(message.guild.id, client)

    if (message.content.startsWith(`${prefix}userinfo`)) {

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

    client.end()
    }
});


discordclient.login(process.env.token);