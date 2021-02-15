const { commandMatcher: bunkerMatcher, handleCommand: bunker } = require('./bunker/command');

const commands = [
	[bunkerMatcher, bunker]
];

const runCommand = (command, args, msg) => {
	console.log('Command to match:', command);
	for (const [regex, func] of commands) {
		if (regex.test(command)) {
			console.log(`"${command}" matched to "${func.name}" command with "${regex}"`);
			return func(msg, args); //Run first command that matches passed command
		}
	}
}

module.exports = (msg) => {
	const [command, ...args] = msg.content.substring(1).toLowerCase().split(' ');
	try {
		runCommand(command, args, msg);
	} catch (err) {
		console.log(err);
		msg.channel.send('есть!');
	}
}