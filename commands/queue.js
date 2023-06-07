const {GuildMember} = require('discord.js');

module.exports = {

    name: 'queue',
    description: 'Xem danh sách hàng chờ của Bot.',

    async execute (interaction, player) {

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
              content: '**E**: Bạn không ở cùng kênh thoại với Bot!',
              ephemeral: true,
            });
          }
          var queue = player.getQueue(interaction.guildId);
          if (typeof(queue) != 'undefined') {
            trimString = (str, max) => ((str.length > max) ? `${str.slice(0, max - 3)}...` : str);
              return void interaction.reply({
                embeds: [
                  {
                    title: 'Danh sách hàng chờ hiện tại:',
                    description: trimString(`🎶  Hiện đang phát: **${queue.current.title}**\n🎶  **Các yêu cầu kế tiếp -** ${queue} `, 4095),
                  }
                ]
              })
          } else {
            return void interaction.reply({
              content: '**E**: Không có yêu cầu nào trong hàng chờ | Mem64i: ❌'
            })
          }
    }
}
