const {Client} = require('pg');
const {pgkey} = require('../../../config.json');
const {MessageEmbed} = require('discord.js')
const disbut = require("discord-buttons");

module.exports = {
	name: "inf",
	category: "botinfo",
    aliases:['infraction'],
    permissions:["MANAGE_GUILD","ADMINISTRATOR"],
	description: "Returns bot and API latency in milliseconds.",
	execute: async (message, args, discordclient) => {

        const inf_id = args[0];
  
        const client = new Client({
            connectionString: pgkey,
            ssl: {
                rejectUnauthorized: false
            }
        });
              
        // opening connection
        await client.connect();

        const query = `SELECT * FROM guild.infractions WHERE report_id = ${inf_id} AND server_id = ${message.guild.id} ORDER BY report_id DESC`
       
        const res = (await client.query(query).catch(console.error)).rows[0]

        const timestamp = `${res.timestamp}`

        var date = new Date (timestamp).toLocaleString()



            const embed = new MessageEmbed()
            .setTitle('Infraction #' + res.report_id)
            .addFields(
                {name: 'User', value: res.discord_tag + '\n<@' + res.discord_id + '>', inline: true},
                {name: 'Moderator', value: res.moderator_tag + '\n<@' + res.moderator_id + '>', inline: true},
                {name: 'Reason', value: res.reason || 'No Reason'}
            )
            .setFooter('Infraction was created on ' + date)
            await message.channel.send(embed)
    
        client.end();
        
    }
};  