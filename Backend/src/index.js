require('dotenv').config(); 
const fs = require('fs');
const {Intents} = require('discord.js');
const Discord = require('discord.js');
const {pgkey} = require('../config.json');
const functions = require('./handlers/common_functions')
const yaml = require('js-yaml');
const Log = require('./handlers/logging');
const discordClient = new Discord.Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_MESSAGE_REACTIONS, Intents.FLAGS.GUILD_MEMBERS]});
discordClient.commands = new Discord.Collection();


var commandFolders = fs.readdirSync("./src/plugins");

for (const folder of commandFolders) {
	const commandFiles = fs.readdirSync(`./src/plugins/${folder}`).filter(file => file.endsWith('.js'));
	for (const file of commandFiles) {
		const command = require(`./plugins/${folder}/${file}`);
		discordClient.commands.set(command.name, command);
	}
}


discordClient.once('ready', async () => {
		console.log(
			
				`[!] Username: ${discordClient.user.username}` +
				`\n[!] ID: ${discordClient.user.id}` +
				`\n[!] Guild Count: ${discordClient.guilds.cache.size}` + 
				`\n[!] Commands: ${discordClient.commands.size}` +
				`\n[!] Bot is online`

		)
});

//COMMANDS
discordClient.on('messageCreate', async message => {

	const prefix = await functions.getPreix(message.guild.id)

	if (!message.content.startsWith(prefix) || message.author.bot) return;

	const args = message.content.slice(prefix.length).trim().split(/ +/);
	const commandName = args.shift().toLowerCase();

	const command = discordClient.commands.get(commandName)
		|| discordClient.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));

	if (!command) return;

	if (command.guildOnly && message.channel.type === 'dm') {
		return message.reply('I can\'t execute that command inside DMs!');
	}

	if (command.permissions) {
		const authorPerms = message.channel.permissionsFor(message.author);
		if (!authorPerms || !authorPerms.has(command.permissions)) {
			return message.reply('You cannot use the ' + command.name + ' command');
		}
	}

	if(command.user){
		if(command.user[0] != message.author.id && command.user[1] != message.author.id ){
			return
		}
	}

	if (command.args && !args.length) {
		let reply = `You didn't provide any arguments, ${message.author}!`;

		if (command.usage) {
			reply += `\nThe proper usage would be: \`${prefix}${command.name} ${command.usage}\``;
		}

		return message.channel.send(reply);
	}

	try {
		command.execute(message, args, discordClient);
		if(await functions.command_logging(message.guild.id) == true){
		Log.Send(
			discordClient,
			`${message.member.user.tag} used the command` + '`' + prefix + command.name + '`' + ` in <#${message.channel.id}>`,
			message.guild.id
			)
		}
		
	} catch (error) {
		console.error(error);
		message.reply('there was an error trying to execute that command!');
	}
});


//Buttons
discordClient.on('interactionCreate', async interaction => {
	if (interaction.isButton()){
		if(interaction.component.customId == 'yes' || 'no'){
			const destroy_infs = require('./plugins/infractions/destroy_inf')

			try{
				destroy_infs.button(interaction, discordClient)
			} catch (error) {
				console.log(error);
			}
		}
		else{
			const report_buttons = require('./commands/report/report_buttons') 

			try{
				report_buttons.execute(interaction, discordClient)
			} catch (error) {
				console.log(error);
			}
		}
	}

	if(interaction.isSelectMenu()){
		const message_menu = require('./plugins/infractions/message_menu') 

		try{
			message_menu.execute(interaction, discordClient)
		} catch (error) {
			console.log(error);
		}
	}
});

/*

discordClient.on("clickMenu", async menu => {

	const message_menu = require('./plugins/infractions/message_menu') 

	try{
		message_menu.execute(menu, discordClient)
	} catch (error) {
		console.log(error);
	}
})*/


//AUTOMOD
discordClient.on('messageCreate', async message => {
	const censor = require('./auto_mod/censor')

	if(message.author.bot) return;

	try{
		censor.execute(message, discordClient)
	} catch (error) {
		console.log(error);
	}
	
});

discordClient.login(process.env.token);

