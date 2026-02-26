import Instrument from "./Instrument";
import {useState, useReducer} from "react";

export default function InstrumentList(
  {instruments, prog, rhythms} :
  {instruments : string[], prog : string[], rhythms : string[]}
) {
  const [enabledInstruments, setEnabledInstruments] = useState(Array(instruments.length).fill(false));

  function handleUpdateEnabledInstruments(index : number) {
    let updatedArray = enabledInstruments;

    updatedArray[index] = !updatedArray[index];
    setEnabledInstruments(updatedArray);
  }

  let instrumentList = Array();

  for (let i of instruments) {
    const index = instruments.indexOf(i);
    let styleString;

    if (enabledInstruments[index]) {
      styleString = "bg-fuchsia-600 text-white hover:bg-fuchsia-400 active:bg-fuchsia-200";
      instrumentList.push(
        <div
          key={i}
        >
          <button
            className={"w-2/5 rounded-full " + styleString}
            onClick={() => handleUpdateEnabledInstruments(index)}
          >
            Toggle {i}
          </button>
          <Instrument
            instrument={i}
            prog={prog}
            rhythms={rhythms}
          />
        </div>
      )

    } else {
      styleString = "bg-purple-800 text-white hover:bg-purple-600 active:bg-purple-400";
      instrumentList.push(
        <div
          key={i}
        >
          <button
            className={"w-2/5 rounded-full " + styleString}
            onClick={() => handleUpdateEnabledInstruments(index)}
          >
            Toggle {i}
          </button>
        </div>
      )
    }
  }

  return (
    <div>
      {instrumentList}
    </div>
  )
}