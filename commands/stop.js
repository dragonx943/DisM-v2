const {GuildMember} = require('discord.js');

module.exports = {
  name: 'stop',
  description: 'Dừng tất cả các yêu cầu hiện tại, đồng thời cũng xóa sạch hàng chờ.',
  async execute(interaction, player) {
    if (!(interaction.member instanceof GuildMember) || !interaction.member.voice.channel) {
      return void interaction.reply({
        content: '**E**: Bạn hiện không có mặt ở bất kì kênh thoại nào trong Server này!',
        ephemeral: true,
      });
    }

    if (
      interaction.guild.members.me.voice.channelId &&
      interaction.member.voice.channelId !== interaction.guild.members.me.voice.channelId
    ) {
      return void interaction.reply({
        content: '**E**: Bạn không ở cùng kênh thoại với Bot! | Mem64i: ❌',
        ephemeral: true,
      });
    }

    await interaction.deferReply();
    const queue = player.getQueue(interaction.guildId);
    if (!queue || !queue.playing)
      return void interaction.followUp({
        content: '**E**: Không có yêu cầu trong hàng chờ | Mem64i: ❌',
      });
    queue.destroy();
    return void interaction.followUp({content: '**W**: Đã dừng phát yêu cầu và tiến hành xóa hàng chờ!\n**M**: Đã dừng trình phát! | Mem64i: 🛑'});
  },
};
