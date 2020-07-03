/**
 * Наследуем от GENERAL
 * Добавляем при необходимости только юзерам то, что необходимо
 */
const COMMANDS_GENERAL = require('../../general/commands/availableCommands')

module.exports = COMMANDS_USER = [
  ...COMMANDS_GENERAL
]