const Discord = require('discord.js');
const TelegramBot = require('node-telegram-bot-api');

const logger = require('./logger');
const settings = require('./settings.json');

const { auth: { discordToken, telegramToken }, discordMonitoredChannels } = settings;

const discordClient = new Discord.Client();
const telegramBot = new TelegramBot(telegramToken, { polling: true });

discordClient.on('ready', () => {
  logger.info(`Logged in as ${discordClient.user.tag}!`);
});

discordClient.on('voiceStateUpdate', (oldState, newState) => {
  const newStateChannel = newState.voiceChannel;
  console.log('NEWSTATE', newState, '\n\n\n\n');

  if (newStateChannel !== undefined) {
    // User Joins a voice channel
    const voiceChannelID = newState.voiceChannelID;
    const voiceChannelName = newStateChannel.name;
    const user = newState.user;

    if (discordMonitoredChannels.find(channel => voiceChannelID === channel.id)) {
      console.log('voiceChannelID', voiceChannelID);
      console.log('voiceChannelName', voiceChannelName);
      console.log('user', user.username);
      telegramBot.sendMessage(156834605, `${user.username} joined ${voiceChannelName}`);
    }
  }
})

telegramBot.on('message', (msg) => {
  const chatId = msg.chat.id;
  console.log('CHATID', chatId);

  // send a message to the chat acknowledging receipt of their message
  telegramBot.sendMessage(chatId, 'Received your message');
});

discordClient.login(discordToken);
