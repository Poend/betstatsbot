/**
 * Формат
 * [],[],[]
 * [      ]
 *   ...
 * [      ]
 * [ ] ,[ ]
 */
const LAYOUT_TRIPLE_LIST= ({
  list_items,
  bottom_left,
  bottom_right,
}) => {
  return (
    [
      [list_items.top_left, list_items.top_middle, list_items.top_right],
      ...list_items.list,
      [bottom_left, bottom_right]
    ]
  )
}

module.exports = LAYOUT_TRIPLE_LIST