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
  // сделаем константу страницы (для изменения стейта и возврата из функции)
  const page = 'PAGE_MAKE_BET'
  // пишем ответное сообщение от бота
  bot.sendMessage(
    msg.chat.id, 
    message, 
    generateKeyboard({
      layout: LAYOUT_LIST,
      positionsAndButtons: keyboard
  }))
  // меняем стейт страницы
  state.currentPage = page
}

module.exports = PAGE_MAKE_BET