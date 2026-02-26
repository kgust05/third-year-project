'use client';
import ChordGrid from "./ChordGrid";
import InstrumentList from "./InstrumentList";
import {useReducer, useState} from "react";

export default function MyApp() {
  const progs = [
    ["Am", "F", "C", "G"],
    ["C", "Am", "F", "G"],
    ["F", "Am", "C", "G"],
    ["C", "G", "Am", "F"],
    ["C", "F", "Am", "G"]
  ]

  const rhythms = [
    "q q. q.",
    "q. q. q",
    "q 8 q 8 q",
    "h q q",
    "h h"
  ]

  const instruments = [
    "melody",
    "guitar",
    "keys",
    "bass"
  ]

  const [currentProg, progDispatch] = useReducer(progReducer, Array(4).fill(""));

  function handleUpdateCurrentProg(chord : string, index : number) {
    progDispatch({
      type: "update",
      chord: chord,
      index: index
    })
  }

  function progReducer(currentProg : string[], action : any) {
    switch (action.type) {
      case "update": {
        return currentProg.map((c, i) => {
          if (action.index == i) {
            if (c == "") {
              return action.chord;
            }

            return "";
          }

          return c;
        })
      }
      default: {
        return currentProg;
      }
    }
  }

  return (
    <div>
      <InstrumentList
        instruments={instruments}
        prog={currentProg}
        rhythms={rhythms}
      />
      <ChordGrid
        progs={progs}
        currentProg={currentProg}
        onUpdateCurrentProg={handleUpdateCurrentProg}
      />
    </div>
  )
}
