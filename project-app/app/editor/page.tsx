"use client";
import {useState, useReducer} from "react";
import ChordEditor from "@/app/components/ChordEditor";
import RhythmEditor from "@/app/components/RhythmEditor";
import KeyEditor from "@/app/components/KeyEditor";
import InstrumentEditor from "@/app/components/InstrumentEditor";
import Stave from "@/app/components/Stave";
import SongPlayer from "@/app/components/SongPlayer";
import { insertNewSong } from "@/app/lib/data";
import Link from "next/link";

export default function Page() {
  const [progs, progsDispatch] = useReducer(progsReducer, Array());
  const [rhythms, rhythmsDispatch] = useReducer(rhythmsReducer, Array());
  const [keySig, setKeySig] = useState("C major");
  const [instruments, instrumentsDispatch] = useReducer(instrumentsReducer, Array());
  const [currentProg, currentProgDispatch] = useReducer(currentProgReducer, Array(4).fill("1 major"));
  const [currentRhythm, setCurrentRhythm] = useState([""]);
  const [currentInstrument, setCurrentInstrument] = useState([{
        name: "Piano",
        inst: "acoustic_grand_piano",
        octave: 4,
        rootOnly: false
      }]);
  const [tempo, setTempo] = useState(120);

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

  function instrumentsHandler(type : string, index? : number, instrument? : any) {
    instrumentsDispatch({
      type: type,
      index: index,
      instrument: instrument
    })
  }

  function handleUpdateCurrentProg(index : number, chord : string) {
    currentProgDispatch({
      type: "update",
      index: index,
      chord: chord
    })
  }

  function handleUpdateKey(keySig : string) {
    setKeySig(keySig);
  }

  function handleUpdateCurrentRhythm(rhythm : string) {
    setCurrentRhythm([rhythm]);
  }

  function handleUpdateCurrentInstrument(inst : string) {
    setCurrentInstrument([JSON.parse(inst)]);
  }

  function handleUpdateTempo(tempo : string) {
    setTempo(parseInt(tempo));
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

  function currentProgReducer(chords : string[], action : any) {
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

  function translateRhythm(rhythm : string) {
    let rhythmString = Array();
    const parts = rhythm.split(" ");

    for (let note of parts) {
      let noteString = "";

      if (note.length > 1) {
        noteString += "Dotted ";
      }

      switch (note[0]) {
        case "w": {
          noteString += "Semibreve";
          break;
        }
        case "h": {
          noteString += "Minim";
          break;
        }
        case "q": {
          noteString += "Crotchet";
          break;
        }
        case "8": {
          noteString += "Quaver";
          break;
        }
        default: {
          noteString += "";
          break;
        }
      }

      rhythmString.push(noteString);
    }

    return rhythmString.join(", ");
  }

  function createProgRows() {
    let rows = Array();

    for (let i = 0; i < progs.length; i++) {
      rows.push(
        <tr key={`prog${i}`}>
          <td className="border border-gray-300 dark:border-gray-600">{progs[i].join(", ")}</td>
          <td>
            <button
              className="w-36 h-12 rounded-full bg-purple-800 text-white hover:bg-purple-600 active:bg-purple-400 m-8"
              onClick={() => progsHandler("delete", i)}
            >
              Delete
            </button>
          </td>
        </tr>
      )
    }

    return rows;
  }

  function createRhythmRows() {
    let rows = Array()

    for (let i = 0; i < rhythms.length; i++) {
      rows.push(
        <tr key={`rhyth${i}`}>
          <td className="border border-gray-300 dark:border-gray-600">{translateRhythm(rhythms[i])}</td>
          <td>
            <button
              className="w-24 h-12 rounded-full bg-purple-800 text-white hover:bg-purple-600 active:bg-purple-400"
              onClick={() => rhythmsHandler("delete", i)}
            >
              Delete
            </button>
          </td>
        </tr>
      )
    }

    return rows;
  }

  function createInstrumentRows() {
    let rows = Array()

    for (let i = 0; i < instruments.length; i++) {
      rows.push(
        <tr key={`inst${i}`}>
          <td className="border border-gray-300 dark:border-gray-600">{JSON.parse(instruments[i]).name}</td>
          <td className="border border-gray-300 dark:border-gray-600">{JSON.parse(instruments[i]).inst}</td>
          <td className="border border-gray-300 dark:border-gray-600">{JSON.parse(instruments[i]).octave}</td>
          <td className="border border-gray-300 dark:border-gray-600">{JSON.parse(instruments[i]).rootOnly.toString()}</td>
          <td>
            <button
              className="w-36 h-12 rounded-full bg-purple-800 text-white hover:bg-purple-600 active:bg-purple-400 m-8"
              onClick={() => instrumentsHandler("delete", i)}
            >
              Delete
            </button>
          </td>
        </tr>
      )
    }

    return rows;
  }

  return (
    <div className="grid gap-3 grid-cols-1 place-items-center">
      <table className="border-separate border-spacing-2 border border-gray-400 dark:border-gray-500">
        <thead>
          <tr>
            <th colSpan={2} className="border border-gray-300 dark:border-gray-600">Progressions</th>
          </tr>
        </thead>
        <tbody>
          {createProgRows()}
        </tbody>
      </table>
      <table className="border-separate border-spacing-2 border border-gray-400 dark:border-gray-500">
        <thead>
          <tr>
            <th colSpan={2} className="border border-gray-300 dark:border-gray-600">Rhythms</th>
          </tr>
        </thead>
        <tbody>
          {createRhythmRows()}
        </tbody>
      </table>
      <table className="border-separate border-spacing-2 border border-gray-400 dark:border-gray-500">
        <thead>
          <tr>
            <th colSpan={5} className="border border-gray-300 dark:border-gray-600">Instruments</th>
          </tr>
          <tr>
            <th className="border border-gray-300 dark:border-gray-600">Name</th>
            <th className="border border-gray-300 dark:border-gray-600">Instrument Sound</th>
            <th className="border border-gray-300 dark:border-gray-600">Octave</th>
            <th className="border border-gray-300 dark:border-gray-600">Only uses root?</th>
          </tr>
        </thead>
        <tbody>
          {createInstrumentRows()}
        </tbody>
      </table>
      <Link href="/">
        <button className="w-36 h-12 rounded-full bg-purple-800 text-white hover:bg-purple-600 active:bg-purple-400 m-8">
          Back to Menu
        </button>
      </Link>
      <Stave
        instrument={JSON.stringify(currentInstrument[0])}
        prog={currentProg}
        keySig={keySig}
        rhythm={currentRhythm[0]}
      />
      <SongPlayer
        prog={currentProg}
        keySig={keySig}
        instruments={currentInstrument}
        rhythms={currentRhythm}
        tempo={tempo}
      />
      <form action={insertNewSong}>
        <KeyEditor onUpdateKey={handleUpdateKey}/>
        <ChordEditor
          onUpdateProgs={progsHandler}
          onUpdateCurrent={handleUpdateCurrentProg}
        />
        <RhythmEditor
          onUpdateRhythms={rhythmsHandler}
          maxBar={4}
          onUpdateCurrent={handleUpdateCurrentRhythm}
        />
        <InstrumentEditor
          onUpdateInstruments={instrumentsHandler}
          onUpdateCurrent={handleUpdateCurrentInstrument}
          />
        <input type="hidden" name="progs" value={JSON.stringify(progs)} required></input>
        <input type="hidden" name="keySig" value={keySig} required></input>
        <input type="hidden" name="rhythms" value={JSON.stringify(rhythms)} required></input>
        <input type="hidden" name="instruments" value={JSON.stringify(instruments)} required></input>
        <label>
          Song Name: <input name="name" required></input>
        </label>
        <label>
          Song Artist: <input name="artist" required></input>
        </label>
        <label>
          Description (optional): <textarea name="desc"></textarea>
        </label>
        <label>
          URL (optional): <input type="url" name="embed"></input>
        </label>
        <label>
          Tempo: <input type="number" name="tempo" defaultValue={120} onChange={(e) => handleUpdateTempo(e.target.value)} required></input>
        </label>
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