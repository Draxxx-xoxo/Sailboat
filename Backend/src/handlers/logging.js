const yaml = require('js-yaml');
const fs = require('fs');
const Discord = require('discord.js');
const {message} = new Discord.Client();

module.exports = {
	Send: (discordclient, log, guildid) => {
		const doc = yaml.load(fs.readFileSync(`./configuation_files/${guildid}.yml`, 'utf8'));

		var date = new Date();
		var hour = date.getHours();
		var minute = date.getMinutes();

		discordclient.channels.cache
			.get(doc.plugins.logging.channel)
			.send(`\`\`[${hour}:${minute}]\`\` ${log}`);
	},
};
