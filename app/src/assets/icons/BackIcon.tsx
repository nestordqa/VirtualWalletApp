import * as React from "react";
import Svg, { Path } from "react-native-svg";
import { IconProps } from "../../types/components";

function BackArrowIcon({ color, width, height, ...otherProps }: IconProps) {
  return (
    <Svg width={19} height={17} viewBox="0 0 19 17" fill="none" {...otherProps}>
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M9.077 16.67a.833.833 0 000-1.18L3.034 9.45h14.985a.834.834 0 100-1.666H3.034l6.043-6.04A.833.833 0 107.897.565L.43 8.028a.833.833 0 000 1.179l7.467 7.462a.834.834 0 001.18 0z"
        fill={color || "#151515"}
        {...otherProps}
      />
    </Svg>
  );
}

export default BackArrowIcon;
