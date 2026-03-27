"use client";
import {useState} from "react";

export default function InstrumentEditor(
  {onUpdateInstruments, onUpdateCurrent} :
  {onUpdateInstruments : Function, onUpdateCurrent : Function}
) {
  /**
   * Component for adding instruments in the editor.
   * @param onUpdateInstruments Function for adding an instrument.
   * @param onUpdateCurrent Function for updating the current instrument that will be added outside of this component.
   * @returns JSX element.
   */

  const instNames = require("@/app/lib/instrumentNames.json");

  const [name, setName] = useState("Piano");
  const [inst, setInst] = useState("acoustic_grand_piano");
  const [octave, setOctave] = useState(4);
  const [rootOnly, setRootOnly] = useState(false);

  function handleUpdateName(name : string) {
    setName(name);
    onUpdateCurrent(JSON.stringify(buildJSON(name, inst, octave, rootOnly)));
  }

  function handleUpdateInst(instrument : string) {
    setInst(instrument);
    onUpdateCurrent(JSON.stringify(buildJSON(name, instrument, octave, rootOnly)));
  }

  function handleUpdateOctave(octave : string) {
    setOctave(parseInt(octave));
    onUpdateCurrent(JSON.stringify(buildJSON(name, inst, parseInt(octave), rootOnly)));
  }

  function handleUpdateRoot() {
    setRootOnly(!rootOnly);
    onUpdateCurrent(JSON.stringify(buildJSON(name, inst, octave, !rootOnly)));
  }

  // Creates all instrument sound options from provided json file
  function createOptions() {
    let options = Array();

    for (let name of instNames) {
      options.push(
        <option key={name} value={name}>{name}</option>
      )
    }

    return options;
  }

  // Creates button that toggles whether only the root or the full chord is used
  function createRootButton() {
    if (rootOnly) return (
      <div>
        <button
          type="button"
          className="w-36 h-12 rounded-full bg-fuchsia-600 text-white hover:bg-fuchsia-400 active:bg-fuchsia-200"
          onClick={() => handleUpdateRoot()}
        >
          Use Only Root?
        </button>
      </div>
    )
    else return (
      <div>
        <button
          type="button"
          className="w-36 h-12 rounded-full bg-purple-800 text-white hover:bg-purple-600 active:bg-purple-400"
          onClick={() => handleUpdateRoot()}
        >
          Use Only Root?
        </button>
      </div>
    )
  }

  // Makes JSON object for instruments
  function buildJSON(name : string, inst : string, octave : number, rootOnly : Boolean) {
    return (
      {
        name: name,
        inst: inst,
        octave: octave,
        rootOnly: rootOnly
      }
    )
  }

  return (
    <div className="grid grid-flow-row gap-3 grid-cols-1 place-items-center">
      <h1 className="text-2xl text-center font-semibold">Instrument</h1>
      <div className="grid grid-flow-row gap-3 grid-cols-5 place-items-center">
        <div className="grid grid-flow-row gap-3 grid-cols-1 place-items-center">
          <h2 className="text-center font-semibold">Instrument name</h2>
          <input
          className="w-full px-3 py-2.5 bg-[#bc9dcc] border border-[#906fa1] text-sm rounded-xl"
          type="text"
          defaultValue="Piano"
          onChange={e => handleUpdateName(e.target.value)}
          required
        ></input>
        </div>
        <div className="grid grid-flow-row gap-3 grid-cols-1 place-items-center">
          <h2 className="text-center font-semibold">Instrument sound</h2>
          <select
            value={inst}
            onChange={e => handleUpdateInst(e.target.value)}
            className="w-full px-3 py-2.5 bg-[#bc9dcc] border border-[#906fa1] text-sm rounded-xl"
          >
            {createOptions()}
          </select>
        </div>
        <div className="grid grid-flow-row gap-3 grid-cols-1 place-items-center">
          <h2 className="text-center font-semibold">Instrument octave</h2>
          <input
            className="w-12 px-3 py-2.5 bg-[#bc9dcc] border border-[#906fa1] text-sm rounded-xl"
            type="number"
            defaultValue={4}
            min={1}
            max={7}
            step={1}
            onChange={e => handleUpdateOctave(e.target.value)}
            required
          ></input>
        </div>
        {createRootButton()}
        <button
          type="button"
          className="w-36 h-12 rounded-full bg-purple-800 text-white hover:bg-purple-600 active:bg-purple-400"
          onClick={() => onUpdateInstruments("add", undefined, JSON.stringify(buildJSON(name, inst, octave, rootOnly)))}
        >
          Add Instrument
        </button>
      </div>
    </div>   
  )
}