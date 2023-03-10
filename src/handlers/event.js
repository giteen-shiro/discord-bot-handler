const fs = require('fs');

module.exports = client => {
  fs.readdirSync('src/events/').filter(f => f.endsWith('.js')).forEach(file => {
    let pull = require(`../events/${file}`);

    pull.event ||= file.replace('.js', '');

    client.on(pull.event, pull.run.bind(null, client));
  });
}