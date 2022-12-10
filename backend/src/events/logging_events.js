require("dotenv").config(); 
const fs = require("fs");
const Discord = require("discord.js");
const {Intents} = require("discord.js");
const discordClient = new Discord.Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_MESSAGE_REACTIONS]});
const functions = require("../handlers/common_functions")
const Log = require("../handlers/logging")



discordClient.on("guildMemberRemove", async (member) => {
  const guildid = member.guild.id
  const channelId = await functions.welcomechannel(guildid)
  const channel = member.guild.channels.cache.get(channelId)
  channel.send(await functions.leave_message(guildid))
  Log.Send(discordClient,
    ` :outbox_tray:  (${member.user.tag},` + "`" + `${member.id})` + "`" + "left the server)",
    guildid
  )
})
  
discordClient.on("guildMemberAdd", async (member) => {
  const guildid = member.guild.id
  const channelId = await functions.welcomechannel(guildid)
  const channel = member.guild.channels.cache.get(channelId)
  channel.send(await functions.join_message(guildid))
  Log.Send(discordClient,
    ` :inbox_tray:  (${member.user.tag},` + "`" + `${member.id})` + "`" + "joined the server)",
    guildid
  )

})

discordClient.on("channelCreate", async (channel) => {
  const guildid = channel.guild.id
  Log.Send(discordClient,
    "Text channel" + "`" + `${channel.name}` + "`" + "was created",
    guildid
  )
})

discordClient.on("channelDelete", async (channel) => {
  const guildid = channel.guild.id
  Log.Send(discordClient,
    "Text channel" + "`" + `${channel.name}` + "`" + "was deleted",
    guildid
  )
})
discordClient.login(process.env.token);