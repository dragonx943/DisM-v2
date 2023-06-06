require('dotenv').config()

const fs = require('fs');
const Discord = require('discord.js');
const Client = require('./client/Client');
const config = require('./config.json');
const {Player} = require('discord-player');

const { ActivityType } = require('discord.js');

const client = new Client();
client.commands = new Discord.Collection();

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
  const command = require(`./commands/${file}`);
  client.commands.set(command.name, command);
}

console.log(client.commands);

const player = new Player(client);

player.on('connectionCreate', (queue) => {
    queue.connection.voiceConnection.on('stateChange', (oldState, newState) => {
      const oldNetworking = Reflect.get(oldState, 'networking');
      const newNetworking = Reflect.get(newState, 'networking');

      const networkStateChangeHandler = (oldNetworkState, newNetworkState) => {
        const newUdp = Reflect.get(newNetworkState, 'udp');
        clearInterval(newUdp?.keepAliveInterval);
      }

      oldNetworking?.off('stateChange', networkStateChangeHandler);
      newNetworking?.on('stateChange', networkStateChangeHandler);
    });
});

player.on('error', (queue, error) => {
  console.log(`[${queue.guild.name}] Đã xảy ra lỗi trong hàng chờ: ${error.message}`);
});

player.on('connectionError', (queue, error) => {
  console.log(`[${queue.guild.name}] Đã xảy ra lỗi từ đường truyền kết nối: ${error.message}`);
});

player.on('trackStart', (queue, track) => {
  queue.metadata.send(`▶  Bắt đầu phát: **${track.title}**\n📻  Phát tại: **${queue.connection.channel.name}**`);
});

player.on('trackAdd', (queue, track) => {
  queue.metadata.send(`Đã thêm: **${track.title}** vào hàng chờ của Bot | Mem64i: +1 🎶`);
});

player.on('botDisconnect', queue => {
  queue.metadata.send('Do Bot đã đột ngột bị kick ra khỏi kênh đàm thoại, bắt đầu tiến hành thực thi lệnh xóa toàn bộ hàng chờ!');
});

player.on('channelEmpty', queue => {
  queue.metadata.send('Không có ai xuất hiện ở kênh đàm thoại, bắt đầu thực thi lệnh rời khỏi kênh...');
});

player.on('queueEnd', queue => {
  queue.metadata.send('Đã kết thúc trình phát, tiến hành thực thi lệnh rời khỏi kênh thoại và dọn bộ nhớ! | Mem64i: ✅');
});

client.once('ready', async () => {
  console.log('Nạp đạn đầy đủ! Đã sẵn sàng chờ lệnh!');
});

client.on('ready', function() {
  client.user.setPresence({
    activities: [{ name: config.activity, type: Number(config.activityType) }],
    status: Discord.PresenceUpdateStatus.Online,
  });
});

client.once('reconnecting', () => {
  console.log('Đang cố gắng kết nối lại với trái đất!');
});

client.once('disconnect', () => {
  console.log('Pip Pip! Đã ngắt kết nối với trái đất!');
});

client.on('messageCreate', async message => {
  if (message.author.bot || !message.guild) return;
  if (!client.application?.owner) await client.application?.fetch();

  if (message.content === '!deploy' && message.author.id === client.application?.owner?.id) {
    await message.guild.commands
      .set(client.commands)
      .then(() => {
        message.reply('Đã triển khai dán câu lệnh thiết lập sẵn lên máy chủ này!');
      })
      .catch(err => {
        message.reply('Không thể triển khai dán lệnh! Hãy đảm bảo Bot đã được cấp quyền: application.commands !!!');
        console.error(err);
      });
  }
});

client.on('interactionCreate', async interaction => {
  const command = client.commands.get(interaction.commandName.toLowerCase());

  try {
    if (interaction.commandName == 'ban' || interaction.commandName == 'userinfo') {
      command.execute(interaction, client);
    } else {
      command.execute(interaction, player);
    }
  } catch (error) {
    console.error(error);
    interaction.followUp({
      content: 'Đã xảy ra lỗi khi Bot đang cố gắng thực thi câu lệnh đó!\nHãy đảm bảo Bot đã được cấp quyền đầy đủ. Nếu vẫn xảy ra lỗi, vui lòng liên hệ Admin để được giải quyết!',
    });
  }
});

client.login(process.env.DISCORD_TOKEN);
