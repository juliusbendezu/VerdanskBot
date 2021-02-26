const dotenv = require('dotenv');

let config = {};
const result = dotenv.config();

if (result.error) {
    console.log(result.error);
} else {
    config = {
        TOKEN: process.env.DISCORD_TOKEN,
        CLIENT_ID: process.env.DISCORD_CLIENT_ID
    }
}

module.exports = config;