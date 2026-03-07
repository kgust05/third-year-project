import Link from "next/link";

export default function Page() {
  return (
    <div className="grid cols-1 place-items-center">
      <h1 className="text-6xl text-center m-8">aMuse</h1>
      <p className="text-lg text-center">
        A tool for musicians to learn <b>why </b>
        their favourite songs sound like they do,
        not just <b>how.</b>
      </p>
      <h1 className="text-4xl text-center m-8">Song List (more added in the future)</h1>
      <Link href="/song1">
        <button className="w-40 h-16 rounded-full bg-purple-800 text-white hover:bg-purple-600 active:bg-purple-400 m-8">
          Bastille - Pompeii
        </button>
      </Link>

      <Link href="/song2">
        <button className="w-56 h-16 rounded-full bg-purple-800 text-white hover:bg-purple-600 active:bg-purple-400 m-8">
          Chappell Roan - Pink Pony Club
        </button>
      </Link>
    </div>
  )  
}