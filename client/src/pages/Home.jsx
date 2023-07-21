import React from 'react';
import { motion, AnimatePresence } from 'framer-motion'; // gonna use this to apply some animations 
import { useSnapshot } from 'valtio';

import { headContainerAnimation, headContentAnimation, headTextAnimation, slideAnimation } from '../config/motion'

import state from '../store';
import { CustomButton } from '../components';

const Home = () => {

  const snap = useSnapshot(state);

  return (
    <AnimatePresence>
      {snap.intro && ( // Checking to see whether we are on the homepage in order to display homepage data
        <motion.section className='home' {...slideAnimation('left')}> {/* its gonna slide from the left */} 
          <motion.header {...slideAnimation('down')}> {/* its gonna slide from the top, in combination with the above motion.section animation, it will slide in from the top left */}
            <img
            src='./threejslogo.svg'
            alt='logo'
            className='w-8 h-8 object-contain'
            />
          </motion.header>

          <motion.div className='home-content' {...headContainerAnimation}>
            <motion.div {...headTextAnimation}>
              <h1 className='head-text'>
                LET's <br className='xl:block hidden'/> {/* Break tag only on large devices */} DO IT.
              </h1>
            </motion.div>
            <motion.div {...headContentAnimation} className='flex flex-col gap-8'>
              <p className='max-w-md font-normal text-gray-700 text-base drop-shadow-md'> {/* text-base is used for line-height */}
                Create your unique and exclusive shirt with our brand-new 3D customization tool.
                <strong> Unleash Your Imagination</strong> and define your own style.
              </p>
              <CustomButton 
                type='filled'
                title='Customize your shirt'
                customStyles='w-fit px-4 py-2.5 font-bold text-sm bg-black text-white border-solid border-black border-2 transition duration-150 hover:bg-inherit hover:text-black animate-bounce'
                handleClick={() => state.intro = false} // this is a callback function to tell react that we are no longer on the homepage by changing the state in valtio                
              />
            </motion.div>
          </motion.div>
        </motion.section>
      )}
    </AnimatePresence>
  )
}

export default Home