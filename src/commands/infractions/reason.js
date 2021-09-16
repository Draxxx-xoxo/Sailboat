const {Client} = require('pg');
const {pgkey} = require('../../../config.json');
const {MessageEmbed} = require('discord.js')
const disbut = require("discord-buttons");

module.exports = {
	name: "reason",
	category: "botinfo",
    aliases:['inf_reason'],
    permissions:["MANAGE_GUILD","ADMINISTRATOR"],
	description: "Returns bot and API latency in milliseconds.",
	execute: async (message, args, discordclient) => {

        const inf_id = args[0];

        const reason = args.slice(1).join(' ');
  
        const client = new Client({
            connectionString: pgkey,
            ssl: {
                rejectUnauthorized: false
            }
        });
              
        // opening connection
        await client.connect();

        const query = `UPDATE guild.infractions SET reason = '${reason}' WHERE report_id = ${inf_id} AND server_id = ${message.guild.id}`
       
        const res = (await client.query(query).catch(console.error)).rows[0]


        const checkquery = `SELECT * FROM guild.infractions WHERE report_id = ${inf_id} AND server_id = ${message.guild.id} ORDER BY report_id DESC`

        const checkres = (await client.query(checkquery).catch(console.error)).rows[0]

        if(!checkres){
            return message.channel.send('Please enter a valid infraction')
        }

        message.channel.send(`Reason for #${inf_id} has been updated to` + '```' + reason + '```')
        
        client.end();
        
    }
};  