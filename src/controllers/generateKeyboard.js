const generateKeyboard = ({
  layout,
  positionsAndButtons
}) => {
  return {
    reply_markup: JSON.stringify({
      keyboard: layout({
        ...positionsAndButtons
      })
    })
  }
}

module.exports = generateKeyboard