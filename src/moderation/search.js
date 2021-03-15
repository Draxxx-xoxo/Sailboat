const fs = require('fs');
const Discord = require('discord.js');
const { mainprefix, token, pgkey } = require('../../config.json');
const {Client} = require('pg')

const discordclient = new Discord.Client();
discordclient.commands = new Discord.Collection();

discordclient.once('ready', () => {
	console.log('search Ready!');

	discordclient.user.setActivity(`Watching EVEE`)
});

  discordclient.on('message', async message => {

    if (message.content.startsWith(`${mainprefix}inf search`)) {


      let cont = message.content.slice((mainprefix + `inf search `).length).split(" ")

      let member_id = cont.slice(0,1).toString()

         

            const client = new Client({
                connectionString: pgkey,
                ssl: {
                  rejectUnauthorized: false
                }
            });
            
            // opening connection
            await client.connect();
        
       
            const query = `SELECT * FROM guild."${message.guild.id}" WHERE discord_id = ${member_id} ORDER BY report_id DESC  `

            var res = await client.query(query).catch(console.error)

              for (let row of res.rows) {
                var reason = row.reason || '(no reason)'
                var report_id = row.report_id || ''
        
                const inf_search = 

                message.channel.send(inf_search);
              }

            
              client.end();
    
    
    } 
})





discordclient.login(process.env.token);