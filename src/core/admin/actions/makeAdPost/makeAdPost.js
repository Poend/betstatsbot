// импортнем сообщение для вывода, шо пост получен и сохранен
const message = require('./message')
// тут будем сохранять созданный рекламный пост
const makeAdPost = ({msg, state, bot}) => {
  // Получаем текст поста
  const adPostText = msg.text
  // сохраняем в стейт текст поста
  state.ad.adPostText = adPostText
  // отправим обратное сообщение в чат
  bot.sendMessage(msg.chat.id, message)
}

module.exports = makeAdPost