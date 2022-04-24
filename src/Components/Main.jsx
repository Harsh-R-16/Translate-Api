import { useEffect, useState } from "react";
import { arr } from "./data";
let id;
export default function Main() {
  let [inpText, setInpText] = useState(
    "English is one of the most widely spoken languages in the world, and with the British Council estimating that 2 billion people will be learning it by 2020, that certainly looks set to continue."
  );
  let [outText, setOutText] = useState("");
  let [inLan, setInLan] = useState("en");
  let [outLan, setOutLan] = useState("hi");

  useEffect(() => {
    async function fetchResults() {
      const a = await fetch("https://libretranslate.de/translate", {
        method: "POST",
        body: JSON.stringify({
          q: inpText ? inpText : "Harsh",
          source: inLan,
          target: outLan,
          format: "text",
        }),
        headers: { "Content-Type": "application/json" },
      });
      const b = await a.json();
      // console.log(b.translatedText);
      setOutText(b.translatedText);
    }
    id = setTimeout(() => {
      fetchResults();
    }, 2500);
    return () => clearTimeout(id);
  }, [inpText, inLan, outLan]);
  return (
    <main>
      <h1>Translation API</h1>
      <section>
        <div>
          <label htmlFor="from">Translate from: </label>
          <select
            name="from"
            id="from"
            value={inLan}
            onChange={(e) => setInLan(e.target.value)}
          >
            {arr.map((i) => (
              <option value={i["code"]} key={i["code"]}>
                {i["name"]}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="to">Translate to: </label>
          <select
            name="to"
            id="to"
            value={outLan}
            onChange={(e) => setOutLan(e.target.value)}
          >
            {arr.map((i) => (
              <option value={i["code"]} key={i["code"]}>
                {i["name"]}
              </option>
            ))}
          </select>
        </div>
        <div className="text">
          <textarea
            name="inputText"
            id=""
            rows="30"
            cols="70"
            value={inpText}
            onChange={(e) => setInpText(e.target.value)}
          ></textarea>
        </div>
        <div className="text">
          <textarea
            name="outputText"
            id=""
            readOnly="readonly"
            rows="30"
            cols="70"
            value={outText}
            onChange={(e) => setOutText("")}
          ></textarea>
        </div>
      </section>
    </main>
  );
}
