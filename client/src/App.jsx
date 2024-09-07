// import Canvas from "./Canvas";
// import Customizer from "./pages/Customizer";
// import Home from "./pages/Home";
// import { useState } from "react";

// const App = () => {
//   const [modelUrl, setModelUrl] = useState("");
//   return (
//     <main className="app transition-all ease-in">
//       <Home setModelUrl={setModelUrl} />
//       <Customizer />
//       <Canvas modelUrl={modelUrl} />
//     </main>
//   );
// };

// export default App;
// // This Canvas component contains canvas, which sets up the scene and camera, its dimentions are respective to its parent
import React from "react";
import { useSnapshot } from "valtio";
import state from "./store"; // Import your Valtio store
import { useState } from "react";

import Canvas from "./Canvas";
import Customizer from "./pages/Customizer";
import Home from "./pages/Home";

const lightenColor = (color, percent) => {
  let r = 0,
    g = 0,
    b = 0;

  // Check if color is a hex code
  if (color.startsWith("#")) {
    if (color.length === 4) {
      r = parseInt(color[1] + color[1], 16);
      g = parseInt(color[2] + color[2], 16);
      b = parseInt(color[3] + color[3], 16);
    } else if (color.length === 7) {
      r = parseInt(color[1] + color[2], 16);
      g = parseInt(color[3] + color[4], 16);
      b = parseInt(color[5] + color[6], 16);
    }
  }

  // Blend with white (adjust this percentage to control lightness)
  const blendFactor = 0.425; // Adjust this factor to make the color lighter or darker
  r = Math.min(255, Math.floor(r + (255 - r) * blendFactor));
  g = Math.min(255, Math.floor(g + (255 - g) * blendFactor));
  b = Math.min(255, Math.floor(b + (255 - b) * blendFactor));

  // Return the lightened color as hex
  return `#${((1 << 24) | (r << 16) | (g << 8) | b).toString(16).slice(1)}`;
};

const App = () => {
  const snap = useSnapshot(state); // Get the current snapshot of the state
  const [modelUrl, setModelUrl] = useState("");

  // Use a default color if snap.color is not available
  const backgroundColor = snap.color
    ? lightenColor(snap.color, 0.4)
    : "#FFFFFF";

  return (
    <main
      className="app transition-all ease-in"
      style={{
        backgroundColor: backgroundColor,
        minHeight: "100vh",
        width: "100vw",
      }}
    >
      <Home setModelUrl={(url) => setModelUrl(url)} />
      <Customizer />
      <Canvas modelUrl={modelUrl} />
    </main>
  );
};

export default App;
