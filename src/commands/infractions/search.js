const {Client} = require('pg');
const {pgkey} = require('../../../config.json');
const {MessageEmbed} = require('discord.js')

module.exports = {
	name: "inf_search",
	category: "botinfo",
    permissions:["MANAGE_GUILD","ADMINISTRATOR"],
	description: "Returns bot and API latency in milliseconds.",
	execute: async (message, args, discordclient) => {

        var member = message.guild.member(message.mentions.users.first() || message.guild.members.cache.get(args[0])); 
  
        const client = new Client({
            connectionString: pgkey,
            ssl: {
                rejectUnauthorized: false
            }
        });
              
        // opening connection
        await client.connect();
         
        const query = `SELECT * FROM guild.infractions WHERE discord_id = ${member.user.id} AND server_id = ${message.guild.id} ORDER BY report_id DESC LIMIT 5 `
  
        var res = (await client.query(query).catch(console.error)).rows



        var top5view = (
            `
            ID ${res[0].report_id} (${res[0].infractions}): ${res[0].reason || 'No Reason'}
            ID ${res[1].report_id} (${res[1].infractions}): ${res[1].reason || 'No Reason'}
            ID ${res[2].report_id} (${res[2].infractions}): ${res[2].reason || 'No Reason'}
            ID ${res[3].report_id} (${res[3].infractions}): ${res[3].reason || 'No Reason'}
            ID ${res[4].report_id} (${res[4].infractions}): ${res[4].reason || 'No Reason'}
            `
            )
            //ID 48 (Ban): Reason

        var inf_search = new MessageEmbed()
            .setAuthor(`Infractions Overview for ${member.user.username}`, member.user.displayAvatarURL())
            .setThumbnail(member.user.displayAvatarURL())
            .addFields(
                { name: "Top 5 Infractions", value: top5view},
                { name: 'Total Infractions', value: res.rowCount, inline: true },
                { name: `Joined ${message.member.guild.name}`, value: new Date (member.joinedTimestamp).toLocaleString(), inline: true },
            )
        

        
        message.channel.send(inf_search);
  
              
        client.end();
    }
};  
