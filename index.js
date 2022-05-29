const TelegramApi = require('node-telegram-bot-api')
const {gameOptions, againOptions} = require('./options')
const token = "5139894947:AAHgIqppcWZYPWC7XUxaPpdZqBV1bVV-Vuc";

const bot = new TelegramApi(token, {polling: true})


const startGame = async (chatId) => {
  await bot.sendMessage(chatId, 'Сейчас я загадаю число от 0 до 9, а ты попробуй угадай');
  chats[chatId] = Math.trunc(Math.random() * 10);
  await bot.sendMessage(chatId, 'Угадывай', gameOptions)
}

bot.setMyCommands([
  {command: '/start', description: 'Начальное приветствие'},
  {command: '/info', description: 'Получить информацию'},
  {command: '/game', description: 'Загадать число'},

])

const chats = {};

function start() {
  bot.on('message', async msg => {
    const text = msg.text;
    const chatId = msg.chat.id;
    if (text === '/start') {
      await bot.sendSticker(chatId, 'https://tlgrm.ru/_/stickers/ea5/382/ea53826d-c192-376a-b766-e5abc535f1c9/7.webp')
      return bot.sendMessage(chatId, `Дарова`)
    }
    if (text === '/info') {
      return bot.sendMessage(chatId, `Тебя зовут ${msg.from.first_name} ${msg.from.last_name}`)
    }
    if (text === '/game') {
      return startGame(chatId)
    }
    return bot.sendMessage(chatId, 'Chel ti...')
  })

  bot.on('callback_query', async msg => {
    const data = msg.data;
    const chatId = msg.message.chat.id;
    if (data === '/again'){
      return  startGame(chatId)
    }
    return  bot.sendMessage(chatId, +data === chats[chatId] ? 'Угадал' : `Не угадал, я загадал цифру ${chats[chatId]}`, againOptions);
  })
}

start()