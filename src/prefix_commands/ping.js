const { EmbedBuilder } = require("discord.js");

module.exports = {
  category: 'miscellaneous',
  run: async (client, message, args) => {
    message.reply({
      embeds: [
        new EmbedBuilder().setDescription(`🏓 Pong! (**${client.ws.ping}ms**)`)
      ]
    });
  }
}