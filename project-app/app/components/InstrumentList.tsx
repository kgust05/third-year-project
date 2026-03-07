import Instrument from "./Instrument";
import {useReducer} from "react";

export default function InstrumentList(
  {instruments, prog, rhythms} :
  {instruments : string[], prog : string[], rhythms : string[]}
) {
  const [currentInstruments, dispatch] = useReducer(instrumentReducer, Array(instruments.length).fill(false));

  function handleUpdateInstruments(index : number) {
    dispatch({
      type: "update",
      index: index
    })
  }

  function instrumentReducer(currentInstruments : boolean[], action : any) {
    switch (action.type) {
      case "update": {
        return currentInstruments.map((c, i) => {
          if (action.index == i) return !c;
          return c;
        })
      }
      default: {
        return currentInstruments;
      }
    }
  }

  let instrumentList = Array();

  for (let i of instruments) {
    const index = instruments.indexOf(i);
    let styleString;

    if (currentInstruments[index]) {
      styleString = "bg-fuchsia-600 text-white hover:bg-fuchsia-400 active:bg-fuchsia-200";
      instrumentList.push(
        <div
          key={i}
        >
          <button
            className={"w-36 h-12 rounded-full " + styleString}
            onClick={() => handleUpdateInstruments(index)}
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
            className={"w-36 h-12 rounded-full " + styleString}
            onClick={() => handleUpdateInstruments(index)}
          >
            Toggle {i}
          </button>
        </div>
      )
    }
  }

  return (
    <div className="grid gap-3 grid-cols-1 place-items-center">
      <h1 className="text-3xl text-center m-8">Choose your instruments</h1>
      {instrumentList}
    </div>
  )
}