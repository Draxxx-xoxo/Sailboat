const { MessageEmbed } = require("discord.js");
const Discord = require("discord.js");
const moment = require("moment");
const cpu = require("pidusage");
const { version, author } = require("discord.js");
require("moment-duration-format");

const BOTversion = "2.1.0";
const { mainprefix, token } = require('../../config.json');
const client = new Discord.Client();
client.commands = new Discord.Collection();

client.once('ready', () => {
	console.log('bot info');
});

client.on('message', async message => {
        if (message.content === mainprefix + 'botinfo'){
   
            cpu(process.pid, async (err, stats) => {
                const duration = moment
                  .duration(client.uptime)
                  .format(" D [days], H [hrs], m [mins], s [secs]");
                const d = new Date();
          
                const embed = new MessageEmbed()
                  .setColor("0000FF")
                  .setTitle("__**Wall-E Utilities Information Page**__")
          
                  .addField("Bot Username", "Wall-E")
                  .addField(
                    "System Info",
                    `**RAM Usage:** ${(
                      process.memoryUsage().heapUsed /
                      1024 /
                      1024
                    ).toFixed(2)}MB
                
                **Bot Uptime:** ${duration}
                **Discord.js:** 12.5.0
                **Startup Time:** 6 seconds
               
            
                `
                  )
                  .addField(
                    "Bot Info",
                    `**Status:** ${client.user.presence.status}
                **Users:** ${client.users.cache.size}
                **Servers:** ${client.guilds.cache.size}
                **Channels:** ${client.channels.cache.size}
                **Created on:** ${client.user.createdAt}
            
                
                `
                  )
                 
                  .setFooter(message.author.username, message.author.displayAvatarURL)
                  .setTimestamp()
                  .setColor("#0000FF");
          
                message.channel.send(embed);

                  }
            )}
    });
    
    
    
    client.login(process.env.token);