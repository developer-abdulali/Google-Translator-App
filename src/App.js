import React, { useEffect, useState } from "react";
import axios from "axios"; // Import axios using ES6 module syntax
import "./App.css";

function App() {
  const [options, setOptions] = useState([]);
  const [to, setTo] = useState("en");
  const [from, setFrom] = useState("en");
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");

  const translate = () => {
    axios
      .post(
        "https://libretranslate.de/translate",
        {
          q: input,
          source: from,
          target: to,
          api_key: "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx",
        },
        {
          headers: {
            Accept: "application/json",
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

  useEffect(() => {
    axios
      .get("https://libretranslate.de/languages", {
        headers: { Accept: "application/json" },
      })
      .then((res) => {
        console.log(res.data);
        setOptions(res.data);
      })
      .catch((error) => {
        console.error("Error fetching languages:", error);
      });
  }, []);

  return (
    <div className="App">
      <div>
        From ({from}) :
        <select onChange={(e) => setFrom(e.target.value)}>
          {options.map((opt) => (
            <option key={opt.code} value={opt.code}>
              {opt.name}
            </option>
          ))}
        </select>
        To ({to}) :
        <select onChange={(e) => setTo(e.target.value)}>
          {options.map((opt) => (
            <option key={opt.code} value={opt.code}>
              {opt.name}
            </option>
          ))}
        </select>
        <div>
          <textarea
            cols="50"
            rows="8"
            onInput={(e) => setInput(e.target.value)}
          ></textarea>
        </div>
        <div>
          <textarea name="" id="" cols="50" rows="8" value={output}></textarea>
        </div>
        <div>
          <button onClick={(e) => translate()}>Translate</button>
        </div>
      </div>
    </div>
  );
}

export default App;
