const Discord = require('discord.js');
const { PREFIX } = require('../../consts');

const handleCommand = (msg, args, commands) => {
    const embed = new Discord.MessageEmbed();
    embed.setColor('RANDOM')
        .setTitle('Available Commands at the moment');

    let withDesc = /-d|desc(ribe|ription)?/.test(args);
    for (const { name, regex, desc } of commands) {
        let description = '';
        if (withDesc) {
            description += `${desc}`;
        }
        embed.addField(`\n${PREFIX}${name}`, `or anything matching ${regex}\n${description}`);
    }
    if (!withDesc) {
        embed.setFooter('Pass in -d or a command as an argument to help to read more');
    }
    msg.channel.send(embed);
}

module.exports = {
    name: 'help',
    regex: /^h(elp)?$/,
    func: handleCommand,
    desc: ''
}