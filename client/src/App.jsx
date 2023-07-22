import React from "react";
import Customizer from './pages/Customizer';
import Canvas from './canvas';
import Home from './pages/Home';

const App = () => {
  return (
    <main className="app transition- all ease-in">
      <Home /> 
      <Canvas />
      <Customizer />  
    </main>
  )
}

export default App
