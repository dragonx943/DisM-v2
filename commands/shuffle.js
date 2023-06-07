const {GuildMember} = require('discord.js');

module.exports = {
  name: 'shuffle',
  description: 'Bốc thăm...À nhầm, xáo trộn danh sách hàng chờ!',
  async execute(interaction, player) {
    if (!(interaction.member instanceof GuildMember) || !interaction.member.voice.channel) {
      return void interaction.reply({
        content: 'Bạn hiện không có mặt ở bất kì kênh thoại nào trong Server này!',
        ephemeral: true,
      });
    }

    if (
      interaction.guild.members.me.voice.channelId &&
      interaction.member.voice.channelId !== interaction.guild.members.me.voice.channelId
    ) {
      return void interaction.reply({
        content: '**E**: Bạn hiện không có mặt ở bất kì kênh thoại nào trong Server này!',
        ephemeral: true,
      });
    }

    await interaction.deferReply();
    const queue = player.getQueue(interaction.guildId);
    if (!queue || !queue.playing) return void interaction.followUp({content: '**E**: Không có yêu cầu trong hàng chờ | Mem64i: ❌'});
    try {
      queue.shuffle();
      trimString = (str, max) => (str.length > max ? `${str.slice(0, max - 3)}...` : str);
      return void interaction.followUp({
        embeds: [
          {
            title: 'Danh sách hàng chờ hiện tại (sau khi xáo trộn):',
            description: trimString(
              `🎶  Hiện đang phát: **${queue.current.title}**\n🎶  **Các yêu cầu kế tiếp -** ${queue}! `,
              4095,
            ),
          },
        ],
      });
    } catch (error) {
      console.log(error);
      return void interaction.followUp({
        content: 'Lỗi: Đã xảy ra sự cố! | Mem64i: ❌',
      });
    }
  },
};
