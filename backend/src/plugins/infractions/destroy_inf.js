const {Client} = require('pg');
const {pgkey} = require('../../../config.json');
const {MessageEmbed} = require('discord.js')
const {destroyinf} = require('../../handlers/common_buttons')

module.exports = {
	name: "inf_destroy",
	category: "botinfo",
    aliases:['infraction_destroy', 'inf_destroy'],
    permissions:["MANAGE_GUILD","ADMINISTRATOR"],
	description: "Returns bot and API latency in milliseconds.",
	execute: async (message, args, discordclient) => {

        const inf_id = args[0];
  
        const client = new Client({
            user: process.env.user,
            host: process.env.host,
            database: process.env.db,
            password: process.env.passwd,
            port: process.env.port,
        });

        if(!inf_id){
            return message.channel.send('Please enter a infraction to delete')
        }
              
        // opening connection
        await client.connect();

        const query = `SELECT * FROM guild.infractions WHERE report_id = ${inf_id} AND server_id = ${message.guild.id} ORDER BY report_id DESC`
       
        const res = (await client.query(query).catch(console.error)).rows[0]

        const timestamp = `${res.timestamp}` || ''

        var date = new Date (timestamp).toLocaleString()


        const embed = new MessageEmbed()
        .setTitle('Infraction #' + res.report_id)
        .addFields(
            {name: 'User', value: res.discord_tag + '\n<@' + res.discord_id + '>', inline: true},
            {name: 'Moderator', value: res.moderator_tag + '\n<@' + res.moderator_id + '>', inline: true},
            {name: 'Reason', value: res.reason || 'No Reason'}
        )
        .setFooter('Infraction was created on ' + date)

        const filter = response => {
            return response.author.id === message.author.id;
        }       

        const buttons = await destroyinf(false)
        
        message.channel.send('Are you sure you want to delete this infraction? Click on `Yes` if you wish to procced', {buttons : buttons , embed:embed})
        
        client.end();
        
    },

    button: async(button, discordclient) => {

        const client = new Client({
            connectionString: pgkey,
            ssl: {
                rejectUnauthorized: false
            }
        });

        const buttons = await destroyinf(true)

        if(button.id == 'yes'){

            await client.connect()

            const inf_id =  button.message.embeds[0].title.slice(12)
            const delete_query = `DELETE FROM guild.infractions WHERE report_id = ${inf_id} AND server_id = ${button.guild.id}`
            const res = await client.query(delete_query).catch(console.error)


            button.reply.send('#' + inf_id + ' has been deleted');
            button.message.edit({
                buttons: buttons
            })

            client.end()
        }
        else if (button.id == 'no'){

            button.reply.send('Action cancelled')
            button.message.edit({
                buttons: buttons
            })
        }

    }
};  