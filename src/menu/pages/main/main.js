// импортим кнопки для отображения
const {
  MAKE_BET,
  ADMIN,
  PERSONAL,
  LEADERBOARD
} = require('../../../core/allCommands')
// импортим лейаут для вывода
const {
  LAYOUT_STAIRS_SMALL,
  LAYOUT_CUBE
} = require('../../../layouts')
// для теста импортнем функцию получения роли по чат айди
// для возможности составлять и отправлять посты
const getUserRoleByMsg = require('../../../controllers/getUserRoleByMsg')
// импортим функцию генерации клавиатуры
const generateKeyboard = require('../../../controllers/generateKeyboard')
// импортим сообщение для вывода в чат при переходе на страницу
const message = require('./message')

const PAGE_MAIN = ({
  // состояние приложения
  state,
  // объект сообщения полученное из чата
  msg,
  // сам ботинок
  bot
}) => {
  // делаем проверочку на статус ответа по поиску роли
  if (getUserRoleByMsg({ msg }).status) {
    // сама роль
    const userRole = getUserRoleByMsg({ msg }).role
    let keyboard = {}
    switch (userRole) {
      // HOME PAGE для админа
      case 'admin':
        // определяем клавиатуру
        keyboard = {
          top_left: MAKE_BET,
          top_right: ADMIN,
          bottom_left: PERSONAL,
          bottom_right: LEADERBOARD
        }
        // пишем ответное сообщение от бота
        bot.sendMessage(
          msg.chat.id,
          message,
          generateKeyboard({
            layout: LAYOUT_CUBE,
            positionsAndButtons: keyboard
          }))
        break

      // HOME PAGE для обычного смертного
      case 'user':
        keyboard = {
          top: MAKE_BET,
          bottom_left: PERSONAL,
          bottom_right: LEADERBOARD
        }
        // пишем ответное сообщение от бота
        bot.sendMessage(
          msg.chat.id,
          message,
          generateKeyboard({
            layout: LAYOUT_STAIRS_SMALL,
            positionsAndButtons: keyboard
          }))
        break

      default:
        break;
    }
  }
  // меняем стейт страницы
  state.currentPage = 'PAGE_MAIN'
}

module.exports = PAGE_MAIN