// тут определим время на запрос прематч-матчей
// 1xbet api принимает параметр в минутах (tf=60 (час))
const prematchTime = ({ time }) => {
  switch (time) {
    case 'next4Hours':
      return 'tf=240'
    case 'nextDay':
      return 'tf=1440'
    case 'nextWeek':
      return 'tf=10080'
    default:
      console.error('requestTime: time is incorrect')
      return false
  }
}

module.exports = prematchTime