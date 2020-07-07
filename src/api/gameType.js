// тут определим тип вызываемых игр (прематч или лайв)
const gamesType = ({type}) => {
  switch (type) {
    case 'line':
      return 'PartLine'
    case 'live':
      return 'PartLive'
    default:
      console.error('gameType: matches type is incorrect')
      return 'PartLive'
  }
}

module.exports = gamesType