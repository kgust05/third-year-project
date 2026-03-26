"use client";
import {getSongData} from "@/app/lib/data";
import ChordGrid from "@/app/components/ChordGrid";
import InstrumentList from "@/app/components/InstrumentList";
import SongPage from "@/app/components/SongPage";
import {useState, useReducer, useEffect, Suspense} from "react";
import Link from "next/link";
import {useSearchParams} from "next/navigation";

export default function Page() {
  return (
    <div>
      <Suspense>
        <SongPage/>
      </Suspense>
    </div>
  )
}
