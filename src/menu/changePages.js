// импортим функцию поиска команды по тексту
const textToCommand = require('../controllers/textToCommand')
// импортим все команды
const allCommands = require('../core/allCommands')
// достаем конкретные
const {
  HOME,
  BACK,
  ADMIN,
  MAKE_BET,
  MAKE_AD_POST
} = allCommands
// импортим все страницы
const {
  PAGE_MAIN,
  PAGE_MAKE_BET,
  PAGE_ADMIN,
  PAGE_MAKE_AD_POST
} = require('./pages')
const changePages = ({msg, state, bot}) => {
  if(textToCommand({msg, bot}).status){
    // текстовое значение команды
    const {command} = textToCommand({msg, bot})
    // далее свитч/кейсом бежим по логике далее
    switch (command) {
      // страница ставки
      case MAKE_BET:
        PAGE_MAKE_BET({state, msg, bot})
        break
      case HOME:
        PAGE_MAIN({state, msg, bot})
        break
      case ADMIN:
        PAGE_ADMIN({state, msg, bot})
        break
      case MAKE_AD_POST:
        PAGE_MAKE_AD_POST({state, msg, bot})
        break
      
      default:
        break;
    }
  }
}


module.exports = changePages