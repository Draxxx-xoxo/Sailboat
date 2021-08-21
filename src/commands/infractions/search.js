const {Client} = require('pg');
const {pgkey} = require('../../../config.json');
const {MessageEmbed} = require('discord.js')

module.exports = {
	name: "inf_search",
	category: "botinfo",
    permissions:["MANAGE_GUILD","ADMINISTRATOR"],
	description: "Returns bot and API latency in milliseconds.",
	execute: async (message, args, discordclient) => {

        const member_id = args[0]
  
        const client = new Client({
            connectionString: pgkey,
                ssl: {
                    rejectUnauthorized: false
                }
        });
              
        // opening connection
        await client.connect();
         
        const query = `SELECT * FROM guild.infractions WHERE discord_id = ${member_id} AND server_id = ${message.guild.id} ORDER BY report_id DESC  `
  
        var res = await client.query(query).catch(console.error)
  
        for (let row of res.rows) {
            var reason = row.reason || '(no reason)'
            var report_id = row.report_id || ''
          
            const inf_search = new MessageEmbed()
            .setTitle(report_id)
            .setDescription(reason)
  
            message.channel.send(inf_search);
        }
  
              
        client.end();
    }
};  
