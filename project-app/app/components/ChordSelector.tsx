"use client";
import {useState} from "react";

export default function ChordSelector(
  {onUpdateChords, index} :
  {onUpdateChords : Function, index : number}
) {
  /**
   * Component for selecting chords in {@link ChordEditor}.
   * @param onUpdateChords Function for updating the currently selected chords.
   * @param index Index of chord this {@link ChordSelector} updates.
   * @returns JSX element.
   */
  
  const [degree, setDegree] = useState("1");
  const [mode, setMode] = useState("major");

  function handleUpdateDegree(d : string) {
    setDegree(d);
    onUpdateChords(index, `${d} ${mode}`);
  }

  function handleUpdateMode(m : string) {
    setMode(m);
    onUpdateChords(index, `${degree} ${m}`);
  }

  return (
    <div className="w-48 grid grid-flow-row gap-3 grid-cols-2 place-items-center">
      <div>
        <select
          value={degree}
          onChange={e => handleUpdateDegree(e.target.value)}
          className="w-full px-3 py-2.5 bg-[#bc9dcc] border border-[#906fa1] text-sm rounded-xl"
        >
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
          <option value="6">6</option>
          <option value="7">7</option>
        </select>
      </div>
      <div>
        <select
          value={mode}
          onChange={e => handleUpdateMode(e.target.value)}
          className="w-full px-3 py-2.5 bg-[#bc9dcc] border border-[#906fa1] text-sm rounded-xl"
        >
          <option value="major">Major</option>
          <option value="minor">Minor</option>
        </select>
      </div>
    </div>
  )
}