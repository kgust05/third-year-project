"use client";
import {getSongData} from "@/app/lib/data";
import ChordGrid from "@/app/components/ChordGrid";
import InstrumentList from "@/app/components/InstrumentList";
import SongPlayer from "@/app/components/SongPlayer";
import {useState, useReducer, useEffect, useRef} from "react";
import Link from "next/link";
import {useSearchParams} from "next/navigation";

export default function SongPage() {
  const searchParams = useSearchParams();
  const [progs, setProgs] = useState([["1 major", "1 major", "1 major", "1 major"]]);
  const [keySig, setKeySig] = useState("C major");
  const [rhythms, setRhythms] = useState(["w"]);
  const [instruments, setInstruments] = useState([
    {
      name: "Piano",
      inst: "acoustic_grand_piano",
      octave: 4,
      rootOnly: false
    },
    {
      name: "Bass",
      inst: "acoustic_bass",
      octave: 2,
      rootOnly: true
    }
  ]);
  const [dataLoaded, setDataLoaded] = useState(false);
  const [name, setName] = useState("");
  const [artist, setArtist] = useState("");
  const [desc, setDesc] = useState(null);
  
  function setData(data : any) {
    setProgs(data.progs);
    setKeySig(data.key_sig);
    setRhythms(data.rhythms);
    //setInstruments(data.instruments);
    setName(data.name);
    setArtist(data.artist);
    setDesc(data.description);
  }

  useEffect(() => {
    if (!dataLoaded) {
      getSongData(parseInt(searchParams.get("song_id")!)).then(data => setData(data));
      setDataLoaded(true);
    }
  })

  const [currentProg, progDispatch] = useReducer(progReducer, Array(4).fill(""));
  const [currentRhythms, rhythmsDispatch] = useReducer(rhythmsReducer, Array(instruments.length).fill(""));

  function handleUpdateCurrentProg(chord : string, index : number) {
    progDispatch({
      type: "update",
      chord: chord,
      index: index
    })
  }

  function handleUpdateCurrentRhythms(rhythm : string, index : number) {
    rhythmsDispatch({
      type: "update",
      rhythm: rhythm,
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

  function rhythmsReducer(rhythms : string[], action : any) {
    switch (action.type) {
      case "update": {
        return rhythms.map((r, i) => {
          if (action.index == i) return action.rhythm;
          return r;
        })
      }
      default: {
        return rhythms;
      }
    }
  }

  return (
    <div>
      <h1 className="text-4xl text-center m-8">{artist} - {name}</h1>
      <p className="text-lg text-center">{desc}</p>
      <p>{currentRhythms}</p>
      <Link href="/">
        <button className="w-36 h-12 rounded-full bg-purple-800 text-white hover:bg-purple-600 active:bg-purple-400 m-8">
          Back to Menu
        </button>
      </Link>
      <SongPlayer
        keySig={keySig}
        prog={currentProg}
        instruments={instruments}
        rhythms={currentRhythms}
        tempo={150}
      />
      <InstrumentList
        instruments={instruments}
        prog={currentProg}
        keySig={keySig}
        rhythms={rhythms}
        onUpdateRhythms={handleUpdateCurrentRhythms}
      />
      <ChordGrid
        progs={progs}
        currentProg={currentProg}
        onUpdateCurrentProg={handleUpdateCurrentProg}
      />
    </div>
  )
}
