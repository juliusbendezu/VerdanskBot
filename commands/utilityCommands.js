const commands = {
	a: (msg, args) => {
		console.log('A command');
	},
	bunker: (msg, args) => {
		console.log(args);
		const locations = require('./bunkers.json');
		const bunkerLocationsImg = 'https://imgur.com/B9Pp9lI';
		const bunkerCodesImg = 'https://imgur.com/a/yY6Nka8';

		msg.channel.send('Bunkers:');
		msg.channel.send(bunkerLocationsImg);
		msg.channel.send('Bunkers with codes:');
		msg.channel.send(bunkerCodesImg);

		//TODO: surround with check for args, args should be tested with locations matcher regex to display/print specific bunker
		let codes = "";
		Object.entries(locations).forEach(([key, value]) => {
			if (value.code) {
				codes += `${key} code: ${value.code}\n`;
			}
		});
		msg.channel.send(codes);
	}
}

const parseCommand = (command) => {
	console.log(command);

	const commandMatcher = new Map([
		[/bunk(er)?s?(codes?)?/, 'bunker'],
	]);

	for (const [regex, com] of commandMatcher) {
		if (regex.test(command)) {
			return com;
		}
	}
}

module.exports = (msg) => {
	let [command, args] = msg.content.substring(1).toLowerCase().split(' ', 2);
	command = parseCommand(command);
	try {
		commands[command](msg, args);
	} catch (err) {
		console.log(err);
		msg.channel.send('есть!');
	}
}