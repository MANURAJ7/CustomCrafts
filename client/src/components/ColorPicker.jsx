import { SketchPicker } from "react-color";
import { useSnapshot } from "valtio";
import state from "../store";

//changing state.color
const ColorPicker = () => {
  const snap = useSnapshot(state);

  return (
    <div className="absolute left-full ml-3">
      {/* Disable alpha to remove opacity editing option. */}
      <SketchPicker
        color={snap.color}
        disableAlpha
        onChange={(color) => (state.color = color.hex)}
      />
    </div>
  );
};
export default ColorPicker;
