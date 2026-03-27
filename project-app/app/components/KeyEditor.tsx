"use client";
import {useState} from "react";

export default function KeyEditor(
  {onUpdateKey} :
  {onUpdateKey : Function}
) {
  /**
   * Component for adding a key signature in the editor.
   * @param onUpdateKey Function for updating the key of the song.
   * @returns JSX element.
   */

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
    <div className="grid grid-flow-row gap-3 grid-cols-1 place-items-center">
      <h1 className="text-2xl text-center font-semibold">Key</h1>
      <div className="w-48 grid grid-flow-row gap-3 grid-cols-2 place-items-center">
        <h2 className="text-center font-semibold">Pitch</h2>
        <h2 className="text-center font-semibold">Mode</h2>
        <div>
          <select
            value={note}
            onChange={e => handleUpdateNote(e.target.value)}
            className="w-full px-3 py-2.5 bg-[#bc9dcc] border border-[#906fa1] text-sm rounded-xl"
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
            className="w-full px-3 py-2.5 bg-[#bc9dcc] border border-[#906fa1] text-sm rounded-xl"
          >
            <option value="major">Major</option>
            <option value="minor">Minor</option>
          </select>
        </div>
      </div>
      </div>
  )
}