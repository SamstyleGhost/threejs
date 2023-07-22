import React, { useRef } from 'react';
import { useFrame  } from '@react-three/fiber';
import { easing  } from 'maath';

import { useSnapshot  } from 'valtio';
import state from '../store';


const CameraRig = ({ children }) => { // children is added because the cameraRig contains Shirt element inside 

  const group = useRef(); // used to refernce the camera and to update the reference state, we pass it inside the group tag below
  const snap = useSnapshot(state);
 
  useFrame((state, delta) => { // delta is the difference between current and previous frame

    const isBreakpoint = window.innerWidth <= 1260; // Doing this so that the shirt looks good on all screens
    const isMobile = window.innerWidth <= 600;

    // Setting the initial position of the model
    let targetPosition = [-0.4,0,2];
    if(snap.intro) {
      if(isBreakpoint) targetPosition = [0,0,2];
      if(isMobile) targetPosition = [0,0.2,2.5];
    } else {
      if(isMobile) targetPosition = [0,0,2.5];
      else targetPosition = [0,0,2];
    }

    // set model camera position
    easing.damp3(state.camera.position, targetPosition, 0.25, delta)

    // Setting model rotation
    easing.dampE(
      group.current.rotation,
      [state.pointer.y / 10, -state.pointer.x / 5, 0],
      0.25,
      delta
    )
  }) // This hook lets you render on every frame

  return (
    <group ref={group}>{children}</group>
  )
}

export default CameraRig