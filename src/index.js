const express = require('express');
const { GoogleGenerativeAI } = require("@google/generative-ai");
require('dotenv').config();

const app = express();
app.use(express.json());

// Initialize Gemini 3 Flash
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

const PORT = process.env.PORT || 8080;

// Clinical Disclaimer Helper
const SAFETY_DISCLAIMER = "DISCLAIMER: This is a clinical decision support tool and not a final diagnosis. Consult a medical professional. ";

/**
 * MCP Endpoint: This is what PromptOpinion connects to.
 * It uses JSON-RPC 2.0 format.
 */
app.post('/', async (req, res) => {
    const { jsonrpc, method, params, id } = req.body;

    // 1. Tool: Analyze Synthetic Vitals
    if (method === 'analyze_synthetic_vitals') {
        const { systolic, diastolic, weight, height } = params;
        
        // Logical Triage (Non-generative, hardcoded for safety)
        let status = "Normal";
        if (systolic >= 140 || diastolic >= 90) status = "Stage 2 Hypertension Risk";
        
        const bmi = (weight / ((height / 100) ** 2)).toFixed(1);

        return res.send({
            jsonrpc: "2.0",
            id,
            result: {
                analysis: `${SAFETY_DISCLAIMER} Patient BMI is ${bmi}. Blood Pressure triage: ${status}.`,
                raw_data: { bmi, status }
            }
        });
    }

    // 2. Default fallback for unknown methods
    res.status(404).send({
        jsonrpc: "2.0",
        id,
        error: { code: -32601, message: "Method not found" }
    });
});

app.listen(PORT, () => {
    console.log(`HealthAssistAI MCP Server running on port ${PORT}`);
});