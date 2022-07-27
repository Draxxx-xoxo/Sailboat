module.exports = {
	name: "role_remove",
	category: "botinfo",
	description: "Returns bot and API latency in milliseconds.",
	execute: async (message, args, client) => {
        const role = await message.guild.roles.fetch(args[0]);
        const user = await message.mentions.users.first() || await message.guild.members.fetch(args[1])

        if(!role) return message.channel.send('Please input a vaild role.')
        if(!user || !args[1]) return message.channel.send('Please mention a user.')

		for (let i = 0; i < await user.roles.cache.map(r => r.id).length; i++) { 
        
        if(user.roles.cache.map(r => r.id)[i] != role){
            
        }
        else {
            user.roles.remove(role.id);
            message.channel.send(`Removed ${role.name} to <@${user.id}>`)
        }
    }

	},
};
