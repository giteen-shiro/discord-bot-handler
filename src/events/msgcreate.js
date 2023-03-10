module.exports = {
  event: 'messageCreate',
  run: async (client, message) => {
    if (!message.guild || !message.content.startsWith(client.info.prefix) || message.author.bot) return;

    let args = message.content.slice(client.info.prefix.length).trim().split(/ +/g);
    let cmd = args.shift().toLowerCase();

    let command = client.prefix_commands.get(cmd);
    if (!command) return;

    if (command.perms && Array.isArray(command.perms)) {
      for (let perm of command.perms) {
        if (!message.member.permissions.includes(perm))
          message.reply(`You don't have one of these permissions to run this command : ${command.perms.join(', ')}`)
      }
    }

    command.run(client, message, args);
  }
}