const {ApplicationCommandOptionType } = require('discord.js');

module.exports = {
  name: 'ban',
  description: 'Ban 1 người dùng khỏi Server!',
  options: [
    {
      name: 'user',
      type: ApplicationCommandOptionType.User,
      description: 'Nhập tên người dùng mà bạn muốn ăn Ban',
      required: true,
    },
  ],
  execute(interaction, client) {
    const member = interaction.options.getUser('user');

    if (!member) {
      return message.reply('Bạn cần phải @ (Tag) người đó để có thể tiếp tục lệnh Ban!');
    }

    if (!interaction.member.permissions.has('BAN_MEMBERS')) {
      return message.reply("Bot không thể Ban người dùng này. Vui lòng kiểm tra lại quyền của Bot hoặc quyền của bạn:) | W: Mem64: Quyền lồn biên giới ?");
    }

    const userinfo = client.users.cache.getMember(member);

    return interaction.guild.members
      .ban(member)
      .then(() => {
        interaction.reply({
          content: `Người dùng: ${userinfo.username} đã bị Ban. Muahahahahaha...`,
          ephemeral: true,
        });
      })
      .catch(error =>
        interaction.reply({
          content: `Xin lỗi ngài, đã xảy ra lỗi ngoài ý muốn.`,
          ephemeral: true,
        }),
      );
  },
};
