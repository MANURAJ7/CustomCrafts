import { easing } from "maath";
import { useState, useEffect } from "react";
import { useSnapshot } from "valtio";
import { useFrame } from "@react-three/fiber";
import { Decal, useGLTF, useTexture, PivotControls } from "@react-three/drei";
import { useControls } from "leva";
import * as THREE from "three";
import state from "../store";

const getProperties = ({ nodes, materials }) => {
  let color = null,
    material = null,
    geometry = null;
  if (materials) {
    for (let child in materials) {
      if (!material) material = materials[child];
      if (materials[child].hasOwnProperty("color")) {
        color = materials[child].color;
        break;
      }
    }
  }
  if (nodes) {
    for (let child in nodes) {
      if (nodes[child].hasOwnProperty("geometry")) {
        geometry = nodes[child];
        break;
      }
    }
  }
  return { color, material, geometry };
};

const Shirt = ({ modelUrl }) => {
  const { nodes, materials } = useGLTF(modelUrl || "/shirt_baked.glb");

  const [pos, setPos] = useState([0, 0, 0]);
  const [rot, setRot] = useState([0, 0, 0]);
  const [scl, setScl] = useState([1, 1, 1]);
  const [modelScl, setModelScl] = useState([3, 3, 3]);
  const [modelPos, setModelPos] = useState([0, 0, 0]);

  const { debug, scaleX, scaleY, scaleZ } = useControls({
    debug: false,
    scaleX: { value: 0.5, min: 0.1, max: 10, step: 0.1 },
    scaleY: { value: 0.5, min: 0.1, max: 10, step: 0.1 },
    scaleZ: { value: 0.5, min: 0.1, max: 10, step: 0.1 },
  });

  let { color, material, geometry } = getProperties({
    nodes,
    materials,
  });

  useEffect(() => {
    // Calculate the bounding box of the object geometry
    const boundingBox = new THREE.Box3().setFromObject(geometry);
    const center = boundingBox.getCenter(new THREE.Vector3());
    const size = boundingBox.getSize(new THREE.Vector3());

    setPos([center.x, center.y, center.z]);

    // Set the initial position to the center of the screen
    setModelPos([-center.x, -center.y, -center.z]);

    const scaleFactor = 2.5 / Math.max(size.x, size.y, size.z);
    setModelScl([scaleFactor, scaleFactor, scaleFactor]);

    // Set the initial scale relative to the size of the object
    setScl([size.x * 0.2, size.y * 0.2, size.z * 0.2]);
  }, [geometry]);

  const snap = useSnapshot(state);
  const logoTexture = useTexture(snap.logoDecal);
  useFrame((state, delta) => easing.dampC(color, snap.color, 0.25, delta));

  const stateString = JSON.stringify(snap);

  return (
    <group key={stateString}>
      <mesh
        castShadow
        scale={modelScl}
        position={modelPos}
        geometry={geometry?.geometry}
        material={material}
        material-roughness={1}
        material-aoMapIntensity={0.3}
        dispose={null}
      >
        {snap.isLogoTexture && (
          <>
            {snap.isFullTexture ? (
              <PivotControls
                position={pos}
                rotation={rot}
                scale={0.55}
                activeAxes={[true, true, true]}
                onDrag={(local) => {
                  const position = new THREE.Vector3();
                  const scale = new THREE.Vector3();
                  const quaternion = new THREE.Quaternion();
                  local.decompose(position, quaternion, scale);
                  const rotation = new THREE.Euler().setFromQuaternion(
                    quaternion
                  );
                  setPos([position.x, position.y, position.z]);
                  setRot([rotation.x, rotation.y, rotation.z]);
                  setScl([scale.x * 0.6, scale.y * 0.6, scale.z * 0.6]);
                }}
              />
            ) : null}
            <Decal
              debug={debug}
              position={pos} // Keep decal on the object
              rotation={rot}
              scale={[scl[0] * scaleX, scl[1] * scaleY, scl[2] * scaleZ]}
              map={logoTexture}
              depthTest={false}
              depthWrite={true}
            />
          </>
        )}
      </mesh>
    </group>
  );
};

export default Shirt;
