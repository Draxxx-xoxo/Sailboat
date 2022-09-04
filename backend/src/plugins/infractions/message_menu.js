const {Client} = require('pg');
const {pgkey} = require('../../../config.json');
const {MessageEmbed} = require('discord.js')

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

        const query = `SELECT * FROM public.infractions WHERE id = ${inf_id} AND guild_id = ${menu.guild.id} ORDER BY id DESC`
       
        const res = (await client.query(query).catch(console.error)).rows[0]


        if(menu.values[0]== "infraction"+res.id) {
            const embed = new MessageEmbed()
            .setTitle('Infraction #' + res.id)
            .addFields(
                {name: 'User', value: res.discord_tag + '\n<@' + res.discord_id + '>', inline: true},
                {name: 'Moderator', value: res.moderator_tag + '\n<@' + res.moderator_id + '>', inline: true},
                {name: 'Reason', value: res.reason || 'No Reason'}
            )
            .setFooter({text: 'Infraction was created on ' + res.created_at})
            await menu.reply({embeds: [embed]})
        }



        client.end();
        
    }
};  