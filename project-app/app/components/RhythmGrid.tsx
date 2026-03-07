export default function RhythmGrid(
  {rhythms, currentRhythm, onUpdateCurrentRhythm} :
  {rhythms : string[], currentRhythm : string, onUpdateCurrentRhythm : Function}
) {
  let rhythmGrid = Array();

  for (let r of rhythms) {
    let styleString;

    if (r == currentRhythm) styleString = "bg-fuchsia-600 text-white hover:bg-fuchsia-400 active:bg-fuchsia-200";
      else styleString = "bg-purple-800 text-white hover:bg-purple-600 active:bg-purple-400";

    rhythmGrid.push(
      <button
        key={rhythms.indexOf(r) + 1}
        className={"w-30 h-12 rounded-full " + styleString}
        onClick={() => onUpdateCurrentRhythm(r)}
      >
        Rhythm {rhythms.indexOf(r) + 1}
      </button>
    )
  }

  return (
    <div>
      <h1 className="text-3xl text-center m-8">Choose your rhythm</h1>
      <div className={"grid m-8 grid-flow-row grid-cols-4 gap-3 place-items-center"}>
        {rhythmGrid}
      </div>
    </div>
  )
}