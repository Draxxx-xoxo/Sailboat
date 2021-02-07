const fs = require('fs');
const Discord = require('discord.js');
const { mainprefix, token, pgkey } = require('../../../../config.json');
const {Client} = require('pg')

const discordclient = new Discord.Client();
discordclient.commands = new Discord.Collection();

discordclient.once('ready', () => {
	console.log('setup Ready!');

	discordclient.user.setActivity(`Watching EVEE`)
});

  discordclient.on('message', async message => {

    if (message.content.startsWith(mainprefix + 'setup')) {
         
        if(message.member.hasPermission('MANAGE_GUILD')){


            const client = new Client({
                connectionString: pgkey,
                ssl: {
                  rejectUnauthorized: false
                }
            });
            
            // opening connection
            await client.connect();
        

        const inf_query = `
        
         CREATE TABLE IF NOT EXISTS guild."`+ message.guild.id+`" (Report_ID bigint NOT NULL GENERATED ALWAYS AS IDENTITY ( INCREMENT 1 START 1 MINVALUE 1 MAXVALUE 100000000 CACHE 1 ),Discord_ID bigint, Discord_Tag text, Infractions text, Moderator_ID bigint, Moderator_Tag text, Reason text)
        `

        /*const prefix_query = `
        INSERT INTO guild_settings.prefix(server_id, prefix)
        SELECT * FROM (SELECT ${message.guild.id}, 'w!') AS tmp
        WHERE NOT EXISTS (
        SELECT server_id FROM guild_settings.prefix WHERE server_id = '${message.guild.id}'
        ) LIMIT 1;

      `*/

    client.query(inf_query)
    //client.query(prefix_query)

        .then(res => {
          message.channel.send("Setup has been completed")
      })
      .catch(err => {
          console.error(err);
      })
      .finally(() => {
          client.end();
      });

        }


        }

})





discordclient.login(process.env.token);