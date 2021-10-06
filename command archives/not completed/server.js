const Discord = require('discord.js');
const bot = new Discord.Client();
module.exports = {
	name: 'server',
	description: 'make a server with the bot as owner!',
   execute: async(message)=>{
	const prefixes = ['pp', 'pp ','Pp','Pp '];
	let prefix = false;
	for(const thisPrefix of prefixes) {
		if(message.content.startsWith(thisPrefix)) prefix = thisPrefix;
    }
    if(!message.content.startsWith(prefix)) return;
    let serverNAme=message.content.slice(prefix.length+5)
    if(!serverNAme) return message.channel.send("What's the name of your server, retard?")
    try {
    bot.guilds.create(serverNAme.toString)
    message.channel.send("Created server!")}
    catch(e) {return message.channel.send(e)}
    let  newGuild = bot.guilds.cache.find(guild=>guild.name===serverNAme)
    
    let invite = await newGuild.channels.cache.first().createInvite()
    message.channel.send(invite)


 }
}