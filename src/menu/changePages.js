// импортим функцию поиска команды по тексту
const textToCommand = require('../controllers/textToCommand')
// импортим все команды
const allCommands = require('../core/allCommands')
// импортнем проверку на то, что команда является переходом на новую страницу
const isNewPage = require('../controllers/isNewPage')
// достаем конкретные
const {
  HOME,
  BACK,
  ADMIN,
  MAKE_BET,
  MAKE_AD_POST,
  SEND_AD_POST,
  START
} = allCommands
// импортим все страницы
const {
  PAGE_MAIN,
  PAGE_MAKE_BET,
  PAGE_ADMIN,
  PAGE_MAKE_AD_POST
} = require('./pages')
// импортнем действия (actions) для обработки (если это не переход на другие страницы)
// Создание рекламного поста
const makeAdPost = require('../core/admin/actions/makeAdPost')
// отправка рекламного поста
const sendAdPost = require('../core/admin/actions/sendAdPost')

const changePages = ({ msg, state, bot }) => {
  // получаем нынешнюю страницу
  // Она необходима для обработки действий, если это не переход на новую страницу
  const { currentPage } = state
  // это условие служит для отделения команд по переходе по страницам от других функций
  // Например, создание и отправка поста
  if (
    isNewPage({ msg })
    && textToCommand({ msg, bot }).status
  ) {
    // текстовое значение команды
    const { command } = textToCommand({ msg, bot })
    // далее свитч/кейсом бежим по логике
    switch (command) {
      // страница ставки
      case START:
        PAGE_MAIN({ state, msg, bot })
        break
      // главная страница
      case MAKE_BET:
        PAGE_MAKE_BET({ state, msg, bot })
        break
      // главная страница
      case HOME:
        PAGE_MAIN({ state, msg, bot })
        break
      // страница для одмена
      case ADMIN:
        PAGE_ADMIN({ state, msg, bot })
        break
      // страница создания рекламного поста
      case MAKE_AD_POST:
        PAGE_MAKE_AD_POST({ state, msg, bot })
        break

      default:
        break;
    }
  } else {
    /**
     * Делаем проверку по нынешней странице
     * Если она совпадает с определенными (PAGE_MAKE_AD_POST например)
     * То запускаем определенные функции (сохранение рекламного поста например)
     */
    switch (currentPage) {
      case 'PAGE_MAKE_AD_POST':
        // проверка, если мы взаимодействуем с функционалом создания рекламного поста
        // И также уже сохранили текст для рекламного поста
        if(state.ad.status && state.ad.adPostText){
          // тут сделаем проверку дополнительную на команду ОТПРАВИТЬ РЕКЛАМНЫЙ ПОСТ
          if(msg.text === SEND_AD_POST){
            sendAdPost({bot, msg, state})
          }
        } else {
          makeAdPost({msg, state, bot})
        }
        break;

      default:
        break;
    }
  }
}


module.exports = changePages