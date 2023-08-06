import { useState } from "react";
import axios from "axios";

const useTranslation = () => {
  const [from, setFrom] = useState("en");
  const [to, setTo] = useState("en");
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [languages, setLanguages] = useState([]);

  const translate = () => {
    axios
      .post(
        "https://libretranslate.de/translate",
        {
          q: input,
          source: from,
          target: to,
          api_key: "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx", // Replace with your API key
        },
        {
          headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
          },
        }
      )
      .then((res) => {
        setOutput(res.data.translatedText);
      })
      .catch((error) => {
        console.error("Translation error:", error);
      });
  };

  const fetchLanguages = () => {
    axios
      .get("https://libretranslate.de/languages", {
        headers: { Accept: "application/json" },
      })
      .then((res) => {
        setLanguages(res.data);
      })
      .catch((error) => {
        console.error("Error fetching languages:", error);
      });
  };

  return {
    from,
    setFrom,
    to,
    setTo,
    input,
    setInput,
    output,
    translate,
    languages,
    fetchLanguages,
  };
};

export default useTranslation;
