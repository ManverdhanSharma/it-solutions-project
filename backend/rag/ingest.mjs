import "dotenv/config";
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { openStore, upsertChunk } from "./store.js";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const embedder = genAI.getGenerativeModel({ model: "text-embedding-004" }); // current embeddings model

function chunkText(text, size = 1000, overlap = 200) {
  const chunks = [];
  for (let i=0;i<text.length;i+= (size - overlap)) {
    chunks.push(text.slice(i, i+size));
  }
  return chunks;
}

async function embed(text) {
  const r = await embedder.embedContent({ content: { parts: [{ text }] } });
  return r.embedding.values; // Float vector
}

async function run(dir = "knowledge") {
  const db = openStore();
  const files = fs.readdirSync(dir).filter(f => f.endsWith(".md") || f.endsWith(".txt"));
  for (const f of files) {
    const full = path.join(dir, f);
    const raw = fs.readFileSync(full, "utf8");
    const { content, data } = matter(raw);
    const chunks = chunkText(content);
    for (const c of chunks) {
      const vec = await embed(c);
      upsertChunk(db, { source: f, heading: data?.title || "", chunk: c, embedding: vec });
      process.stdout.write(".");
    }
    console.log(`\nIngested ${f} (${chunks.length} chunks)`);
  }
  console.log("Done.");
}
run(process.argv[3]).catch(console.error);
