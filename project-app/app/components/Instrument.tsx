import RhythmGrid from "./RhythmGrid";
import Stave from "./Stave";
import {useReducer} from "react";

export default function Instrument(
  {instrument, prog, keySig, rhythms, onUpdateRhythms, index} :
  {instrument : string, prog : string[], keySig : string, rhythms : string[], onUpdateRhythms : Function, index : number}
) {
  /**
   * Component for displaying an instrument on a song page.
   * @param instrument Stringified JSON object that contains instrument info.
   * @param prog Chord progression.
   * @param keySig Key signature of the song.
   * @param rhythms All valid rhythms for the song.
   * @param onUpdateRhythms Function for updating the current rhythm of this instrument from outside this component.
   * @param index Index of this instrument in the list of provided instruments.
   * @returns JSX element.
   */

  const [currentRhythm, dispatch] = useReducer(rhythmReducer, "");

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
      <h1 className="font-semibold text-3xl text-center m-8">{JSON.parse(instrument).name} line</h1>
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