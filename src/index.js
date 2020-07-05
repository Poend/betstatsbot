const TelegramBot = require('node-telegram-bot-api')
const TOKEN = require('../token')
const bot = new TelegramBot(TOKEN, { polling: true })

const log = require('../log')

const changePages = require('./menu/changePages')

// определяем состояние приложения, которое потом будем менять
// и присваиваем дефолтное значение, чтобы все не полегло в случае чего
// PS будем его также сбрасывать при команде НА ГЛАВНУЮ СТРАНИЦУ
const globalState = {}

bot.on('message', msg => {
  // Логгирую для разработки в консоль
  
  changePages({msg, globalState, bot})
  log({text: 'message time', value: Date(msg.date)})
  log({text: 'chat_id', value: msg.chat.id})
  log({text: 'state', value: globalState})

  
})

bot.on('polling_error', msg => console.log(msg))