import RhythmGrid from "./RhythmGrid";
import Stave from "./Stave";
import {useReducer} from "react";

export default function Instrument(
  {instrument, prog, rhythms} :
  {instrument : string, prog : string[], rhythms : string[]}
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