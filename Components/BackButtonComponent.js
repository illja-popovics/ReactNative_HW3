import React from "react";
import Svg, { Path } from "react-native-svg"; // Importing the Svg and Path components for rendering custom vector graphics.
import { TouchableOpacity } from "react-native"; // Importing TouchableOpacity for making the button interactive.

const BackButtonComponent = ({
  onPress = () => {}, // Callback function triggered when the button is pressed. Defaults to an empty function if not provided.
  color = "#000", // Optional color prop for customization. Defaults to black.
  ...props // Collects any additional props passed to the component.
}) => (
  // TouchableOpacity wraps the SVG icon to make it a clickable/interactive element.
  <TouchableOpacity onPress={onPress}>
    <Svg
      {...props} // Passes down any additional props to the Svg component for further customization.
      xmlns="http://www.w3.org/2000/svg" // Specifies the namespace for the SVG.
      width={40} // Sets the width of the SVG to 40.
      height={40} // Sets the height of the SVG to 40.
      fill="none" // Ensures no fill color for the SVG by default.
    >
      {/* Path defines the shape of the back arrow icon. */}
      <Path
        stroke="#212121" // Specifies the stroke color for the path (dark gray).
        strokeLinecap="round" // Sets the line cap to "round" for smoother arrow edges.
        strokeLinejoin="round" // Sets the line join to "round" for smoother connections.
        strokeOpacity={0.8} // Adds transparency to the stroke.
        d="M20 12H4M10 18l-6-6 6-6" // SVG path data defining a horizontal line and an arrow shape.
      />
    </Svg>
  </TouchableOpacity>
);

// Exporting the BackButtonComponent to be used in other parts of the application.
export default BackButtonComponent;