"use server"
import {neon} from "@neondatabase/serverless";
import {redirect} from "next/navigation";

export async function getSongData(id : number) {
  const sql = neon(`${process.env.DATABASE_URL}`);
  const data = await sql`SELECT * FROM songs WHERE song_id = ${id}`;

  return data[0];
}

export async function getAllData() {
  const sql = neon(`${process.env.DATABASE_URL}`);
  const data = await sql`SELECT * FROM songs`;

  return data;
}

export async function insertNewSong(formData : FormData) {
  const sql = neon(`${process.env.DATABASE_URL}`);
  const progs = (formData.get("progs") as string).replaceAll("[", "{").replaceAll("]", "}");
  const keySig = formData.get("keySig");
  const rhythms = (formData.get("rhythms") as string).replaceAll("[", "{").replaceAll("]", "}");

  await sql`INSERT INTO songs (name, artist, progressions, key_signature, rhythms, instruments)
  VALUES ('testName', 'testArtist', ${progs}, ${keySig}, ${rhythms}, ARRAY['Melody', 'Guitar', 'Keys', 'Bass'])`

  redirect("/");
}