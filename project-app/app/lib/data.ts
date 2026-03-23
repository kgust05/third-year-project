"use server"
import {neon} from "@neondatabase/serverless";

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