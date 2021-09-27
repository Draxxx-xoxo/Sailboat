const {Client} = require('pg');
const {pgkey} = require('../../../config.json');
const {MessageEmbed} = require('discord.js');
const Discord = require('discord.js');
const disbut = require("discord-buttons");
const {command_logging} = require('../../handlers/common_functions')
const {reportbuttons} = require('../../handlers/common_buttons')
const {reportlog} = require('../../handlers/common_embeds')
const {run} = require('./report_buttons/deny');

module.exports = {
	execute: async (button, discordclient) => {

        const client = new Client({
            connectionString: pgkey,
            ssl: {
                rejectUnauthorized: false
            }
        });
       
        const report_id = button.message.embeds[0].title.slice(8)

        // opening connection
        await client.connect();

        const query = `SELECT * FROM guild.reports WHERE "server_id" = ${button.guild.id} AND "report_id" = ${report_id}`

        const res = await client.query(query);

        const member = discordclient.users.cache.get(res.rows[0].reported_user_id)

        const reason_ = res.rows[0].reason

        const report_buttons = await reportbuttons(true)

        if(button.id == 'warn'){
            const moderator_id = button.message.author
            const timestamp = Date.now();
            const query = `
        
            INSERT INTO guild.Infractions(
                discord_id, discord_tag, infractions, moderator_id, moderator_tag, reason, timestamp, server_id)
                VALUES (${member.id}, '${member.username}#${member.discriminator}', 'warn', ${moderator_id.id}, '${moderator_id.username}#${moderator_id.discriminator}', '${reason_}', ${timestamp}, ${button.guild.id});
            
            UPDATE guild.reports
                SET status = 'approved'
                WHERE "report_id" = ${report_id} AND "server_id" = ${button.guild.id}
                RETURNING *
            `
            const embed = new MessageEmbed()
            .setTitle(`You have been warned in ${button.guild.name}`)
            .setDescription(`Reason\n` + '```' + reason_ + '```');
    
    
            const res = (await client.query(query))[1].rows[0]

            const updateembed = await reportlog(res, '🟢')

            button.message.edit({
                embed: updateembed,
                buttons: report_buttons
            })
    
            button.reply.send(`${member.id} has been warned :ok_hand: User has been notified`);
    
    
            discordclient.users.cache.get(member.id).send(embed).catch(() => button.message.reply("Can't send DM to your user!"));
    
    
            if(await command_logging(button.guild.id) ==  true){
                Log.Send(
                    discordclient,
                    `${moderator_id.username}#${moderator_id.discriminator} warned ${member.user.username}#${member.user.discriminator} ` + '`' + `${member.user.id}` + '`' + ` Reason: ${reason_ || 'None'}`,
                    message.guild.id
                );
            }
        }
        else if (button.id == 'deny'){
            await run(button, report_id, client, member, report_buttons);
        }

        client.end();
        
    }
};  
