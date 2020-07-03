// импортим всех юзеров
const mockData = require('../../mockData')
// получаем роль юзера по чат айди
const getUserRoleByMsg = ({msg}) => {
  if(mockData.filter(el => el.chat_id === msg.chat.id).length > 0 ){
    return {
      status: true,
      role: mockData.filter(el => el.chat_id === msg.chat.id)[0].role
    }
  } else {
    console.error('ERROR: getUserRoleByMsg: cannot find user role by chat_id')
    return {status: false}
  }
}

module.exports = getUserRoleByMsg