const {Client} = require('pg');
const {pgkey} = require('../../../config.json');
const {MessageEmbed} = require('discord.js')
const functions = require('../../common_functions')

module.exports = {
	name: "unmute",
	category: "botinfo",
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
                
        
        const select_query = `
            SELECT * FROM guild_settings.mute_role WHERE server_id = ${message.guild.id} 
        `
    
    
        if(!user){
            return message.channel.send(`Invaild User || Unable to ban member`);
        }
        else if (message.mentions.users.first() == message.member.user){
            return message.channel.send('You cannot mute youself :person_facepalming:')
        }
        else if (member_id == message.member.user.id){
            return message.channel.send('You cannot mute yourself :person_facepalming:')
        };
        
        const client = new Client({
            connectionString: pgkey,
                ssl: {
                rejectUnauthorized: false
                }
            });      
    
        await client.connect()

        const role_id = await functions.muteRole(message);
        

        if(!role_id){
            return message.channel.send('Please add a mute role')
        }

        if(user.roles.cache.has(role_id) == false){
            return message.channel.send('That person is not muted')
        }

        const embed = new MessageEmbed()
        .setTitle(`You have been unmuted in ${message.guild.name}`)

        user.roles.remove(role_id)
        
        client.end()
        message.channel.send(`${member_id} has been unmuted :ok_hand: User has been notified`)
            .then(msg => {
                msg.delete({ timeout: 3000 })
            })    
        discordclient.users.cache.get(user.user.id).send(embed);
                
        await client.end()        
    } 
};
    