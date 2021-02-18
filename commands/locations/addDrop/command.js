let locationsJSON = require('../locations.json');

//Receive location, check for duplicate, write to json and notify of successfully added location
const handleCommand = (msg, args) => {
    msg.channel.send('TBD');
}

module.exports = {
    name: 'add-drop',
    regex: /add-d(rop)?/,
    func: handleCommand,
    desc: 'TBD'
}