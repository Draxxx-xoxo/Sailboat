const Discord = require('discord.js');
const { roleinfo, token } = require('../../../config.json');
const client = new Discord.Client();
client.commands = new Discord.Collection();


client.once('ready', () => {
	console.log('Role_info');
});

client.on('message', async message => {

    if(message.content.startsWith(roleinfo)){
        
    const args = message.content.slice(roleinfo.length).trim().split(' ');

    let role = message.guild.roles.cache.get(args[0]) || message.guild.roles.cache.find(r => r.name === args.join(" ")) || message.mentions.roles.first()

{

    if (!role) {

      return message.reply(`Please mention a role.`);

    }

    let rolecheck = message.guild.roles.cache.find(r => r.name === role.name);

    if (!rolecheck) {

      return message.reply(`i cant find that role!`);

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



client.login(process.env.token);