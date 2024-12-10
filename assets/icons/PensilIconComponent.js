import Svg, { Path } from "react-native-svg";

const PencilIconComponent = (props) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    viewBox="0 0 24 24"
    fill="none"
    {...props}
  >
    <Path
      d="M2.25 17.998v3.747h3.747l11.014-11.015-3.747-3.747L2.25 17.998zm14.041-8.294l1.754-1.754c.585-.586.585-1.535 0-2.121l-1.63-1.63a1.5 1.5 0 0 0-2.122 0l-1.754 1.754 3.747 3.747z"
      fill="#000"
    />
  </Svg>
);

export default PencilIconComponent;
