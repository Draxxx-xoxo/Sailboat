const functions = require("../handlers/common_functions")

module.exports = async (discordClient, interaction) => {

  if (interaction.isButton()){
    if(interaction.component.customId == "yes" || interaction.component.customId.toLowerCase() == "no"){
      var destroy_infs = require("../plugins/infractions/destroy_inf")
      try{
        destroy_infs.button(interaction, discordClient)
      } catch (error) {
        console.log(error);
      }
    }
    if(interaction.component.customId.toLowerCase() == "warn" || interaction.component.customId.toLowerCase() == "mute" || interaction.component.customId.toLowerCase()== "ban" || interaction.component.customId.toLowerCase() == "kick" || interaction.component.customId.toLowerCase() =="deny"){
      var report_buttons = require("../plugins/report/report_buttons") 

      try{
        report_buttons.execute(interaction, discordClient)
      } catch (error) {
        console.log(error);
      }
    }
    if(interaction.component.customId.toLowerCase() == "logging" || interaction.component.customId.toLowerCase() == "reporting"){
      var report_config_buttons = require("../plugins/configuration/config_buttons/report_config_buttons")

      try{
        report_config_buttons.report(interaction, discordClient)
      } catch (error) {
        console.log(error);
      }
    }
    if(interaction.component.customId.toLowerCase() == "mutes"){
      var mute_config_buttons = require("../plugins/configuration/config_buttons/mute_config_buttons")

      try{
        mute_config_buttons.mute(interaction, discordClient)
      } catch (error) {
        console.log(error);
      }
    }
    if(interaction.component.customId.toLowerCase() == "setupmutes"){
      var mute_config_buttons = require("../plugins/configuration/config_buttons/mute_config_buttons")

      try{
        mute_config_buttons.setup1(interaction, discordClient)
      } catch (error) {
        console.log(error);
      }
    }
    if(interaction.component.customId.toLowerCase() == "back"){
      const backbutton = require("../plugins/configuration/config")

      try{
         backbutton.execute(interaction, discordClient)
      } catch (error) {
        console.log(error);
      }
    }
    if(interaction.component.customId.toLowerCase() == "setupreport"){
      const config_buttons = require("../plugins/configuration/config_buttons/report_config_buttons")

      try{
        config_buttons.setup1(interaction, discordClient)
      } catch (error) {
        console.log(error);
      }
    }
    if(interaction.component.customId.toLowerCase() == "enable" || interaction.component.customId.toLowerCase() == "disable"){
      const config_buttons = require("../plugins/configuration/config_buttons/report_config_buttons")

      try{
        config_buttons.setup2(interaction, discordClient)
      } catch (error) {
        console.log(error);
      }
    }
  }

  if(interaction.isModalSubmit()){
    var config_buttons = require("../plugins/configuration/config_buttons/report_config_buttons")
    if(interaction.customId == 'channelID'){
      try{
        config_buttons.setup3(interaction, discordClient)
      } catch (error) {
        console.log(error);
      }
    }
    if(interaction.customId == 'roleID'){
      var config_buttons = require("../plugins/configuration/config_buttons/mute_config_buttons")
        try{
          config_buttons.setup2(interaction, discordClient)
        } catch (error) {
          console.log(error);
        }
    }
  }

  if(interaction.isSelectMenu()){
    const message_menu = require("../plugins/infractions/message_menu") 

    try{
      message_menu.execute(interaction, discordClient)
    } catch (error) {
      console.log(error);
    }
  }
  if(interaction.isCommand()){

    const { commandName } = interaction;
    const command = discordClient.commands.get(commandName)
    const commandEnabled = command.enable || false
    const super_admins = await functions.super_admins()

    if(commandEnabled == false){
      if(super_admins[0] !== interaction.user.id){
        await interaction.reply({ content:"This commands are not ready to use yet! We will be releasing them soon.", ephemeral: true })
        return;
      }
    }
    if (command.permissions) {
      const authorPerms = interaction.channel.permissionsFor(interaction.user);
      if (!authorPerms || !authorPerms.has(command.permissions)) {
        return interaction.reply({content: "You cannot use the " + command.name + " command", ephemeral: true});
      }
    }

    try{
      await command.execute(interaction, discordClient)
    } catch (error) {
      console.log(error);
    }
  
  }
};