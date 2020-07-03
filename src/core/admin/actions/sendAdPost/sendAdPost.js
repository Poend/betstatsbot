// импортим всех пользователей
const mockData = require('../../../../../mockData')
// импортим сообщение для вывода в бота
const message = require('./message')
// функция отправки рекламного поста пользователям
const sendAdPost = ({ bot, msg, state }) => {
  // отправляем сообщение, пробегаясь по циклу пользователей
  mockData.forEach(el => {
    bot.sendMessage(el.chat_id, state.ad.adPostText)
  }) 

  // выводим сообщение от бота, что пост разослан между пользователями
  bot.sendMessage(msg.chat.id, message)
  // сбрасываем стейт с рекламным постом
  state.ad.adPostText = ''
}

module.exports = sendAdPost