module.exports = {
	name: "eval",
	category: "botinfo",
	description: "Returns bot and API latency in milliseconds.",
	user: ["716206954313285713"],
	execute: async (message, args, client) => {
        try{
            var result = message.content.split(" ").slice(1).join(" ")
            let evaled = eval(result);
            message.channel.send('```'+ evaled + '```')
            }
        catch(error){
            console.log(error);
            message.channel.send('```'+ error + '```');
        }
	},
};
