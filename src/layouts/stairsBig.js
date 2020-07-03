/**
 * Формат
 * [      ]
 * [ ], [ ]
 * [],[],[]
 */
const LAYOUT_STAIRS_BIG = ({
  top,
  middle_left,
  middle_right,
  bottom_left,
  bottom_middle,
  bottom_right,
}) => {
  return (
    [
      [top],
      [middle_left, middle_right],
      [bottom_left, bottom_middle, bottom_right],
    ]
  )
}

module.exports = LAYOUT_STAIRS_BIG