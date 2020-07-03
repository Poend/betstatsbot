// импортим кнопки для отображения
const {
  MAKE_AD_POST,
  HOME,
  BACK
} = require('../../../core/allCommands')
// импортим лейаут для вывода
const {
  LAYOUT_STAIRS_SMALL
} = require('../../../layouts')
// импортим функцию генерации клавиатуры
const generateKeyboard = require('../../../controllers/generateKeyboard')
// импортим сообщение для вывода в чат при переходе на страницу
const message = require('./message')

const PAGE_ADMIN = ({
  // состояние приложения
  state,
  // объект сообщения полученное из чата
  msg,
  // сам ботинок
  bot
}) => {
  // делаем проверочку на статус ответа по поиску роли
  keyboard = {
    top: MAKE_AD_POST,
    bottom_left: HOME,
    bottom_right: BACK
  }
  // пишем ответное сообщение от бота
  bot.sendMessage(
    msg.chat.id,
    message,
    generateKeyboard({
      layout: LAYOUT_STAIRS_SMALL,
      positionsAndButtons: keyboard
    }))
    // меняем стейт страницы
    state.currentPage = 'PAGE_ADMIN'
  }


module.exports = PAGE_ADMIN