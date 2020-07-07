// определяем состояние приложения,
// относительного которого будем выстраивать логику перехода по меню
// Сначала определяем первоначальное состояние - initialState
module.exports = {
  currentPage: 'PAGE_MAIN', // страница, на которой находимся. Отсюда танцуем при нажатии на кнопку НАЗАД
  matches: { // состояние матчей
    status: false, // взаимодействуем ли мы сейчас со ставками (выбор матчей или ставка на событие)
    matchesType: '', // тип матча (личиня или лайв)
    matchesTypeTime: '', // время для матчей в линию (за следующие 4 часа, к примеру)
    matchesList: [] // список матчей
  },
  events: { // состояние событий
    status: false, // взаимодействуем ли мы сейчас с событиями
    currentMatch: {}, // выбранный матч
    eventsList: [] // список событий
  },
  bet: { // состояние ставки
    status: false, // делаем ли мы сейчас ставку
    currentEvent: {}, // событие, на которое делаем ставку
  },
  ad: { // состояние рекламного поста
    status: false, // делаем ли рекламный пост сейчас
    messageID: ''  // текст рекламного поста
  }
}