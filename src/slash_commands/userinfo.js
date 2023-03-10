const { EmbedBuilder } = require("@discordjs/builders");
const { SlashCommandBuilder, basename } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName('userinfo')
    .setDescription('Tells you the information of you or of a user')
    .addUserOption(option => option.setName('user').setDescription('user to get info of').setRequired(false)),
  run: async (client, interaction) => {
    let member = interaction.options.getMember('user') || interaction.member;
    let user = member.user;

    let activities = member.presence?.activities || [];
    let focusActivity = activities.find(x => x.assets);

    let thumbnail = focusActivity ? `https://cdn.discordapp.com/${focusActivity.applicationId}/${focusActivity.assets.largeImage}` : user.displayAvatarURL();
    let boosterSince = member.premiumSince ? member.premiumSince.toLocaleString : 'Not a booster';
    let flags = user.flags.toArray()
    let badges = flags.length ? flags.map(x => `\`${x}\``).join(' | ') : 'No Badges';
    let type = '';

    activities.map(x => {
      switch(x.type) {
        case 0: type = "Playing";
        break;
        case 1: type = "Streaming";
        break;
        case 2: type = "Listening";
        break;
        case 3: type = "Watching";
        break;
        case 4: type = "Custom";
        break;
        case 5: type = "Competing";
        break;
      } 
    });

    let embed = new EmbedBuilder()
      .setAuthor({ name: user.tag, iconURL: user.displayAvatarURL() })
      .setThumbnail(thumbnail)
      .setImage(user.bannerURL({ dynamic: true }))
      .setDescription(activities.map((x) => `**${type}** : \`${x.name || 'None'} : ${x.details || 'None'}\``).join("\n"))
      .setFields(
        { name: 'Nickname', value: `\`\`\`${member.nickname}\`\`\``, inline: true },
        { name: 'User ID', value: `\`\`\`${member.id}\`\`\``, inline: true },
        { name: 'Bot User', value: `\`\`\`${user.bot ? 'True': 'False'}\`\`\``, inline: true },
        { name: `Roles [${member.roles.cache.size}]`, value: member.roles.cache.map(r => r).join(' '), inline: false },
        { name: 'Joined Discord', value: `\`\`\`${user.createdAt.toLocaleString()}\`\`\``, inline: true },
        { name: 'Joined Server', value: `\`\`\`${member.joinedAt.toLocaleString()}\`\`\``, inline: true },
        { name: 'Booster Since', value: `\`\`\`${boosterSince}\`\`\``, inline: true }
      )
    
    interaction.followUp({
      embeds: [embed]
    });
  }
}