const { MessageEmbed } = require("discord.js")
const moment = require("moment")
const cpu = require("pidusage")
require("moment-duration-format")

module.exports = {
  name: "botinfo",
  category: "botinfo",
  description: "Returns bot and API latency in milliseconds.",
  execute: async (message, args, client) => {
    cpu(process.pid, async () => {
      const duration = moment
        .duration(client.uptime)
        .format(" D [days], H [hrs], m [mins], s [secs]")
      const embed = new MessageEmbed()
        .setColor("0000FF")
        .setTitle("__**Wall-E Utilities Information Page**__")
        .addFields(
          { name: "Bot Username", value: "Wall-E" },
          { name: "System Info", value:"**RAM Usage:**" + (process.memoryUsage().heapUsed /1024 /1024).toFixed(2) + "MB" + "\n**Bot Uptime:**" + duration + "\n**Discord.js:** 12.5.0" },
          { name: "Bot Info", value: `**Status:** ${client.user.presence.status.toString()} \n**Users:** ${client.users.cache.size.toString()} \n**Servers:** ${client.guilds.cache.size.toString()} \n**Channels:** ${client.channels.cache.size.toString()} \n**Created on:** ${client.user.createdAt.toString()}` }
        )
        .setFooter({ text: message.author.username, iconURL: message.author.displayAvatarURL })
        .setTimestamp()
        .setColor("#0000FF")
      message.channel.send({ embeds: [embed] })
    })
  }
}
