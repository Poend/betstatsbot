/**
 * Формат
 * [   ]
 *  ...
 * [   ]
 * [],[]
 */
const LAYOUT_LIST = ({
  list_items,
  bottom_left,
  bottom_right,
}) => {
  return (
    [
      ...list_items,
      [bottom_left, bottom_right]
    ]
  )
}

module.exports = LAYOUT_LIST