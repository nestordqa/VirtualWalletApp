import * as React from "react"
import Svg, { Path } from "react-native-svg"
import { IconProps } from "../../types/components"
import colors from "../../config/colors"

function HistoryIcon({width, height, color, ...otherProps}: IconProps) {
  return (
    <Svg
      width={width ?? 25}
      height={width ?? 25}
      viewBox="0 0 24 24"
      fill="none"
    >
      <Path
        d="M12 8v4l2.5 2.5"
        stroke={color ?? colors.white}
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M5.604 5.604l-.53-.53.53.53zM4.338 6.871l-.75.003a.75.75 0 00.746.747l.004-.75zm2.542.762a.75.75 0 10.007-1.5l-.007 1.5zM5.075 4.321a.75.75 0 00-1.5.008l1.5-.008zM3.75 12a.75.75 0 00-1.5 0h1.5zm13.125 8.445a.75.75 0 10-.75-1.298l.75 1.298zm2.272-4.32a.75.75 0 101.298.75l-1.298-.75zM5.14 5.07a.75.75 0 101.056 1.066L5.14 5.071zm13.722.067c-3.82-3.82-9.993-3.859-13.788-.064l1.06 1.06c3.2-3.199 8.423-3.18 11.668.065l1.06-1.061zM5.074 5.074L3.808 6.34l1.06 1.06 1.267-1.265-1.061-1.061zm-.74 2.547l2.546.012.007-1.5-2.545-.012-.008 1.5zm.754-.754L5.075 4.32l-1.5.008.013 2.545 1.5-.007zM12 3.75A8.25 8.25 0 0120.25 12h1.5c0-5.385-4.365-9.75-9.75-9.75v1.5zm0 16.5A8.25 8.25 0 013.75 12h-1.5c0 5.385 4.365 9.75 9.75 9.75v-1.5zm4.125-1.103A8.209 8.209 0 0112 20.25v1.5c1.775 0 3.44-.475 4.875-1.305l-.75-1.298zM20.25 12a8.209 8.209 0 01-1.103 4.125l1.298.75A9.708 9.708 0 0021.75 12h-1.5zM6.196 6.137A8.221 8.221 0 0112 3.75v-1.5a9.721 9.721 0 00-6.86 2.821l1.056 1.066z"
        fill={color ?? colors.white}
      />
    </Svg>
  )
}

export default HistoryIcon
