const {Client} = require('pg');
const {pgkey} = require('../../../config.json');
const {MessageEmbed} = require('discord.js');
const Discord = require('discord.js');
const disbut = require("discord-buttons");
const warn = require('../moderation/warn');
const {command_logging} = require('../../handlers/common_functions')

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

        if(button.id == 'warn'){
            const moderator_id = button.message.author
            const timestamp = Date.now();
            const query = `
        
            INSERT INTO guild.Infractions(
                discord_id, discord_tag, infractions, moderator_id, moderator_tag, reason, timestamp, server_id)
                VALUES (${member.id}, '${member.username}#${member.discriminator}', 'warn (Reported)', ${moderator_id.id}, '${moderator_id.username}#${moderator_id.discriminator}', '${reason_}', ${timestamp}, ${button.guild.id});
            
            `
            const embed = new MessageEmbed()
            .setTitle(`You have been warned in ${button.guild.name}`)
            .setDescription(`Reason\n` + '```' + reason_ + '```');
    
    
            await client.query(query);
    
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
        client.end();
        
    }
};  
