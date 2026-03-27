"use server"
import {neon} from "@neondatabase/serverless";
import {redirect} from "next/navigation";

// Gets all data for a specific song
export async function getSongData(id : number) {
  const sql = neon(`${process.env.DATABASE_URL}`);
  const data = await sql`SELECT * FROM songs WHERE song_id = ${id}`;

  return data[0];
}

// Gets all song data
export async function getAllData() {
  const sql = neon(`${process.env.DATABASE_URL}`);
  const data = await sql`SELECT * FROM songs`;

  return data;
}

// Inserts a new song with the provided values into the database
export async function insertNewSong(formData : FormData) {
  const sql = neon(`${process.env.DATABASE_URL}`);
  const name = formData.get("name");
  const artist = formData.get("artist");
  const progs = (formData.get("progs") as string).replaceAll("[", "{").replaceAll("]", "}");
  const keySig = formData.get("keySig");
  const rhythms = (formData.get("rhythms") as string).replaceAll("[", "{").replaceAll("]", "}");
  const instruments = (formData.get("instruments") as string).replaceAll("[", "{").replaceAll("]", "}");
  const desc = formData.get("desc");
  const embed = formData.get("embed");
  const tempo = formData.get("tempo");

  await sql`INSERT INTO songs (name, artist, progs, key_sig, rhythms, instruments, description, embed, tempo)
  VALUES (${name}, ${artist}, ${progs}, ${keySig}, ${rhythms}, ${instruments}, ${desc}, ${embed}, ${tempo})`

  redirect("/");
}

// Gets all songs that contain the provided chord progression
// in their list of valid progressions
export async function selectWithProg(prog : string) {
  const sql = neon(`${process.env.DATABASE_URL}`);
  const progQuery = (prog).replaceAll("[", "{").replaceAll("]", "}");;

  const data = await sql`SELECT * FROM songs
  WHERE progs @> ${progQuery}`

  return data;
}