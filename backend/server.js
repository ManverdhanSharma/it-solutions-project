import "dotenv/config";
import express from "express";
import cors from "cors";
import fs from "fs/promises";
import path from "path";
import { GoogleGenerativeAI } from "@google/generative-ai";
import nodemailer from "nodemailer";

// ---------- App & Middleware ----------
const app = express();
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

// ✅ FIXED CORS Configuration
const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:3000",
  "https://phenoxis.com",
  "https://www.phenoxis.com",
  "https://phenoxis-backend.onrender.com"
];

app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
    methods: ["GET", "POST", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    preflightContinue: false,
    optionsSuccessStatus: 200,
  })
);

app.options("*", cors());

// ---------- AI SYSTEM PROMPT & KNOWLEDGE BASE ----------
const COMPANY_KNOWLEDGE = `
PHENOXIS IT SOLUTIONS - Complete Service Overview

🏢 COMPANY PROFILE:
- Modern IT solutions company specializing in cutting-edge technology
- Expert team in AI, web development, and digital transformation
- Based in India, serving global clients
- Focus on innovative, scalable, and cost-effective solutions

💼 OUR SERVICES:

1. WEB DEVELOPMENT
   • React.js & Next.js applications
   • Node.js backend development
   • Full-stack MERN solutions
   • E-commerce platforms
   • Progressive Web Apps (PWA)
   • API development & integration

2. AI SOLUTIONS
   • Custom AI chatbots & assistants
   • Machine Learning models
   • Natural Language Processing
   • Computer Vision applications
   • AI automation tools
   • RAG (Retrieval-Augmented Generation) systems

3. UI/UX DESIGN
   • Modern, responsive designs
   • User experience optimization
   • Mobile-first approach
   • Design systems & prototyping
   • Branding & visual identity

4. DIGITAL MARKETING
   • SEO & content optimization
   • Social media management
   • PPC campaigns & analytics
   • Brand strategy & positioning
   • Performance tracking & reporting

🎯 WHY CHOOSE PHENOXIS:
- FREE 30-minute consultation for all new clients
- 24/7 support and maintenance
- Agile development methodology
- 99.9% uptime guarantee
- Competitive pricing with no hidden costs
- Quick turnaround times (2-12 weeks typical)
- Post-launch support and updates

📞 CONTACT INFORMATION:
- Email: contact.phenoxis@gmail.com
- Website: https://phenoxis.com
- Quick consultation booking available

🚀 RECENT PROJECTS:
- AI-powered business automation systems
- E-commerce platforms with integrated AI
- Custom CRM and inventory management systems
- Multi-language web applications
- Real-time data visualization dashboards
`;

const SYSTEM_PROMPT = `
You are CHIKI - the friendly and knowledgeable AI assistant for Phenoxis IT Solutions.

PERSONALITY TRAITS:
- Professional yet approachable
- Enthusiastic about technology and AI  
- Solution-oriented and consultative
- Clear and concise in communication
- Always helpful and supportive
- Your name is Chiki (pronounced "Chi-ki")

YOUR KNOWLEDGE BASE:
${COMPANY_KNOWLEDGE}

CONVERSATION RULES:
1. Always introduce yourself as "Chiki, your Phenoxis AI assistant" on first interaction
2. ONLY discuss Phenoxis services: Web Development, AI Solutions, UI/UX Design, Digital Marketing
3. For pricing questions, ALWAYS direct them to contact contact.phenoxis@gmail.com for detailed quotes
4. If asked about unrelated topics, politely redirect to Phenoxis services only
5. Be enthusiastic about AI and modern technology solutions
6. Offer to help with project planning and consultation  
7. Mention our FREE 30-minute consultation when relevant
8. Use emojis sparingly but effectively
9. Keep responses concise but informative (max 150 words unless detailed explanation needed)
10. NEVER provide specific pricing - always redirect to email contact

SAMPLE RESPONSES STYLE:
- "Hi! I'm Chiki, your Phenoxis AI assistant 🤖 How can I help you with your digital transformation needs today?"
- "Great question! We specialize in React-based web development solutions. For detailed pricing, please contact us at contact.phenoxis@gmail.com"
- "I'd love to help you explore AI automation options! Please reach out to contact.phenoxis@gmail.com for a custom quote and FREE consultation"

STRICT RESTRICTIONS:
- Only discuss Phenoxis IT Solutions services and capabilities
- Never provide pricing information - always redirect to email
- Do not answer questions about other companies, general topics, or unrelated subjects
- Always stay focused on Phenoxis business offerings

Remember: You represent Chiki, the AI assistant of Phenoxis IT Solutions. Be confident, knowledgeable, and always redirect pricing inquiries to contact.phenoxis@gmail.com!
`.trim();

// ---------- ROOT ROUTE ----------
app.get("/", (req, res) => {
  res.json({
    message: "Phenoxis Backend API is running!",
    status: "healthy",
    timestamp: new Date().toISOString(),
    services: {
      chat: "/api/chat",
      contact: "/api/contact",
      health: "/api/health",
    },
    cors: allowedOrigins,
    version: "1.0.0",
  });
});

// ---------- AI Setup ----------
if (!process.env.GEMINI_API_KEY) {
  console.warn("⚠️ Warning: GEMINI_API_KEY is not set in environment variables");
}
const genAI = process.env.GEMINI_API_KEY
  ? new GoogleGenerativeAI(process.env.GEMINI_API_KEY)
  : null;
const PRIMARY_MODEL = process.env.GEMINI_MODEL || "gemini-2.0-flash-exp";
const FALLBACK_MODEL = "gemini-1.5-flash";

function getModel(id) {
  return genAI.getGenerativeModel({ model: id });
}

function toContents(messages) {
  return [
    { role: "user", parts: [{ text: SYSTEM_PROMPT }] }, // ✅ Use actual system prompt
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
    text =
      r?.response?.candidates?.[0]?.content?.parts?.[0]?.text ||
      "";
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
          `503 from ${PRIMARY_MODEL}. Retrying in ${delay}ms (attempt ${
            attempt + 1
          }/3)`
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
    environment: process.env.NODE_ENV || "development",
    cors: allowedOrigins,
    ai: !!process.env.GEMINI_API_KEY,
  });
});

app.post("/api/chat", async (req, res) => {
  try {
    if (!genAI) {
      return res
        .status(503)
        .json({ error: "AI service not configured. Please contact support." });
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
    const msg =
      status === 503 ? "AI temporarily overloaded." : "AI service error";
    console.error("AI error:", status, e?.statusText || e?.message || e);
    return res.status(status).json({ error: msg });
  }
});

// ✅ Contact Form Route with Nodemailer
app.post("/api/contact", async (req, res) => {
  try {
    const { name, email, company, message } = req.body || {};

    if (!name || !email || !message) {
      return res.status(400).json({
        ok: false,
        error: "Name, email, and message are required",
      });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        ok: false,
        error: "Please provide a valid email address",
      });
    }

    // Save to messages.json
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

    // ✅ Setup Nodemailer transporter
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
      },
    });

    // Send email to you
    await transporter.sendMail({
      from: `"${name}" <${email}>`,
      to: process.env.MAIL_USER,
      subject: `New Inquiry from ${name}${company ? " (" + company + ")" : ""}`,
      text: `
New contact form submission:

Name: ${name}
Email: ${email}
${company ? `Company: ${company}` : ""}
Message:
${message}
      `,
    });

    // Send confirmation email to user
    await transporter.sendMail({
      from: `"Phenoxis Team" <${process.env.MAIL_USER}>`,
      to: email,
      subject: "We received your message!",
      text: `Hello ${name},

Thank you for reaching out to Phenoxis. We've received your message and our team will get back to you within 24 hours.

Here's a copy of your message:
${message}

Best regards,  
Phenoxis Team
      `,
    });

    console.log(`📧 Stored + emails sent for ${name} (${email})`);

    return res.json({
      ok: true,
      stored: true,
      message: "Message received and emails sent!",
    });
  } catch (error) {
    console.error("❌ Contact form error:", error);
    return res.status(500).json({
      ok: false,
      error: "Server error. Please try again.",
    });
  }
});

// ---------- Nodemailer Test Route ----------
app.get("/api/test-mail", async (req, res) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
      },
    });

    // Send a test email to yourself
    const info = await transporter.sendMail({
      from: `"Phenoxis Backend Test" <${process.env.MAIL_USER}>`,
      to: process.env.MAIL_USER, // send to your own inbox
      subject: "✅ Nodemailer Test Email",
      text: "This is a test email from your Phenoxis backend to confirm Nodemailer setup is working.",
    });

    console.log("📨 Test email sent:", info.messageId);

    res.json({
      ok: true,
      message: "Test email sent successfully!",
      messageId: info.messageId,
    });
  } catch (error) {
    console.error("❌ Nodemailer test failed:", error);
    res.status(500).json({
      ok: false,
      error: "Failed to send test email",
      details: error.message,
    });
  }
});

// 404 handler
app.use("*", (req, res) => {
  res.status(404).json({
    ok: false,
    error: "Endpoint not found",
    availableEndpoints: ["/", "/api/health", "/api/chat", "/api/contact", "/api/test-mail"], // ✅ Added test-mail
  });
});

// Error handler
app.use((err, req, res, next) => {
  console.error("Server error:", err);
  res.status(500).json({
    ok: false,
    error: "Internal server error",
  });
});

// ---------- Start ----------
const port = Number(process.env.PORT) || 8081;
app.listen(port, "0.0.0.0", () => {
  console.log(`🚀 Phenoxis Backend API running on port ${port}`);
  console.log(
    `🤖 AI configured: ${process.env.GEMINI_API_KEY ? "Yes" : "No"}`
  );
  console.log(`🌍 Environment: ${process.env.NODE_ENV || "development"}`);
  console.log(`🔗 Allowed origins: ${allowedOrigins.join(", ")}`);
});
