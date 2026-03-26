"use client";
import {useState, useReducer, Suspense} from "react";
import ChordEditor from "@/app/components/ChordEditor";
import RhythmEditor from "@/app/components/RhythmEditor";
import KeyEditor from "@/app/components/KeyEditor";
import InstrumentEditor from "@/app/components/InstrumentEditor";
import { insertNewSong } from "@/app/lib/data";

export default function Page() {
  const [progs, progsDispatch] = useReducer(progsReducer, Array());
  const [rhythms, rhythmsDispatch] = useReducer(rhythmsReducer, Array());
  const [keySig, setKeySig] = useState("C major");
  const [instruments, instrumentsDispatch] = useReducer(instrumentsReducer, Array());

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

  function instrumentsHandler(type : string, index? : number, instrument? : string) {
    instrumentsDispatch({
      type: type,
      index: index,
      instrument: instrument
    })
  }

  function handleUpdateKey(keySig : string) {
    setKeySig(keySig);
  }

  function progsReducer(progs : string[][], action : any) {
    switch (action.type) {
      case "add": {
        return [...progs, action.prog];
      }
      case "delete": {
        return progs.filter((p, i) => action.index != i);
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
      default: {
        return rhythms;
      }
    }
  }

  function instrumentsReducer(instruments : string[], action: any) {
    switch (action.type) {
      case "add": {
        return [...instruments, action.instrument];
      }
      case "delete": {
        return instruments.filter((inst, i) => action.index != i);
      }
      default: {
        return instruments;
      }
    }
  }

  return (
    <div>
      <p>{progs}</p>
      <p>{rhythms}</p>
      <p>{keySig}</p>
      <p>{instruments}</p>
      <Suspense>
        <form action={insertNewSong}>
          <KeyEditor onUpdateKey={handleUpdateKey}/>
          <ChordEditor
            onUpdateProgs={progsHandler}
          />
          <RhythmEditor
            onUpdateRhythms={rhythmsHandler}
            maxBar={4}
          />
          <InstrumentEditor onUpdateInstruments={instrumentsHandler}/>
          <input type="hidden" name="progs" value={JSON.stringify(progs)}></input>
          <input type="hidden" name="keySig" value={keySig}></input>
          <input type="hidden" name="rhythms" value={JSON.stringify(rhythms)}></input>
          <input type="hidden" name="instruments" value={JSON.stringify(instruments)}></input>
          <label>
            Song Name: <input name="name"></input>
          </label>
          <label>
            Song Artist: <input name="artist"></input>
          </label>
          <label>
            Description (optional): <textarea name="desc"></textarea>
          </label>
          <label>
            URL (optional): <input type="url" name="embed"></input>
          </label>
          <button
            className="w-36 h-12 rounded-full bg-purple-800 text-white hover:bg-purple-600 active:bg-purple-400"
            type="submit"
          >
            Add Song
          </button>
        </form>
      </Suspense>
    </div>
  )
}