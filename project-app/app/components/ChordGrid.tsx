import {Chord, Scale} from "tonal";

export default function ChordGrid(
    {progs, currentProg, onUpdateCurrentProg, keySig}
    : {progs : string[][], currentProg : string[], onUpdateCurrentProg : Function, keySig : string}
) {
  /**
   * Component for toggling chords based on provided valid progressions on song pages.
   * @param progs All valid progressions for the song.
   * @param currentProg The current selected progression.
   * @param onUpdateCurrentProg Function for updating the selected progression.
   * @param keySig Key signature of the song.
   * @returns JSX element.
   */

  let chordGrid = Array();
  let uniqueChords = getUniqueChords(progs);
  let validProgs = progs.filter(isValidProg);

  // Returns array of all chords used
  // over all progressions with no duplicates
  function getUniqueChords(progs : string[][]) {
    let uniqueChords = Array();

    for (let p of progs) {
      for (let c of p) {
        if (!uniqueChords.includes(c)) {
          uniqueChords.push(c);
        }
      }
    }

    uniqueChords.sort();

    return uniqueChords;
  }

  // Checks if provided progression matches any non-empty chord
  // of the current progression
  function isValidProg(prog : string[]) {
    for (let i = 0; i < currentProg.length; i++) {
      if (currentProg[i] != "" && currentProg[i] != prog[i]) return false;
    }

    return true;
  }

  // Checks if chord appears in the provided bar of any valid progression
  function checkValidChord(chord : string, bar : number) {
    let chordsAtBar = Array();

    for (let p of validProgs) {
      if (!chordsAtBar.includes(p[bar])) {
        chordsAtBar.push(p[bar]);
      }
    }

    if (chordsAtBar.includes(chord)) return true;

    return false;
  }

  // Gets chord name
  function chordName(chord : string) {
    const chordSplit = chord.split(" ");
    const degree = Number(chordSplit[0]);
    const mode = chordSplit[1];
    const chordName = Chord.get(`${Scale.degrees(keySig)(degree)} ${mode}`).name;

    return chordName;
  }

  // Creates a button for the specified chord at the specified bar
  // Button is disabled of chord is not valid at that bar
  function createButton(chord : string, bar : number) {
    if (checkValidChord(chord, bar)) {
      let styleString;

      if (currentProg[bar] == chord) styleString = "bg-fuchsia-600 text-white hover:bg-fuchsia-400 active:bg-fuchsia-200";
        else styleString = "bg-purple-800 text-white hover:bg-purple-600 active:bg-purple-400";

      return (
        <button
          key={(bar + 1) + chord}
          className={"w-24 h-12 rounded-full " + styleString}
          onClick={() => onUpdateCurrentProg(chord, bar)}
        >
          {chordName(chord)}
        </button>
      )
    }

    return (
      <button
        key={(bar + 1) + chord}
        className="w-24 h-12 rounded-full bg-gray-500 text-black"
        disabled
      >
        {chordName(chord)}
      </button>
    )
  }

  // Creation of the chord buttons
  for (let r = 0; r < uniqueChords.length + 1; r++) {
    for (let c = 0; c < 4; c++) {
        if (r == 0) {
            chordGrid.push(<h1 key={c + 1} className="font-semibold text-2xl">Bar {c + 1}</h1>);
        } else {
            chordGrid.push(createButton(uniqueChords[r - 1], c));
        }
    }
  }

  return (
    <div>
      <h1 className="font-semibold text-3xl text-center m-8">Choose your chords</h1>
      <div className={"grid m-8 grid-flow-row grid-cols-4 gap-3 place-items-center"}>
        {chordGrid}
      </div>
    </div>
  )
}