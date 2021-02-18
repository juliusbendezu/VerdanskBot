const Discord = require('discord.js');
const { PREFIX } = require('../../consts');

const makeMessage = (fields, withFooter) => {
    const embed = new Discord.MessageEmbed();
    embed.setColor('RANDOM')
        .setTitle('Available Commands at the moment')
        .addFields(...fields);
    if (withFooter) {
        embed.setFooter('Pass in -d or a command as an argument to help to read more');
    }
    return embed;
}

const handleCommand = (msg, args, commands) => {

    let messageFields = [];
    let withDesc = /-d|desc(ribe|ription)?/.test(args);
    for (const { name, regex, desc } of commands) {
        let description = '';
        if (withDesc) {
            description += `${desc}`;
        }
        messageFields.push({ name: `\n${PREFIX}${name}`, value: `or anything matching ${regex}\n${description}` });
    }
    const message = makeMessage(messageFields, !withDesc);
    msg.channel.send(message);
}

module.exports = {
    name: 'help',
    regex: /^h(elp)?$/,
    func: handleCommand,
    desc: ''
}