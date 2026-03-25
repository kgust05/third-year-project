"use client";
import {useState} from "react";

export default function KeyEditor(
  {onUpdateKey} :
  {onUpdateKey : Function}
) {
  const [note, setNote] = useState("C");
  const [mode, setMode] = useState("major");

  function handleUpdateNote(note : string) {
    setNote(note);
    onUpdateKey(`${note} ${mode}`);
  }

  function handleUpdateMode(mode : string) {
    setMode(mode)
    onUpdateKey(`${note} ${mode}`);
  }

  return (
    <div className="grid grid-flow-row gap-3 grid-cols-2 place-items-center">
      <div>
        <select
          value={note}
          onChange={e => handleUpdateNote(e.target.value)}
        >
          <option value="A">A</option>
          <option value="B">B</option>
          <option value="C">C</option>
          <option value="D">D</option>
          <option value="E">E</option>
          <option value="F">F</option>
          <option value="G">G</option>
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