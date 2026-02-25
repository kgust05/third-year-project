import {useRef, useEffect} from "react";
import VexFlow from "vexflow";

export default function Stave({prog, rhythm} : {prog : string[], rhythm : string}) {
  const staveRef = useRef<HTMLDivElement>(null);
  const scale = ["A", "B", "C", "D", "E", "F", "G"];

  function barSolver(chord : string) {
    if (chord == "") return "D5/w/r";

    const first = chord[0];
    const third = scale[(scale.indexOf(first) + 2) % scale.length];
    const fifth = scale[(scale.indexOf(first) + 4) % scale.length];
    const rhythmArray = rhythm.split(" ");
    let barString = "";

    for (let note of rhythmArray) barString += `(${first}4 ${third}4 ${fifth}4)/${note}, `;

    return barString;
  }

  useEffect(() => {
    const stave = staveRef.current!;

    while (stave.hasChildNodes()) {
    stave.removeChild(stave.lastChild!);
    }

    const notes1 = barSolver(prog[0]);
    const notes2 = barSolver(prog[1]);
    const notes3 = barSolver(prog[2]);
    const notes4 = barSolver(prog[3]);

    const factory = new VexFlow.Factory({
      renderer: { elementId: "output", width: 801, height: 200 },
    });

    const score = factory.EasyScore();
    const system1 = factory.System({x: 0, width : 200});
    const system2 = factory.System({x: 200, width: 200});
    const system3 = factory.System({x: 400, width: 200});
    const system4 = factory.System({x: 600, width: 200});

    system1
    .addStave({
      voices: [
      score.voice(score.notes(notes1)),
      ],
    })
    .addClef('treble')
    .addTimeSignature('4/4');

    system2
    .addStave({
      voices: [
      score.voice(score.notes(notes2)),
      ],
    })

    system3
    .addStave({
      voices: [
      score.voice(score.notes(notes3)),
      ],
    })

    system4
    .addStave({
      voices: [
      score.voice(score.notes(notes4)),
      ],
    }).setEndBarType(VexFlow.Barline.type.END);

    factory.draw();
  })

  return (
    <div ref={staveRef} id="output" className=" m-8 place-items-center"></div>
  )
}