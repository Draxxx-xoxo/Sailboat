const {Client} = require('pg');
const {pgkey, prefix} = require('../../../config.json');
const {MessageEmbed} = require('discord.js')
const Log = require("../../handlers/logging");

module.exports = {
	name: "warn",
	category: "botinfo",
    permissions:["MANAGE_MESSAGES"],
	description: "Returns bot and API latency in milliseconds.",
	execute: async (message, args, discordclient) => {
        const client = new Client({
            connectionString: pgkey,
                ssl: {
                rejectUnauthorized: false
                }
            });      
    
        await client.connect()

        if(message.mentions.roles.first()){
            return message.channel.send('Why are you mentioning a role? <:blob_ping:807930234410237963>')
        }

        var member = message.guild.member(message.mentions.users.first() || message.guild.members.cache.get(args[0]));

        //Dumb not working
        if(!member){
            return message.channel.send('Please mention a user or input a user ID')
        };

        let reason_ = args.slice(1).join(" ").toString();

        if (member.id == message.member.id){
            return message.channel.send('You cannot warn youself :person_facepalming:')
        };


        const moderator_id = message.member.user
        const timestamp = Date.now();
        const query = `
    
        INSERT INTO guild.Infractions(
            discord_id, discord_tag, infractions, moderator_id, moderator_tag, reason, timestamp, server_id)
            VALUES (${member.user.id}, '${member.user.username}#${member.user.discriminator}', 'warn', ${moderator_id.id}, '${moderator_id.username}#${moderator_id.discriminator}', '${reason_}', ${timestamp}, ${message.guild.id});
        
        `
        const embed = new MessageEmbed()
        .setTitle(`You have been warned in ${message.guild.name}`)
        .setDescription(`Reason\n` + '```' + reason_ + '```');


        await client.query(query);

        message.channel.send(`${member.user.id} has been warned :ok_hand: User has been notified`)
        .then(msg => {
            msg.delete({ timeout: 3000 })
          });

        discordclient.users.cache.get(member.user.id).send(embed);

        Log.Send(
			discordclient,
			`${moderator_id.username}#${moderator_id.discriminator} warned ${member.user.username}#${member.user.discriminator} ` + '`' + `${member.user.id}` + '`' + ` Reason: ${reason_ || 'None'}`
		);
        await client.end();
    },
};
