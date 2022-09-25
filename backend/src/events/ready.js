module.exports = (discordClient) => {
    console.log(
			
        `[!] Username: ${discordClient.user.username}` +
        `\n[!] ID: ${discordClient.user.id}` +
        `\n[!] Guild Count: ${discordClient.guilds.cache.size}` + 
        `\n[!] Commands: ${discordClient.commands.size}` +
        `\n[!] Bot is online`
        )
    discordClient.user.setStatus('idle');
};
