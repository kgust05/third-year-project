"use client";
import {useReducer} from "react";
import ChordSelector from "./ChordSelector";

export default function ChordEditor(
  {onUpdateProgs, onUpdateCurrent} :
  {onUpdateProgs : Function, onUpdateCurrent : Function}
) {
  /**
   * Component for adding chord progressions in the editor.
   * @param onUpdateProgs Function for adding a progression.
   * @param onUpdateCurrent Function for updating the current progression that will be added outside of this component.
   * @returns JSX element.
   */

  const [chords, dispatch] = useReducer(chordsReducer, Array(4).fill("1 major"));

  function handleUpdateChords(index : number, chord : string) {
    dispatch({
      type: "update",
      index: index,
      chord: chord
    })
    onUpdateCurrent(index, chord);
  }

  function chordsReducer(chords : string[], action : any) {
    switch (action.type) {
      case "update": {
        return chords.map((c, i) => {
          if (action.index == i) return action.chord;
          return c;
        })
      }
      default: {
        return chords;
      }
    }
  }

  return (
    <div className="grid gap-3 grid-cols-1 place-items-center m-8">
      <h1 className="text-2xl text-center font-semibold">Chord progression</h1>
      <div className="grid m-8 gap-3 grid-flow-row grid-cols-4 place-items-center">
        <div className="grid gap-3 grid-cols-1 place-items-center">
          <h2 className="text-center font-semibold">Bar 1</h2>
          <ChordSelector
            onUpdateChords={handleUpdateChords}
            index={0}
          />
        </div>
        <div className="grid gap-3 grid-cols-1 place-items-center">
          <h2 className="text-center font-semibold">Bar 2</h2>
          <ChordSelector
            onUpdateChords={handleUpdateChords}
            index={1}
          />
        </div>
        <div className="grid gap-3 grid-cols-1 place-items-center">
          <h2 className="text-center font-semibold">Bar 3</h2>
          <ChordSelector
            onUpdateChords={handleUpdateChords}
            index={2}
          />
        </div>
        <div className="grid gap-3 grid-cols-1 place-items-center">
          <h2 className="text-center font-semibold">Bar 4</h2>
          <ChordSelector
            onUpdateChords={handleUpdateChords}
            index={3}
          />
        </div>
      </div>
      <button
        type="button"
        className="w-36 h-12 rounded-full bg-purple-800 text-white hover:bg-purple-600 active:bg-purple-400"
        onClick={() => onUpdateProgs("add", undefined, chords)}
      >
        Add
      </button> 
    </div>
    
  )
}