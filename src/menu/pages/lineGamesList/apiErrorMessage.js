// тут сообщение, если матчей в лайве нет
module.exports = ({time}) => {
  return `${text(time)} по заданным параметрам нет матчей`
}

const text = (time) => {
  switch (time) {
    case 'next4Hours':
      return 'В ближайшие 4 часа'
    case 'nextDay':
      return 'В ближайший день'
    case 'nextWeek':
      return 'В ближайшую неделю'
  
    default:
      break
  }
}