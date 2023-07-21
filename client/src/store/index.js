// You can think of this as React context, meaning whatever you define in the state field, you can use in the entire application

import { proxy } from "valtio";

const state = proxy ({
    intro: 'true', // whether we are on the homepage or not
    color: '#efbd48', // default color
    isLogoTexture: true, // are we displaying a logo on our shirt
    isFullTexture: false, // are we displaying a full texture on our shirt
    logoDecal: './threejs.png', // Initial logo display
    fullDecal: './threejs.png', // Initial Decal display
});

export default state