"use client"
import {useState, useEffect} from "react";
import {useSearchParams} from "next/navigation";
import {selectWithProg} from "@/app/lib/data";
import Link from "next/link";

export default function FindWithChordsPage() {
  const searchParams = useSearchParams();
  const [dataLoaded, setDataLoaded] = useState(false);
  const [data, setData] = useState(Array());

  useEffect(() => {
    if (!dataLoaded) {
      selectWithProg(searchParams.get("prog")!, searchParams.get("id")!).then(data => {
        setData(data);
      })
      setDataLoaded(true);
    }
  })

  function createRows() {
    let rows = Array();

    for (let i = 0; i < data.length; i++) {
      rows.push(
        <tr key={`song${i}`}>
          <td className="border border-gray-300 dark:border-gray-600">{data[i].name}</td>
          <td className="border border-gray-300 dark:border-gray-600">{data[i].artist}</td>
          <td className="border border-gray-300 dark:border-gray-600">{data[i].key_sig}</td>
          <td className="border border-gray-300 dark:border-gray-600">{data[i].tempo}</td>
          <td>
            <Link
              href={{
                pathname: "/song",
                query: {
                  song_id: data[i].song_id
                }
              }}
              >
                <button className="w-40 h-16 rounded-full bg-purple-800 text-white hover:bg-purple-600 active:bg-purple-400 m-8">
                  Go to song
                </button>
              </Link>
          </td>
        </tr>
      )
    }

    return rows;
  }

  return (
    <div>
      <table className="border-separate border-spacing-2 border border-gray-400 dark:border-gray-500">
        <thead>
          <tr>
            <th>Results</th>
          </tr>
        </thead>
        <tbody>
          {createRows()}
        </tbody>
      </table>
      <Link href="/">
        <button className="w-36 h-12 rounded-full bg-purple-800 text-white hover:bg-purple-600 active:bg-purple-400 m-8">
          Back to Menu
        </button>
      </Link>
    </div>
  )
}