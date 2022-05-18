const {Client} = require('pg');
const {pgkey} = require('../../../config.json');
const {MessageEmbed} = require('discord.js')
const disbut = require("discord-buttons");

module.exports = {
	name: "cacheuser",
	category: "botinfo",
	description: "Returns bot and API latency in milliseconds.",
	execute: async (message, args, discordclient) => {
        
        const client = new Client({
            user: process.env.user,
            host: process.env.host,
            database: process.env.db,
            password: process.env.passwd,
            port: process.env.port,
        });


        var guild_membersID = message.guild.members.cache.map(user => user.id);

        var guild_membersTag = message.guild.members.cache.map(members => members.user.tag);


        // opening connection
        await client.connect();

        for (let i = 0; i < guild_membersID.length; i++) {

        var query = `
        INSERT INTO guild.discord_users("UserID", discord_tag, "timestamp")
        SELECT * FROM (SELECT ${guild_membersID[i]}, '${guild_membersTag[i]}', ${Date.now()}) AS tmp
        WHERE NOT EXISTS (
        SELECT "UserID" FROM guild.discord_users WHERE "UserID" = '${guild_membersID[i]}'
        ) LIMIT 1;
        `
        
        const res = (await client.query(query).catch(console.error))
              
        }

        message.channel.send(guild_membersID.length + ' Members have been cached')

        client.end()

    

	},
};
