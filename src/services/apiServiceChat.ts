import { ChatGPTKey } from "../config/env";

const API_URL = "https://api.openai.com/v1/chat/completions";
// const KEY_GPT = "";

export const fetchChatIaApi = (
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
      messages: [{ role: "user", content: inputMessage }],
      model: "gpt-3.5-turbo",
    }),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log("data", data.choices[0].message.content.trim());
      setOutputMessage(data.choices[0].message.content.trim());
    })
    .catch((error) => console.error("API Fetch Error:", error));
};
