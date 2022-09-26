const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {
  name: "eval",
  category: "botinfo",
  description: "Returns bot and API latency in milliseconds.",
  user: ["716206954313285713"],
  execute: async (message, client) => {
    try{
      const result = message.options.getString("code")
      let evaled = eval(result);
      await message.reply({content: "```"+ evaled + "```", ephemeral: true})
    }
    catch(error){
      console.log(error);
      message.reply({ cotent: "```"+ error + "```", ephemeral: true});
    }
  },
  data: new SlashCommandBuilder()
    .setName("eval")
    .setDescription("Executes code")
    .addStringOption(option => option.setName("code").setDescription("The code to execute").setRequired(true)),
};
