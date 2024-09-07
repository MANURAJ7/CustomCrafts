import { Canvas } from "@react-three/fiber";
import { Environment, OrbitControls } from "@react-three/drei";

import Shirt from "./Shirt";

const CanvasModel = ({ modelUrl }) => {
  return (
    <Canvas
      shadows
      orthographic
      camera={{ position: [0, 10, 100], zoom: 150 }}
      // gl={{ preserveDrawingBuffer: true }}
      className="w-full max-w-full h-full transition-all ease-in"
    >
      <ambientLight intensity={0.35} />
      <Environment preset="city" />
      <OrbitControls makeDefault />
      <Shirt modelUrl={modelUrl} />
    </Canvas>
  );
};

export default CanvasModel;
