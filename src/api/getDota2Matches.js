// тут пихнем в функцию ответ на запрос к 1х апи
// и вернем только ДОКА-2 матчи через парсинг строки
const getDota2Matches = ({ allMatches }) => {
  return allMatches.filter(el => {
    // С = 1хбет апи чемпионат с категорией игры
    // PS уберем короче "матчи" на голосование за аркану
    if(el.C.toLowerCase().match(/dota 2/) && !el.C.toLowerCase().match(/arcana/)){
      return el
    }
  })
}

module.exports = getDota2Matches