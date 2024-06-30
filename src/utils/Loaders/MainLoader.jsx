
import { ColorRing } from "react-loader-spinner";

const MainLoader = () => {
  return (
    <div className="loader"> {/* Ensure .loader class is defined in your CSS */}
      <ColorRing
        visible={true}
        height="100" // Adjusted to a string "100"
        width="100" // Adjusted to a string "100"
        ariaLabel="color-ring-loading"
        wrapperStyle={{}} // Adjusted to an empty object if no specific style is needed
        wrapperClassName="color-ring-wrapper" // Adjusted to wrapperClassName
        colors={["#685DD8", "#8277F2", "#9289F3", "#9C94F4", "#9C94F4"]}
      />
    </div>
  );
};

export default MainLoader;
