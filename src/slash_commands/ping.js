const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName('ping')
    .setDescription('Tells you the delay!'),
  run: async (client, interaction) => {
    interaction.followUp({ embeds: [
      new EmbedBuilder({ description: `🏓 Pong! (**${client.ws.ping}ms**)` })
    ] });
  }
}