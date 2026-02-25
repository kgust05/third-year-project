'use client';
import ChordGrid from "./ChordGrid";
import RhythmGrid from "./RhythmGrid";
import Stave from "./Stave";
import Instrument from "./Instrument";
import {useReducer} from "react";

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

  let testGroup = Array();

  const [currentProg, progDispatch] = useReducer(progReducer, Array(4).fill(""));
  const [currentRhythm, rhythmDispatch] = useReducer(rhythmReducer, "w");

  function handleUpdateCurrentProg(chord : string, index : number) {
    progDispatch({
      type: "update",
      chord: chord,
      index: index
    })
  }

  function handleUpdateCurrentRhythm(rhythm : string) {
    rhythmDispatch({
      type: "update",
      rhythm: rhythm
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

  function rhythmReducer(currentRhythm : string, action : any) {
    switch (action.type) {
      case "update": {
        return action.rhythm;
      }
    }
  }

  for (let i = 0; i < 4; i++) {
    testGroup.push(
      <div key={`i${i}`}>
        <Instrument
          instrument={`i${i}`}
          prog={currentProg}
          rhythms={rhythms}
        />
      </div>
    )
  }

  return (
    <div>
      {testGroup}
      <ChordGrid
        progs={progs}
        currentProg={currentProg}
        onUpdateCurrentProg={handleUpdateCurrentProg}
      />
    </div>
  )
}
