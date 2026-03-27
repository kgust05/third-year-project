"use client";
import RhythmSelector from "./RhythmSelector";
import {useState, useReducer} from "react";

export default function RhythmEditor(
  {onUpdateRhythms, maxBar, onUpdateCurrent} :
  {onUpdateRhythms : Function, maxBar : number, onUpdateCurrent : Function}
) {
  const [rhythm, dispatch] = useReducer(rhythmReducer, Array());
  const [barLength, setBarLength] = useState(0);
  const [noteLengths, setNoteLengths] = useState(Array());

  function rhythmHandler(type : string, note? : string) {
    dispatch({
      type: type,
      note: note
    })
  }

  function handleUpdateCurrent(length : number, addedNote? : string) {
    if (length == maxBar) {
      onUpdateCurrent([...rhythm, addedNote].join(" "));
    } else {
      onUpdateCurrent("");
    }
  }

  function handleAddNote(note : string, noteLength : number) {
    setBarLength(barLength + noteLength);
    setNoteLengths([...noteLengths, noteLength]);
    rhythmHandler("add", note);
    handleUpdateCurrent(barLength + noteLength, note);
  }

  function handleDeleteNote() {
    const deletedLength = noteLengths[noteLengths.length - 1];
    setBarLength(barLength - deletedLength);
    setNoteLengths(noteLengths.filter((l, i) => i != noteLengths.length - 1));
    rhythmHandler("delete");
    handleUpdateCurrent(barLength - deletedLength);
  }

  function rhythmReducer(rhythm : string[], action : any) {
    switch (action.type) {
      case "add": {
        return [...rhythm, action.note];
      }
      case "delete": {
        return rhythm.filter((n, i) => i != rhythm.length - 1);
      }
      default: {
        return rhythm;
      }
    }
  }

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


  function createAddButton() {
    if (barLength == maxBar) return (
      <button
        type="button"
        className="w-36 h-12 rounded-full bg-purple-800 text-white hover:bg-purple-600 active:bg-purple-400"
        onClick={() => onUpdateRhythms("add", undefined, rhythm.join(" "))}
      >
        Add Rhythm
      </button>
    )
    else return (
      <div>
        <button
          type="button"
          className="w-36 h-12 rounded-full bg-gray-500 text-black"
          disabled
        >
          Add Rhythm
        </button>
      </div>
    )
  }

  return (
    <div className="grid grid-flow-row gap-3 grid-cols-3 place-items-center">
      <p>{translateRhythm(rhythm.join(" "))}</p>
      <RhythmSelector
        barLength={4}
        totalLength={barLength}
        onUpdateRhythm={handleAddNote}
        onDeleteNote={handleDeleteNote}
      />
      {createAddButton()}
    </div>
  )
}