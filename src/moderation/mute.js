const fs = require('fs');
const Discord = require('discord.js');
const { mainprefix, token, pgkey } = require('../../config.json');
const {Client} = require('pg');
const { send } = require('process');

const discordclient = new Discord.Client();
discordclient.commands = new Discord.Collection();

discordclient.once('ready', () => {
	console.log('mute Ready!');

	discordclient.user.setActivity(`Watching EVEE`)
});



discordclient.on('message', async message => {



    const client = new Client({
        connectionString: pgkey,
            ssl: {
            rejectUnauthorized: false
            }
        });      



    if(message.content.startsWith(`${mainprefix}mute_setup`)){
        if(message.member.hasPermission("MANAGE_GUILD")){
            const args = message.content.slice((mainprefix + 'mute_setup').length).trim().split(' ');
            let role = message.guild.roles.cache.get(args[0]) || message.guild.roles.cache.find(r => r.name === args.join(" ")) || message.mentions.roles.first()

            client.connect();

            if(!args){
                return message.channel.send('Please input a role ID')
            }
            if(!role){
                return message.channel.send('Invaild role')
            }

            const query = `
            UPDATE guild_settings.mute_role SET mute_role_id=${role.id} WHERE server_id = ${message.guild.id};
            `

            await client.query(query);
            message.channel.send(`Mute Role has been updated to ${args}`)
            
            client.end()
        }
        else{
            message.channel.send('Unable to update muted role. Please try agian')
        }
    }
	
				
    else if (message.content.startsWith(`${mainprefix}mute`)) {
         
        if(message.member.hasPermission("MANAGE_MESSAGES")){
          
                        // opening connection
                client.connect();
                    
                
                let cont = message.content.slice((mainprefix + `mute `).length).split(" ")
                var member_id = message.mentions.users.first()
                var member_id = message.mentions.users.first()|| cont.slice(0,1).toString()
                let reason_ = cont.slice(1).join(" ").toString()
                let user = message.guild.members.cache.get(member_id.id || member_id);
            
    
                const select_query = `
                SELECT * FROM guild_settings.mute_role WHERE server_id = ${message.guild.id} 
                `


                if(!message.member.hasPermission("MANAGE_MESSAGES")){
                    return message.channel.send('You do not have permissions to mute')
                }
                else if (message.mentions.users.first() == message.member.user){
                    return message.channel.send('You cannot mute youself :person_facepalming:')
                }
                else if (member_id == message.member.user.id){
                    return message.channel.send('You cannot mute yourself :person_facepalming:')
                }
            
        if(user){

            const mute_member = user.user
            const moderator_id = message.member.user
            const timestamp = Date.now()
            const query = `
        
            INSERT INTO guild.Infractions(
                discord_id, discord_tag, infractions, moderator_id, moderator_tag, reason, timestamp, server_id)
                VALUES (${mute_member.id}, '${mute_member.username}#${mute_member.discriminator}', 'mute', ${message.author.id}, '${moderator_id.username}#${moderator_id.discriminator}', '${reason_}', ${timestamp}, ${message.guild.id});
            
            `

            

            var res = await client.query(select_query).catch(console.error)

            for (let row of res.rows) {
            var role_id = row.mute_role_id

            if(role_id == 1){
                return message.channel.send('Please add a mute role')
            }


           if(user.roles.cache.has(role_id)){
                return message.channel.send('That person has already been muted')
            }

            const embed = new Discord.MessageEmbed()
            .setTitle(`You have been muted in ${message.guild.name}`)
            .setDescription(`**Reason**\n` + reason_ )

                user.roles.add(role_id)
                client.query(query);
            
                message.channel.send(`${member_id} has been muted :ok_hand: User has been notified`)
                        .then(msg => {
                            msg.delete({ timeout: 3000 })
                          })
            
                        discordclient.users.cache.get(user.user.id).send(embed);
                }
            }
                else {
                    message.channel.send(`Invaild User || Unable to Mute`)
                    .then(msg =>{
                    msg.delete({timeout: 3000})
                })
            };
            
            client.end()
        
        } 
    }
    else if (message.content.startsWith(`${mainprefix}unmute`)) {
         
        if(message.member.hasPermission("MANAGE_MESSAGES")){
          
                        // opening connection
                client.connect();
                    
                
                let cont = message.content.slice((mainprefix + `unmute `).length).split(" ")
                var member_id = message.mentions.users.first()
                var member_id = message.mentions.users.first()|| cont.slice(0,1).toString()
                let reason_ = cont.slice(1).join(" ").toString()
                let user = message.guild.members.cache.get(member_id.id || member_id);
            
    
                const select_query = `
                SELECT * FROM guild_settings.mute_role WHERE server_id = ${message.guild.id} 
                `


                if(!message.member.hasPermission("MANAGE_MESSAGES")){
                    return message.channel.send('You do not have permissions to unmute')
                }
                else if (message.mentions.users.first() == message.member.user){
                    return message.channel.send('You cannot unmute youself :person_facepalming:')
                }
                else if (member_id == message.member.user.id){
                    return message.channel.send('You cannot unmute yourself :person_facepalming:')
                }
            
        if(user){

            var res = await client.query(select_query).catch(console.error)

            for (let row of res.rows) {
            var role_id = row.mute_role_id

            if(role_id == 1){
                return message.channel.send('Please add a mute role')
            }

            if(!user.roles.cache.has(role_id)){
                return message.channel.send('That person is not muted')
            }

            const embed = new Discord.MessageEmbed()
            .setTitle(`You have been unmuted in ${message.guild.name}`)

                user.roles.remove(role_id)
            
                client.end()
                message.channel.send(`${member_id} has been unmuted :ok_hand: User has been notified`)
                        .then(msg => {
                            msg.delete({ timeout: 3000 })
                          })
            
                        discordclient.users.cache.get(user.user.id).send(embed);
                }
            }
                else {
                    message.channel.send(`Invaild User || Unable to Unmute
                    `)
                    .then(msg =>{
                    msg.delete({timeout: 3000})
                })
            };
            
        
        } 
    }
    
	});



discordclient.login(process.env.token);