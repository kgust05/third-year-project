"use client";
import SongPage from "@/app/components/SongPage";
import {Suspense} from "react";

export default function Page() {
  /**
   * Song page with content as a component wrapped in Suspense.
   * @returns JSX element.
   */

  return (
    <div>
      <Suspense>
        <SongPage/>
      </Suspense>
    </div>
  )
}
