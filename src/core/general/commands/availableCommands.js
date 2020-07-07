/**
 * Вытаскиваем из массива всех кнопок только те,
 * которые будут доступны ВСЕМ без исключения пользователям
 * Они же будут являться доступными командами по ролям пользователей
 */
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
  CONFIRM,
  CANCEL,
  START,
  NEXTFOURHOURS,
  NEXTDAY,
  NEXTWEEK,
} = require('../../allCommands')

module.exports = COMMANDS_GENERAL = [
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
  CONFIRM,
  CANCEL,
  START,
  NEXTFOURHOURS,
  NEXTDAY,
  NEXTWEEK,
]