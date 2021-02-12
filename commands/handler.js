const utilityCommands = require('./utilityCommands');
const defaultCommand = (msg) => {
	// msg.channel.send(msg.content);
}

module.exports = (msg, client) => {
	if (msg.author.id == client.user.id) {
		return;
	}

	if (msg.content.charAt(0) == '!') {
		console.log('Utility command called');
		utilityCommands(msg);
	} else {
		console.log('Default command executed');
		defaultCommand(msg);
	}
};