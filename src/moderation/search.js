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
                '```' + `| ID     | Created                    | Type     | User                     | Moderator   | Active | Reason          |
                ----------------------------------------------------------------------------------------------------------------------
                | ${report_id[0]} | 2021-03-01T11:25:03.920973 | warning  | Auttaja#5453             | Draxx#5048  | yes    | no              |
                | ${report_id[1]} | 2021-02-10T11:27:11.305811 | warning  | Testing Bot Account#7935 | Draxx#5048  | yes    |                 |
                | ${report_id[2]} | 2021-02-06T07:53:27.539588 | tempmute | Wall-E#8478              | Wall-E#8478 | no     | Spam Detected   |
                | ${report_id[3]} | 2021-02-06T07:53:04.003845 | tempmute | Wall-E#8478              | Wall-E#8478 | no     | Spam Detected   |
                | ${report_id[4]} | 2021-02-06T07:52:49.068727 | tempmute | Wall-E#8478              | Wall-E#8478 | no     | Spam Detected   |
                | ${report_id[5]} | 2021-01-27T13:13:19.358037 | tempmute | EVEE#4688                | EVEE#4688   | no     | Spam Detected   |
                | ${report_id[6]} | 2021-01-22T10:49:34.753021 | kick     | Time Zone Bot#4499       | Draxx#5048  | yes    | testing reasons |
                | ${report_id[7]} | 2021-01-17T11:43:27.843199 | ban      | tmuo#7417                | Draxx#5048  | no     | k               |` + '```'

                
              }

              client.end();
    
    
    } 
})





discordclient.login(process.env.token);