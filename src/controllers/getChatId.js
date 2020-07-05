// простая функция для получения чат айди через msg
const getChatId = ({msg}) => {
  return msg.chat.id
}

module.exports = getChatId