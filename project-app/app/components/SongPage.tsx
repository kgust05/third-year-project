"use client";
import {getSongData} from "@/app/lib/data";
import ChordGrid from "@/app/components/ChordGrid";
import InstrumentList from "@/app/components/InstrumentList";
import SongPlayer from "@/app/components/SongPlayer";
import {useState, useReducer, useEffect} from "react";
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
    }
  ]);
  const [dataLoaded, setDataLoaded] = useState(false);
  const [name, setName] = useState("");
  const [artist, setArtist] = useState("");
  const [desc, setDesc] = useState(null);
  const [embed, setEmbed] = useState("");
  const [tempo, setTempo] = useState(120);
  const [currentProg, progDispatch] = useReducer(progReducer, Array(4).fill(""));
  const [currentRhythms, rhythmsDispatch] = useReducer(rhythmsReducer, Array(instruments.length).fill(""));
  
  function setData(data : any) {
    setProgs(data.progs);
    setKeySig(data.key_sig);
    setRhythms(data.rhythms);
    setInstruments(data.instruments);
    setName(data.name);
    setArtist(data.artist);
    setDesc(data.description);
    setEmbed(data.embed);
    setTempo(data.tempo);
  }

  useEffect(() => {
    if (!dataLoaded) {
      getSongData(parseInt(searchParams.get("song_id")!)).then(data => {
        setData(data)

        if (data.instruments.length != currentRhythms.length) {
          handleResetCurrentRhythms(data.instruments.length);
        }
      });
      setDataLoaded(true);
    }
  })

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

  function handleResetCurrentRhythms(length : number) {
    rhythmsDispatch({
      type: "reset",
      length: length
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
      case "reset": {
        return Array(action.length).fill("");
      }
      default: {
        return rhythms;
      }
    }
  }

  function createEmbed() {
    if (embed != "") {
      return (
        <div className="place-items-center">
          <iframe
          width="560"
          height="315"
          src={embed}
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin" allowFullScreen
        ></iframe>
        </div>
      )
    }
    else return null;
  }

  function createFindWithChords() {
    for (let c of currentProg) {
      if (c == "") return (
        <div>
          <button
            type="button"
            className="w-60 h-12 rounded-full bg-gray-500 text-black m-8"
            disabled
          >
            Find songs with these chords
          </button>
        </div>
      )
    }

    return (
      <div>
        <Link
          href={{
            pathname: "/findwithchords",
            query: {
              prog: JSON.stringify(currentProg),
              id: searchParams.get("song_id")
            }
          }}
          >
          <button className="w-60 h-12 rounded-full bg-purple-800 text-white hover:bg-purple-600 active:bg-purple-400 m-8">
            Find songs with these chords
          </button>
        </Link>
      </div>
    )
  }

  return (
    <div>
      <h1 className="text-4xl text-center m-8">{artist} - {name}</h1>
      <p className="text-lg text-center">{desc}</p>
      {createEmbed()}
      <Link href="/">
        <button className="w-36 h-12 rounded-full bg-purple-800 text-white hover:bg-purple-600 active:bg-purple-400 m-8">
          Back to Menu
        </button>
      </Link>
      {createFindWithChords()}
      <SongPlayer
        keySig={keySig}
        prog={currentProg}
        instruments={instruments}
        rhythms={currentRhythms}
        tempo={tempo}
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
        keySig={keySig}
      />
    </div>
  )
}
