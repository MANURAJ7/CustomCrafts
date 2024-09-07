import { proxy } from "valtio";
//Valtio is used to share state between react components.

//Calling proxy as a function
const state = proxy({
  intro: true,
  color: "#ef674e",
  isLogoTexture: true,
  isFullTexture: false,
  logoDecal: "./starbucks.png",
});

export default state;
