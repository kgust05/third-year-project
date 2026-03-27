"use client";
import {getAllData} from "@/app/lib/data";
import {useState, useEffect} from "react";
import Link from "next/link";

export default function Page() {
  /**
   * Home page.
   * @returns JSX element.
   */

  const [songs, setSongs] = useState(Array());
  const [dataLoaded, setDataLoaded] = useState(false);

  // Loads all songs once after first render
  useEffect(() => {
    if (!dataLoaded) {
      getAllData().then(data => setSongs(data));
      setDataLoaded(true);
    }
  })

  // Creates rows for every song
  function createSongRows() {
    return songs.map(c => {
      return (
        <tr key={c.song_id}>
          <td className="px-6 py-4">{c.name}</td>
          <td className="px-6 py-4">{c.artist}</td>
          <td className="px-6 py-4">{c.key_sig}</td>
          <td className="px-6 py-4">{c.tempo}</td>
          <td className="px-6 py-4">
            <Link
              href={{
                pathname: "/song",
                query: {
                  song_id: c.song_id
                }
              }}
              >
                <button className="w-18 h-10 rounded-full bg-purple-800 text-white hover:bg-purple-600 active:bg-purple-400">
                  Go
                </button>
              </Link>
              </td>
        </tr>
      )
    })
  }

  return (
    <div className="font-sans grid cols-1 place-items-center">
      <h1 className="text-6xl text-center font-bold m-8">aChord</h1>
      <p className="text-lg text-center">
        A tool that lets people find songs with similar chords to other songs.
      </p>
      <h1 className="text-4xl text-center font-semibold m-8">Song List</h1>
      <div className="overflow-x-auto bg-[#bc9dcc] border border-[#906fa1] shadow-xs rounded-xl">
        <table className="w-full text-sm text-center text-body">
          <thead className="text-sm text-body border-b border-[#906fa1]">
            <tr>
              <th className="px-6 py-3 font-semibold">Name</th>
              <th className="px-6 py-3 font-semibold">Artist</th>
              <th className="px-6 py-3 font-semibold">Key</th>
              <th className="px-6 py-3 font-semibold">Tempo (BPM)</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#906fa1]">
            {createSongRows()}
          </tbody>
        </table>
      </div>
    </div>
  )  
}