"use client";
import RhythmSelector from "./RhythmSelector";
import {useState, useReducer} from "react";

export default function RhythmEditor(
  {onUpdateRhythms, maxBar, onUpdateCurrent} :
  {onUpdateRhythms : Function, maxBar : number, onUpdateCurrent : Function}
) {
  /**
   * Component for adding rhythms in the editor.
   * @param onUpdateRhythms Function for adding a rhythm.
   * @param maxBar Maximum number of beats allowed in a bar.
   * @param onUpdateCurrent Function for updating the current rhythm to be added.
   * @returns JSX element.
   */

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

  // Turns a rhythm string into a readable list of notes
  // in the order they appear in the rhythm
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

  // Creates the button to add a rhythm to the song
  // Disabled if the length of the rhythm does not match
  // the bar length
  function createAddButton() {
    if (barLength == maxBar) return (
      <button
        type="button"
        className="w-36 h-12 rounded-full bg-purple-800 text-white hover:bg-purple-600 active:bg-purple-400 m-8"
        onClick={() => onUpdateRhythms("add", undefined, rhythm.join(" "))}
      >
        Add Rhythm
      </button>
    )
    else return (
      <div>
        <button
          type="button"
          className="w-36 h-12 rounded-full bg-gray-500 text-black m-8"
          disabled
        >
          Add Rhythm
        </button>
      </div>
    )
  }

  return (
    <div className="grid grid-flow-row gap-3 grid-cols-1 place-items-center">
      <h1 className="text-2xl text-center font-semibold">Rhythm</h1>
      <p>The selected rhythm <b>must </b> fill the bar.</p>
      <h2 className="text-center font-semibold">Current rhythm</h2>
      <p>{translateRhythm(rhythm.join(" "))}</p>
      <h2 className="text-center font-semibold">Current length</h2>
      <p>{barLength}</p>
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