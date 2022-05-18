const {Client} = require('pg');
const {pgkey} = require('../../../config.json');
const {MessageEmbed} = require('discord.js')
const disbut = require("discord-buttons");

module.exports = {
	execute: async (menu, discordclient) => {
  
        const client = new Client({
            user: process.env.user,
            host: process.env.host,
            database: process.env.db,
            password: process.env.passwd,
            port: process.env.port,
        });
              
        // opening connection
        await client.connect();

        const inf_id = menu.values[0].replace(menu.values[0],menu.values[0].slice(10))

        const query = `SELECT * FROM guild.infractions WHERE report_id = ${inf_id} AND server_id = ${menu.guild.id} ORDER BY report_id DESC`
       
        const res = (await client.query(query).catch(console.error)).rows[0]

        const timestamp = `${res.timestamp}`

        var date = new Date (timestamp).toLocaleString()


        if(menu.values[0]== "infraction"+res.report_id) {
            const embed = new MessageEmbed()
            .setTitle('Infraction #' + res.report_id)
            .addFields(
                {name: 'User', value: res.discord_tag + '\n<@' + res.discord_id + '>', inline: true},
                {name: 'Moderator', value: res.moderator_tag + '\n<@' + res.moderator_id + '>', inline: true},
                {name: 'Reason', value: res.reason || 'No Reason'}
            )
            .setFooter('Infraction was created on ' + date)
            await menu.reply.send(embed)
        }



        client.end();
        
    }
};  
