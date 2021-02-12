const Discord = require('discord.js');
const client = new Discord.Client();
const { TOKEN, CLIENT_ID, CLIENT_SECRET } = require('./config');
const commandHandler = require('./commands/handler');

client.on('ready', () => {
	console.log('VerdanskBot at your service');
});

client.on('message', (msg) => {
	commandHandler(msg, client);
});

client.login(TOKEN);
