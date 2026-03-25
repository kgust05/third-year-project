"use client";
import {useReducer} from "react";
import ChordSelector from "./ChordSelector";

export default function ChordEditor(
  {onUpdateProgs} :
  {onUpdateProgs : Function}
) {
  const [chords, dispatch] = useReducer(chordsReducer, Array(4).fill("1 major"));

  function handleUpdateChords(index : number, chord : string) {
    dispatch({
      type: "update",
      index: index,
      chord: chord
    })
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
    <div>
      <p>{chords}</p>
      <div className="grid m-8 grid-flow-row grid-cols-4 place-items-center">
        <ChordSelector
          onUpdateChords={handleUpdateChords}
          index={0}
        />
        <ChordSelector
          onUpdateChords={handleUpdateChords}
          index={1}
        />
        <ChordSelector
          onUpdateChords={handleUpdateChords}
          index={2}
        />
        <ChordSelector
          onUpdateChords={handleUpdateChords}
          index={3}
        />
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