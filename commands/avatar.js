module.exports = {
	name: 'avatar',
	aliases: ['av', 'pfp'],
	description: 'Get the avatar URL of the tagged user(s), or your own avatar.',
	execute(bot, message, args) {
		const prefixes = ['pp', 'pp ', 'Pp', 'Pp '];
		let prefix = false;
		for (const thisPrefix of prefixes) {
			if (message.content.startsWith(thisPrefix)) prefix = thisPrefix;
		}
		if (!message.content.startsWith(prefix)) return

		if (!message.mentions.users.size) {
			return message.channel.send(`Your avatar: ${message.author.displayAvatarURL({ dynamic: true })}`);
		}

		const avatarList = message.mentions.users.map(user => {
			return `${user.username}'s avatar: ${user.displayAvatarURL({ dynamic: true })}`;
		});

		message.channel.send(avatarList);
	},
};
