// класс глобального стейта
const GlobalState = require('../../../app/globalState')
// функция получения чат айди
const getChatId = require('../../../controllers/getChatId')
// импортим кнопки для отображения
const {
  BACK,
  HOME
} = require('../../../core/allCommands')
// импортим функцию генерации клавиатуры
const generateKeyboard = require('../../../controllers/generateKeyboard')
// импортим сообщение для вывода в чат при переходе на страницу
const message = require('./message')
// импортим апи
const api = require('../../../api')

const PAGE_EVENTS_LIST = ({
  // состояние приложения
  globalState,
  // объект сообщения полученное из чата
  msg,
  // сам ботинок
  bot,
  // данные по матчу и ивентам
  eventsData
}) => {
  // деструктурируем полученные данные 
  if (eventsData.status) {
    const { currentMatch, events } = eventsData
    // получаем лэйаут
    const { layoutType, layout } = api.layoutTypeByUnblockedEvents({ gameEvents: events })
    // определяем клавиатуру
    // тут сгенерим кнопки-матчи
    let keyboard

    switch (layoutType) {
      case 'LAYOUT_LIST':
        keyboard = {
          bottom_left: HOME,
          bottom_right: BACK,
          list_items: [...events.map(el => el.buttonText)]
        }
        break
      case 'LAYOUT_DOUBLE_LIST':
        keyboard = {
          bottom_left: HOME,
          bottom_right: BACK,
          list_items: {
            top_left: events[0].buttonText,
            top_right: events[1].buttonText,
            list: [...events.slice(2, events.length).map(el => el.buttonText)]
          }
        }
        break
      case 'LAYOUT_TRIPLE_LIST':
        keyboard = {
          bottom_left: HOME,
          bottom_right: BACK,
          list_items: {
            top_left: events[0].buttonText,
            top_middle: events[1].buttonText,
            top_right: events[2].buttonText,
            list: [...events.slice(3, events.length).map(el => el.buttonText)]
          }
        }
        break
      default:
        break
    }



    // отсылаем сообщение и генерим клаву
    bot.sendMessage(
      getChatId({ msg }),
      message,
      generateKeyboard({
        layout: layout,
        positionsAndButtons: keyboard
      }))
    // если матчи нашлись, то начинаем менять стейты
    // меняем стейт событий (статус)
    GlobalState.setState({
      chat_id: getChatId({ msg }),
      globalState,
      param: 'status',
      value: true
    }).events()

    // меняем стейт событий (выбранный матч)
    GlobalState.setState({
      chat_id: getChatId({ msg }),
      globalState,
      param: 'currentMatch',
      value: currentMatch
    }).events()

    // меняем стейт событий (список событий)
    GlobalState.setState({
      chat_id: getChatId({ msg }),
      globalState,
      param: 'eventsList',
      value: events
    }).events()

    // меняем стейт активной страницы
    GlobalState.setState({
      chat_id: getChatId({ msg }),
      globalState,
      param: 'currentPage',
      value: 'PAGE_EVENTS_LIST'
    }).root()
  }

}

module.exports = PAGE_EVENTS_LIST