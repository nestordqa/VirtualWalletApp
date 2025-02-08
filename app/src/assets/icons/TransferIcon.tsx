import * as React from "react"
import Svg, { Path } from "react-native-svg"
import { IconProps } from "../../types/components"
import colors from "../../config/colors"

function TransferIcon({width, height, color, ...otherProps}: IconProps) {
  return (
    <Svg
        width={width || 40}
        height={height || 40}
        viewBox="0 0 25 25"
        fill="none"
        {...otherProps}
    >
      <Path
        d="M19.5 16.5H6m-.5-8H19M16 13l3.5 3.5L16 20m-7-8L5.5 8.5 9 5"
        stroke={colors.white}
        strokeWidth={1.2}
      />
    </Svg>
  )
}

export default TransferIcon
