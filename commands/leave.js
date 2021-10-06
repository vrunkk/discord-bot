module.exports = {
	name: 'leave',
	aliases: ['dc', 'disconnect', 'fuckoff', 'bye'],
	description: 'Get the bot to leave your vc!',
	execute(bot, message, args) {
		const prefixes = ['pp', 'pp ', 'Pp', 'Pp '];
		let prefix = false;
		for (const thisPrefix of prefixes) {
			if (message.content.startsWith(thisPrefix)) prefix = thisPrefix;
		}
		if (!message.content.startsWith(prefix)) return

		const voiceChannel = message.member.voice.channel;
		if (!voiceChannel) return
		voiceChannel.leave();
		message.channel.send('Left vc!');
	}
}
