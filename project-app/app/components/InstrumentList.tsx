import Instrument from "./Instrument";
import {useReducer, useState, useEffect} from "react";

export default function InstrumentList(
  {instruments, prog, keySig, rhythms, onUpdateRhythms} :
  {instruments : any[], prog : string[], keySig : string, rhythms : string[], onUpdateRhythms : Function}
) {
  /**
   * Component for displaying a collection of {@link Instrument} components.
   * @param instruments Array of all instruments.
   * @param prog Chord progression of the current song.
   * @param keySig Key signature.
   * @param rhythms All valid rhythms for the song.
   * @param onUpdateRhythms Function for updating the current rhythm.
   * @returns JSX element.
   */

  const [currentInstruments, dispatch] = useReducer(instrumentReducer, Array(instruments.length).fill(false));
  const [instrumentState, setInstruments] = useState(instruments);

  function handleUpdateInstruments(index : number) {
    dispatch({
      type: "update",
      index: index
    })
    onUpdateRhythms("", index);
  }

  function handleResetInstruments() {
    dispatch({
      type: "reset"
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
      case "reset": {
        return Array(instruments.length).fill(false);
      }
      default: {
        return currentInstruments;
      }
    }
  }

  // Checks if provided instruments have changed, updates state if they have
  useEffect(() => {
    if (instrumentState != instruments) {
      setInstruments(instruments);
      handleResetInstruments();
    }
  })

  // Creation of JSX element list of all provided instruments
  // Created buttons also show selection state
  let instrumentList = Array();

  for (let i of instruments) {
    const index = instruments.indexOf(i);
    let styleString;

    if (currentInstruments[index]) {
      styleString = "bg-fuchsia-600 text-white hover:bg-fuchsia-400 active:bg-fuchsia-200";
      instrumentList.push(
        <div
          key={i.name}
          className="w-full grid gap-3 grid-cols-1 place-items-center"
        >
          <div>
            <button
              className={"w-36 h-12 rounded-full " + styleString}
              onClick={() => handleUpdateInstruments(index)}
            >
              Toggle {i.name}
            </button>
          </div>
          <Instrument
            instrument={JSON.stringify(i)}
            prog={prog}
            keySig={keySig}
            rhythms={rhythms}
            onUpdateRhythms={onUpdateRhythms}
            index={instruments.indexOf(i)}
          />
        </div>
      )

    } else {
      styleString = "bg-purple-800 text-white hover:bg-purple-600 active:bg-purple-400";
      instrumentList.push(
        <div
          key={i.name}
          className="w-full grid gap-3 grid-cols-1 place-items-center"
        >
          <div>
            <button
            className={"w-36 h-12 rounded-full " + styleString}
            onClick={() => handleUpdateInstruments(index)}
            >
            Toggle {i.name}
          </button>
          </div>
          <div></div>
        </div>
      )
    }
  }

  return (
    <div className="grid gap-3 grid-cols-1 place-items-center">
      <h1 className="font-semibold text-3xl text-center m-8">Choose your instruments</h1>
      {instrumentList}
    </div>
  )
}