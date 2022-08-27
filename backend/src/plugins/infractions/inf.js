const {Client} = require('pg');
const {pgkey} = require('../../../config.json');
const {MessageEmbed} = require('discord.js')

module.exports = {
	name: "inf",
	category: "botinfo",
    aliases:['infraction','inf_search','case'],
    permissions:["MANAGE_GUILD","ADMINISTRATOR"],
	description: "Returns bot and API latency in milliseconds.",
	execute: async (message, args, discordclient) => {

        const inf_id = args[0];

        if(!inf_id) return message.channel.send('Please input a infraction id')
  
        const client = new Client({
            user: process.env.user,
            host: process.env.host,
            database: process.env.db,
            password: process.env.passwd,
            port: process.env.port,
        });
              
        // opening connection
        await client.connect();

        const query = `SELECT * FROM guild.infractions WHERE report_id = ${inf_id} AND server_id = ${message.guild.id} ORDER BY report_id DESC`
       
        const res = (await client.query(query).catch(console.error)).rows[0]

        if(res == undefined) return message.channel.send('This infraction does not exsist on this server')

        const timestamp = `${res.timestamp}`

        var date = new Date (timestamp).toLocaleString()

            const embed = new MessageEmbed()
            .setTitle('Infraction #' + res.report_id)
            .addFields(
                {name: 'User', value: res.discord_tag + '\n<@' + res.discord_id + '>', inline: true},
                {name: 'Moderator', value: res.moderator_tag + '\n<@' + res.moderator_id + '>', inline: true},
                {name: 'Reason', value: res.reason || 'No Reason'}
            )
            .setFooter({text: 'Infraction was created on ' + date})
            await message.channel.send({embeds: [embed]})
    
        client.end();
        
    }
};  