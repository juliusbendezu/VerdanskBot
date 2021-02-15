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
	if (locationInfo.length == 0) { //If no match is found, be kind and show all instead of nothing
		locationInfo.push([location + '?\n', {}]); //Not found location is sent back for display if desired
		locationInfo.push(...getLocationInfo('all'));
	}
	return locationInfo;
}

const commandMatcher = /^bunk(er)?s?(codes?)?$/;

const handleCommand = (msg, args) => {
	const location = args ? args.join(' ') : null;

	//TODO: (maybe) only send when all locations are sent, otherwise send for matched locations
	const bunkerLocationsImg = 'https://imgur.com/B9Pp9lI';
	const bunkerCodesImg = 'https://imgur.com/a/yY6Nka8';
	msg.channel.send(bunkerLocationsImg);
	msg.channel.send(bunkerCodesImg);

	const locationInfo = getLocationInfo(location);
	console.log(locationInfo);
	const infoString = locationInfo.reduce((acc, [name, loc]) => {
		acc += name.charAt(0).toUpperCase() + name.substring(1);
		if (loc.code) {
			acc += ` Code: ${loc.code}`
		}
		acc += '\n';
		return acc;
	}, '');
	msg.channel.send(infoString);
}

module.exports = {
	commandMatcher,
	handleCommand
}