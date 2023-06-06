const {GuildMember, ApplicationCommandOptionType } = require('discord.js');

module.exports = {
  name: 'volume',
  description: 'Điều chỉnh âm lượng!',
  options: [
    {
      name: 'volume',
      type: ApplicationCommandOptionType.Integer,
      description: 'Gõ 1 giá trị bất kì từ 0% đến 200%',
      required: true,
    },
  ],
  async execute(interaction, player) {
    if (!(interaction.member instanceof GuildMember) || !interaction.member.voice.channel) {
      return void interaction.reply({
        content: '**E**: Bạn không có mặt tại bất kì kênh thoại nào!',
        ephemeral: true,
      });
    }

    if (
      interaction.guild.members.me.voice.channelId &&
      interaction.member.voice.channelId !== interaction.guild.members.me.voice.channelId
    ) {
      return void interaction.reply({
        content: '**E**: Bạn không cùng kênh thoại với tôi, sad :((',
        ephemeral: true,
      });
    }

    await interaction.deferReply();
    const queue = player.getQueue(interaction.guildId);
    if (!queue || !queue.playing)
      return void interaction.followUp({
        content: '**E**: Không có yêu cầu nào trong hàng chờ ngay lúc này!\n**W**: Vui lòng thêm yêu cầu vào hàng chờ để sử dụng lệnh!',
      });

    var volume = interaction.options.getInteger('volume');
    volume = Math.max(0, volume);
    volume = Math.min(200, volume);
    const success = queue.setVolume(volume);

    return void interaction.followUp({
      content: success ? `🔊: Đã chỉnh âm lượng thành ${volume}%` : '❌ | Có gì đó sai sai, đang fix bug!',
    });
  },
};
