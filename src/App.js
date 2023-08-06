import React, { useEffect, useState } from "react";
import axios from "axios";

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
        setOptions(res.data);
      })
      .catch((error) => {
        console.error("Error fetching languages:", error);
      });
  }, []);

  return (
    <div className="bg-gradient-to-r from-blue-400 to-purple-400 min-h-screen flex items-center justify-center">
      <div className="bg-white p-8 rounded shadow-lg w-full sm:w-11/12 md:w-4/5 lg:w-3/5 xl:w-1/2">
        <h1 className="text-3xl font-bold mb-6 text-center text-blue-600">
          Google Translator
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
          <div>
            <label htmlFor="from" className="text-blue-600">
              From ({from}) :
            </label>
            <select
              id="from"
              className="rounded border px-3 py-2 mt-2 w-full"
              onChange={(e) => setFrom(e.target.value)}
            >
              {options.map((opt) => (
                <option key={opt.code} value={opt.code}>
                  {opt.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="to" className="text-blue-600">
              To ({to}) :
            </label>
            <select
              id="to"
              className="rounded border px-3 py-2 mt-2 w-full"
              onChange={(e) => setTo(e.target.value)}
            >
              {options.map((opt) => (
                <option key={opt.code} value={opt.code}>
                  {opt.name}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="mb-4">
          <label htmlFor="input" className="text-blue-600">
            Input Text:
          </label>
          <textarea
            id="input"
            className="rounded border border-black px-3 py-2 mt-2 resize-none w-full"
            cols="50"
            rows="8"
            onInput={(e) => setInput(e.target.value)}
          ></textarea>
        </div>
        <div className="mb-4">
          <label htmlFor="output" className="text-blue-600">
            Translated Text:
          </label>
          <textarea
            id="output"
            className="rounded border border-black px-3 py-2 mt-2 resize-none w-full"
            cols="50"
            rows="8"
            value={output}
            readOnly
          ></textarea>
        </div>
        <div className="text-center">
          <button
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 focus:outline-none"
            onClick={(e) => translate()}
          >
            Translate
          </button>
        </div>
      <p className="text-center text-blue-600 pt-5">Copyright © Google Translator | Developer-Abdul Ali</p>
      </div>
    </div>
  );
}

export default App;