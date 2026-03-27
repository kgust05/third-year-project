"use client";
import {useState, useEffect} from "react";

export default function RhythmSelector(
  {barLength, totalLength, onUpdateRhythm, onDeleteNote} :
  {barLength : number, totalLength : number, onUpdateRhythm : Function, onDeleteNote : Function}
) {
  /**
   * Component for selecting rhythms in the editor.
   * @param barLength Maximum length of a bar.
   * @param totalLength The current length of the created rhythm.
   * @param onUpdateRhythm Function for updating the current rhythm being created.
   * @param onDeleteNote Function for removing a note from the rhythm.
   * @returns JSX element.
   */

  const [note, setNote] = useState("w");
  const [dot, setDot] = useState(false);

  function handleUpdateNote(note : string) {
    setNote(note);
  }

  function handleUpdateDot() {
    setDot(!dot);
  }

  // Gets length of the current note
  // Has parameter for always making it a dotted note
  // for checking if a dotted note can be added
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

  // Checks if a note can be added
  function validNote(length : number) {
    if (length + totalLength > barLength) return false;
    return true;
  }

  // Adds note to the rhythm
  function addNote() {
    let fullNote = note;
    const length = getLength(false);

    if (dot) {
      fullNote += ".";
    }

    onUpdateRhythm(fullNote, length);
  }

  // Creates button for making a dotted note
  // Disabled if the dotted variant of current
  // note cannot be added
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

  // Creates button that adds a note to the rhythm
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

  // Checks if a dotted note can be added, disabled dot if it cannot
  useEffect(() => {
    if (!validNote(getLength(true))) setDot(false);
  })

  return (
    <div className="grid grid-flow-row gap-3 grid-cols-4 place-items-center">

        <select
          value={note}
          onChange={e => handleUpdateNote(e.target.value)}
          className="w-full px-3 py-2.5 bg-[#bc9dcc] border border-[#906fa1] text-sm rounded-xl"
        >
          <option value="w" disabled={!validNote(4)}>Semibreve/Whole Note</option>
          <option value="h" disabled={!validNote(2)}>Minim/Half Note</option>
          <option value="q" disabled={!validNote(1)}>Crotchet/Quarter Note</option>
          <option value="8" disabled={!validNote(0.5)}>Quaver/Eighth Note</option>
        </select>
      {createDotButton()}
      {createAddButton()}
      <div>
        <button
          type="button"
          className="w-36 h-12 rounded-full bg-red-800 text-white hover:bg-red-700 active:bg-red-600"
          onClick={() => onDeleteNote()}
        >
          Delete Note
        </button>
      </div>
    </div>
  )
}