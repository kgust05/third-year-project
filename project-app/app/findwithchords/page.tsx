"use client";
import FindWithChordsPage from "@/app/components/FindWithChordsPage";
import {Suspense} from "react";

export default function Page() {
  return (
    <div>
      <Suspense>
        <FindWithChordsPage/>
      </Suspense>
    </div>
  )
}