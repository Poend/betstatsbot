// импортим поиск по всем командам
const findCommand = require('./findCommand')
// Пытаемся найти конкретную команду из доступных
// Если сообщение определили как команду
const findAvailableCommand = ({msg, commands, bot}) => {
  // ищем команду по полученному тексту
  const currentCommand = commands.filter(el => {
    return el === msg.text
  })
  // если команду нашли она одна
  if(currentCommand.length === 1){
    return {
      status: true,
      command: currentCommand[0]
    }
  } else if(findCommand({msg}).status){ // не нашли команду из доступных, проверяем по всем
    // если нашли, отправим пользователю сообщение, что команда ему недоступна по роли
    bot.sendMessage(msg.chat.id, findCommand({msg}).message)
    return {
      status: false,
      command: findCommand({msg}).command
    }
  } else {
    // иначе пишем сообщение, что вообще не найдена никакая команда
    bot.sendMessage(msg.chat.id, findCommand({msg}).message)
    return {
      status: false
    }
  }
}

module.exports = findAvailableCommand