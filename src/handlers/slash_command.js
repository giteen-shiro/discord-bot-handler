const fs = require('fs');

module.exports = client => {
  fs.readdirSync('./src/slash_commands/').filter(f => f.endsWith('.js')).forEach(file => {
    let pull = require(`../slash_commands/${file}`);

    client.slash_commands.set(pull.data.name, pull);
  });
}