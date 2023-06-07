const {GuildMember} = require('discord.js');

module.exports = {
  name: 'skip',
  description: 'Bỏ qua yêu cầu hiện đang phát và chuyển đến yêu cầu tiếp theo trong hàng chờ!',
  async execute(interaction, player) {
    if (!(interaction.member instanceof GuildMember) || !interaction.member.voice.channel) {
      return void interaction.reply({
        content: '**E**: Bạn không có mặt trong kênh voice! | Mem64i: ❌',
        ephemeral: true,
      });
    }

    if (
      interaction.guild.members.me.voice.channelId &&
      interaction.member.voice.channelId !== interaction.guild.members.me.voice.channelId
    ) {
      return void interaction.reply({
        content: '**E**: Tôi không tìm thấy bạn trong kênh voice của tôi! | Mem64i: ❌',
        ephemeral: true,
      });
    }

    await interaction.deferReply();
    const queue = player.getQueue(interaction.guildId);
    if (!queue || !queue.playing) return void interaction.followUp({content: '**E**: Không có yêu cầu nào được được phát ngay lúc này, vui lòng thêm yêu cầu | Mem64i: ❌'});
    const currentTrack = queue.current;
    const success = queue.skip();
    return void interaction.followUp({
      content: success ? `**W** - **M**: Đã bỏ qua yêu cầu: **${currentTrack}**, đang đọc danh sách hàng chờ...` : '**E**: Có gì đó sai sai, vui lòng thử lại!',
    });
  },
};
