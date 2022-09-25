const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	name: "ping",
	category: "botinfo",
	description: "Returns bot and API latency in milliseconds.",
	user: ["716206954313285713"],
	execute: async (message, client) => {
		message.reply({ content: `Both EVE and dsa.fan have been taken offline. It has been a great 2 years helping this community but unfortunately my mental health and wallet cannot justify keeping either running for any longer. While others may claim that this was a way to gain a revenue stream, it has never been about that and I cannot justify paying out of pocket only to have select people in the community constantly shit on me and put me through stress over a game. I truly thank all of the people that have shown their support over the years and I wish things ended on better terms. All existing links and data will be removed for __**ALL**__ players. \n\n __**Whats Next for EVEE?**__ \n EVEE will be repurposed for new things in the future \n Do keep a lookout :eyes:`})
	},
	data: new SlashCommandBuilder()
		.setName('what_happened_to_eve')
		.setDescription('Run this command to find out'),
};
