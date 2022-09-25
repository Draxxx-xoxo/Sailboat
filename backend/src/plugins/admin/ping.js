const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	name: "ping",
	category: "botinfo",
	description: "Returns bot and API latency in milliseconds.",
	user: ["716206954313285713"],
	execute: async (message, client) => {
		const mesg = await message.reply({ content: "Pong!", fetchReply: true });

		await message.editReply({ content: `Pong!\n🏓 Bot Latency: \`${mesg.createdTimestamp - message.createdTimestamp}ms\`, Websocket Latency: \`${client.ws.ping}ms\`` });
	},
	data: new SlashCommandBuilder()
		.setName('ping')
		.setDescription('Replies with Pong!'),
};
