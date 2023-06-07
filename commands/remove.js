const {GuildMember, ApplicationCommandOptionType } = require('discord.js');

module.exports = {
  name: 'remove',
  description: 'Loại bỏ 1 yêu cầu nào đó đang nằm trong hàng chờ.',
  options: [
    {
      name: 'number',
      type: ApplicationCommandOptionType.Integer,
      description: 'Số thứ tự của yêu cầu mà bạn muốn loại bỏ (tra cứu stt bằng lệnh queue)',
      required: true,
    },
  ],
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
    if (!queue || !queue.playing) return void interaction.followUp({content: '**E**: Không có yêu cầu trong hàng chờ | Mem64i: ❌'});
    const number = interaction.options.getInteger('number') - 1;
    if (number > queue.tracks.length)
      return void interaction.followUp({content: '**E**: Số thứ tự của yêu cầu còn lớn hơn cả số yêu cầu có trong hàng chờ!'});
    const removedTrack = queue.remove(number);
    return void interaction.followUp({
      content: removedTrack ? `**W**: Đã loại bỏ **${removedTrack}** khỏi hàng chờ! | Mem64i: ✅` : 'Lỗi: Đã xảy ra sự cố! | Mem64i: ❌',
    });
  },
};
