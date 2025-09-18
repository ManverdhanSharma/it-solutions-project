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

// ✅ FIXED CORS Configuration
const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:3000",
  "https://phenoxis-website.onrender.com"
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

// 🧠 COMPREHENSIVE COMPANY KNOWLEDGE BASE
const COMPANY_KNOWLEDGE = `
=== PHENOXIS IT SOLUTIONS - COMPLETE COMPANY INFORMATION ===

🏢 COMPANY OVERVIEW:
- Company Name: Phenoxis IT Solutions
- Founded: 2024
- Location: India (Chennai, Tamil Nadu)
- Company Type: IT Services & Digital Solutions Provider
- Website: https://phenoxis-website.onrender.com
- Email: contact.phenoxis@gmail.com
- Specialization: AI-driven digital transformation

🎯 MISSION & VISION:
Mission: To empower businesses with cutting-edge AI solutions and digital technologies that drive innovation, efficiency, and growth.
Vision: To be the leading AI and digital solutions provider, transforming how businesses operate in the digital age.

📋 CORE SERVICES:

1. 🌐 WEB DEVELOPMENT
   - Full-stack web applications (React, Node.js, MongoDB, Express)
   - E-commerce platforms and online stores
   - Progressive Web Apps (PWAs)
   - Responsive design for all devices
   - Custom web portals and dashboards
   - API development and integration
   - Performance optimization
   - SEO-friendly development
   - Pricing: Starting from ₹25,000 for basic websites

2. 🤖 AI SOLUTIONS & AUTOMATION
   - Custom AI chatbots and virtual assistants
   - RAG (Retrieval-Augmented Generation) systems
   - Process automation and workflow optimization
   - AI-powered data analysis and insights
   - Machine learning model development
   - Natural language processing solutions
   - Computer vision applications
   - AI integration into existing systems
   - Pricing: Custom quotes based on complexity

3. 🎨 UI/UX DESIGN
   - User-centered design approach
   - Wireframing and prototyping
   - Design systems and style guides
   - Mobile app design (iOS/Android)
   - Web application interfaces
   - User research and testing
   - Accessibility-focused design
   - Brand identity and visual design
   - Pricing: Starting from ₹15,000 for basic designs

4. 📈 DIGITAL MARKETING
   - Search Engine Optimization (SEO)
   - Social media marketing and management
   - Content strategy and creation
   - Google Ads and Facebook Ads management
   - Email marketing campaigns
   - Analytics and performance reporting
   - Conversion rate optimization
   - Brand awareness campaigns
   - Pricing: Starting from ₹10,000/month

🔧 TECHNOLOGIES WE USE:
Frontend: React, Vue.js, Angular, HTML5, CSS3, JavaScript, TypeScript
Backend: Node.js, Python, Express.js, FastAPI, REST APIs, GraphQL
Databases: MongoDB, PostgreSQL, MySQL, Firebase
AI/ML: Google Gemini, OpenAI, TensorFlow, PyTorch, Scikit-learn
Cloud: AWS, Google Cloud, Firebase, Heroku, Render
Design: Figma, Adobe XD, Sketch, Canva
Marketing: Google Analytics, SEMrush, Mailchimp, Buffer

👥 TARGET CLIENTS:
- Startups and small businesses
- E-commerce companies
- Educational institutions
- Healthcare providers
- Manufacturing companies
- Service-based businesses
- Non-profit organizations

⭐ KEY DIFFERENTIATORS:
- AI-first approach to all solutions
- Rapid prototyping and development
- 24/7 support and maintenance
- Affordable pricing for startups
- End-to-end digital transformation
- Data-driven decision making
- Modern tech stack and best practices

📞 CONTACT & PROCESS:
- Initial consultation: FREE (30 minutes)
- Response time: Within 24 hours
- Project timeline: 2-12 weeks depending on scope
- Payment terms: 50% advance, 50% on completion
- Maintenance: Available with all projects
- Revisions: Included in project scope

🏆 RECENT PROJECTS:
- AI-powered e-commerce platform for fashion retailer
- Custom CRM system with automation
- Educational portal with student management
- Restaurant ordering system with AI recommendations
- Corporate website with advanced analytics

💼 PACKAGE OPTIONS:
Starter Package (₹50,000): Basic website + SEO + 3 months support
Growth Package (₹1,50,000): Advanced website + AI features + marketing + 6 months support
Enterprise Package (₹3,00,000+): Custom solutions + full digital transformation + 1 year support

📈 SUCCESS METRICS:
- 50+ projects completed
- 95% client satisfaction rate
- Average 40% improvement in client digital presence
- 24-hour average response time
- 99.9% uptime for hosted solutions

Contact us at contact.phenoxis@gmail.com for detailed quotes and consultations.
We're always ready to discuss your project and provide customized solutions!
`;

const SYSTEM_PROMPT = `
You are PHENOXIS AI ASSISTANT - a helpful, friendly, and knowledgeable AI representative for Phenoxis IT Solutions.

PERSONALITY TRAITS:
- Professional yet approachable
- Enthusiastic about technology and AI
- Solution-oriented and consultative
- Clear and concise in communication
- Always helpful and supportive

YOUR KNOWLEDGE BASE:
${COMPANY_KNOWLEDGE}

CONVERSATION RULES:
1. Always introduce yourself as "Phenoxis AI Assistant" on first interaction
2. Focus on Phenoxis services: Web Development, AI Solutions, UI/UX Design, Digital Marketing
3. Provide specific pricing when asked (use the ranges mentioned above)
4. Always suggest contacting contact.phenoxis@gmail.com for detailed quotes
5. If asked about unrelated topics, politely redirect to Phenoxis services
6. Be enthusiastic about AI and modern technology solutions
7. Offer to help with project planning and consultation
8. Mention our FREE 30-minute consultation when relevant
9. Use emojis sparingly but effectively
10. Keep responses concise but informative (max 150 words unless detailed explanation needed)

SAMPLE RESPONSES STYLE:
- "Hi! I'm the Phenoxis AI Assistant 🤖 How can I help you with your digital transformation needs today?"
- "Great question! For web development, we specialize in React-based solutions starting from ₹25,000..."
- "I'd love to help you explore AI automation options! Let me share some possibilities..."

Remember: You represent a cutting-edge AI and web development company. Be confident, knowledgeable, and always ready to help!
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

// ✅ SIMPLIFIED Contact form route
app.post("/api/contact", async (req, res) => {
  try {
    const { name, email, company, message } = req.body || {};
    
    if (!name || !email || !message) {
      return res.status(400).json({ 
        ok: false, 
        error: "Name, email, and message are required" 
      });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        ok: false,
        error: "Please provide a valid email address"
      });
    }

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
