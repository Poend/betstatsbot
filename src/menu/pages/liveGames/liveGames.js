// класс глобального стейта
const GlobalState = require('../../../app/globalState')
// функция получения чат айди
const getChatId = require('../../../controllers/getChatId')
// импортим кнопки для отображения
const {
  BACK,
  HOME
} = require('../../../core/allCommands')
// импортим лейаут для вывода
const { LAYOUT_LIST } = require('../../../layouts')
// импортим функцию генерации клавиатуры
const generateKeyboard = require('../../../controllers/generateKeyboard')
// импортим сообщение для вывода в чат при переходе на страницу
const message = require('./message')
// импортим сообщение для вывода в чат, если матчей в лайве нет
const apiErrorMessage = require('./apiErrorMessage')
// импортнем апи
const api = require('../../../api')

const PAGE_LIVE_GAMES = ({
  // состояние приложения
  globalState,
  // объект сообщения полученное из чата
  msg,
  // сам ботинок
  bot
}) => {

  // используем методы API для запроса, после этого только меняем стейт
  api.getLiveGames()
    .then(liveGames => {
      // делаем проверку на пустой массив (что игры вообще есть)
      if (liveGames.length > 0) {
        console.log(liveGames[0].EE)
        // создадим массив с кнопками и привязанными к нему матчами
        const liveGamesState = liveGames.map(game => api.gameToButton({game}))
        // определяем клавиатуру
        // тут сгенерим кнопки-матчи
        const list_items  = liveGamesState.map(game => [game.buttonText])
        const keyboard = {
          list_items: [...list_items],
          bottom_left: HOME,
          bottom_right: BACK
        }
        // отсылаем сообщение и генерим клаву
        bot.sendMessage(
          getChatId({ msg }),
          message,
          generateKeyboard({
            layout: LAYOUT_LIST,
            positionsAndButtons: keyboard
          }))
        // если матчи нашлись, то начинаем менять стейты
        // меняем стейт матчей (статус)
        GlobalState.setState({
          chat_id: getChatId({ msg }),
          globalState,
          param: 'status',
          value: true
        }).matches()

        // меняем стейт матчей (тип матча)
        GlobalState.setState({
          chat_id: getChatId({ msg }),
          globalState,
          param: 'matchesType',
          value: 'live'
        }).matches()

        // меняем стейт матчей (список матчей)
        GlobalState.setState({
          chat_id: getChatId({ msg }),
          globalState,
          param: 'matchesList',
          value: liveGamesState
        }).matches()

        // меняем стейт активной страницы
        GlobalState.setState({
          chat_id: getChatId({ msg }),
          globalState,
          param: 'currentPage',
          value: 'PAGE_LIVE_GAMES'
        }).root()
      } else {
        // пишем ответное сообщение от бота (матчей нет)
        bot.sendMessage(
          getChatId({ msg }),
          apiErrorMessage)
      }
    })
}

module.exports = PAGE_LIVE_GAMES