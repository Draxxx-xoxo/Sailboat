module.exports = (discordClient, guild) => {
  console.log(        
    "[!] Bot has joined a new guild" +
    `\n[!] ID: ${guild.id}` +
    `\n[!] Name: ${guild.name}` +
    `\n[!] Owner: ${guild.owner.user.tag}` +
    `\n[!] Member Count: ${guild.members.cache.size}` + 
    `\n[!] Roles: ${guild.roles.cache.size}` +
    `\n[!] Date Created: ${guild.roles.cache.size}` +
    "\n[!] Bot is online"
  )
};
      