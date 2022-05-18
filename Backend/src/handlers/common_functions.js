const yaml = require('js-yaml');
const fs = require('fs');
const functions = require('./pg');

async function pg_table(guildid){
const pg = await functions.pg(`SELECT * FROM guild.configuration WHERE guild_id = ${guildid}`)

    const doc = pg.rows[0].configuration

    return doc 
}
module.exports = {

    async yamlfile(message) {
        const doc = pg_table(message.guild.id)
        return doc
    },

    async getPreix(guildid) {
        const doc = await pg_table(guildid);
        return doc.guild_settings.prefix
    },

    async muteRole(message) {
        const doc = await pg_table(message.guild.id);
        return doc.plugins.mute_settings.role
    },

    async censorWords(message) {
        const doc = await pg_table(message.guild.id);
        return doc.plugins.censor.censor_words
    },

    async censorIgnoreUser(message) {
        const doc = await pg_table(message.guild.id);
        return doc.plugins.censor.ignore_users
    },

    async censorIgnoreChannel(message) {
        const doc = await pg_table(message.guild.id);
        return doc.plugins.censor.ignore_channels
    },


    async welcomechannel(guildid) {
        const doc = await pg_table(guildid);
        return doc.plugins.welcome_channel.channel
    },

    async join_message(guildid) {
        const doc = await pg_table(guildid);
        return doc.plugins.welcome_channel.join_message
    },

    async leave_message(guildid) {
        const doc = await pg_table(guildid);
        return doc.plugins.welcome_channel.leave_message
    },

    async command_logging(guildid) {
        const doc = await pg_table(guildid);
        return doc.plugins.logging.command_logging
    },
    async command_logging(guildid) {
        const doc = await pg_table(guildid);
        return doc.plugins.logging.infractions_logging
    },
    async report_pugin(guildid) {
        const doc = await pg_table(guildid);
        return doc.plugins.reports.report_user
    },
    async report_logging(guildid) {
        const doc = await pg_table(guildid);
        return doc.plugins.logging.report_logging
    },
    async report_logging_channel(guildid) {
        const doc = await pg_table(guildid);
        return doc.plugins.reports.logging_channel
    },

    async infractionQ(member, moderator_id, reason_, message, timestamp, infraction) {
        const query = `
        INSERT INTO guild.Infractions(
            discord_id, discord_tag, infractions, moderator_id, moderator_tag, reason, timestamp, server_id)
            VALUES (${member.user.id}, '${member.user.username}#${member.user.discriminator}', '${infraction}', ${moderator_id.id}, '${moderator_id.username}#${moderator_id.discriminator}', '${reason_}', ${timestamp}, ${message.guild.id}); 
        `

        return query
    },

    async reportupdate(report_id, button, status){
        const query = `
        UPDATE guild.reports
        SET status = '${status}'
        WHERE "report_id" = ${report_id} AND "server_id" = ${button.guild.id}
        RETURNING *
        `
        return query
    },

    async rolelevel(guildid) {
        const doc = await pg_table(guildid);
        return doc.plugins.level
    }
}