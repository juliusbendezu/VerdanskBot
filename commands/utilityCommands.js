const commands = {
	a: (msg) => {
		console.log('A command');
	},
	b: (msg) => {
		console.log('B command');
	}
}

module.exports = (msg) => {
	const command = msg.content.substring(1);
	const func = commands[command];
	if (func) {
		func(msg);
	} else {
		msg.channel.send('есть!');
	}
}