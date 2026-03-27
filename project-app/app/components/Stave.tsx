import {useRef, useEffect} from "react";
import VexFlow from "vexflow";
import {Scale, Chord} from "tonal";

export default function Stave(
  {prog, keySig, rhythm, instrument} : 
  {prog : string[], keySig : string, rhythm : string, instrument : string}
) {
  const parsedInst = JSON.parse(instrument);
  const staveRef = useRef<HTMLDivElement>(null);
  let clef : string;

  if (parsedInst.octave < 4) clef = "bass";
    else clef = "treble";

  function keySolver() {
    const mode = keySig.split(" ")[1];
    const sig = Scale.degrees(keySig);

    switch (mode) {
      case "major": return sig(1);
      case "minor": return sig(3);
      default: return "C";
    }
  }

  function barSolver(chord : string) {
    if (chord == "" || rhythm == "") {
      if (clef == "treble") return "D5/w/r";
        else return "F3/w/r";
    }

    const chordSplit = chord.split(" ");
    const degree = Number(chordSplit[0]);
    const mode = chordSplit[1];
    const chordNotes = Chord.get(`${Scale.degrees(keySig)(degree)} ${mode}`).notes;
    const scale = Scale.get(keySig).notes;
    let indices;

    if (parsedInst.rootOnly) indices = 1;
      else indices = chordNotes.length;
    
    for (let n = 0; n < indices; n++) {
      const note = chordNotes[n];

      if (scale.includes(note)) {
        if (note.length > 1) {
          chordNotes[n] = note[0];
        }
      } else {
        if (note.length == 1) {
          chordNotes[n] = `${note}n`;
        }
      }
    }

    const rhythmArray = rhythm.split(" ");
    let chordString = "";
    let barString = "";

    for (let n = 0; n < indices; n++) chordString += `${chordNotes[n]}${parsedInst.octave} `;

    if (indices == 1) {for (let r of rhythmArray) barString += `${chordString}/${r}, `;}
      else {for (let r of rhythmArray) barString += `(${chordString})/${r}, `;}

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
      renderer: { elementId: `${parsedInst.name}Stave`, width: 1201, height: 150 },
    });

    const score = factory.EasyScore();
    const system1 = factory.System({x: 0, width : 300});
    const system2 = factory.System({x: 300, width: 300});
    const system3 = factory.System({x: 600, width: 300});
    const system4 = factory.System({x: 900, width: 300});

    system1
    .addStave({
      voices: [
      score.voice(score.notes(notes1, {clef: clef})),
      ],
    })
    .addClef(clef)
    .addTimeSignature('4/4')
    .addKeySignature(keySolver());

    system2
    .addStave({
      voices: [
      score.voice(score.notes(notes2, {clef: clef})),
      ],
    })

    system3
    .addStave({
      voices: [
      score.voice(score.notes(notes3, {clef: clef})),
      ],
    })

    system4
    .addStave({
      voices: [
      score.voice(score.notes(notes4, {clef: clef})),
      ],
    }).setEndBarType(VexFlow.Barline.type.END);

    factory.draw();
  })

  return (
    <div ref={staveRef} id={`${parsedInst.name}Stave`} className=" m-8 place-items-center"></div>
  )
}