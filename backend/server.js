import "dotenv/config";
import express from "express";
import cors from "cors";
import fs from "fs/promises";
import path from "path";
import { GoogleGenerativeAI } from "@google/generative-ai";

// ---------- App & Middleware ----------
const app = express();
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

// ✅ FIXED CORS Configuration - Only your frontend URL
const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:3000",
  "https://phenoxis-website.onrender.com"  // ✅ YOUR FRONTEND URL
];

app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
    methods: ['GET', 'POST', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    preflightContinue: false,
    optionsSuccessStatus: 200
  })
);

// Handle preflight OPTIONS requests
app.options('*', cors());

// ---------- ROOT ROUTE ----------
app.get("/", (req, res) => {
  res.json({ 
    message: "Phenoxis Backend API is running!", 
    status: "healthy",
    timestamp: new Date().toISOString(),
    services: {
      chat: "/api/chat",
      contact: "/api/contact",
      health: "/api/health"
    },
    cors: allowedOrigins,
    version: "1.0.0"
  });
});

// ---------- AI Setup ----------
if (!process.env.GEMINI_API_KEY) {
  console.warn("⚠️ Warning: GEMINI_API_KEY is not set in environment variables");
}
const genAI = process.env.GEMINI_API_KEY ? new GoogleGenerativeAI(process.env.GEMINI_API_KEY) : null;
const PRIMARY_MODEL = process.env.GEMINI_MODEL || "gemini-2.0-flash-exp";
const FALLBACK_MODEL = "gemini-1.5-flash";

function getModel(id) {
  return genAI.getGenerativeModel({ model: id });
}

// Load services document
let docContent = "";
const docPath = path.resolve(process.cwd(), "docs/services-info.txt");

async function loadDocument() {
  try {
    docContent = await fs.readFile(docPath, "utf-8");
    console.log("✅ Document loaded successfully");
  } catch (e) {
    console.warn("⚠️ Document not found, using default content");
    docContent = `
Phenoxis IT Solutions Services:

1. Web Development
- Full-stack web applications
- React, Node.js, MongoDB
- Responsive design
- E-commerce solutions

2. AI Solutions & Automation
- Custom AI integrations
- Chatbot development
- Process automation
- RAG systems

3. UI/UX Design
- User-centered design
- Prototyping
- Design systems
- Mobile app design

4. Digital Marketing
- SEO optimization
- Social media marketing
- Content strategy
- Analytics and reporting

Contact us at contact.phenoxis@gmail.com for quotes and consultations.
    `.trim();
  }
}

// Initialize document loading
loadDocument().catch(console.error);

const SYSTEM_PROMPT = `
You are Phenoxis IT Solutions' AI assistant.
Answer only based on our services: Web Development, AI Solutions, UI/UX Design, and Digital Marketing.

Services Info:
${docContent}

Be concise, friendly, and professional. If asked about unrelated topics, politely redirect to our services.
Always suggest contacting us for detailed quotes and consultations.
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
app.get("/api/health", (_req, res) => {
  res.json({ 
    ok: true,
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    environment: process.env.NODE_ENV || 'development',
    cors: allowedOrigins,
    ai: !!process.env.GEMINI_API_KEY
  });
});

app.post("/api/chat", async (req, res) => {
  try {
    if (!genAI) {
      return res.status(503).json({ 
        error: "AI service not configured. Please contact support." 
      });
    }

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
    const msg = status === 503 ? "AI temporarily overloaded." : "AI service error";
    console.error("AI error:", status, e?.statusText || e?.message || e);
    return res.status(status).json({ error: msg });
  }
});

// ✅ SIMPLIFIED Contact form route - NO EMAIL, NO SLACK
app.post("/api/contact", async (req, res) => {
  try {
    const { name, email, company, message } = req.body || {};
    
    // Validation
    if (!name || !email || !message) {
      return res.status(400).json({ 
        ok: false, 
        error: "Name, email, and message are required" 
      });
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        ok: false,
        error: "Please provide a valid email address"
      });
    }

    // ✅ Just store the message for your records
    const msgPath = path.resolve(process.cwd(), "messages.json");
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
    
    console.log(`✅ Message stored from ${name} (${email})`);

    return res.json({ 
      ok: true, 
      stored: true,
      message: "Message received! Email client will open." 
    });

  } catch (error) {
    console.error("❌ Contact form error:", error);
    return res.status(500).json({ 
      ok: false, 
      error: "Server error. Please try again." 
    });
  }
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({ 
    ok: false, 
    error: 'Endpoint not found',
    availableEndpoints: ['/', '/api/health', '/api/chat', '/api/contact']
  });
});

// Error handler
app.use((err, req, res, next) => {
  console.error('Server error:', err);
  res.status(500).json({ 
    ok: false, 
    error: 'Internal server error' 
  });
});

// ---------- Start ----------
const port = Number(process.env.PORT) || 8081;
app.listen(port, '0.0.0.0', () => {
  console.log(`🚀 Phenoxis Backend API running on port ${port}`);
  console.log(`🤖 AI configured: ${process.env.GEMINI_API_KEY ? 'Yes' : 'No'}`);
  console.log(`🌍 Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`🔗 Allowed origins: ${allowedOrigins.join(', ')}`);
});
