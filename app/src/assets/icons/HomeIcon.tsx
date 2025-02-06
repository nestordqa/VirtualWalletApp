import * as React from "react"
import Svg, { Path } from "react-native-svg"
import { IconProps } from "../../types/components"

function HomeIcon({width, height, color, ...otherProps}: IconProps) {
  return (
    <Svg
      width={width || 33}
      height={height || 32}
      viewBox="0 0 33 32"
      fill="none"
      {...otherProps}
    >
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M18.58 4.592a3.009 3.009 0 00-3.581 0L7.34 10.265a3.008 3.008 0 00-1.218 2.417V23.98a3.009 3.009 0 003.009 3.009h15.316a3.009 3.009 0 003.008-3.01V12.683c0-.953-.451-1.85-1.217-2.417L18.58 4.592zm2.86 20.754h3.008c.755 0 1.367-.612 1.367-1.367V12.682c0-.433-.205-.84-.553-1.099l-7.658-5.672a1.368 1.368 0 00-1.628 0l-7.658 5.672a1.368 1.368 0 00-.554 1.1v11.296c0 .755.612 1.367 1.368 1.367h3.008V18.51a2.461 2.461 0 012.462-2.462h4.376a2.462 2.462 0 012.461 2.462v6.837zm-7.659 0h6.017V18.51a.82.82 0 00-.82-.82h-4.376a.82.82 0 00-.82.82v6.837z"
        fill='#000'
      />
    </Svg>
  )
}

export default HomeIcon