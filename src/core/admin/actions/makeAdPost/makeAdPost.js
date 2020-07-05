// класс глобального стейта
const GlobalState = require('../../../../app/globalState')
// функция получения чат айди
const getChatId = require('../../../../controllers/getChatId')
// импортнем сообщение для вывода, шо пост получен и сохранен
const message = require('./message')
// тут будем сохранять созданный рекламный пост
const makeAdPost = ({msg, globalState, bot}) => {
  // Получаем id сообщения для рассылки
  const messageID = msg.message_id
  // сохраняем в стейт текст поста
  GlobalState.setState({
    chat_id: getChatId({msg}),
    globalState,
    param: 'messageID',
    value: messageID
  }).ad()
  // отправим обратное сообщение в чат
  bot.sendMessage(getChatId({msg}), message)
}

module.exports = makeAdPost