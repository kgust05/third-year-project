"use client";
import {useState, useReducer} from "react";
import ChordEditor from "@/app/components/ChordEditor";
import RhythmEditor from "@/app/components/RhythmEditor";
import KeyEditor from "@/app/components/KeyEditor";
import { insertNewSong } from "@/app/lib/data";

export default function Page() {
  const [progs, progsDispatch] = useReducer(progsReducer, Array());
  const [rhythms, rhythmsDispatch] = useReducer(rhythmsReducer, Array());
  const [keySig, setKeySig] = useState("C major");

  function progsHandler(type : string, index? : number, prog?: string[]) {
    progsDispatch({
      type: type,
      index: index,
      prog: prog
    })
  }

  function rhythmsHandler(type : string, index? : number, rhythm? : string) {
    rhythmsDispatch({
      type: type,
      index: index,
      rhythm: rhythm
    })
  }

  function handleUpdateKey(keySig : string) {
    setKeySig(keySig);
  }

  function progsReducer(progs : string[][], action : any) {
    switch (action.type) {
      case "add": {
        return progs.concat([action.prog]);
      }
      case "delete": {
        return progs.filter((p, i) => action.index != i);
      }
      case "update": {
        return progs.map((c, i) => {
          if (action.index == i) return action.prog;
          return c;
        })
      }
      default: {
        return progs;
      }
    }
  }

  function rhythmsReducer(rhythms : string[], action: any) {
    switch (action.type) {
      case "add": {
        return [...rhythms, action.rhythm];
      }
      case "delete": {
        return rhythms.filter((r, i) => action.index != i);
      }
      case "update": {
        return rhythms.map((r, i) => {
          if (action.index == i) return action.rhythm;
          return r;
        })
      }
      default: {
        return rhythms;
      }
    }
  }

  return (
    <div>
      <p>{progs}</p>
      <p>{rhythms}</p>
      <p>{keySig}</p>
      <KeyEditor onUpdateKey={handleUpdateKey}/>
      <ChordEditor
        onUpdateProgs={progsHandler}
      />
      <RhythmEditor
        onUpdateRhythms={rhythmsHandler}
        maxBar={4}
      />
      <form action={insertNewSong}>

        <input type="hidden" name="progs" value={JSON.stringify(progs)}></input>
        <input type="hidden" name="keySig" value={keySig}></input>
        <input type="hidden" name="rhythms" value={JSON.stringify(rhythms)}></input>
        <button
          className="w-36 h-12 rounded-full bg-purple-800 text-white hover:bg-purple-600 active:bg-purple-400"
          type="submit"
        >
          Add Song
        </button>
      </form>
    </div>
  )
}