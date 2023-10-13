import { ChatGPTKey } from "../config/env";
const API_URL = "https://api.openai.com/v1/images/generations";
const KEY_GPT = "";

export const fetchImageIaApi = (
  inputMessage: string,
  setOutputMessage: React.Dispatch<React.SetStateAction<string>>
): void => {
  console.log("Fetching:", inputMessage);
  fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${ChatGPTKey.apiKey}`, // alterar sua chave key
    },
    body: JSON.stringify({
      prompt: inputMessage,
      n: 1,
      size: "1024x1024",
    }),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log("data", data.data[0].url);
      setOutputMessage(data.data[0].url);
    })
    .catch((error) => console.error("API Fetch Error:", error));
};
