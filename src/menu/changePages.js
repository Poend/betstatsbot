// импортнем класс глобального состояния
const GlobalState = require('../app/globalState')
// функция получения чат айди
const getChatId = require('../controllers/getChatId')
// импортим функцию поиска команды по тексту
const textToCommand = require('../controllers/textToCommand')
// импортим все команды
const allCommands = require('../core/allCommands')
// импортнем проверку на то, что команда является переходом на новую страницу
const isNewPage = require('../controllers/isNewPage')
// достаем конкретные
const {
  HOME,
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

// функционал смены страниц
const changePages = ({ msg, globalState, bot }) => {
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
        PAGE_MAIN({ globalState, msg, bot })
        break
      // главная страница
      case MAKE_BET:
        PAGE_MAKE_BET({ globalState, msg, bot })
        break
      // главная страница
      case HOME:
        PAGE_MAIN({ globalState, msg, bot })
        break
      // страница для одмена
      case ADMIN:
        PAGE_ADMIN({ globalState, msg, bot })
        break
      // страница создания рекламного поста
      case MAKE_AD_POST:
        PAGE_MAKE_AD_POST({ globalState, msg, bot })
        break

      default:
        break;
    }
  } else {
    // получаем нынешнюю страницу
    // Она необходима для обработки действий, если это не переход на новую страницу
    const { currentPage } = globalState[getChatId({msg})]
    /**
     * Делаем проверку по нынешней странице
     * Если она совпадает с определенными (PAGE_MAKE_AD_POST например)
     * То запускаем определенные функции (сохранение рекламного поста например)
     */
    switch (currentPage) {
      case 'PAGE_MAKE_AD_POST':
        // проверка, если мы взаимодействуем с функционалом создания рекламного поста
        // И также уже сохранили текст для рекламного поста
        if(globalState[getChatId({msg})].ad.status && globalState[getChatId({msg})].ad.messageID){
          // тут сделаем проверку дополнительную на команду ОТПРАВИТЬ РЕКЛАМНЫЙ ПОСТ
          if(msg.text === SEND_AD_POST){
            sendAdPost({bot, msg, globalState})
          }
        } else {
          console.log('CAN U MAKE THE FUCKINT POST U PIECE OF SHIT')
          makeAdPost({msg, globalState, bot})
        }
        break;

      default:
        break;
    }
  }
}


module.exports = changePages