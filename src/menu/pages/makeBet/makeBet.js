// класс глобального стейта
const GlobalState = require('../../../app/globalState')
// функция получения чат айди
const getChatId = require('../../../controllers/getChatId')
// импортим кнопки для отображения
const {
  LIVE,
  LINE,
  BACK,
  HOME
} = require('../../../core/allCommands')
// импортим лейаут для вывода
const { LAYOUT_LIST } = require('../../../layouts')
// импортим функцию генерации клавиатуры
const generateKeyboard = require('../../../controllers/generateKeyboard')
// импортим сообщение для вывода в чат при переходе на страницу
const message = require('./message')

const PAGE_MAKE_BET = ({
  // состояние приложения
  globalState,
  // объект сообщения полученное из чата
  msg,
  // сам ботинок
  bot
}) => {
  // определяем клавиатуру
  const keyboard = {
    list_items: [[LIVE], [LINE]],
    bottom_left: HOME,
    bottom_right: BACK
  }
  // пишем ответное сообщение от бота
  bot.sendMessage(
    getChatId({msg}), 
    message, 
    generateKeyboard({
      layout: LAYOUT_LIST,
      positionsAndButtons: keyboard
  }))
  // меняем стейт страницы
  GlobalState.setState({
    chat_id: getChatId({msg}),
    globalState,
    param: 'currentPage',
    value: 'PAGE_MAKE_BET'
  }).root()
}

module.exports = PAGE_MAKE_BET