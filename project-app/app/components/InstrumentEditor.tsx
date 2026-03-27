"use client";
import {useState} from "react";

export default function InstrumentEditor(
  {onUpdateInstruments, onUpdateCurrent} :
  {onUpdateInstruments : Function, onUpdateCurrent : Function}
) {
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
    onUpdateCurrent(JSON.stringify(buildJSON(name, inst, octave, rootOnly)));
  }

  function handleUpdateOctave(octave : string) {
    setOctave(parseInt(octave));
    onUpdateCurrent(JSON.stringify(buildJSON(name, inst, parseInt(octave), rootOnly)));
  }

  function handleUpdateRoot() {
    setRootOnly(!rootOnly);
    onUpdateCurrent(JSON.stringify(buildJSON(name, inst, octave, !rootOnly)));
  }

  function createOptions() {
    let options = Array();

    for (let name of instNames) {
      options.push(
        <option key={name} value={name}>{name}</option>
      )
    }

    return options;
  }

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
    <div className="grid grid-flow-row gap-3 grid-cols-3 place-items-center">
      <label>
        Name: <input
          type="text"
          defaultValue="Piano"
          onChange={e => handleUpdateName(e.target.value)}
          required
        ></input>
      </label>
      <select
        value={inst}
        onChange={e => handleUpdateInst(e.target.value)}
      >
        {createOptions()}
      </select>
      <label>
        Octave: <input
          type="number"
          defaultValue={4}
          min={1}
          max={7}
          step={1}
          onChange={e => handleUpdateOctave(e.target.value)}
          required
        ></input>
      </label>
      {createRootButton()}
      <button
        type="button"
        className="w-36 h-12 rounded-full bg-purple-800 text-white hover:bg-purple-600 active:bg-purple-400"
        onClick={() => onUpdateInstruments("add", undefined, JSON.stringify(buildJSON(name, inst, octave, rootOnly)))}
      >
        Add Instrument
      </button>
    </div>
  )
}