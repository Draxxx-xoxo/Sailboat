const Discord = require('discord.js');
const { mainprefix, token } = require('../../../config.json');
const client = new Discord.Client();
const fetch = require('node-fetch');
client.commands = new Discord.Collection();

client.once('ready', () => {
	console.log('joke');
});

client.on('message', async message => {
	if (!message.content.startsWith(mainprefix) || message.author.bot) return;

	const args = message.content.slice(mainprefix.length).trim().split(/ +/);
	const command = args.shift().toLowerCase();

	if (command === 'joke') {
	
		let getJoke = async () => {
			let result = await fetch('https://official-joke-api.appspot.com/random_joke');
			let json = await result.json();
				return json;
		}

		let joke = await getJoke();

		message.channel.send(`Here is your joke ${joke.setup} ${joke.punchline}`);

	}
});



client.login(process.env.token);