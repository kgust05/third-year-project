'use client';
import ChordGrid from "./ChordGrid";
import Stave from "./Stave";
import {useReducer} from "react";

export default function MyApp() {
  const progs = [
    ["Am", "F", "C", "G"],
    ["C", "Am", "F", "G"],
    ["F", "Am", "C", "G"],
    ["C", "G", "Am", "F"],
    ["C", "F", "Am", "G"]
  ]

  const [currentProg, dispatch] = useReducer(progReducer, Array(4).fill(""));

  function handleUpdateCurrentProg(chord : string, index : number) {
    dispatch({
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
      <Stave
        prog={currentProg}
        rhythm={"w"}
      />
      <ChordGrid
        progs={progs}
        currentProg={currentProg}
        onUpdateCurrentProg={handleUpdateCurrentProg}
      />
    </div>
  )
}
