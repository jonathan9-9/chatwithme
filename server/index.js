import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import helmet from "helmet";
import morgan from "morgan";
import OpenAI from "openai";
import openAiRoutes from "./routes/openai.js";

// CONFIG
dotenv.config();
const app = express();
app.use(express.json());
app.use(helmet());

app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

// Open AI Config

export const openai = new OpenAI({
  apiKey: process.env.OPEN_API_KEY,
});

// const configuration = new Configuration({
//   apiKey: process.env.OPEN_API_KEY,
// });

// export const openai = new OpenAiAPI(configuration);

// ROUTES: openai route will be prefixed before text in the url path http://localhost:1337/openai/text
app.use("/openai", openAiRoutes);

// SETUP FOR THE SERVER

const PORT = process.env.PORT || 9000;
app.listen(PORT, () => {
  console.log(`APP listening at http://localhost:${PORT}`);
});
