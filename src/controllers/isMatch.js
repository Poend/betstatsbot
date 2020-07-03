/**
 * Пытаемся спарсить строку
 * Если есть дефис в сообщении от пользователя, то считаем его матчем
 * Evil Geniuses - 4 zoomers - например
 */
const isMatch = ({msg}) => {
  if(
    msg.text.match(/-/) 
    && !msg.text.match(/:/)
    ){
      return true
  } else {
    console.error('ERROR: isMatch: msg.text is not a match: ', msg.text)
    return false
  }
}

module.exports = isMatch