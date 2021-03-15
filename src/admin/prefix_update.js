const fs = require('fs');
const Discord = require('discord.js');
const { mainprefix, token, pgkey } = require('../../config.json');
const {Client} = require('pg');
const functions = require('../common_functions')

const discordclient = new Discord.Client();
discordclient.commands = new Discord.Collection();

discordclient.once('ready', () => {
	console.log('update prefix Ready!');

	discordclient.user.setActivity(`Watching EVEE`)
});


discordclient.on('message', async message => {
	const client = new Client({
		connectionString: pgkey,
		ssl: {
		  rejectUnauthorized: false
		}
	});
	// opening connection
	 client.connect();

  const prefix = await functions.getPreix(message.guild.id, client)

  if (message.content.startsWith(prefix + 'update_prefix')) {
         
    if(message.member.hasPermission('MANAGE_GUILD')){
            
        const new_prfix =  message.content.replace(prefix + `update_prefix `, '')
       
        const client = new Client({
          connectionString: pgkey,
          ssl: {
          rejectUnauthorized: false
          }
        });
                        
                        // opening connection
        client.connect();
                    
        const prefix_query = `
        UPDATE guild_settings.prefix
        SET prefix='${new_prfix}'
        WHERE server_ID= ${message.guild.id};
        `
            
        client.query(prefix_query)
            
        .then(res => {
        message.channel.send("Prefix has been set to " + new_prfix)
        })
        .catch(err => {
        console.error(err);
        })
        .finally(() => {
        client.end();
        });
      }
            
    }          
});







discordclient.login(process.env.token);