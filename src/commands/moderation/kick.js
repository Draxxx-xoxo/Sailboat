const {Client} = require('pg');
const {pgkey} = require('../../../config.json');
const {MessageEmbed} = require('discord.js')

module.exports = {
	name: "kick",
	category: "botinfo",
    permissions:["KICK_MEMBERS"],
	description: "Returns bot and API latency in milliseconds.",
	execute: async (message, args, discordclient) => {

        if(message.mentions.roles.first()){
            return message.channel.send('Why are you mentioning a role? <:blob_ping:807930234410237963>')
        }

        var member_id = message.mentions.users.first().id || args[0]

        //Dumb not working
        if(!member_id){
            return message.channel.send('Please mention a user or input a user ID')
        };
        
        let reason_ = args.slice(1).join(" ").toString();
        let user = message.guild.members.cache.get(member_id);
        

        if(!user){
            return message.channel.send(`Invaild User || Unable to kick member`);
        }
        else if (message.mentions.users.first() == message.member.user){
            return message.channel.send('You cannot kick youself :person_facepalming:');
        }
        else if (member_id == message.member.user.id){
            return message.channel.send('You cannot kick yourself :person_facepalming:');
        };
    
        const client = new Client({
            connectionString: pgkey,
            ssl: {
                rejectUnauthorized: false
            }
        });
    
        await client.connect()
            
        const kick_member = user.user
        const moderator_id = message.member.user
        const timestamp = Date.now()
        const query = `
            
        INSERT INTO guild.Infractions(
            discord_id, discord_tag, infractions, moderator_id, moderator_tag, reason, timestamp, server_id)
            VALUES (${kick_member.id}, '${kick_member.username}#${kick_member.discriminator}', 'kick', ${message.author.id}, '${moderator_id.username}#${moderator_id.discriminator}', '${reason_}', ${timestamp}, ${message.guild.id});
            `
                
        const embed = new MessageEmbed()
            .setTitle(`You have been kicked in ${message.guild.name}`)
            .setDescription(`Reason\n` + '```' + reason_ + '```')
                
                
        user.kick()
                
        client.query(query);
                
        message.channel.send(`${member_id} has been kicked :ok_hand: User has been notified`)
            .then(msg => {
            msg.delete({ timeout: 3000 })
            })
                
        discordclient.users.cache.get(user.user.id).send(embed);
            
        client.end();
        }
    }
    