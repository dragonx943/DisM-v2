const {GuildMember} = require('discord.js');

module.exports = {
  name: 'pause',
  description: 'Tạm dừng bài hát hiện tại (Bot ở chế độ AFK)',
  async execute(interaction, player) {
    if (!(interaction.member instanceof GuildMember) || !interaction.member.voice.channel) {
      return void interaction.reply({
        content: '**E**: Không tìm thấy bạn ở bất cứ kênh thoại nào trên Server này | Mem64i: ❌',
        ephemeral: true,
      });
    }

    if (
      interaction.guild.members.me.voice.channelId &&
      interaction.member.voice.channelId !== interaction.guild.members.me.voice.channelId
    ) {
      return void interaction.reply({
        content: '**E**: Không tìm thấy bạn ở kênh thoại tôi đang phát | Mem64i: ❌',
        ephemeral: true,
      });
    }

    await interaction.deferReply();
    const queue = player.getQueue(interaction.guildId);
    if (!queue || !queue.playing)
      return void interaction.followUp({
        content: '**E**: Hàng chờ trống rỗng, vui lòng thêm hàng chờ để dùng lệnh! | Mem64i: ❌',
      });
    const success = queue.setPaused(true);
    return void interaction.followUp({
      content: success ? '**W**: Đã tạm dừng yêu cầu hiện tại | Mem64i: ⏸' : '**E**: Đã xảy ra lỗi gì đó!',
    });
  },
};
