"use client";
import FindWithChordsPage from "@/app/components/FindWithChordsPage";
import {Suspense} from "react";

export default function Page() {
  /**
   * FindWithChords page with content as a component wrapped in Suspense.
   * @returns JSX element.
   */

  return (
    <div>
      <Suspense>
        <FindWithChordsPage/>
      </Suspense>
    </div>
  )
}