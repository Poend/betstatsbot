/**
 * Получаем сообщение от пользователя
 * Пытаемся определить какую команду чел хочет вызвать
 */
// импортим функцию проверки сообщения на соответствие условиям КОМАНДА
const isCommand = require('./isСommand')
// импортим поиск команды
const findAvailableCommand = require('./findAvailableCommand')
// TODO: тут должна быть проверка на то, какая роль у пользователя (из базы)
const getAvailableCommandsByChatId = require('./getAvailableCommandsByRole')
const textToCommand = ({msg, bot}) => {
  // если сообщение из чата определяется как команда
  if(isCommand({msg})){
    // бежим по массиву команд в поисках необходимой
    const commands = getAvailableCommandsByChatId({msg})
    // проверяем, что нашли команду
    if(findAvailableCommand({msg, commands, bot}).status){
      return {...findAvailableCommand({msg, commands, bot})}
    } else {
      return {
        status: false,
        message: 'Команда не определена'
      }
    }
  } else {
    return {
      status: false,
      message: 'Команда не определена'
    }
  }
}

module.exports = textToCommand