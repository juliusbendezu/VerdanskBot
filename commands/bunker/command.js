const locations = require('./bunkers.json');
const getLocationInfo = (location) => {
    const locationInfo = [];
    for ([k, v] of Object.entries(locations)) {
        let isMatch = true;
        let regex;
        if (location && !location.includes('all')) {
            regex = new RegExp(v.matcher);
            isMatch = regex.test(location);
        }
        if (isMatch) {
            locationInfo.push({ name: k, ...v });
        }
    }
    return locationInfo;
}

const getDescription = () => {
    let description =
        'A command for finding bunker locations and their possible codes.\n' +
        'Will show all if 0 or "all" arguments are passed, or a specific location if a matching argument is passed. ' +
        'Locations and matchers below:\n\n';

    for (const name in locations) {
        let n = (name[0].toUpperCase() + name.substring(1)).replace('_', ' ');
        let matcher = locations[name].matcher;
        description += `[${n}] matched by /${matcher}/\n`
    }
    return description;
}

const commandMatcher = /^bunk(er)?s?(codes?)?$/;

const handleCommand = (msg, args) => {
    const location = args ? args.join(' ') : null;

    let showFullMap = location == 'all' || !location;
    let locationInfo = getLocationInfo(location);
    if (locationInfo.length == 0) { //If no match is found, be kind and show all instead of nothing
        msg.channel.send(location + '?');
        locationInfo = getLocationInfo('all');
        showFullMap = true;
    }

    if (showFullMap) {
        const bunkerLocationsImg = 'https://imgur.com/FnVjHrs';
        const bunkerCodesImg = 'https://imgur.com/a/yY6Nka8';
        msg.channel.send(bunkerLocationsImg);
        msg.channel.send(bunkerCodesImg);
    }

    const info = locationInfo.reduce((acc, { name, img, code }, i) => {
        name = (name[0].toUpperCase() + name.substring(1)).replace('_', ' ');
        console.log(`Location ${i}:`, { name, img, code });

        if (!showFullMap) {
            acc += img + '\n';
        }

        acc += `${name} - Code: ${code ? code : 'X'}\n`;
        return acc;
    }, '');

    msg.channel.send(info);
}

module.exports = {
    name: 'bunker',
    regex: commandMatcher,
    func: handleCommand,
    desc: getDescription()
}