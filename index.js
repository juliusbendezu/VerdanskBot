const { TOKEN } = require('./config');
const Discord = require('discord.js');
const client = new Discord.Client();
const commandHandler = require('./commands/handler');

client.on('ready', () => {
    console.log(`${client.user.tag} at your service`);
});

client.on('message', (msg) => {
    if (msg.mentions.users.get(client.user.id)) { //If someones @ the bot
        msg.content = '!help';
        msg.reply('Привет');
    }
    commandHandler(msg);
});

client.login(TOKEN);
