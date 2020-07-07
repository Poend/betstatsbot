// импортим функцию получения матчей
const getGames = require('./getGames')
// импортнем массив с событиями
const events = require('./events')
// импортнем лэйауты для клавы
const {
  LAYOUT_LIST,
  LAYOUT_DOUBLE_LIST,
  LAYOUT_TRIPLE_LIST,
} = require('../layouts')
// просто будем писать методы класса АПИ (для удобства) и использовать их в дальнейшем
class Api {

  // просто вызываем все матчи из лайва
  getLiveGames = async () => {
    return await getGames({ type: 'live' })
  }

  // вызываем игры в линии (типа api.getLineGames().next4hours().then(res => RESULTAT))
  getLineGames = () => {
    return {
      async nextFourHours() {
        return await getGames({ type: 'line', time: 'next4Hours' })
      },
      async nextDay() {
        return await getGames({ type: 'line', time: 'nextDay' })
      },
      async nextWeek() {
        return await getGames({ type: 'line', time: 'nextWeek' })
      }
    }
  }

  // запрос на игру по айди
  getGameById = async ({
    // отправляем тип матча
    type,
    // отправляем время (если необходимо - при прематче)
    time,
    // отправляем айди игры
    gameid
  }) => {
    return await getGames({ type, time })
      .then(allDota2games => {
        // 1хбет передает все матчи, потом фильтруем по гейм айди в попытках найти необходимый
        const currentGame = allDota2games.filter(el => el.I === gameid)
        // если нашли ОДИН матч
        if (currentGame.length === 1) {
          return {
            status: true,
            game: currentGame[0]
          }
        } else {
          // если нашли несколько таких матчей или ниодного
          console.error('ERROR: getGameById: get multiple games by gameid or game is undefined', currentGame)
          return {
            status: false
          }
        }
      })
  }

  getEventsByGameId = async ({
    // глобальный стейт юзера
    userGlobalState,
    // данные сообщения
    msg,
  }) => {
    return this.getGameById({
      // получаем тип матчей из глобального стейта
      type: userGlobalState.matches.matchesType,
      // получаем время (для прематча) из глобального стейта
      time: userGlobalState.matches.matchesTypeTime,
      // формируем гейм айди по тексту
      gameid: this.gameIdByText({
        msg,
        matchesList: userGlobalState.matches.matchesList
      }).gameid
    })
      .then(gameData => {
        if (gameData.status) {
          if (this.filterUnblockedEvents({ gameEvents: gameData.game.EE }).length > 0) {
            return {
              currentMatch: gameData.game,
              events: this.eventsButtonsList({ eventsList: gameData.game.EE }),
              status: true
            }
          } else {
            return {
              status: false,
              message: 'Все события заблокированы'
            }
          }
        } else {
          console.error('ERROR: getEventsByGameId: cant get game by gameid', gameData)
          return {
            status: false,
            message: 'Матч не найден'
          }
        }
      })
  }

  // сделаем кнопку из матча (полученного объекта)
  gameToButton = ({ game }) => {
    return {
      game,
      buttonText: `${game.A} - ${game.H}\n${game.NP ? game.NP : 'Матч'}`
    }
  }

  // получаем айди матча по тексту в баттоне
  gameIdByText = ({
    // получаем сообщение
    msg,
    // получаем массив матчей
    matchesList
  }) => {
    // попробуем фильтрануть массив матчей с полученным в сообщении текстом
    const currentMatch = matchesList.filter(el => {
      return el.buttonText === msg.text
    })
    // если матч найден и он один, отдаем его айди
    if (currentMatch.length === 1) {
      return {
        status: true,
        gameid: currentMatch[0].game.I
      }
    } else {
      // если нет, то пишем ФОЛС
      console.error('ERROR: gameByText: cannot find match by msg.text or multiple array-list', currentMatch)
      return {
        status: false
      }
    }
  }

  // сразу тут сформируем список ивентов
  eventsButtonsList = ({ eventsList }) => {
    /**
     * 1) Фильтруем по незаблокированным
     * 2) формируем массив, используя метод превращения события в кнопку
     */
    return this.filterUnblockedEvents({ gameEvents: eventsList }).map(el => this.eventToButton({ event: el }))
  }

  eventToButton = ({ event }) => {
    return {
      event,
      buttonText: `${this.eventNameByEventID({ id: event.T })}: ${event.C}`
    }
  }

  eventNameByEventID = ({ id }) => {
    return events.filter(event => event.id === id)[0].value
  }

  filterUnblockedEvents = ({ gameEvents }) => {
    return gameEvents.filter(el => !el.B)
  }

  // получаем уже незаблокированные события
  layoutTypeByUnblockedEvents = ({ gameEvents }) => {
    // сделаем массив из основных событий (П1, Х, П2) под айди 1,2,3
    const mainEventsCount = gameEvents.filter(el => {
      return el.event.T === 1 || el.event.T === 2 || el.event.T === 3
    }).length
    // на его основе вернем тот или иной лэйаут
    switch (mainEventsCount) {
      case 1:
        return {
          layout: LAYOUT_LIST,
          layoutType: 'LAYOUT_LIST',
          status: true
        }
      case 2:
        return {
          layout: LAYOUT_DOUBLE_LIST,
          layoutType: 'LAYOUT_DOUBLE_LIST',
          status: true
        }
      case 3:
        return {
          layout: LAYOUT_TRIPLE_LIST,
          layoutType: 'LAYOUT_TRIPLE_LIST',
          status: true
        }

      default:
        console.error('ERROR: layoutTypeByUnblockedEvents: mainEventsCount is undefined || 0 || > 3')
        return {
          layout: LAYOUT_LIST,
          layoutType: 'LAYOUT_LIST',
          status: true
        }
    }
  }

}

module.exports = new Api