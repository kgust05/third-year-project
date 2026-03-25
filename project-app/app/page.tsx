"use client";
import {getAllData} from "@/app/lib/data";
import {useState, useEffect} from "react";
import Link from "next/link";

export default function Page() {
  const [songs, setSongs] = useState(Array());
  const [dataLoaded, setDataLoaded] = useState(false);

  useEffect(() => {
    if (!dataLoaded) {
      getAllData().then(data => setSongs(data));
      setDataLoaded(true);
    }
  })

  function displayAllLinks() {
    return songs.map(c => {
      return (
        <div key={c.song_id}>
          <Link
          href={{
            pathname: "/song",
            query: {
              song_id: c.song_id
            }
          }}
          >
            <button className="w-40 h-16 rounded-full bg-purple-800 text-white hover:bg-purple-600 active:bg-purple-400 m-8">
              {c.artist} - {c.name}
            </button>
          </Link>
        </div>
      )
    })
  }

  return (
    <div className="grid cols-1 place-items-center">
      <iframe
        width="560"
        height="315"
        src="https://www.youtube.com/embed/dQw4w9WgXcQ?si=LApUg9bp1q6rsQh9"
        title="YouTube video player"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>

      <h1 className="text-6xl text-center m-8">aMuse</h1>
      <p className="text-lg text-center">
        A tool for musicians to learn <b>why </b>
        their favourite songs sound like they do,
        not just <b>how.</b>
      </p>
      <h1 className="text-4xl text-center m-8">Song List (more added in the future)</h1>
      {displayAllLinks()}
    </div>
  )  
}