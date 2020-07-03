// импортим все команды
const allCommands = require('../core/allCommands')
const COMMANDS_ALL = Object.values(allCommands)
// Пытаемся найти команду из всех возможных
const findCommand = ({msg}) => {
  // ищем соответствие по всем командам
  const currentCommand = COMMANDS_ALL.filter(el => {
    return el === msg.text
  })
  // если нашли и нашли только одну
  if(currentCommand.length === 1){
    return {
      status: true,
      message: 'Данная команда вам недоступна',
    }
  } else {
    console.error('ERROR: findCommand: cant found any command: ', msg.text)
    return {
      status: false,
      message: 'Команда не найдена. Попробуйте другую команду'
    }
  }
}

module.exports = findCommand