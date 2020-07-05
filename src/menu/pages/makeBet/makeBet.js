// класс глобального стейта
const GlobalState = require('../../../app/globalState')
// функция получения чат айди
const getChatId = require('../../../controllers/getChatId')
// импортим кнопки для отображения
const {
  LIVE,
  PREMATCH,
  BACK,
  HOME
} = require('../../../core/allCommands')
// импортим лейаут для вывода
const {LAYOUT_LIST} = require('../../../layouts')
// импортим функцию генерации клавиатуры
const generateKeyboard = require('../../../controllers/generateKeyboard')
// импортим сообщение для вывода в чат при переходе на страницу
const message = require('./message')

const PAGE_MAKE_BET = ({
  // состояние приложения
  state,
  // объект сообщения полученное из чата
  msg,
  // сам ботинок
  bot
}) => {
  // определяем клавиатуру
  const keyboard = {
    list_items: [[LIVE], [PREMATCH]],
    bottom_left: HOME,
    bottom_right: BACK
  }
  // пишем ответное сообщение от бота
  bot.sendMessage(
    msg.chat.id, 
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