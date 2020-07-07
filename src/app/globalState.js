const cloneDeep = require('lodash.clonedeep')
// импорт initialState (первоначального состояния приложения)
const initialState = require('./initialState')
/**
 * Делаем методы для изменения GlobalState
 * Для каждого чат айди будет создано свое состояние и оно будет сохраняться на протяжении работы бота
 * Примерный формат:
 * globalState: {
 *  440599639(chat_id): {
 *    currentPage: '',
 *    matches:
 *  },
 *  375053622(chat_id): {
 *   currentPage: '',
 *   matches:
 *  }
 * }
 */
class GlobalState {

  // изменяем определенный параметр глобального стейта
  setState = ({
    // айди чата
    chat_id,
    // актуальный глобальный стейт
    globalState,
    // значение параметра
    value,
    // параметр для изменения
    param
    }) => {
      return {
        // изменение состояния рутового (currentPage к примеру)
        root(){
          globalState[chat_id][param] = value
        },
        // изменение состояния матчей 
        matches(){
          globalState[chat_id].matches[param] = value
        },
        // изменение состояния событий
        events(){
          globalState[chat_id].events[param] = value
        },
        // изменение состояния ставки
        bet(){
          globalState[chat_id].bet[param] = value
        },
        // изменение состояния рекламного поста 
        ad(){
          globalState[chat_id].ad[param] = value
        }
      }
  }

  // резетим глобальное состояние до первоначального
  reset = ({chat_id, globalState}) => {
    console.log('root?')
    globalState[chat_id] = cloneDeep(initialState)

  } 
}

module.exports = new GlobalState