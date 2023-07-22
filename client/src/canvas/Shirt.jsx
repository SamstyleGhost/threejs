import React from 'react';
import { easing } from 'maath';
import { useSnapshot } from 'valtio';
import { useFrame } from '@react-three/fiber';
import { Decal, useGLTF, useTexture } from '@react-three/drei';
import state from '../store';


const Shirt = () => {

  const snap = useSnapshot(state);
  const { nodes, materials } = useGLTF('/shirt_baked.glb');

  const logoTexture = useTexture(snap.logoDecal);
  const fullTexture = useTexture(snap.fullDecal);

  useFrame((state, delta) => easing.dampC(materials.lambert1.color, snap.color, 0.25, delta)); // Ensuring that the color change happens smoothly

  const stateString = JSON.stringify(state); // to make sure that the shirt updates properly every time

  return (
    <group key={stateString}>
      <mesh
        castShadow
        geometry={nodes.T_Shirt_male.geometry}
        material={materials.lambert1}
        material-roughness={1}
        dispose={null}
      >
      {/* the below code is for the texture decal on the shirt */}
        {snap.isFullTexture && (
          <Decal 
            position={[0,0,0]}
            rotation={[0,0,0]}
            scale={1}
            map={fullTexture}
          />
        )}

      {/* the below code is for the logo decal on the shirt */}
      {snap.isLogoTexture && (
          <Decal 
            position={[0,0.04,0.15]} // Trial and error nums
            rotation={[0,0,0]}
            scale={0.15}
            map={logoTexture}
            // map-anisotropy={16} // changing the quality of the shirt
            depthTest={false} // ensuring that the texture always shows up only on the shirt
            depthWrite={true} 
          />
        )}
      </mesh>
    </group>
  )
}

export default Shirt