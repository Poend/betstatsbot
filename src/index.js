const TelegramBot = require('node-telegram-bot-api')
const TOKEN = require('../token')

const bot = new TelegramBot(TOKEN, { polling: true })

const log = require('../log')

const changePages = require('./menu/changePages')

// определяем состояние приложения,
// относительного которого будем выстраивать логику перехода по меню
// Сначала определяем первоначальное состояние - initialState
const initialState = {
  currentPage: '', // страница, на которой находимся. Отсюда танцуем при нажатии на кнопку НАЗАД
  matches: { // состояние матчей
    status: false, // взаимодействуем ли мы сейчас со ставками (выбор матчей или ставка на событие)
    matchesType: '', // тип матча (прематч или лайв)
    matchesList: [] // список матчей
  },
  events: { // состояние событий
    status: false, // взаимодействуем ли мы сейчас с событиями
    currentMatch: {}, // выбранный матч
    eventsList: [] // список событий
  },
  bet: { // состояние ставки
    status: false, // делаем ли мы сейчас ставку
    currentEvent: {}, // событие, на которое делаем ставку
  },
  // ad
}
// определяем состояние приложения, которое потом будем менять
// и присваиваем дефолтное значение, чтобы все не полегло в случае чего
// PS будем его также сбрасывать при команде НА ГЛАВНУЮ СТРАНИЦУ
const state = initialState

bot.on('message', msg => {
  // Логгирую для разработки в консоль
  log({text: 'state', value: state})
  log({text: 'message time', value: Date(msg.date)})
  log({text: 'chat_id', value: msg.chat.id})
  
  changePages({msg, state, bot})
  
})

bot.on('polling_error', msg => console.log(msg))