/**
 * Формат
 * [],[]
 * [],[]
 */
const LAYOUT_CUBE = ({
  top_left,
  top_right,
  bottom_left,
  bottom_right,
}) => {
  return (
    [
      [top_left, top_right],
      [bottom_left, bottom_right]
    ]
  )
}

module.exports = LAYOUT_CUBE