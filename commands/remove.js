const {GuildMember, ApplicationCommandOptionType } = require('discord.js');
const {useQueue} = require("discord-player");
const {isInVoiceChannel} = require("../utils/voicechannel");

module.exports = {
  name: 'remove',
  description: 'Xóa yêu cầu nào đó trong hàng chờ!',
  options: [
    {
      name: 'number',
      type: ApplicationCommandOptionType.Integer,
      description: 'Nhập số thứ tự. Dùng /queue để kiểm tra số thứ tự!',
      required: true,
    },
  ],
  async execute(interaction) {
    const inVoiceChannel = isInVoiceChannel(interaction)
    if (!inVoiceChannel) {
        return
    }

    await interaction.deferReply();
    const queue = useQueue(interaction.guild.id);
    if (!queue || !queue.currentTrack) return void interaction.followUp({content: '❌ Hàng chờ rỗng!'});
    const number = interaction.options.getInteger('number') - 1;
    if (number > queue.tracks.size)
      return void interaction.followUp({content: '❌ Số yêu cầu còn lớn hơn cả số bài có trong hàng chờ, wow!'});
    const removedTrack = queue.node.remove(number);
    return void interaction.followUp({
      content: removedTrack ? `✅ Đã xóa **${removedTrack}**!` : '❌ Không thể xóa yêu cầu đó!',
    });
  },
};
