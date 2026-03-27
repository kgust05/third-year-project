"use client";
import {useRef} from "react";
import {Soundfont} from "smplr";
import {Scale, Chord} from "tonal";

export default function SongPlayer(
  {prog, keySig, instruments, rhythms, tempo} : 
  {prog : string[], keySig : string, instruments : any[], rhythms : string[], tempo : number}
) {
  /**
   * Component for allowing playback of a created phrase of music.
   * @param prog Chord progression.
   * @param keySig Key signature of the phrase.
   * @param instruments All instruments in the song.
   * @param rhythms Rhythms of the corresponding instruments.
   * @param tempo The tempo in beats per minute of the song.
   * @returns JSX element.
   */

  const actx = useRef(new AudioContext());

  // Gets notes of a chord
  function getChord(chord : string, octave : number) {
    const chordSplit = chord.split(" ");
    const degree = Number(chordSplit[0]);
    const mode = chordSplit[1];
    let chordNotes = Chord.get(`${Scale.degrees(keySig)(degree)} ${mode}`).notes;

    chordNotes = chordNotes.map((n) => {return `${n}${octave}`});
    
    return chordNotes;
  }

  // Gets length of a note
  function getLength(note : string) {
    let length;

    switch (note[0]) {
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

    if (note[1] == ".") {
      length *= 1.5;
    }

    return length;
  }

  // Gets lengths of all notes in a rhythm
  function rhythmSolver(rhythm : string) {
    const rhythmSplit = rhythm.split(" ");
    const lengths = Array();

    for (let note of rhythmSplit) {
      lengths.push(getLength(note));
    }

    return lengths;
  }

  // Plays sound for a single instrument
  function play(instrument : Soundfont, octave : number = 4, rootOnly : Boolean = false, rhythm : string, beat : number) {
    let voice1 = Array();
    let voice2 = Array();
    let voice3 = Array();
    const lengths = rhythmSolver(rhythm);

    for (let c of prog) {
      const chord = getChord(c, octave);
      voice1.push(chord[0]);
      voice2.push(chord[1]);
      voice3.push(chord[2]);
    }

    if (actx.current.state === "suspended") {
      actx.current.resume();
    }

    const now = actx.current.currentTime + 1;

    voice1.forEach((note, i) => {
      let acc = 0;

      for (let l of lengths) {
        instrument.start({ note, time: now + (i * beat * 4) + acc, duration: (l * beat) });
        acc += l * beat;
      }
    });

    if (!rootOnly) {
      voice2.forEach((note, i) => {
        let acc = 0;

        for (let l of lengths) {
          instrument.start({ note, time: now + (i * beat * 4) + acc, duration: (l * beat) });
          acc += l * beat;
        }
      });

      voice3.forEach((note, i) => {
        let acc = 0;

        for (let l of lengths) {
          instrument.start({ note, time: now + (i * beat * 4) + acc, duration: (l * beat) });
          acc += l * beat;
        }
      });
    }
  }

  let beat = 60 / tempo;

  // Plays sound for all instruments
  function playAll() {
    for (let i = 0; i < instruments.length; i++) {
      play(
        new Soundfont(actx.current, {instrument: instruments[i].inst}),
        instruments[i].octave,
        instruments[i].rootOnly,
        rhythms[i],
        beat);
    }
  }

  // Checks if any chord in the progression is empty
  function checkEmptyChord() {
    for (let c of prog) {
      if (c == "") return true;
    }

    return false;
  }

  // Creates play button
  // Disabled if chord progression is incomplete
  function createPlayButton() {
    if (checkEmptyChord()) {
      return (
        <div>
          <button
            type="button"
            className="w-36 h-12 rounded-full bg-gray-500 text-black mb-8"
            disabled
          >
            Play Phrase
          </button>
        </div>
      )
    }
    else {
      return (
        <div>
          <button
            className="w-36 h-12 rounded-full bg-purple-800 text-white hover:bg-purple-600 active:bg-purple-400 mb-8"
            onClick={() => playAll()}
          >
            Play Phrase
          </button>
        </div>
      )
    }
  }

  return (
    <div>
      {createPlayButton()}
    </div>
  )
}