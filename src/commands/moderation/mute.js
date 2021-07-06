const {Client} = require('pg');
const {pgkey} = require('../../../config.json');
const {MessageEmbed} = require('discord.js')
const functions = require('../.././handlers/common_functions')

module.exports = {
	name: "mute",
	category: "botinfo",
	description: "Returns bot and API latency in milliseconds.",
	execute: async (message, args, discordclient) => {

                        
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
            return message.channel.send('You cannot mute youself :person_facepalming:')
        }
        
        const client = new Client({
            connectionString: pgkey,
                ssl: {
                rejectUnauthorized: false
                }
            });      
    
        await client.connect()
        
        const moderator_id = message.member.user
        const timestamp = Date.now()
        const query = `
        
        INSERT INTO guild.Infractions(
            discord_id, discord_tag, infractions, moderator_id, moderator_tag, reason, timestamp, server_id)
            VALUES (${member.id}, '${member.username}#${member.discriminator}', 'mute', ${message.author.id}, '${moderator_id.username}#${moderator_id.discriminator}', '${reason_}', ${timestamp}, ${message.guild.id});
            
        `
        
            var role_id = await functions.muteRole(message);
                
            if(!role_id){
                return message.channel.send('Please add a mute role')
            }
                
                
            if(member.roles.cache.has(role_id)){
                return message.channel.send('That person has already been muted')
            }
                
            const embed = new MessageEmbed()
            .setTitle(`You have been muted in ${message.guild.name}`)
            .setDescription(`**Reason**\n` + reason_ )
                
            member.roles.add(role_id)
            await client.query(query);
                
            message.channel.send(`${member.id} has been muted :ok_hand: User has been notified`)
            .then(msg => {
                msg.delete({ timeout: 3000 })
            })    
            discordclient.users.cache.get(member.user.id).send(embed);

            await client.end();
            
        } 
    };
    