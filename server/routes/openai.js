import express from "express";
import axios from "axios";
import dotenv from "dotenv";
import { openai } from "../index.js";

dotenv.config();
const router = express.Router();

router.post("/text", async (req, res) => {
  try {
    const { text, activeChatId } = req.body;

    const response = await openai.chat.completions.create({
      model: "text-davinci-003",
      messages: [
        { role: "system", content: "You are a helpful assistant." },
        { role: "user", content: text },
      ],
    });

    await axios.post(
      `https://api.chatengine.io/chats/${activeChatId}/messages/`,
      { text: response.data.choices[0].message.content },
      {
        headers: {
          "Project-ID": process.env.PROJECT_ID,
          "User-Name": process.env.BOT_USER_NAME,
          "User-Secret": process.env.BOT_USER_SECRET,
        },
      }
    );

    res.status(200).json({ text: response.data.choices[0].message.content });
  } catch (error) {
    console.error("error", error);
    res.status(500).json({ error: error.message });
  }
});

export default router;
