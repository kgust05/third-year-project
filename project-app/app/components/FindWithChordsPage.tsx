"use client"
import {useState, useEffect} from "react";
import {useSearchParams} from "next/navigation";
import {selectWithProg} from "@/app/lib/data";
import Link from "next/link";

export default function FindWithChordsPage() {
  /**
   * Page component for page that displays all songs with a provided chord progression.
   * @returns JSX element.
   */

  const searchParams = useSearchParams();
  const [dataLoaded, setDataLoaded] = useState(false);
  const [data, setData] = useState(Array());

  // Loads data once after the first render
  useEffect(() => {
    if (!dataLoaded) {
      selectWithProg(searchParams.get("prog")!).then(data => {
        setData(data);
      })
      setDataLoaded(true);
    }
  })

  // Creates rows of all entries fetched from the database
  function createRows() {
    let rows = Array();

    for (let i = 0; i < data.length; i++) {
      rows.push(
        <tr key={`song${i}`}>
          <td className="px-6 py-4">{data[i].name}</td>
          <td className="px-6 py-4">{data[i].artist}</td>
          <td className="px-6 py-4">{data[i].key_sig}</td>
          <td className="px-6 py-4">{data[i].tempo}</td>
          <td className="px-6 py-4">
            <Link
              href={{
                pathname: "/song",
                query: {
                  song_id: data[i].song_id
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
    }

    return rows;
  }

  return (
    <div className="grid cols-1 m-8 place-items-center">
      <h1 className="text-4xl text-center font-bold m-8">Results</h1>
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
            {createRows()}
          </tbody>
        </table>
      </div>
    </div>
  )
}