const {Client} = require('pg');
const {pgkey, prefix} = require('../../../config.json');
const {MessageEmbed} = require('discord.js')

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

        var member_id = message.mentions.users.first().id || args[0]

        //Dumb not working
        if(!member_id){
            return message.channel.send('Please mention a user or input a user ID')
        };

        let reason_ = args.slice(1).join(" ").toString();
        let member_guild = message.guild.members.cache.get(member_id);

        if(!member_guild){
            return message.channel.send(`Invaild User || Unable to ban member`);
        }
        else if (message.mentions.users.first() == message.member.user){
            return message.channel.send('You cannot warn youself :person_facepalming:')
        }
        else if (member_id == message.member.user.id){
            return message.channel.send('You cannot warn yourself :person_facepalming:')
        };


        const warn_member = member_guild.user
        const moderator_id = message.member.user
        const timestamp = Date.now();
        const query = `
    
        INSERT INTO guild.Infractions(
            discord_id, discord_tag, infractions, moderator_id, moderator_tag, reason, timestamp, server_id)
            VALUES (${warn_member.id}, '${warn_member.username}#${warn_member.discriminator}', 'warn', ${message.author.id}, '${moderator_id.username}#${moderator_id.discriminator}', '${reason_}', ${timestamp}, ${message.guild.id});
        
        `
        const embed = new MessageEmbed()
        .setTitle(`You have been warned in ${message.guild.name}`)
        .setDescription(`Reason\n` + '```' + reason_ + '```');


        await client.query(query);

        message.channel.send(`${member_id} has been warned :ok_hand: User has been notified`)
        .then(msg => {
            msg.delete({ timeout: 3000 })
          });

          discordclient.users.cache.get(member_guild.user.id).send(embed);
        client.end();
    },
};
