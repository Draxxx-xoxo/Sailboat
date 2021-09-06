require('dotenv').config(); 
const fs = require('fs');
const Discord = require('discord.js');
const {pgkey} = require('../../config.json');
const discordClient = new Discord.Client();
require('discord-buttons')(discordClient);
const { MessageButton, MessageActionRow } = require('discord-buttons');
const functions = require('../handlers/common_functions')
const Log = require('../handlers/logging')



discordClient.on('guildMemberRemove', async (member) => {
    const guildid = member.guild.id
    const channelId = await functions.welcomechannel(guildid)
	const channel = member.guild.channels.cache.get(channelId)
	channel.send(await functions.leave_message(guildid))
    Log.Send(discordClient,
        ` :outbox_tray:  (${member.user.tag},` + '`' + `${member.id})` + '`' + `left the server)`,
        guildid
    )
  })
  
discordClient.on('guildMemberAdd', async (member) => {
    const guildid = member.guild.id
    const channelId = await functions.welcomechannel(guildid)
	const channel = member.guild.channels.cache.get(channelId)
	channel.send(await functions.join_message(guildid))
    Log.Send(discordClient,
        ` :inbox_tray:  (${member.user.tag},` + '`' + `${member.id})` + '`' + `joined the server)`,
        guildid
    )

  })

discordClient.login(process.env.token);