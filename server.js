import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import fetch from 'node-fetch';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.post('/api/analyze-medical-records', async (req, res) => {
  try {
    const { records } = req.body;

    if (!records || !Array.isArray(records) || records.length === 0) {
      return res.status(400).json({ error: 'No medical records provided for analysis.' });
    }

    const API_KEY = process.env.GLM_API_KEY;
    const API_URL = process.env.GLM_API_URL;
    const MODEL = process.env.GLM_MODEL;

    if (!API_KEY || !API_URL || !MODEL) {
      console.error('Missing GLM environment configuration.');
      return res.status(500).json({ error: 'GLM service is not properly configured on the server.' });
    }

    const systemPrompt = `You are an AI-assisted medical record reconciliation system.

Your ONLY task is to analyze the provided medical records and identify POTENTIAL CONTRADICTIONS.

You are NOT a doctor.

You must NOT:
- make medical decisions
- diagnose the patient
- recommend treatment
- prescribe medication
- decide which record is correct
- declare a medical record wrong

The final decision must always be made by an authorized healthcare professional.

Analyze the provided medical records.

Extract:

- allergies
- medications
- diagnoses
- blood group
- demographic information
- dates
- source hospital
- doctor/source information if available
- medication status such as current, previous, discontinued if available

Then compare the records.

IDENTIFY ONLY POTENTIAL CONTRADICTIONS.

Rules:

1. Missing information does NOT mean negative information.
2. A blank allergy field does NOT mean "No known allergy".
3. A missing medication does NOT mean the patient is not taking the medication.
4. Medication changes over time are NOT automatically contradictions.
5. Consider the date of every record.
6. Consider current, previous, discontinued, and unknown medication status.
7. Consider the source hospital.
8. Consider the timeline.
9. Older information may have been replaced or updated by newer information.
10. Do not classify historical information as a contradiction simply because newer information is different.
11. Different wording may represent the same medical concept.
12. Normalize equivalent terminology before comparing.
13. Only report meaningful potential contradictions.
14. If there is insufficient information, do not invent a contradiction.
15. Never invent missing medical information.
16. Never assume one record is correct.
17. Never declare either record wrong.
18. Every potential contradiction requires professional verification.

Return ONLY valid JSON.

Use this structure:

{
  "analysisStatus": "completed",
  "potentialContradictions": [
    {
      "field": "allergy",
      "severity": "high",
      "recordA": {
        "recordId": "record-a",
        "hospital": "City Care Hospital",
        "date": "2026-08-12",
        "value": "Penicillin allergy"
      },
      "recordB": {
        "recordId": "record-b",
        "hospital": "Metro Hospital",
        "date": "2026-08-18",
        "value": "No known allergy"
      },
      "reason": "The allergy information differs between the two records.",
      "status": "needs_verification"
    }
  ],
  "informationUnavailable": [],
  "summary": "Potential contradictions were identified and require review by an authorized healthcare professional."
}

Do not return Markdown.
Do not return explanations outside JSON.`;

    const payload = {
      model: MODEL,
      messages: [
        {
          role: 'system',
          content: systemPrompt
        },
        {
          role: 'user',
          content: `Here are the medical records to analyze: ${JSON.stringify(records)}`
        }
      ],
      thinking: {
        type: 'enabled'
      },
      temperature: 0.6,
      max_tokens: 4096,
      stream: false
    };

    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`Z.AI API error (${response.status}):`, errorText);
      return res.status(502).json({ error: 'Unable to analyze medical records right now.' });
    }

    const data = await response.json();
    
    if (!data.choices || !data.choices[0] || !data.choices[0].message || !data.choices[0].message.content) {
      console.error('Invalid GLM response structure:', data);
      return res.status(502).json({ error: 'Analysis response could not be processed.' });
    }

    let jsonString = data.choices[0].message.content.trim();
    
    // Strip markdown code block wrappers if they exist
    if (jsonString.startsWith('```json')) {
      jsonString = jsonString.replace(/^```json\n/, '').replace(/\n```$/, '');
    } else if (jsonString.startsWith('```')) {
      jsonString = jsonString.replace(/^```\n/, '').replace(/\n```$/, '');
    }

    let parsedResult;
    try {
      parsedResult = JSON.parse(jsonString);
    } catch (e) {
      console.error('Failed to parse JSON from Z.AI:', jsonString);
      return res.status(502).json({ error: 'Analysis response could not be processed.' });
    }

    // Basic structure validation
    if (!parsedResult.analysisStatus || !Array.isArray(parsedResult.potentialContradictions)) {
      console.error('Parsed JSON does not match required schema:', parsedResult);
      return res.status(502).json({ error: 'Analysis response could not be processed.' });
    }

    res.json(parsedResult);

  } catch (error) {
    console.error('Server error:', error.message);
    res.status(500).json({ error: 'Unable to analyze medical records right now.' });
  }
});

app.listen(PORT, () => {
  console.log(`Medsyncra Node Backend running on port ${PORT}`);
});
