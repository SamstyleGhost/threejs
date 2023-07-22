import React from 'react';
import state from '../store';
import { useSnapshot } from 'valtio';
import { getContrastingColor } from '../config/helpers';

const CustomButton = ({ type, title, customStyles , handleClick }) => {

  const generateStyle = (type) => {

    const snap = useSnapshot(state);

    if(type === 'decal'){
      return {
        backgroundColor: state.color,
        color: getContrastingColor(state.color)
      }
    }
      
  }

  return (
    <button
      className={`px-2 py-1.5 flex-1 rounded-md ${customStyles}`} // Use flex-1 to allow a flex item to grow and shrink as needed, ignoring its initial size, 
      style={generateStyle(type)}
      onClick={handleClick}
      //* Additional info about flex-... :
      //* Use flex-initial to allow a flex item to shrink but not grow, taking into account its initial size
      //* Use flex-auto to allow a flex item to grow and shrink, taking into account its initial size
      //* Use flex-none to prevent a flex item from growing or shrinking:
    >
      {title}
    </button>
  )
}

export default CustomButton