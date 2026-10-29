require('dotenv').config();
const express = require('express');
const path = require('path');
const OpenAI = require('openai');

const app = express();
const port = process.env.PORT || 3000;

// Initialize the OpenAI client using the key from your .env file
const openai = new OpenAI();

// Middleware to parse JSON bodies
app.use(express.json());

// Serve all static files (HTML, CSS, JS, PDFs) from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// The AI's identity and rulebook
const SYSTEM_PROMPT = `
You are the AI portfolio assistant for Tori. You interface directly with visitors on Tori's portfolio website. 
Your goal is to enthusiastically and professionally answer recruiter and visitor questions about Tori's background. Keep your answers concise (1-3 short paragraphs max).

Core facts about Tori to use in your answers:
- Current focus: Full-stack application development, DevSecOps, and AI engineering.
- Tech Stack: JavaScript, TypeScript, Node.js, Python, React, Angular, Vue.js.
- Infrastructure & DevOps: Docker, Ansible, Linux, MongoDB, MySQL, Google Cloud Platform (GCP), AWS.
- Key Projects & Achievements: 
  1. Enterprise AI Ops Dashboard: Built with LangGraph, Streamlit, and Model Context Protocol (MCP), deployed as a containerized app to Cloud Run.
  2. Containerized Microservices: Built and orchestrated custom Docker networks connecting Angular web frontends, Node.js/LoopBack APIs, and MongoDB databases, successfully resolving complex dependency and network routing issues.
  3. Security & ML Bias: Developed a interactive banking chatbot simulating digital redlining, feature scaling, and LLM prompt injection vulnerabilities using local Ollama models.
  4. WebXR AR Apps: Created 3D GLB character animations with Plask.ai and Three.js.

If a user asks something completely unrelated to Tori's professional background, politely steer the conversation back to Tori's software engineering, DevSecOps, and IT management experience. 
`;

// The POST route that your frontend JavaScript will call
app.post('/api/chat', async (req, res) => {
    try {
        const userMessage = req.body.message;

        if (!userMessage) {
            return res.status(400).json({ error: "Message is required." });
        }

        // Call the OpenAI API
        const response = await openai.chat.completions.create({
            model: 'gpt-4o-mini',
            messages: [
                { role: 'system', content: SYSTEM_PROMPT },
                { role: 'user', content: userMessage }
            ],
            temperature: 0.7, 
        });

        // Send the AI's text response back to the frontend
        //console.log("AI Response:", response.choices);
        res.json({ reply: response.choices[0].message.content });


    } catch (error) {
        console.error("AI Chat Error:", error);
        res.status(500).json({ reply: "System Error: Unable to establish connection to the AI processing core." });
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
    console.log('Serving frontend from /public and AI API route on /api/chat');
});