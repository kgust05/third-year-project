'use client';
import ChordGrid from "@/app/components/ChordGrid";
import InstrumentList from "@/app/components/InstrumentList";
import {useReducer} from "react";
import Link from "next/link";

export default function Page() {
  const progs = [
    ["C", "Dm", "Am", "F"],
    ["C", "Am", "Dm", "G"],
    ["C", "Am", "F", "G"],
    ["Dm", "G", "C", "Am"],
    ["C", "F", "Dm", "G"]
  ]

  const rhythms = [
    "q. q. q",
    "h. q",
    "8 h 8 8 8",
    "h h"
  ]

  const instruments = [
    "Melody",
    "Guitar",
    "Keys",
    "Bass"
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
      <h1 className="text-4xl text-center m-8">Chappell Roan - Pink Pony Club</h1>
      <p className="text-lg text-center">
        Insert descrption here.<br></br>
        Can include song's genre, its rhythms and chords,
        how they relate to other songs, e.g. similar chords/rhythms to get
        a similar sound, mentions of similar songs, etc.<br></br>
        Essentially, additional information to allow a user to appreciate the <b>why </b>
        of the sound of the song that comes with the <b>how.</b>
      </p>
      <Link href="/">
        <button className="w-36 h-12 rounded-full bg-purple-800 text-white hover:bg-purple-600 active:bg-purple-400 m-8">
          Back to Menu
        </button>
      </Link>
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
