const functions = require('../handlers/common_functions')
const Log = require('../handlers/logging')
const { pg } = require("../handlers/pg")
var jsonFormat = require("json-format");

module.exports = async (discordClient, message) => {
	let embed = message.embeds[0] || null
		
	if(embed == null){
		embed = null
	}
	else{
		embed = jsonFormat(message.embeds)
	}

	let stickers = message.stickers.toJSON() || null
	
	if(stickers == null){
		stickers = null
	}
	else{
		stickers = jsonFormat(stickers)
	}

	let attachments = message.attachments.toJSON() || null
	
	if(attachments == null){
		attachments = null
	}
	else{
		attachments = jsonFormat(attachments)
	}

	pg(`
	INSERT INTO public.message_logs(
		message_id, channel_id, author_id, author_tag, content, guild_id, attachments, sticker, embed)
		VALUES (${message.id}, '${message.channel.id}', '${message.author.id}', '${message.author.username}#${message.author.discriminator}', '${message.content}', ${message.guild.id}, '${attachments}', '${stickers}', '${embed}');
	
	`)
    const prefix = await functions.getPrefix(message.guild.id)
	const censor = require('../auto_mod/censor')
	const plugin_check = await functions.censor_check(message.guild.id);
	if(plugin_check == true && !message.author.bot){
		censor.execute(message, discordClient)
	}
	if (!message.content.startsWith(prefix) || message.author.bot) return;
	const args = message.content.slice(prefix.length).trim().split(/ +/);
	const commandName = args.shift().toLowerCase();
	const command = discordClient.commands.get(commandName) || discordClient.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));
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
		message.reply('There was an error trying to execute that command!');
	}
};