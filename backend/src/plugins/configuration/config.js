const { MessageEmbed } = require("discord.js")
const { SlashCommandBuilder } = require("@discordjs/builders");
const {Client} = require("pg");
const buttons = require('../../handlers/common_buttons');

module.exports = {
  name: "configurator",
  category: "botinfo",
  description: "Returns bot and API latency in milliseconds.",
  enable: true,
  execute: async (message, discordClient) => {

    const client = new Client({
        user: process.env.user,
        host: process.env.host,
        database: process.env.db,
        password: process.env.passwd,
        port: process.env.port,
      });

    await client.connect();  

    const query = `
        INSERT INTO public.configurator_v1s(guild_id)
        SELECT * FROM (SELECT ${message.guild.id} AS guild_id) AS temp
        WHERE NOT EXISTS (SELECT * FROM public.configurator_v1s WHERE guild_id = ${message.guild.id}) LIMIT 1;
    `

    const res = await client.query(query).catch(console.error);

    if(res.rowCount == 0){
       return message.reply("There is an error fetching your configurations. Please contact support if this issue persists.")
    }
    const configuator = new MessageEmbed()
    .setColor('ad94f2')
    .setTitle('Configurator')
    .setDescription('**Which configuration would you like to change?**\n- Logging\n- Reporting\n- Mutes\n*Others are still in development*')

    const button = await buttons.configurationbuttons(false, false, false)
    await message.reply({ embeds: [configuator], components: [button] })
  },
  data: new SlashCommandBuilder()
    .setName("configurator")
    .setDescription("Configure the settings of the Bot")
}
