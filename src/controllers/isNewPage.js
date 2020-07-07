// импортим все команды
const {
  HOME,
  BACK,
  MAKE_BET,
  LIVE,
  LINE,
  LEADERBOARD,
  TOP_100,
  PERSONAL,
  FEEDBACK,
  PERSONAL_STATISTIC,
  PRIVACY,
  RESET,
  PERSONAL_STATISTIC_DETAIL,
  MAKE_AD_POST,
  SEND_AD_POST,
  ADMIN,
  CONFIRM,
  CANCEL,
  START,
  NEXTFOURHOURS,
  NEXTDAY,
  NEXTWEEK,
} = require('../core/allCommands')
// тут делаем проверку на то, является ли команда сменой страницы на другую страницу
// или же это какая-то иная команда (смена приватности профиля, создание рекламного поста и т.п)
const isNewPage = ({msg}) => {
  // текст команды
  const commandText = msg.text
  if(
    commandText === MAKE_BET ||
    commandText === LIVE ||
    commandText === LINE ||
    commandText === LEADERBOARD ||
    commandText === PERSONAL ||
    commandText === ADMIN ||
    commandText === MAKE_AD_POST ||
    commandText === HOME ||
    commandText === BACK ||
    commandText === NEXTFOURHOURS ||
    commandText === NEXTDAY ||
    commandText === NEXTWEEK ||
    commandText === START
  ) {
    return true
  } else {
    return false
  }
}

module.exports = isNewPage