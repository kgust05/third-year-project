"use client";
import {useState} from "react";

export default function ChordSelector(
  {onUpdateChords, index} :
  {onUpdateChords : Function, index : number}
) {
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
    <div className="grid grid-flow-row gap-3 grid-cols-2 place-items-center">
      <div>
        <select
          value={degree}
          onChange={e => handleUpdateDegree(e.target.value)}
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
        >
          <option value="major">Major</option>
          <option value="minor">Minor</option>
        </select>
      </div>
    </div>
  )
}