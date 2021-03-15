const Discord = require('discord.js');
const { roleinfo, token, pgkey } = require('../../config.json');
const {Client} = require('pg')
const functions = require('../common_functions')

const discordclient = new Discord.Client();
discordclient.commands = new Discord.Collection();



discordclient.once('ready', () => {
	console.log('Role_info');
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
    client.end()
  }

}
});



discordclient.login(process.env.token);