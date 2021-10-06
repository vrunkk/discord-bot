const Discord = require('discord.js');
module.exports = {
	name: 'help',
	description: 'List all of my commands or info about a specific command.',
	aliases: ['commands'],
	execute(bot, message, args) {

		const data = [];
		const { commands } = message.client;
		const prefixes = ['pp', 'pp ', 'Pp', 'Pp '];
		let prefix = false;
		for (const thisPrefix of prefixes) {
			if (message.content.startsWith(thisPrefix)) prefix = thisPrefix;
		}
		if (!message.content.startsWith(prefix)) return
		if (!args.length) {

			data.push(commands.map(command => command.name).join(', '));

			const embed = new Discord.MessageEmbed()
				.setTitle('Here\'s a list of all my commands:')
				.setDescription([data])
				.addField((`\nYou can send \`pphelp [command name]\` to get info on a specific command!`), `🍆🍆🍆🍆🍆🍆🍆🍆🍆🍆🍆🍆🍆🍆🍆🍆🍆🍆🍆🍆🍆🍆🍆🍆`)
				.setColor("RANDOM")
			message.channel.send(embed)
		}
		if (args.length) {
			const name = args[0].toLowerCase();
			const command = commands.get(name) || commands.find(c => c.aliases && c.aliases.includes(name));

			if (!command) {
				return message.reply('that\'s not a valid command!');
			}

			const embedd = new Discord.MessageEmbed()
				.setTitle(`${command.name}`)

			if (command.aliases) embedd.addField(`**Aliases:**`, `${command.aliases.join(', ')}`);
			if (command.description) embedd.addField(`**Description:**`, `${command.description}`);
			if (command.usage) embedd.addField(`**Usage:**`, `${prefix}${command.name} ${command.usage}`);

			embedd.addField(`**Cooldown:**`, `${command.cooldown || 3} second(s)`);

			embedd.setColor("RANDOM")
			message.channel.send(embedd)

		}
	}
}
