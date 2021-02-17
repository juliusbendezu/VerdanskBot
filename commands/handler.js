const { CLIENT_ID } = require('../config');

const helpCommand = {
    name: 'help',
    regex: /^h(elp)?$/,
    func: (msg, args) => {
        let availableCommands = '**Available commands at the moment:**\n';
        for (const { name, regex, desc } of commands) {
            availableCommands += `\`\`\`!${name} or anything matching ${regex}`;
            if (/-d|desc(ribe|ription)?/.test(args)) {
                availableCommands += `\n\n${desc}\n\n\`\`\``
            } else {
                availableCommands += '\`\`\`';
            }
        }
        msg.channel.send(availableCommands);
    },
    desc: `Really?`
}

const commands = [
    helpCommand,
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
    msg.channel.send('есть!');
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
    if (isValid(msg)) {
        const [command, ...args] = msg.content.substring(1).toLowerCase().split(' ');
        runCommand(command, args, msg);
    }
}