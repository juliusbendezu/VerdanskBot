const locations = require('../locations.json').locations;

const getDescription = () => {
    const locationList = locations.sort().reduce((acc, loc) => acc += `- ${loc}\n`, '');
    return `Get a random location to drop at from this list:\n\n${locationList}`;
}

//Pick a random location of where to drop and send to user
const getRandomLocation = (cardinal) => {
    //TODO: Implement cardinal directions for locations
    let i = Math.floor(Math.random() * locations.length);
    return locations[i];
}
const handleCommand = (msg, args) => {
    //Args could be cardinal directions to pass to getRandomLocation
    const loc = getRandomLocation();
    const message = `You should drop here: **${loc}**`;
    msg.reply(message);
}

module.exports = {
    name: 'drop',
    regex: /^drop(\?)?$/,
    func: handleCommand,
    desc: getDescription()
}