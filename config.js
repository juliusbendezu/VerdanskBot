const dotenv = require('dotenv');

let config = {};
const result = dotenv.config();

if (result.error) {
	console.log(result.error);
} else {
	config = {
		TOKEN: process.env.TOKEN,
		CLIENT_ID: process.env.CLIENT_ID
	}
}

module.exports = config;