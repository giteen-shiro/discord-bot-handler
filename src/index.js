console.clear();
require('dotenv').config();

const { Client, Collection, MessageCollector } = require('discord.js');
const { token, prefix, dev } = require('./setting.json');

const client = new Client({
  intents: ['Guilds', 'MessageContent', 'GuildMessages', 'GuildMembers', 'GuildPresences']
});

client.prefix_commands = new Collection();
client.slash_commands = new Collection();
client.info = { prefix, dev };

client.once('ready', () => console.log(`Logged in as ${client.user.username} with ${client.ws.ping}ms ping!`));

for (let handler of ['prefix_command', 'slash_command', 'event']) require(`./handlers/${handler}`)(client);

client.login(token);