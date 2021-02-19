let locationsJSON = require('../locations.json');

//Receive location, check for duplicate, write to json and notify of successfully added location
const execute = (msg, args) => {
    msg.channel.send('TBD');
}

module.exports = {
    name: 'add-drop',
    regex: /add-d(rop)?/,
    execute,
    desc: 'TBD'
}