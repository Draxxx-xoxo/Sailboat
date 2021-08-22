const yaml = require('js-yaml');
const fs = require('fs');
const doc = yaml.load(fs.readFileSync(`./configuation_files/734281219839230022.yml`, 'utf8'));

module.exports = {
	Send: (discordclient, log) => {
		var date = new Date();
		var hour = date.getHours();
		var minute = date.getMinutes();

		discordclient.channels.cache
			.get(doc.plugins.logging.channel)
			.send(`\`\`[${hour}:${minute}]\`\` ${log}`);
	},
};
