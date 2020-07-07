// сделаем функцию, чтобы при передача time, сгенерить сообщение формата:
// "Все доступные матчи В СЛЕДУЮЩИЕ 4 ЧАСА || В СЛЕДУЮЩУЮ НЕДЕЛЮ "
module.exports = ({time}) => {
  return `Все доступные матчи ${text(time)}:`
}

const text = (time) => {
  switch (time) {
    case 'next4Hours':
      return 'в ближайшие 4 часа'
    case 'nextDay':
      return 'в ближайший день'
    case 'nextWeek':
      return 'в ближайшую неделю'
  
    default:
      break
  }
}