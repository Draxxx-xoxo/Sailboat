const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {
  name: "ping",
  user: ["716206954313285713"],
  permissions: 200,
  execute: async (message, client) => {
    const mesg = await message.reply({ content: "Pong!", fetchReply: true });

    await message.editReply({ content: `Pong!\n🏓 Bot Latency: \`${mesg.createdTimestamp - message.createdTimestamp}ms\`, Websocket Latency: \`${client.ws.ping}ms\`` });
  },
  data: new SlashCommandBuilder()
    .setName("ping")
    .setDescription("Replies with Pong!"),
};
