require('dotenv').config()

const fs = require('fs');
const Discord = require('discord.js');
const Client = require('./client/Client');
const config = require('./config.json');
const {Player} = require('discord-player');

const {ActivityType} = require('discord.js');

const client = new Client();
client.commands = new Discord.Collection();

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    client.commands.set(command.name, command);
}

console.log(client.commands);

const player = new Player(client);

player.extractors.loadDefault().then(r => console.log('Extractors loaded successfully'))

// Still needs to be refactored for 0.6
/*player.events.on('connection', (queue) => {
    queue.connection.connec.voiceConnection.on('stateChange', (oldState, newState) => {
      const oldNetworking = Reflect.get(oldState, 'networking');
      const newNetworking = Reflect.get(newState, 'networking');

      const networkStateChangeHandler = (oldNetworkState, newNetworkState) => {
        const newUdp = Reflect.get(newNetworkState, 'udp');
        clearInterval(newUdp?.keepAliveInterval);
      }

      oldNetworking?.off('stateChange', networkStateChangeHandler);
      newNetworking?.on('stateChange', networkStateChangeHandler);
    });
});*/

player.events.on('audioTrackAdd', (queue, song) => {
    queue.metadata.channel.send(`🎶 **${song.title}** đã được thêm vào hàng chờ!`);
});

player.events.on('playerStart', (queue, track) => {
    queue.metadata.channel.send(`▶ Bắt đầu phát: **${track.title}**!`);
});

player.events.on('audioTracksAdd', (queue, track) => {
    queue.metadata.channel.send(`🎶 Yêu cầu đã được xử lí!`);
});

player.events.on('disconnect', queue => {
    queue.metadata.channel.send('❌ Bot đã bị ai đó đá ra khỏi kênh Voice, xóa sạch hàng chờ!');
});

player.events.on('emptyChannel', queue => {
    queue.metadata.channel.send('❌ Không có ai ở kênh Voice, Bot đang thoát...');
});

player.events.on('emptyQueue', queue => {
    queue.metadata.channel.send('✅ Yêu cầu đã được phát, kết thúc!');
});

player.events.on('error', (queue, error) => {
    console.log(`[${queue.guild.name}] Lỗi trong khi kết nối: ${error.message}`);
});

// For debugging
/*player.on('debug', async (message) => {
    console.log(`General player debug event: ${message}`);
});

player.events.on('debug', async (queue, message) => {
    console.log(`Player debug event: ${message}`);
});

player.events.on('playerError', (queue, error) => {
    console.log(`Player error event: ${error.message}`);
    console.log(error);
});*/

client.on('ready', function () {
    console.log('Ready!');
    client.user.presence.set({
        activities: [{name: config.activity, type: Number(config.activityType)}],
        status: Discord.Status.Ready
    })
});

client.once('reconnecting', () => {
    console.log('Reconnecting!');
});

client.once('disconnect', () => {
    console.log('Disconnect!');
});

client.on('messageCreate', async message => {
    if (message.author.bot || !message.guild) return;
    if (!client.application?.owner) await client.application?.fetch();

    if (message.content === '!deploy' && message.author.id === client.application?.owner?.id) {
        await message.guild.commands
            .set(client.commands)
            .then(() => {
                message.reply('Đã dán câu lệnh thiết lập sẵn!');
            })
            .catch(err => {
                message.reply('Bot bị thiếu quyền application.commands!');
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
            command.execute(interaction);
        }
    } catch (error) {
        console.error(error);
        await interaction.followUp({
            content: 'Đã có lỗi xảy ra khi thực thi câu lệnh!',
        });
    }
});

client.login(process.env.DISCORD_TOKEN);
