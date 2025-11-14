import { GoogleGenAI } from "@google/genai";
import { BusinessProfile, ServiceRecommendation, ProjectBlueprint } from "@/types";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || "" });

export async function analyzeBusinessProfile(profile: BusinessProfile): Promise<{
  recommendations: ServiceRecommendation[];
  projectBlueprint: ProjectBlueprint;
}> {
  const prompt = `You are an expert IT and cybersecurity consultant analyzing a client's business to provide highly specific, actionable, and valuable service recommendations.

CLIENT BUSINESS PROFILE:
Business Name: ${profile.businessName}
Industry: ${profile.industry}
Business Model: ${profile.businessModel}
Year Established: ${profile.yearEstablished}
Team Size: ${profile.teamSize}
Operating Regions: ${profile.operatingRegions}

CURRENT OPERATIONS:
Core Operations: ${profile.coreOperations}
Workflow Challenges: ${profile.workflowChallenges}
Manual Tasks to Automate: ${profile.manualTasks}
Current Tools/Software: ${profile.currentTools}

TECHNOLOGY STATUS:
Has Website: ${profile.hasWebsite ? 'Yes' : 'No'}
Has Mobile App: ${profile.hasMobileApp ? 'Yes' : 'No'}
Has CRM: ${profile.hasCRM ? 'Yes' : 'No'}
Has ERP: ${profile.hasERP ? 'Yes' : 'No'}
Has Cloud Setup: ${profile.hasCloudSetup ? 'Yes' : 'No'}
Has Admin Tools: ${profile.hasAdminTools ? 'Yes' : 'No'}
Technology Stack: ${profile.technologyStack}
Cybersecurity Practices: ${profile.cybersecurityPractices}
API/Integrations: ${profile.apiIntegrations}

BUSINESS GOALS:
Short-term Goals (6 months): ${profile.shortTermGoals}
Long-term Goals (1-3 years): ${profile.longTermGoals}
Upcoming Launches/Expansions: ${profile.upcomingLaunches}
Desired Automation Areas: ${profile.automationAreas}

CHALLENGES & BLOCKERS:
Revenue Challenges: ${profile.revenueChallenges}
Sales/Marketing Challenges: ${profile.salesMarketingChallenges}
Tech/Infrastructure Bottlenecks: ${profile.techBottlenecks}
Customer Support Challenges: ${profile.customerSupportChallenges}
Compliance/Regulatory Concerns: ${profile.complianceConcerns}

INDUSTRY-SPECIFIC DATA:
Target Customers: ${profile.targetCustomers}
Competitors: ${profile.competitors}
Data Format: ${profile.dataFormat}
Industry-Specific Processes: ${profile.industrySpecificProcesses}

PREFERENCES & CONSTRAINTS:
Budget Preference: ${profile.budgetPreference}
Preferred Solution Type: ${profile.preferredSolutionType}
Deadline/Urgency: ${profile.deadline}
Has Developer Team: ${profile.hasDevTeam ? 'Yes' : 'No'}
Resource Constraints: ${profile.resourceConstraints}

TASK:
Analyze this business deeply and generate 6-12 highly specific, personalized service recommendations across these categories:
1. Process Automation & Optimization
2. Software Solutions
3. Cybersecurity & Risk Reduction
4. Technology Modernization
5. AI & Intelligent Automation
6. Industry-Specific Solutions

For EACH recommendation, provide:
- title: Clear, specific title
- category: One of the 6 categories above
- description: Detailed 2-3 sentence description
- whyNeeded: Why this client specifically needs this (based on their data)
- howItHelps: Concrete benefits and outcomes
- businessImpact: Measurable business impact
- expectedROI: Expected return on investment or value
- priority: High, Medium, or Low based on urgency and impact
- estimatedTimeline: Realistic timeline (e.g., "2-3 months", "4-6 weeks")
- estimatedCost: Budget range (e.g., "Low ($5-15K)", "Medium ($15-50K)", "High ($50K+)")

Also create a high-level PROJECT BLUEPRINT with:
- deliverables: Array of 4-6 key deliverables
- timeline: Overall timeline (e.g., "3-6 months")
- costBracket: Overall cost estimate
- phases: Array of 3-5 project phases with name, duration, and description

Make recommendations unique, specific to their industry, challenges, and goals. Avoid generic advice. Focus on high-value, hard-to-ignore solutions.

Return ONLY valid JSON in this exact format:
{
  "recommendations": [
    {
      "id": "rec-1",
      "title": "...",
      "category": "...",
      "description": "...",
      "whyNeeded": "...",
      "howItHelps": "...",
      "businessImpact": "...",
      "expectedROI": "...",
      "priority": "High|Medium|Low",
      "estimatedTimeline": "...",
      "estimatedCost": "..."
    }
  ],
  "projectBlueprint": {
    "deliverables": ["...", "..."],
    "timeline": "...",
    "costBracket": "...",
    "phases": [
      {
        "name": "...",
        "duration": "...",
        "description": "..."
      }
    ]
  }
}`;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash-exp",
      config: {
        responseMimeType: "application/json",
      },
      contents: prompt,
    });

    const result = JSON.parse(response.text);
    return result;
  } catch (error) {
    console.error("Gemini API error:", error);
    throw new Error("Failed to analyze business profile with Gemini");
  }
}

export async function analyzeUploadedDocument(content: string, fileName: string): Promise<BusinessProfile> {
  const prompt = `You are analyzing a business profile document. Extract all relevant business information and structure it into a complete business profile.

DOCUMENT NAME: ${fileName}

DOCUMENT CONTENT:
${content}

TASK:
Extract and structure the business information into a complete profile. If any field is not found in the document, use "Not specified" or appropriate default values.

Return ONLY valid JSON in this exact format:
{
  "businessName": "...",
  "industry": "...",
  "businessModel": "...",
  "yearEstablished": "...",
  "teamSize": "...",
  "operatingRegions": "...",
  "coreOperations": "...",
  "workflowChallenges": "...",
  "manualTasks": "...",
  "currentTools": "...",
  "hasWebsite": true/false,
  "hasMobileApp": true/false,
  "hasCRM": true/false,
  "hasERP": true/false,
  "hasCloudSetup": true/false,
  "hasAdminTools": true/false,
  "technologyStack": "...",
  "cybersecurityPractices": "...",
  "apiIntegrations": "...",
  "shortTermGoals": "...",
  "longTermGoals": "...",
  "upcomingLaunches": "...",
  "automationAreas": "...",
  "revenueChallenges": "...",
  "salesMarketingChallenges": "...",
  "techBottlenecks": "...",
  "customerSupportChallenges": "...",
  "complianceConcerns": "...",
  "targetCustomers": "...",
  "competitors": "...",
  "dataFormat": "...",
  "industrySpecificProcesses": "...",
  "budgetPreference": "...",
  "preferredSolutionType": "...",
  "deadline": "...",
  "hasDevTeam": true/false,
  "resourceConstraints": "..."
}`;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash-exp",
      config: {
        responseMimeType: "application/json",
      },
      contents: prompt,
    });

    const result = JSON.parse(response.text);
    return result;
  } catch (error) {
    console.error("Gemini document analysis error:", error);
    throw new Error("Failed to analyze uploaded document");
  }
}
