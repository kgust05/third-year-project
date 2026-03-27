"use client";
import {useState, useEffect} from "react";

export default function RhythmSelector(
  {barLength, totalLength, onUpdateRhythm, onDeleteNote} :
  {barLength : number, totalLength : number, onUpdateRhythm : Function, onDeleteNote : Function}
) {
  const [note, setNote] = useState("w");
  const [dot, setDot] = useState(false);

  function handleUpdateNote(note : string) {
    setNote(note);
  }

  function handleUpdateDot() {
    setDot(!dot);
  }

  function getLength(fixDot : Boolean) {
    let length;

    switch (note) {
      case "w": {
        length = 4;
        break;
      }
      case "h": {
        length = 2;
        break;
      }
      case "q": {
        length = 1;
        break;
      }
      case "8": {
        length = 0.5;
        break;
      }
      default: {
        length = 0;
        break;
      }
    }
    

    if (fixDot) {
      length *= 1.5;
    } else {
      if (dot) {
        length *= 1.5;
      }
    }
    
    return length;
  }

  function validNote(length : number) {
    if (length + totalLength > barLength) return false;
    return true;
  }

  function addNote() {
    let fullNote = note;
    const length = getLength(false);

    if (dot) {
      fullNote += ".";
    }

    onUpdateRhythm(fullNote, length);
  }

  function createDotButton() {
    if (validNote(getLength(true))) {
      if (dot) return (
        <div>
          <button
            type="button"
            className="w-36 h-12 rounded-full bg-fuchsia-600 text-white hover:bg-fuchsia-400 active:bg-fuchsia-200"
            onClick={() => handleUpdateDot()}
          >
            Toggle Dot
          </button>
        </div>
      )
      else return (
        <div>
          <button
            type="button"
            className="w-36 h-12 rounded-full bg-purple-800 text-white hover:bg-purple-600 active:bg-purple-400"
            onClick={() => handleUpdateDot()}
          >
            Toggle Dot
          </button>
        </div>
      )
    } else return (
        <div>
          <button
            type="button"
            className="w-36 h-12 rounded-full bg-gray-500 text-black"
            disabled
          >
            Toggle Dot
          </button>
        </div>
      )  
  }

  function createAddButton() {
    if (validNote(getLength(false))) return (
        <div>
          <button
            type="button"
            className="w-36 h-12 rounded-full bg-purple-800 text-white hover:bg-purple-600 active:bg-purple-400"
            onClick={() => addNote()}
          >
            Add Note
          </button>
      </div>
      )
    else return (
      <div>
        <button
          type="button"
          className="w-36 h-12 rounded-full bg-gray-500 text-black"
          disabled
        >
          Add Note
        </button>
      </div>
    )
  }

  useEffect(() => {
    if (!validNote(getLength(true))) setDot(false);
  })

  return (
    <div className="grid grid-flow-row gap-3 grid-cols-3 place-items-center">
      <div>
        Note:
        <select
          value={note}
          onChange={e => handleUpdateNote(e.target.value)}
        >
          <option value="w" disabled={!validNote(4)}>Semibreve/Whole Note</option>
          <option value="h" disabled={!validNote(2)}>Minim/Half Note</option>
          <option value="q" disabled={!validNote(1)}>Crotchet/Quarter Note</option>
          <option value="8" disabled={!validNote(0.5)}>Quaver/Eighth Note</option>
        </select>
      </div>
      {createDotButton()}
      {createAddButton()}
      <div>
        <button
          type="button"
          className="w-36 h-12 rounded-full bg-purple-800 text-white hover:bg-purple-600 active:bg-purple-400"
          onClick={() => onDeleteNote()}
        >
          Delete Note
        </button>
      </div>
    </div>
  )
}