/**
 * Пытаемся спарсить строку
 * В чем идея: если сообщение является тупо текстом 
 * БЕЗ дефиса (матч Evil Geniuses - Navi, к примеру) 
 * и БЕЗ двоеточия (ставка на событие П1: 3.64 к примеру)
 * То это либо команда, либо просто текст (мусор)
 */
const isCommand = ({msg}) => {
  if(
    msg.text.match(/[А-я]||[A-z]/) 
    && !msg.text.match(/-/) 
    && !msg.text.match(/:/)
    ){
      return true
  } else {
    console.error('ERROR: isCommand: msg.text is not a command: ', msg.text)
    return false
  }
}

module.exports = isCommand