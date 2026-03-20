import RhythmGrid from "./RhythmGrid";
import Stave from "./Stave";
import {useReducer} from "react";

export default function Instrument(
  {instrument, prog, keySig, rhythms} :
  {instrument : string, prog : string[], keySig : string, rhythms : string[]}
) {
  const [currentRhythm, dispatch] = useReducer(rhythmReducer, "w");

  function handleUpdateCurrentRhythm(rhythm : string) {
    dispatch({
      type: "update",
      rhythm: rhythm
    })
  }

  function rhythmReducer(currentRhythm : string, action : any) {
    switch (action.type) {
      case "update": {
        return action.rhythm;
      }
    }
  }

  return (
    <div>
      <h1 className="text-3xl text-center m-8">{instrument} line</h1>
      <Stave
        instrument={instrument}
        prog={prog}
        keySig={keySig}
        octave={4}
        rhythm={currentRhythm}
      />
      <RhythmGrid
        rhythms={rhythms}
        currentRhythm={currentRhythm}
        onUpdateCurrentRhythm={handleUpdateCurrentRhythm}
      />
    </div>
  )
}