/**
 * Формат
 * [   ]
 * [],[]
 */
const LAYOUT_STAIRS_SMALL = ({
  top,
  bottom_left,
  bottom_right,
}) => {
  return (
    [
      [top],
      [bottom_left, bottom_right],
    ]
  )
}

module.exports = LAYOUT_STAIRS_SMALL