// импортим библиотеку для запроса
const request = require('request')
// импортим тип игр (прематч и лайв)
const gameType = require('./gameType')
// импортим временной диапазон для игр в линию 
const lineTime = require('./lineTime')
// функция для получения только дота-2 матчей
const getDota2Matches = require('./getDota2Matches')

// основной запрос, из которого будем формировать запросы в апишку по параметрам
const getGames = ({
  // тип игры
  type,
  // время (если это прематч) с дефолтным значением ФОЛС
  time = false,
}) => {
  // сформируем урл для отправки
  // базовый урл
  const baseURL = 'https://part.upnp.xyz/'
  // урл с типом игры (прематч или лайв)
  const gameTypeUrl = `${baseURL}${gameType({type})}/GetAllFeedGames?sportid=40`
  // создадим переменную для дальнейшего преобразования
  let finalURL
  // проверочку на тип игры "прематч"
  if(type === 'prematch'){
    finalURL = `${gameTypeUrl}&${lineTime({time})}`
  } else {
    finalURL = gameTypeUrl
  }
  // оборачиваем в промис, чтобы если чо отслеживать окончание работы функции
  return new Promise ((resolve, reject) => {
    request({
      method: 'GET',
      url: finalURL
    }, (err, res, body) => {
      if(err) reject(err)
      resolve(getDota2Matches({ allMatches: JSON.parse(body) }))
    })
  })
}

module.exports = getGames