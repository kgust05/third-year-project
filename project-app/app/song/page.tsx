"use client";
import {getSongData} from "@/app/lib/data";
import ChordGrid from "@/app/components/ChordGrid";
import InstrumentList from "@/app/components/InstrumentList";
import {useState, useReducer, useEffect} from "react";
import Link from "next/link";
import {useSearchParams} from "next/navigation";

export default function Page() {
  const searchParams = useSearchParams();
  const [progs, setProgs] = useState([["1 major", "1 major", "1 major", "1 major"]]);
  const [keySig, setKeySig] = useState("C major");
  const [rhythms, setRhythms] = useState(["w"]);
  const [instruments, setInstruments] = useState(["Melody"]);
  const [dataLoaded, setDataLoaded] = useState(false);
  
  function setData(data : any) {
    setProgs(data.progressions);
    setKeySig(data.key_signature);
    setRhythms(data.rhythms);
    setInstruments(data.instruments);
  }

  useEffect(() => {
    if (!dataLoaded) {
      getSongData(parseInt(searchParams.get("song_id")!)).then(data => setData(data));
      setDataLoaded(true);
    }
  })

  const [currentProg, progDispatch] = useReducer(progReducer, Array(4).fill(""));

  function handleUpdateCurrentProg(chord : string, index : number) {
    progDispatch({
      type: "update",
      chord: chord,
      index: index
    })
  }

  function progReducer(currentProg : string[], action : any) {
    switch (action.type) {
      case "update": {
        return currentProg.map((c, i) => {
          if (action.index == i) {
            if (c == "") {
              return action.chord;
            }

            return "";
          }

          return c;
        })
      }
      default: {
        return currentProg;
      }
    }
  }



  return (
    <div>
      <h1 className="text-4xl text-center m-8">Bastille - Pompeii</h1>
      <p className="text-lg text-center">
        Insert descrption here.<br></br>
        Can include song's genre, its rhythms and chords,
        how they relate to other songs, e.g. similar chords/rhythms to get
        a similar sound, etc.<br></br>
        Essentially, additional information to allow a user to appreciate the <b>why </b>
        of the sound of the song that comes with the <b>how.</b>
      </p>
      <p>{}</p>
      <Link href="/">
        <button className="w-36 h-12 rounded-full bg-purple-800 text-white hover:bg-purple-600 active:bg-purple-400 m-8">
          Back to Menu
        </button>
      </Link>
      <InstrumentList
        instruments={instruments}
        prog={currentProg}
        keySig={keySig}
        rhythms={rhythms}
      />
      <ChordGrid
        progs={progs}
        currentProg={currentProg}
        onUpdateCurrentProg={handleUpdateCurrentProg}
      />
    </div>
  )
}
