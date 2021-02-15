const locations = require('./bunkers.json');
const getLocationInfo = (location) => {
	const locationInfo = [];
	for ([k, v] of Object.entries(locations)) {
		let isMatch = true;
		let regex;
		if (location && !location.includes('all')) {
			//Expressions tested with regexr.com
			regex = new RegExp(v.matcher);
			isMatch = regex.test(location);
		}
		if (isMatch) {
			locationInfo.push([k, v]);
		}
	}
	return locationInfo;
}

const commandMatcher = /^bunk(er)?s?(codes?)?$/;

const handleCommand = (msg, args) => {
	const location = args ? args.join(' ') : null;

	let showFullMap = location == 'all' || !location;
	const locationInfo = getLocationInfo(location);
	if (locationInfo.length == 0) { //If no match is found, be kind and show all instead of nothing
		locationInfo = getLocationInfo('all');
		showFullMap = true;
	}

	if (showFullMap) {
		const bunkerLocationsImg = 'https://imgur.com/B9Pp9lI';
		const bunkerCodesImg = 'https://imgur.com/a/yY6Nka8';
		msg.channel.send(bunkerLocationsImg);
		msg.channel.send(bunkerCodesImg);
	}

	const info = locationInfo.reduce((acc, [name, loc], i) => {
		name = (name[0].toUpperCase() + name.substring(1)).replace('_', ' ');
		console.log(`Location ${i}:`, [name, loc]);

		if (!showFullMap) {
			acc += loc.img + '\n';
		}

		const code = loc.code ? loc.code : 'X';
		acc += `${name} - Code: ${code}\n`;
		return acc;
	}, '');

	msg.channel.send(info);
}

module.exports = {
	commandMatcher,
	handleCommand
}