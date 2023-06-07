const {ApplicationCommandOptionType } = require('discord.js');

module.exports = {
  name: 'userinfo',
  description: 'Lấy thông tin từ 1 người dùng tại Discord',
  options: [
    {
      name: 'user',
      type: ApplicationCommandOptionType.User,
      description: 'Hãy tag người mà bạn muốn tra cứu.',
      required: true,
    },
  ],
  execute(interaction, client) {
    const user = interaction.options.getUser('user');

    interaction.reply({
      content: `🕵️  Tên: ${user.username}\n🕶️  ID: ${user.id}\n📷  Địa chỉ URL của Avatar: ${user.displayAvatarURL({dynamic: true})}`,
      ephemeral: true,
    });
  },
};
