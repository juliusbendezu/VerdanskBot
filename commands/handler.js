const { CLIENT_ID } = require('../config');

const commands = [
	require('./bunker/command'),
];

const runCommand = (command, args, msg) => {
	console.log('Command to match:', command);
	for (const { name, regex, func } of commands) {
		if (regex.test(command)) {
			console.log(`"${command}" matched to the "${name}" command with "${regex}"`);
			return func(msg, args); //Run first command that matches passed command
		}
	}
}

const isValid = (msg) => {
	if (msg.author.id == CLIENT_ID) { //don't respond to self
		return false;
	}
	if (msg.content.charAt(0) != '!') { //don't respond to msg not starting with "!"
		return false;
	}
	return true;
}

module.exports = (msg) => {
	if (!isValid(msg)) {
		return;
	}
	const [command, ...args] = msg.content.substring(1).toLowerCase().split(' ');
	try {
		runCommand(command, args, msg);
	} catch (err) {
		console.log(err);
		msg.channel.send('есть!');
	}
}