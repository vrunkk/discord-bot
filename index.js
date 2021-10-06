const fs = require('fs');
require('dotenv').config();
const Discord = require('discord.js');
const { allowedNodeEnvironmentFlags } = require('process');
const { kMaxLength } = require('buffer');
const bot = new Discord.Client();
bot.commands = new Discord.Collection();
bot.snipes = new Discord.Collection();
var allowedMembers = ["691854224673341440", "717369063168409721", "777465647041871883"]
var allowedServers = ["691855419173371936"]

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	bot.commands.set(command.name, command);
}

const cooldowns = new Discord.Collection();

bot.once('ready', () => {
	console.log('Ready!');
	bot.user.setActivity("pphelp", { type: "PLAYING" })
});

//deletedmesages

bot.on('messageDelete', function (message, channel) {


	bot.snipes.set(message.channel.id, {
		content: message.content,
		author: message.author,
		image: message.attachments.first() ? message.attachments.first().proxyURL : null

	})
})

//deletedmessages above this

bot.on('message', async message => {

	const prefixes = ['pp', 'pp ', 'Pp', 'Pp '];
	let prefix = false;
	for (const thisPrefix of prefixes) {
		if (message.content.startsWith(thisPrefix)) prefix = thisPrefix;
	}
	if (message.author.bot) return

	if (message.mentions.users.size) {
		if (message.mentions.users.first().id === "731529524080148504") //if someone pings the bot it send the ping emote and reacts 
		{
			message.channel.send("<:ping:735872393024897046>")
			message.react("740544677924569129")
		}
	}

	const args = message.content.slice(prefix.length).split(/ +/);
	if (message.guild.id === "777969481418407936") {
		if (message.channel.id !== "781813686309486602") {
			message.channel.delete()
		}
	}
	//eval below this

	if (message.content.startsWith(`${prefix}eval`)) {
		if (message.author.id !== "691854224673341440" && message.author.id !== "717369063168409721" && message.author.id !== "600921547452055572") return;
		try {
			const code = message.content.slice(prefix.length + 5)

			let evaled = eval(code)
			if (code) {

				message.channel.send(`\`\`\`${evaled}\`\`\``)

			}
			else {
				message.channel.send("Give me something to evaluate, idiot!")
			}
		}

		catch (e) {
			message.channel.send(`\`ERROR\` \`\`\`xl\n${e.message}\n\`\`\``);
		}
	}
	//eval above this



	//talk below this
	var talkBoolean = false
	if (message.content.startsWith(`${prefix}talk`)) {
		if (!allowedMembers.includes(message.author.id)) return;
		var talkChannelid = message.content.slice(prefix.length + 5)
		if (talkChannelid) {

			var talkChannel = bot.channels.cache.get(talkChannelid)
			if (typeof (talkChannel) === "undefined") {
				return message.channel.send("inavlid id or bot doesnt have access to channel")
			}
			else {
				message.channel.send(`now talking in ${talkChannel}`)
				talkBoolean = true
				var listenChannel = message.channel.id
			}
		}
		else {
			message.channel.send("gimme a channel id")
		}
	}
	if (talkBoolean) {
		if (message.channel.id === talkChannelid) {
			message.channel.send("k")

			/*const talkEmbed = new Discord.MessageEmbed()
				.setAuthor(message.author.displayName, message.author.displayAvatarURL({ dynamic: true, format: 'png', size: 1024 }))
				.setDescription(message.content)
			bot.channels.cache.get(listenChannel).send(talkEmbed)*/
		}
	}
	//talk above this

	const commandName = args.shift().toLowerCase();

	const command = bot.commands.get(commandName)
		|| bot.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));

	if (!command) return;

	if (command.guildOnly && message.channel.type !== 'text') {
		return message.reply('I can\'t execute that command inside DMs!');
	}

	if (!cooldowns.has(command.name)) {
		cooldowns.set(command.name, new Discord.Collection());
	}

	const now = Date.now();
	const timestamps = cooldowns.get(command.name);
	const cooldownAmount = (command.cooldown || 3) * 1000;

	if (timestamps.has(message.author.id)) {
		const expirationTime = timestamps.get(message.author.id) + cooldownAmount;

		if (now < expirationTime) {
			const timeLeft = (expirationTime - now) / 1000;
			return message.reply(`please wait ${timeLeft.toFixed(1)} more second(s) before reusing the \`${command.name}\` command.`);
		}
	}

	timestamps.set(message.author.id, now);
	setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);

	try {
		command.execute(bot, message, args);
	} catch (error) {
		console.error(error);
		message.reply('there was an error trying to execute that command!');
	}

});

bot.login(process.env.token);
