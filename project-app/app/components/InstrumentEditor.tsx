"use client";
import {useState} from "react";

export default function InstrumentEditor(
  {onUpdateInstruments} :
  {onUpdateInstruments : Function}
) {
  const [instrument, setInstrument] = useState("Melody");

  function handleUpdateInstrument(instrument : string) {
    setInstrument(instrument);
  }

  return (
    <div>
      <select
        value={instrument}
        onChange={e => handleUpdateInstrument(e.target.value)}
      >
        <option value="Melody">Melody</option>
        <option value="Guitar">Guitar</option>
        <option value="Keys">Keys</option>
        <option value="Bass">Bass</option>
      </select>
      <button
        type="button"
        className="w-36 h-12 rounded-full bg-purple-800 text-white hover:bg-purple-600 active:bg-purple-400"
        onClick={() => onUpdateInstruments("add", undefined, instrument)}
      >
        Add Instrument
      </button>
    </div>
  )
}