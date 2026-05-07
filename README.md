# HealthAssistAI: Clinical Decision Support MCP Server

HealthAssistAI is a specialized **Model Context Protocol (MCP)** server designed to provide clinicians with real-time triage support. It analyzes patient vital signs, calculates key health metrics like BMI, and provides blood pressure risk assessments based on clinical standards.

## 🚀 Features
* **Vitals Analysis:** Automated calculation of Body Mass Index (BMI).
* **Hypertension Triage:** Categorizes Blood Pressure (BP) into risk stages (Normal, Stage 1, Stage 2).
* **MCP Compliant:** Implements the full Model Context Protocol lifecycle including `initialize`, `tools/list`, and `tools/call`.
* **Cloud Native:** Deployed on **Google Cloud Run** for high scalability and security.

## 🛠️ Technical Stack
* **Language:** Node.js / Express
* **Protocol:** Model Context Protocol (MCP)
* **Cloud:** Google Cloud Platform (Cloud Run)
* **Integration:** PromptOpinion Orchestrator

## 📋 MCP Tools Provided
### `analyze_synthetic_vitals`
Analyzes a patient's physical vitals to provide a clinical triage summary.
* **Inputs:** `systolic`, `diastolic` (mmHg), `weight` (kg), `height` (cm).
* **Output:** BMI calculation and Blood Pressure risk status.

## 🚦 Safety & Compliance
HealthAssistAI is a **Clinical Decision Support (CDS)** tool. It is designed to assist medical professionals, not to provide a final diagnosis. All outputs are prefixed with a mandatory medical disclaimer.

## 🏗️ Setup & Deployment
To deploy this server to your own Google Cloud instance:
1. Clone the repo: `git clone https://github.com/santoshkumarvidudala-gif/HealthAssistAI.git`
2. Install dependencies: `npm install`
3. Deploy to Cloud Run:
   ```bash
   gcloud run deploy healthassistai-pro --source . --region europe-west1 --allow-unauthenticated
