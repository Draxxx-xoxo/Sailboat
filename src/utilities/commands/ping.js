
const fs = require('fs');
const Discord = require('discord.js');
const { mainprefix, token, pgkey } = require('../../../config.json');

const client = new Discord.Client();
client.commands = new Discord.Collection();



client.once('ready', () => {
	console.log('ping.js!');

	client.user.setActivity(`Watching EVEE`)
});


client.on('message', async message => {

				
	if (message.content ===  mainprefix + 'ping'){
		message.channel.send('Loading data').then (async (msg) =>{
		msg.edit(`🏓Latency is ${msg.createdTimestamp - message.createdTimestamp}ms. API Latency is ${Math.round(discordclient.ws.ping)}ms`);
		});
		}
		else if (message.content === `prefix`){

			const embed = new Discord.MessageEmbed()
			.setTitle('Bot Prefix')
			.setDescription('```'+ mainprefix + '```')

			message.channel.send(embed)
		}
		
		

	});



client.login(process.env.token);
