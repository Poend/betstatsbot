// Импортнем тестовые данные (чаты и роли)
const mockDataUsers = require('../../mockData')
// Импортим список команд 
const COMMANDS_GENERAL = require('../core/general/commands/availableCommands')
const COMMANDS_USER = require('../core/user/commands/availableCommands')
const COMMANDS_ADMIN = require('../core/admin/commands/availableCommands')
// получаем список доступных команда по роли
// TODO: тут будет функция получения списка доступных команд не по chat.id, а по роли из базы
const getAvailableCommandsByChatId = ({msg}) => {
  // пытаемся найти соответствие по chat_id и вытащить юзера
  const currentUserRole = mockDataUsers.filter(el => {
    return el.chat_id === msg.chat.id
  })
  // проверяем, что найден один пользователь
  if(currentUserRole.length === 1){
    switch (currentUserRole[0].role) {
      case 'user': 
        return COMMANDS_USER
      case 'admin':
        return COMMANDS_ADMIN
      default:
        console.error('ERROR: getAvailableCommandsByChatId: undefined user role: ', currentUserRole[0])
        return COMMANDS_GENERAL
    }
  } else {
    console.error('ERROR: getAvailableCommandsByChatId: chat_id is undefined OR multiple users to indentificate: ', currentUserRole)
    return COMMANDS_GENERAL
  }
}

module.exports = getAvailableCommandsByChatId