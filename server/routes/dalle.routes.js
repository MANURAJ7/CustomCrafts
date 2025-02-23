// import express from "express";
// import * as dotenv from "dotenv";
// import { Configuration, OpenAIApi } from "openai";

// dotenv.config();

// const router = express.Router();

// const config = new Configuration({
//   apiKey: process.env.OPENAI_API_KEY,
// });

// const openai = new OpenAIApi(config);

// router.route("/").get((req, res) => {
//   res.status(200).json({ message: "Hello from DALL.E ROUTES" });
// });

// router.route("/").post(async (req, res) => {
//   try {
//     const { prompt } = req.body;

//     const response = await openai.createImage({
//       prompt,
//       n: 1,
//       size: "1024x1024",
//       response_format: "b64_json",
//     });

//     const image = response.data.data[0].b64_json;

//     res.status(200).json({ photo: image });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Something went wrong" });
//   }
// });

// export default router;
import express from "express";
import * as dotenv from "dotenv";
import { OpenAI } from "openai";

dotenv.config();

const router = express.Router();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

router.route("/").get((req, res) => {
  res
    .status(200)
    .json({
      message: "Hello from DALL.E ROUTES, you won't get it so just post it.",
    });
});

router.route("/").post(async (req, res) => {
  try {
    const { prompt } = req.body;
    console.log(req.body);
    const response = await openai.images.generate({
      prompt,
      n: 1,
      size: "1024x1024", // set it according to objects
      response_format: "b64_json",
    });
    console.log("This is the response: ", response);

    const image = response.data.data[0].b64_json;

    res.status(200).json({ photo: image });
  } catch (error) {
    console.error("The 500 Error: -> ", error);
    res.status(500).json({ message: "Something went wrong with OpenAI" });
  }
});

export default router;
