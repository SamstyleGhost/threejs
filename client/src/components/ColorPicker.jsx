import React from 'react';
import { SketchPicker } from 'react-color';
import { useSnapshot } from 'valtio';

import state from '../store';

const ColorPicker = () => {
  console.log("inside color picker component");
  const snap = useSnapshot(state);
  
  return (
    <div className='absolute left-full ml-3'>
    
      <SketchPicker 
        color={snap.color}
        disableAlpha // removes the opacity 
        // presetColors => this field can be added if we want personal preset colors
        onChange={(color) => state.color = color.hex}
      />
    </div>
  )
}

export default ColorPicker