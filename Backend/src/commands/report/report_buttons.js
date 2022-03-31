const {Client} = require('pg');
const {pgkey} = require('../../../config.json');
const {MessageEmbed} = require('discord.js');
const Discord = require('discord.js');
const disbut = require("discord-buttons");
const {command_logging} = require('../../handlers/common_functions')
const {reportbuttons} = require('../../handlers/common_buttons')
const {reportlog} = require('../../handlers/common_embeds')
const moderation = require('./report_buttons/moderation');

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

        const member = button.guild.member(res.rows[0].reported_user_id)

        if(!member){
            button.reply.send({ content: 'Member is not in the guild', ephemeral: true})
            return
        }

        const reason_ = res.rows[0].reason

        const report_buttons = await reportbuttons(true)

        if(button.id == 'warn'){
            await moderation.warn(button, report_id, client, member, report_buttons, reason_, discordclient);
        };
        if (button.id == 'deny'){
            await moderation.deny(button, report_id, client, member, report_buttons);
        };
        if (button.id == 'kick'){
            await moderation.kick(button, report_id, client, member, report_buttons, reason_, discordclient)
        };
        if (button.id == 'ban'){
            await moderation.ban(button, report_id, client, member, report_buttons, reason_, discordclient)
        }
        if (button.id == 'mute'){
            await moderation.mute(button, report_id, client, member, report_buttons, reason_, discordclient)
        }
        client.end();
        
    }
};  
