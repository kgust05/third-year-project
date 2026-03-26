import RhythmGrid from "./RhythmGrid";
import Stave from "./Stave";
import {useReducer} from "react";

export default function Instrument(
  {instrument, prog, keySig, rhythms, onUpdateRhythms, index} :
  {instrument : string, prog : string[], keySig : string, rhythms : string[], onUpdateRhythms : Function, index : number}
) {
  const [currentRhythm, dispatch] = useReducer(rhythmReducer, "w");

  function handleUpdateCurrentRhythm(rhythm : string) {
    dispatch({
      type: "update",
      rhythm: rhythm
    })
    onUpdateRhythms(rhythm, index);
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
      <h1 className="text-3xl text-center m-8">{JSON.parse(instrument).name} line</h1>
      <Stave
        instrument={instrument}
        prog={prog}
        keySig={keySig}
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