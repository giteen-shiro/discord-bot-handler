module.exports = {
  category: 'dev',
  run: async (client, message, args) => {
    if (message.author.id != client.info.dev) return message.reply('❌ | Command can used only by the bot developer!');

    try {
      await message.guild.commands.set([...client.slash_commands].map(x => x[1].data));
      return message.reply(`**Slash commands are deployed successfully!**`);
    } catch (e) {
      await message.reply(`❌ | Couldn't deploy slash commands`);
      console.log(e);
    }
  }
}