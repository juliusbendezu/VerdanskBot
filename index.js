const { TOKEN } = require('./config');
const Discord = require('discord.js');
const client = new Discord.Client();
const commandHandler = require('./commands/handler');

client.on('ready', () => {
	console.log('VerdanskBot at your service');
});

client.on('message', (msg) => {
	commandHandler(msg);
});

client.login(TOKEN);
