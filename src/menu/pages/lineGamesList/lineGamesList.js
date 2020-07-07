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

const PAGE_LINE_GAMES_LIST = ({
  // состояние приложения
  globalState,
  // объект сообщения полученное из чата
  msg,
  // сам ботинок
  bot,
  // получаем время для запроса АПИШКИ
  time
}) => {

  // используем методы API для запроса, после этого только меняем стейт
  switch (time) {
    case 'next4Hours':
      api.getLineGames().nextFourHours()
        .then(lineGames => lineGamesAction({
          lineGames,
          msg,
          globalState,
          bot,
          time
        }))
      break;
    case 'nextDay':
      api.getLineGames().nextDay()
        .then(lineGames => lineGamesAction({
          lineGames,
          msg,
          globalState,
          bot,
          time
        }))
      break;
    case 'nextWeek':
      api.getLineGames().nextWeek()
        .then(lineGames => lineGamesAction({
          lineGames,
          msg,
          globalState,
          bot,
          time
        }))
      break;

    default:
      break;
  }


}

const lineGamesAction = ({
  lineGames,
  msg,
  globalState,
  bot,
  time
}) => {
  if (lineGames.length > 0) {
    // создадим массив с кнопками и привязанными к нему матчами
    const lineGamesState = lineGames.map(game => api.gameToButton({ game }))
    // определяем клавиатуру
    // тут сгенерим кнопки-матчи
    const list_items = lineGamesState.map(game => [game.buttonText])
    const keyboard = {
      list_items: [...list_items],
      bottom_left: HOME,
      bottom_right: BACK
    }
    // отсылаем сообщение и генерим клаву
    bot.sendMessage(
      getChatId({ msg }),
      message({time}),
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
      value: 'line'
    }).matches()

    // меняем стейт матчей (список матчей)
    GlobalState.setState({
      chat_id: getChatId({ msg }),
      globalState,
      param: 'matchesList',
      value: lineGamesState
    }).matches()

    // меняем стейт матчей (время матчей)
    GlobalState.setState({
      chat_id: getChatId({ msg }),
      globalState,
      param: 'matchesTypeTime',
      value: time
    }).matches()

    // меняем стейт активной страницы
    GlobalState.setState({
      chat_id: getChatId({ msg }),
      globalState,
      param: 'currentPage',
      value: 'PAGE_LINE_GAMES_LIST'
    }).root()
  } else {
    // пишем ответное сообщение от бота (матчей нет)
    bot.sendMessage(
      getChatId({ msg }),
      apiErrorMessage({time}))
  }
}

module.exports = PAGE_LINE_GAMES_LIST