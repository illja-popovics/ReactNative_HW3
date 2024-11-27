import * as React from "react"
import Svg, { Circle, Path } from "react-native-svg"
const AddPhotoComponent = (props) => (
  <Svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none">
    <Circle cx={119.5} cy={93.5} r={12} fill="#fff" stroke="#FF6C00" />
    <Path
      fill="#FF6C00"
      fillRule="evenodd"
      d="M120 87h-1v6h-6v1h6v6h1v-6h6v-1h-6v-6Z"
      clipRule="evenodd"
    />
  </Svg>
)
export default AddPhotoComponent
