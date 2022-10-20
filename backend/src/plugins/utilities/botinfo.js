const { MessageEmbed } = require("discord.js")
const { SlashCommandBuilder } = require("@discordjs/builders");
const moment = require("moment")
const cpu = require("pidusage")
require("moment-duration-format")

module.exports = {
  name: "botinfo",
  category: "botinfo",
  description: "Returns bot and API latency in milliseconds.",
  enable: true,
  execute: async (message, client) => {
    cpu(process.pid, async () => {
      const duration = moment
        .duration(client.uptime)
        .format(" D [days], H [hrs], m [mins], s [secs]")
      const embed = new MessageEmbed()
        .setColor("0000FF")
        .setTitle("__**EVEE Information Page**__")
        .addFields(
          { name: "Bot Username", value: "Wall-E" },
          { name: "System Info", value:"**RAM Usage:** " + (process.memoryUsage().heapUsed /1024 /1024).toFixed(2) + "MB" + "\n**Bot Uptime:** " + duration + "\n**Discord.js:** 12.5.0" },
          { name: "Bot Info", value: `**Status:** ${client.user.presence.status.toString()} \n**Users:** ${client.users.cache.size.toString()} \n**Servers:** ${client.guilds.cache.size.toString()} \n**Channels:** ${client.channels.cache.size.toString()} \n**Created on:** ${client.user.createdAt.toString()}` }
        )
        .setFooter({ text: message.user.username, iconURL: message.user.displayAvatarURL() })
        .setTimestamp()
        .setColor("#0000FF")
      message.reply({ embeds: [embed] })
    })
  },
  data: new SlashCommandBuilder()
    .setName("botinfo")
    .setDescription("Returns information on the Bot")
}
