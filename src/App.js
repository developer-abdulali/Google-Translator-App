import React, { useEffect } from "react";
import axios from "axios"; // Import axios using ES6 module syntax
import "./App.css";

function App() {
  useEffect(() => {
    axios
      .get("https://libretranslate.de/languages", {
        headers: { Accept: "application/json" },
      })
      .then((res) => {
        console.log(res);
      })
      .catch((error) => {
        console.error("Error fetching languages:", error);
      });
  }, []);

  return (
    <div className="App">
      <div>
        From:
        <select>
          <option value="1">1</option>
          <option value="2">2</option>
        </select>
        To:
        <select>
          <option value="1">1</option>
          <option value="2">2</option>
        </select>
        <div>
          <textarea name="" id="" cols="50" rows="8"></textarea>
        </div>
        <div>
          <textarea name="" id="" cols="50" rows="8"></textarea>
        </div>
        <div>
          <button>Translate</button>
        </div>
      </div>
    </div>
  );
}

export default App;
