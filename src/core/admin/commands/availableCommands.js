/**
 * Наследуем от GENERAL
 * Добавляем при необходимости только админам то, что необходимо
 * Для теста добавил две новые команды
 */
const {
  MAKE_AD_POST,
  SEND_AD_POST,
  ADMIN
} = require('../../allCommands')
const COMMANDS_GENERAL = require('../../general/commands/availableCommands')

module.exports = COMMANDS_ADMIN = [
  ...COMMANDS_GENERAL,
  MAKE_AD_POST,
  SEND_AD_POST,
  ADMIN
]