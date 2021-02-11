const Discord = require('discord.js');
const client = new Discord.Client();
const { TOKEN, CLIENT_ID, CLIENT_SECRET } = require('./config.js');

client.on('ready', () => {
	console.log('VerdanskBot at your service');
});

client.login(TOKEN);