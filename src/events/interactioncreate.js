module.exports = {
  event: 'interactionCreate',
  run: async (client, interaction) => {
    if (interaction.isCommand()) {
      await interaction.deferReply().then().catch(console.error);

      let command = await client.slash_commands.get(interaction.commandName);
      if (!command) return interaction.followUp('\:x: | Command does not exist');

      await command.run(client, interaction).catch(e => {
        interaction.followUp('\:x: | Error');
        console.error(e);
      });
    }
  }
}
