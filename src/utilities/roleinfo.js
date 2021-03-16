const Discord = require('discord.js');
const { roleinfo, token, pgkey } = require('../../config.json');
const {Client} = require('pg')
const functions = require('../common_functions')
const yaml = require('js-yaml')
const fs = require('fs')

const discordclient = new Discord.Client();
discordclient.commands = new Discord.Collection();



discordclient.once('ready', () => {
	console.log('Role_info');
});

discordclient.on('message', async message => {

    const prefix = await functions.getPreix(fs, yaml)

    if(message.content.startsWith( prefix + roleinfo)){
        
    const args = message.content.slice(`${prefix}${roleinfo}`.length).trim().split(' ');

    let role = message.guild.roles.cache.get(args[0]) || message.guild.roles.cache.find(r => r.name === args.join(" ")) || message.mentions.roles.first()

{

    if (!role) {
      return message.reply(`Please mention a role.`);
    }

    let rolecheck = message.guild.roles.cache.find(r => r.name === role.name);

    if (!rolecheck) {
      return message.reply(`I cant find that role!`);
    }

    const embed = new Discord.MessageEmbed()
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
}
});



discordclient.login(process.env.token);