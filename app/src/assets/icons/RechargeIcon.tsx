import * as React from "react"
import Svg, { Path } from "react-native-svg"
import { IconProps } from "../../types/components"
import colors from "../../config/colors"

function RechargeIcon({ color, width, height, ...otherProps }: IconProps) {
  return (
    <Svg
        width={width || 35} 
        height={height || 35}
        viewBox="0 0 24 24"
        fill="none"
        {...otherProps}
    >
      <Path
        d="M12 3v6m0-6L9.5 5.5M12 3l2.5 2.5M5.823 9A2 2 0 113 11.823M5.823 9H8M5.823 9c-.874.003-1.354.026-1.731.218a2 2 0 00-.874.874c-.192.377-.215.856-.218 1.731m0 0V18.177m0 0A2 2 0 115.823 21M3 18.177c.003.875.026 1.354.218 1.731a2 2 0 00.874.874c.377.192.857.215 1.731.218m0 0H18.177M21 18.177A2 2 0 1018.177 21M21 18.177V12.2v-.377m0 6.354c-.003.875-.026 1.354-.218 1.731a2 2 0 01-.874.874c-.377.192-.857.215-1.731.218M21 11.823A2 2 0 1118.177 9M21 11.823c-.003-.875-.026-1.354-.218-1.731a2 2 0 00-.874-.874c-.377-.192-.857-.215-1.731-.218m0 0H16m-2 6a2 2 0 11-4 0 2 2 0 014 0z"
        stroke={colors.darkGrey60}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  )
}

export default RechargeIcon
