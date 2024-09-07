import { motion, AnimatePresence } from "framer-motion";
import { useSnapshot } from "valtio";
import state from "../store";
import { CustomButton } from "../components";

//importing animation functions
import {
  headContainerAnimation,
  headContentAnimation,
  headTextAnimation,
  slideAnimation,
} from "../config/motion";

const Home = ({ setModelUrl }) => {
  const snap = useSnapshot(state);

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setModelUrl(url);
      console.log(url);
    }
  };

  return (
    //AnimatePresence is used to animate components when they enter or are removed from the react tree.
    <AnimatePresence>
      {snap.intro && (
        // {...function()} syntax is passing all animation related properties from function() to motion.section as " individual props"
        <motion.section className="home" {...slideAnimation("left")}>
          <motion.div className="head-content" {...headContainerAnimation}>
            <motion.div {...headTextAnimation}>
              <h1 className="head-text">
                LET's <br className="x1:block hidden" /> do it
              </h1>
            </motion.div>

            <motion.div {...headContentAnimation} className="gap-5">
              <p className="max-w-md font-normal text-grey-600">
                Let loose your Imagination design & visualize your 3D models
                with brand new customization tool.
              </p>
              <p style={{ marginBottom: 5 }}>
                <strong>Unleash your imagination</strong> and define your own
                style.
              </p>
              <CustomButton
                type="filled"
                title="Customize It"
                handleClick={() => (state.intro = false)}
                customStyle="w-fit px-4 py-2.5 text-sm"
              />
              <p className="max-w-md font-normal text-grey-600 mt-3"></p>

              <input
                id="file-upload" // Added this id
                accept=".glb"
                type="file"
                onChange={handleFileUpload}
              />
              <label
                style={{
                  color: "black",
                  backgroundColor: snap.color,
                  border: "1px",
                }}
                htmlFor="file-upload" // Ensure this matches the input id
                className="filepicker-label"
              >
                Upload model
              </label>
            </motion.div>
          </motion.div>
        </motion.section>
      )}
    </AnimatePresence>
  );
};
export default Home;
