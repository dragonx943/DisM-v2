const {GuildMember} = require('discord.js');

module.exports = {
  name: 'nowplaying',
  description: 'Hiện thông tin về yêu cầu đang được phát tại trình phát',
  async execute(interaction, player) {
    if (!(interaction.member instanceof GuildMember) || !interaction.member.voice.channel) {
      return void interaction.reply({
        content: 'Lỗi: Bạn không có mặt trong kênh voice! | Mem64i: ❌',
        ephemeral: true,
      });
    }

    if (
      interaction.guild.members.me.voice.channelId &&
      interaction.member.voice.channelId !== interaction.guild.members.me.voice.channelId
    ) {
      return void interaction.reply({
        content: 'Lỗi: Tôi không tìm thấy bạn trong kênh voice của tôi! | Mem64i: ❌',
        ephemeral: true,
      });
    }

    await interaction.deferReply();
    const queue = player.getQueue(interaction.guildId);
    if (!queue || !queue.playing)
      return void interaction.followUp({
        content: '**E**: Không có yêu cầu nào được được phát ngay lúc này, vui lòng thêm yêu cầu | Mem64i: ❌',
      });
    const progress = queue.createProgressBar();
    const perc = queue.getPlayerTimestamp();

    return void interaction.followUp({
      embeds: [
        {
          title: 'Now Playing',
          description: `🎶 Tên yêu cầu: **${queue.current.title}**\n📀 Đã phát được: **\`${perc.progress}%\`**`,
          fields: [
            {
              name: '\u200b',
              value: progress,
            },
          ],
          color: 0x00ffff,
        },
      ],
    });
  },
};
