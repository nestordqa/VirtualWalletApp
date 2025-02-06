import * as React from "react"
import Svg, { Path } from "react-native-svg"
import { IconProps } from "../../types/components"
import colors from "../../config/colors"

function WalletIcon({width, height, color, ...otherProps}: IconProps) {
  return (
    <Svg
        width={width || 33}
        height={height || 32}
        viewBox="0 0 24 24"
        fill="none"
        {...otherProps}
    >
      <Path
        d="M12 14H8m13-2v-.8c0-1.12 0-1.68-.218-2.108a2 2 0 00-.874-.874C19.48 8 18.92 8 17.8 8H3m18 4v4m0-4h-2a2 2 0 100 4h2m0 0v.8c0 1.12 0 1.68-.218 2.108a2 2 0 01-.874.874C19.48 20 18.92 20 17.8 20H6.2c-1.12 0-1.68 0-2.108-.218a2 2 0 01-.874-.874C3 18.48 3 17.92 3 16.8V8m15 0v-.8c0-1.12 0-1.68-.218-2.108a2 2 0 00-.874-.874C16.48 4 15.92 4 14.8 4H6.2c-1.12 0-1.68 0-2.108.218a2 2 0 00-.874.874C3 5.52 3 6.08 3 7.2V8"
        stroke={colors.darkGrey60}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  )
}

export default WalletIcon
