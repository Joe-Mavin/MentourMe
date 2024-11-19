import { Configuration, OpenAIApi } from "openai";
import { openaiConfig } from "../config/openaiConfig.mjs";

const openai = new OpenAIApi(openaiConfig);

export const getAIResponse = async (message) => {
  const response = await openai.createCompletion({
    model: "text-davinci-003",
    prompt: `Act as a life coach bot. ${message}`,
    max_tokens: 150,
  });
  return response.data.choices[0].text.trim();
};
