import Database from "better-sqlite3";
export function openStore(path = "rag.db") {
  const db = new Database(path);
  db.exec(`
    CREATE TABLE IF NOT EXISTS docs(
      id INTEGER PRIMARY KEY,
      source TEXT, heading TEXT, chunk TEXT, embedding BLOB
    );
    CREATE INDEX IF NOT EXISTS idx_source ON docs(source);
  `);
  return db;
}
export function upsertChunk(db, { source, heading, chunk, embedding }) {
  const stmt = db.prepare(
    "INSERT INTO docs (source, heading, chunk, embedding) VALUES (?, ?, ?, ?)"
  );
  stmt.run(source, heading || "", chunk, Buffer.from(new Float32Array(embedding).buffer));
}
export function search(db, queryEmbedding, topK = 5) {
  const rows = db.prepare("SELECT id, source, heading, chunk, embedding FROM docs").all();
  const q = new Float32Array(queryEmbedding);
  function cos(buf) {
    const v = new Float32Array(buf.buffer, buf.byteOffset, buf.byteLength / 4);
    let dot=0,a=0,b=0; for (let i=0;i<v.length;i++){dot+=v[i]*q[i];a+=v[i]*v[i];b+=q[i]*q[i];}
    return dot / (Math.sqrt(a)*Math.sqrt(b));
  }
  return rows.map(r => ({ ...r, score: cos(r.embedding) }))
             .sort((a,b)=>b.score-a.score).slice(0, topK);
}
