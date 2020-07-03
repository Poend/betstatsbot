/**
 * Пытаемся спарсить строку
 * Если есть двоеточие в сообщении от пользователя, то считаем событием на матч
 * П1: 2.49 или П2: 1.44 - например
 */
const isEvent = ({msg}) => {
  if(
    msg.text.match(/:/)
    ){
      return true
  } else {
    console.error('ERROR: isEvent: msg.text is not a event: ', msg.text)
    return false
  }
}

module.exports = isEvent