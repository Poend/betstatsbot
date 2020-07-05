// класс глобального стейта
const GlobalState = require('../../../../app/globalState')
// функция получения чат айди
const getChatId = require('../../../../controllers/getChatId')
// импортим всех пользователей
const mockData = require('../../../../../mockData')
// импортим сообщение для вывода в бота
const message = require('./message')
// функция отправки рекламного поста пользователям
const sendAdPost = ({ bot, msg, globalState }) => {
  // отправляем сообщение, пробегаясь по циклу пользователей
  mockData.forEach(el => {
    bot.forwardMessage(
      // кому шлем
      el.chat_id, 
      // от кого шлем (пользователь, создавший пост только что)
      getChatId({msg}), 
      // пересылаем сохраненное сообщение
      globalState[getChatId({msg})].ad.messageID)
  }) 

  // выводим сообщение от бота, что пост разослан между пользователями
  bot.sendMessage(getChatId({msg}), message)
  // сбрасываем стейт с рекламным постом
  GlobalState.setState({
    chat_id: getChatId({msg}),
    globalState,
    param: 'messageID',
    value: ''
  }).ad()
}

module.exports = sendAdPost