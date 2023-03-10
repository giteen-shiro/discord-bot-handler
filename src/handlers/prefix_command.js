const fs = require('fs');

module.exports = client => {
  fs.readdirSync('./src/prefix_commands/').filter(f => f.endsWith('.js')).forEach(file => {
    let pull = require(`../prefix_commands/${file}`);
    pull.name ||= file.replace('.js', '');

    client.prefix_commands.set(pull.name, pull);
  });
}