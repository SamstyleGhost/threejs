import React, { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useSnapshot } from 'valtio';
import config from '../config/config';
import state from '../store';
import { download, logoShirt } from '../assets';
import { downloadCanvasToImage, reader } from '../config/helpers';
import { EditorTabs, FilterTabs, DecalTypes } from '../config/constants';
import { fadeAnimation, slideAnimation } from '../config/motion';
import { AIPicker, ColorPicker, CustomButton, FilePicker, Tab } from '../components';

const Customizer = () => {
  
  const snap = useSnapshot(state);

  const [file, setFile] = useState('');
  const [prompt, setPrompt] = useState("");
  const [generatingImg , setGeneratingImg ] = useState(false);
  const [activeEditorTab, setActiveEditorTab] = useState("");
  const [activeFilterTab, setActiveFilterTab] = useState({
    logoShirt: true,
    stylishShirt: false,
  })

  // show tab content depending on the active tab
  const generateTabContent = () => {

    console.log(activeEditorTab);
    switch (activeEditorTab) {
      case "colorpicker":
        return <ColorPicker />  
      case "filepicker":
        return <FilePicker 
          file={file}
          setFile={setFile}
          readFile={readFile}
        />
      case "aipicker":
        return <AIPicker 
          prompt={prompt}
          setPrompt={setPrompt}
          generatingImg={generatingImg}
          handleSubmit={handleSubmit}
        />   
      default:
        return null;
    }
  }

  const handleSubmit = async (type) => {
    if(!prompt) return alert("Please enter a prompt");
    try {
      // calling the backend to generate an AI Image
    } catch (error) {
      alert(error);
    } finally {
      setGeneratingImg(false);
      setActiveEditorTab("");
    }
  }

  const handleActiveFilterTab = (tabName) => {
    switch (tabName) {
      case "logoShirt":
        state.isLogoTexture = !activeFilterTab[tabName];
        break;
      case "stylishShirt":
        state.isFullTexture = !activeFilterTab[tabName];
        break;
      default:
        state.isFullTexture = false;
        state.isLogoTexture = true;
        break;
    }

    // after setting state, we need to update the activeFilterTab
    setActiveFilterTab((prevState) => {
      return {
        ...prevState,
        [tabName] : !prevState[tabName]
      }
    })
  }

  const handleDecals = (type, result) => {
    const decalType = DecalTypes[type];

    state[decalType.stateProperty] = result;

    if(!activeFilterTab[decalType.filterTab]){
      handleActiveFilterTab(decalType.filterTab);
    }
  }
  
  const readFile = (type) => {
    reader(file)
      .then((result) => {
        handleDecals(type, result);
        setActiveEditorTab("");
      })
  }


  return (
    <AnimatePresence> 
    {/* Wrapping everything in the AnimatePresence so that motions would be allowed */}
      {!snap.intro && (
        <>
          {/* //* The below code is for the tabs on the left of the screen */}
          <motion.div
            key="custom"
            className='absolute top-0 left-0 z-10'
            {...slideAnimation('left')}
          >
            <div className='flex items-center min-h-screen'>
              <div className='editortabs-container tabs'>
              {EditorTabs.map((tab) =>(
                <Tab 
                  key={tab.name}
                  tab={tab}
                  handleClick={() => setActiveEditorTab(tab.name)}
                />
              ))}     
              {generateTabContent()} 
              </div>
            </div>
          </motion.div> 
          {/* //* The below code is for the go back button*/}      
          <motion.div
            className='absolute z-10 top-5 right-5'
            {...fadeAnimation}
          >
            <CustomButton 
              title="Go Back"
              handleClick={() => {state.intro = true}}
              customStyles="w-fit px-4 py-2.5 font-bold text-sm bg-black text-white border-solid border-black border-2 transition duration-150 hover:bg-inherit hover:text-black drop-shadow-lg"
            />
          </motion.div>
          { /* //* The below code is for the bottom bar which contains decal and logo turn on/off and download buttons */}
          <motion.div
            className="filtertabs-container "
            {...slideAnimation('up')}
          >
              {FilterTabs.map((tab) =>(
                <Tab 
                  key={tab.name}
                  tab={tab}
                  isFilterTab
                  isActive={activeFilterTab[tab.name]}
                  handleClick={() => handleActiveFilterTab(tab.name)}
                />
              ))}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

export default Customizer