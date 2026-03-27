"use client";
import {useState, useReducer} from "react";
import ChordEditor from "@/app/components/ChordEditor";
import RhythmEditor from "@/app/components/RhythmEditor";
import KeyEditor from "@/app/components/KeyEditor";
import InstrumentEditor from "@/app/components/InstrumentEditor";
import Stave from "@/app/components/Stave";
import SongPlayer from "@/app/components/SongPlayer";
import { insertNewSong } from "@/app/lib/data";

export default function Page() {
  /**
   * Editor page.
   * @returns JSX element.
   */

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

  // Translates rhythm to readable notes
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

  // Creates rows for the added progressions
  function createProgRows() {
    let rows = Array();

    for (let i = 0; i < progs.length; i++) {
      rows.push(
        <tr key={`prog${i}`}>
          <td className="px-6 py-4">{progs[i].join(", ")}</td>
          <td className="px-6 py-4">
            <button
              className="w-18 h-10 rounded-full bg-red-800 text-white hover:bg-red-700 active:bg-red-600"
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

  // Creates rows for the added rhythms
  function createRhythmRows() {
    let rows = Array()

    for (let i = 0; i < rhythms.length; i++) {
      rows.push(
        <tr key={`rhyth${i}`}>
          <td className="px-6 py-4">{translateRhythm(rhythms[i])}</td>
          <td className="px-6 py-4">
            <button
              className="w-18 h-10 rounded-full bg-red-800 text-white hover:bg-red-700 active:bg-red-600"
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

  // Creates rows for the added instruments
  function createInstrumentRows() {
    let rows = Array()

    for (let i = 0; i < instruments.length; i++) {
      rows.push(
        <tr key={`rhyth${i}`}>
          <td className="px-6 py-4">{JSON.parse(instruments[i]).name}</td>
          <td className="px-6 py-4">{JSON.parse(instruments[i]).inst}</td>
          <td className="px-6 py-4">{JSON.parse(instruments[i]).octave}</td>
          <td className="px-6 py-4">{JSON.parse(instruments[i]).rootOnly.toString()}</td>
          <td className="px-6 py-4">
            <button
              className="w-18 h-10 rounded-full bg-red-800 text-white hover:bg-red-700 active:bg-red-600"
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
    <div className="font-sans grid gap-3 grid-cols-1 place-items-center">
      <h1 className="text-4xl text-center font-bold m-8">Editor</h1>
      <p>You can contribute your own ideas for a song and its chord variations here.</p>
      <div className="w-2/5 overflow-x-auto bg-[#bc9dcc] border border-[#906fa1] shadow-xs rounded-xl mt-8">
        <table className="w-full text-sm text-center text-body">
          <thead className="text-sm text-body border-b border-[#906fa1]">
            <tr>
              <th colSpan={2} className="px-6 py-3 font-semibold">Progressions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#906fa1]">
            {createProgRows()}
          </tbody>
        </table>
      </div>
      <div className="w-2/5 overflow-x-auto bg-[#bc9dcc] border border-[#906fa1] shadow-xs rounded-xl">
        <table className="w-full text-sm text-center text-body">
          <thead className="text-sm text-body border-b border-[#906fa1]">
            <tr>
              <th colSpan={2} className="px-6 py-3 font-semibold">Rhythms</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#906fa1]">
            {createRhythmRows()}
          </tbody>
        </table>
      </div>
      <div className="w-2/5 overflow-x-auto bg-[#bc9dcc] border border-[#906fa1] shadow-xs rounded-xl">
        <table className="w-full text-sm text-center text-body">
          <thead className="text-sm text-body border-b border-[#906fa1] divide-y divide-[#906fa1]">
            <tr>
              <th colSpan={5} className="px-6 py-3 font-semibold">Instruments</th>
            </tr>
            <tr>
            <th className="px-6 py-3 font-semibold">Name</th>
            <th className="px-6 py-3 font-semibold">Instrument Sound</th>
            <th className="px-6 py-3 font-semibold">Octave</th>
            <th className="px-6 py-3 font-semibold">Only uses root?</th>
          </tr>
          </thead>
          <tbody className="divide-y divide-[#906fa1]">
            {createInstrumentRows()}
          </tbody>
        </table>
      </div>
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
      <form action={insertNewSong} className="grid gap-3 grid-cols-1 place-items-center m-8">
        <div className="grid gap-3 grid-cols-4 place-items-center m-8">
          <h1 className="col-span-4 text-2xl text-center font-semibold">Main info</h1>
          <label className="text-center">
            Song Name: <input className="w-full px-3 py-2.5 bg-[#bc9dcc] border border-[#906fa1] text-sm rounded-xl" name="name" required></input>
          </label>
          <label className="text-center">
            Song Artist: <input className="w-full px-3 py-2.5 bg-[#bc9dcc] border border-[#906fa1] text-sm rounded-xl" name="artist" required></input>
          </label>
          <label className="text-center">
            Tempo: <input className="w-full px-3 py-2.5 bg-[#bc9dcc] border border-[#906fa1] text-sm rounded-xl" type="number" name="tempo" defaultValue={120} onChange={(e) => handleUpdateTempo(e.target.value)} required></input>
          </label>
          <label className="text-center">
            YouTube embed (optional): <input className="w-full px-3 py-2.5 bg-[#bc9dcc] border border-[#906fa1] text-sm rounded-xl" type="url" name="embed"></input>
          </label>
          <label className="text-center col-span-4">
            Description (optional): <textarea className="w-full px-3 py-2.5 bg-[#bc9dcc] border border-[#906fa1] text-sm rounded-xl" name="desc"></textarea>
          </label>
          

        </div>
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
        
        <button
          className="w-36 h-12 rounded-full bg-purple-800 text-white hover:bg-purple-600 active:bg-purple-400 m-8"
          type="submit"
        >
          Add Song
        </button>
      </form>
    </div>
  )
}