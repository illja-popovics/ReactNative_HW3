import React from "react";
import Svg, { Path } from "react-native-svg";
import { TouchableOpacity } from "react-native";

const BackButtonComponent = ({
  onPress = () => {},
  color = "#000",
  ...props
}) => (
  <TouchableOpacity onPress={onPress}>
    <Svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width={40}
      height={40}
      fill="none">
      <Path
        stroke="#212121"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeOpacity={0.8}
        d="M20 12H4M10 18l-6-6 6-6"
      />
    </Svg>
  </TouchableOpacity>
);

export default BackButtonComponent;
