import "dotenv/config";
import express from "express";
import cors from "cors";
import fs from "fs/promises";
import path from "path";
import { GoogleGenerativeAI } from "@google/generative-ai";

// ---------- App & Middleware ----------
const app = express();
app.use(express.json({ limit: "1mb" }));

// CORS allow-list from env (comma-separated)
const allowedOrigins = (process.env.ALLOWED_ORIGIN || "http://localhost:5173")
  .split(",")
  .map((s) => s.trim())
  .filter(Boolean);

// Simple array form supported by express-cors
app.use(
  cors({
    origin: allowedOrigins,
  })
);

// ---------- AI Setup ----------
if (!process.env.GEMINI_API_KEY) {
  console.warn("Warning: GEMINI_API_KEY is not set in .env");
}
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const PRIMARY_MODEL = process.env.GEMINI_MODEL || "gemini-2.5-flash";
const FALLBACK_MODEL = "gemini-2.0-flash-exp";

function getModel(id) {
  return genAI.getGenerativeModel({ model: id });
}

// Load services document
let docContent = "";
const docPath = path.resolve(process.cwd(), "docs/services-info.txt");
async function loadDocument() {
  try {
    docContent = await fs.readFile(docPath, "utf-8");
    console.log("Document loaded successfully");
  } catch (e) {
    console.error("Failed to load document:", e);
    docContent = "";
  }
}
await loadDocument();

const SYSTEM_PROMPT = `
You are IT Solutions' assistant.
Answer only based on the following document:
---
${docContent}
---
Answer only about our services: Software Development, UX/UI Design, Digital Marketing, and AI Automation & Chatbots.
If asked something unrelated, briefly decline and steer back to relevant services.
Be concise, friendly, and suggest Contact or Get a Quote when appropriate.
`.trim();

function toContents(messages) {
  return [
    { role: "user", parts: [{ text: SYSTEM_PROMPT }] },
    ...messages.slice(-20).map((m) => ({
      role: m.role === "assistant" ? "model" : "user",
      parts: [{ text: m.content ?? m.text ?? "" }],
    })),
  ];
}

async function askOnce(modelId, contents) {
  const model = getModel(modelId);
  const r = await model.generateContent({ contents });
  let text = "";
  if (typeof r?.response?.text === "function") {
    text = r.response.text();
  } else {
    text = r?.response?.candidates?.[0]?.content?.parts?.[0]?.text || "";
  }
  return { r, text };
}

async function askWithRetryAndFallback(contents) {
  let lastErr = null;
  for (let attempt = 0; attempt < 3; attempt++) {
    try {
      const { r, text } = await askOnce(PRIMARY_MODEL, contents);
      if (text)
        return {
          text,
          modelId: PRIMARY_MODEL,
          meta: r?.response?.usageMetadata,
        };
      lastErr = new Error("Empty text from model");
      break;
    } catch (e) {
      lastErr = e;
      const status = e?.status || e?.response?.status;
      if (status === 503) {
        const delay = 1000 * Math.pow(2, attempt);
        console.warn(
          `503 from ${PRIMARY_MODEL}. Retrying in ${delay}ms (attempt ${attempt + 1}/3)`
        );
        await new Promise((res) => setTimeout(res, delay));
        continue;
      }
      break;
    }
  }
  try {
    const { r, text } = await askOnce(FALLBACK_MODEL, contents);
    if (text)
      return {
        text,
        modelId: FALLBACK_MODEL,
        meta: r?.response?.usageMetadata,
      };
    throw new Error("Empty text from fallback model");
  } catch (e) {
    throw lastErr || e;
  }
}

// ---------- Routes ----------
app.get("/api/health", (_req, res) => res.json({ ok: true }));

app.post("/api/chat", async (req, res) => {
  try {
    const { messages } = req.body || {};
    if (!Array.isArray(messages) || messages.length === 0) {
      return res.status(400).json({ error: "messages[] required" });
    }
    const contents = toContents(messages);
    const { text, modelId, meta } = await askWithRetryAndFallback(contents);
    return res.json({
      message: { role: "assistant", content: text },
      model: modelId,
      usage: meta || null,
    });
  } catch (e) {
    const status = e?.status || e?.response?.status || 500;
    const msg =
      status === 503
        ? "AI temporarily overloaded."
        : "AI service error";
    console.error("AI error:", status, e?.statusText || e?.message || e);
    return res.status(status).json({ error: msg });
  }
});

// Contact form route — store to file and notify Slack
app.post("/api/contact", async (req, res) => {
  const { name, email, company, message } = req.body || {};
  if (!name || !email || !message) {
    return res.status(400).json({ ok: false, error: "Missing fields" });
  }

  const msgPath = path.resolve(process.cwd(), "messages.json");
  try {
    let existing = [];
    try {
      const raw = await fs.readFile(msgPath, "utf-8");
      existing = JSON.parse(raw);
    } catch {
      existing = [];
    }

    const record = {
      name,
      email,
      company: company || null,
      message,
      date: new Date().toISOString(),
    };

    existing.push(record);
    await fs.writeFile(msgPath, JSON.stringify(existing, null, 2));

    // ---------- Slack notify ----------
    try {
      const url = process.env.SLACK_WEBHOOK_URL;
      if (url) {
        const text =
          `New website inquiry\n` +
          `Name: ${name}\n` +
          `Email: ${email}\n` +
          `Company: ${company || "-"}\n\n` +
          `${message}`;
        await fetch(url, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ text }),
        });
      }
    } catch (e) {
      console.warn("Slack notify failed:", e?.message || e);
    }
    // -------------------------------

    return res.json({ ok: true, sent: false, stored: true });
  } catch (fileErr) {
    console.error("Save failed:", fileErr.message);
    return res.status(500).json({ ok: false, error: "Failed to store message" });
  }
});

// ---------- Start ----------
const port = Number(process.env.PORT) || 8081;
app.listen(port, () => console.log(`API listening on :${port}`));
