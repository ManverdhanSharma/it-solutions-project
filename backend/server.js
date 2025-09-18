import "dotenv/config";
import express from "express";
import cors from "cors";
import fs from "fs/promises";
import path from "path";
import nodemailer from "nodemailer";
import { GoogleGenerativeAI } from "@google/generative-ai";

// ---------- App & Middleware ----------
const app = express();
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

// 🔧 FIXED CORS Configuration - Added your frontend URL
const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:3000",
  "https://phenoxis-website.onrender.com",  // ✅ YOUR FRONTEND URL
  "https://phenoxis.vercel.app"
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

// ---------- Email Setup ----------
const createEmailTransporter = () => {
  if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
    console.warn("⚠️ Email credentials not configured");
    return null;
  }
  
  return nodemailer.createTransporter({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });
};

// ---------- Routes ----------
app.get("/api/health", (_req, res) => {
  res.json({ 
    ok: true,
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    environment: process.env.NODE_ENV || 'development',
    cors: allowedOrigins,
    ai: !!process.env.GEMINI_API_KEY,
    email: !!(process.env.EMAIL_USER && process.env.EMAIL_PASS)
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

// ENHANCED Contact form route with EMAIL support
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

    // Store to file
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

    // ---------- EMAIL SENDING ----------
    let emailSent = false;
    const transporter = createEmailTransporter();
    
    if (transporter) {
      try {
        // Email to your team
        const mailOptions = {
          from: process.env.EMAIL_USER,
          to: 'contact.phenoxis@gmail.com',
          subject: `New Contact Form Submission from ${name}`,
          html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
              <h2 style="color: #3b82f6; border-bottom: 2px solid #e5e7eb; padding-bottom: 10px;">
                New Contact Form Submission
              </h2>
              
              <div style="background: #f9fafb; padding: 20px; border-radius: 8px; margin: 20px 0;">
                <p><strong style="color: #374151;">Name:</strong> ${name}</p>
                <p><strong style="color: #374151;">Email:</strong> ${email}</p>
                ${company ? `<p><strong style="color: #374151;">Company:</strong> ${company}</p>` : ''}
                <p><strong style="color: #374151;">Message:</strong></p>
                <div style="background: white; padding: 15px; border-left: 4px solid #3b82f6; margin-top: 10px;">
                  ${message.replace(/\n/g, '<br>')}
                </div>
              </div>
              
              <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb;">
                <p style="color: #6b7280; font-size: 14px;">
                  Sent from Phenoxis website - ${new Date().toLocaleString()}
                </p>
              </div>
            </div>
          `
        };

        // Auto-reply to user
        const autoReply = {
          from: process.env.EMAIL_USER,
          to: email,
          subject: 'Thank you for contacting Phenoxis!',
          html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
              <h2 style="color: #3b82f6;">Thank You, ${name}!</h2>
              
              <p>We've received your message and appreciate you reaching out to Phenoxis.</p>
              
              <div style="background: #f0f9ff; padding: 20px; border-radius: 8px; margin: 20px 0;">
                <p><strong>What happens next?</strong></p>
                <ul style="color: #374151;">
                  <li>We'll review your inquiry within 24 hours</li>
                  <li>A team member will respond with next steps</li>
                  <li>For urgent matters, email us directly</li>
                </ul>
              </div>
              
              <p>Best regards,<br><strong>The Phenoxis Team</strong></p>
            </div>
          `
        };

        // Send both emails
        await Promise.all([
          transporter.sendMail(mailOptions),
          transporter.sendMail(autoReply)
        ]);

        emailSent = true;
        console.log(`✅ Email sent successfully to ${email}`);

      } catch (emailError) {
        console.error("Email sending failed:", emailError);
        // Don't fail the whole request if email fails
      }
    }

    // ---------- Slack notify ----------
    try {
      const url = process.env.SLACK_WEBHOOK_URL;
      if (url) {
        const text =
          `🔔 New website inquiry\n` +
          `👤 Name: ${name}\n` +
          `📧 Email: ${email}\n` +
          `🏢 Company: ${company || "-"}\n\n` +
          `💬 Message:\n${message}`;
        await fetch(url, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ text }),
        });
        console.log("✅ Slack notification sent");
      }
    } catch (e) {
      console.warn("Slack notify failed:", e?.message || e);
    }

    return res.json({ 
      ok: true, 
      sent: emailSent, 
      stored: true,
      message: emailSent ? 'Email sent successfully' : 'Message stored (email not configured)'
    });

  } catch (error) {
    console.error("Contact form error:", error);
    return res.status(500).json({ 
      ok: false, 
      error: "Failed to process contact form" 
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
  console.log(`📧 Email configured: ${process.env.EMAIL_USER ? 'Yes' : 'No'}`);
  console.log(`🤖 AI configured: ${process.env.GEMINI_API_KEY ? 'Yes' : 'No'}`);
  console.log(`🌍 Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`🔗 Allowed origins: ${allowedOrigins.join(', ')}`);
});
