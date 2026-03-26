"use client";
import SongPage from "@/app/components/SongPage";
import {Suspense} from "react";

export default function Page() {
  return (
    <div>
      <Suspense>
        <SongPage/>
      </Suspense>
    </div>
  )
}
