export default function ChordGrid(
    {progs, currentProg, onUpdateCurrentProg}
    : {progs : string[][], currentProg : string[], onUpdateCurrentProg : Function}
) {
  let chordGrid = Array();
  let uniqueChords = getUniqueChords(progs);
  let validProgs = progs.filter(isValidProg);

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

  function isValidProg(prog : string[]) {
    for (let i = 0; i < currentProg.length; i++) {
      if (currentProg[i] != "" && currentProg[i] != prog[i]) return false;
    }

    return true;
  }

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

  function createButton(chord : string, bar : number) {
    if (checkValidChord(chord, bar)) {
      let styleString;

      if (currentProg[bar] == chord) styleString = "bg-fuchsia-600 text-white hover:bg-fuchsia-400 active:bg-fuchsia-200";
        else styleString = "bg-purple-800 text-white hover:bg-purple-600 active:bg-purple-400";

      return (
        <button
          key={(bar + 1) + chord}
          className={"w-1/2 rounded-full " + styleString}
          onClick={() => onUpdateCurrentProg(chord, bar)}
        >
          {chord}
        </button>
      )
    }

    return (
      <button
        key={(bar + 1) + chord}
        className="w-1/2 rounded-full bg-gray-500"
        disabled
      >
        {chord}
      </button>
    )
  }

  for (let r = 0; r < uniqueChords.length + 1; r++) {
    for (let c = 0; c < 4; c++) {
        if (r == 0) {
            chordGrid.push(<h1 key={c + 1}>{c + 1}</h1>);
        } else {
            chordGrid.push(createButton(uniqueChords[r - 1], c));
        }
    }
  }

  return (
    <div className={"grid m-8 grid-flow-row grid-cols-4 gap-1 place-items-center"}>
      {chordGrid}
    </div>
  )
}