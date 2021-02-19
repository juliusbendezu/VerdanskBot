const Discord = require('discord.js');
const { PREFIX } = require('../../consts');

const makeMessage = (fields, withFooter) => {
    const embed = new Discord.MessageEmbed();
    embed.setColor('RANDOM')
        .setTitle('Commands:')
        .addFields(...fields);
    if (withFooter) {
        embed.setFooter('Pass in -d or a command as an argument to [!help] to read more');
    }
    return embed;
}

const handleCommand = (msg, args, commands) => {
    let descriptive = false;
    if (args) {
        if (/-d|desc(ribe|ription)?/.test(args[0]) && args.length == 1) {
            descriptive = true;
        } else {
            let cmds = commands.filter(({ regex }) => args.find(arg => regex.test(arg.replace(PREFIX, ''))));
            console.log(cmds);
            if (cmds.length > 0) {
                descriptive = true;
                commands = [...cmds];
            } //If no commands where found, simply show all withouth description
        }
    }

    let messageFields = [];
    for (const { name, regex, desc } of commands) {
        let description = '';
        if (descriptive) {
            description += `${desc}`;
        }
        messageFields.push({ name: `\n${PREFIX}${name}`, value: `or anything matching ${regex}\n${description}` });
    }
    const message = makeMessage(messageFields, !descriptive);
    msg.channel.send(message);
}

module.exports = {
    name: 'help',
    regex: /^h(elp)?$/,
    func: handleCommand,
    desc: ''
}