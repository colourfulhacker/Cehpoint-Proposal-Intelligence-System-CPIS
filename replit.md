# Cehpoint - AI-Powered Client Onboarding & Service Recommendation System

## Overview
Cehpoint is an intelligent client onboarding platform that leverages Google Gemini AI to analyze business profiles and generate personalized IT service, cybersecurity, and automation recommendations. The system provides a consultative, data-driven approach to identifying technology solutions that match each client's unique business needs.

**Built:** November 14, 2025
**Tech Stack:** Next.js, TypeScript, Tailwind CSS, Google Gemini API
**Current Status:** Fully functional MVP with complete user flow

## Project Purpose
Transform business consulting by using AI to:
- Analyze client business profiles comprehensively
- Identify specific automation, security, and technology opportunities
- Generate actionable, prioritized service recommendations
- Provide clear business impact and ROI estimates
- Create high-level project blueprints

## Architecture

### Frontend (Next.js Pages Router)
- **pages/index.tsx** - Landing page with overview
- **pages/login.tsx** - Authentication/signup page
- **pages/discovery.tsx** - Business profile upload and questionnaire selection
- **pages/questionnaire.tsx** - 7-section smart questionnaire
- **pages/dashboard.tsx** - Recommendations and project blueprint view

### API Routes
- **pages/api/analyze-profile.ts** - Analyzes questionnaire data with Gemini
- **pages/api/analyze-document.ts** - Analyzes uploaded documents with Gemini
- **pages/api/fetch-url.ts** - Fetches and extracts content from URLs

### Core Services
- **lib/gemini.ts** - Gemini API integration for AI analysis
- **lib/storage.ts** - Local storage management for sessions
- **lib/fileParser.ts** - File parsing (PDF, DOCX, TXT)

### Types
- **types/index.ts** - TypeScript interfaces for all data structures

### UI Components
- **components/Button.tsx** - Reusable button with variants
- **components/Card.tsx** - Card container with hover effects
- **components/Input.tsx** - Form input with label support

## Key Features

### 1. Dual Onboarding Methods
- **Upload Business Profile** - PDF, DOCX, TXT, or website URL
- **Smart Questionnaire** - 7 comprehensive sections covering all business aspects

### 2. AI-Powered Analysis
Uses Google Gemini to:
- Extract business information from uploaded documents
- Analyze business challenges, goals, and technology status
- Generate 6-12 personalized recommendations across 6 categories
- Create project blueprints with phases, deliverables, and costs

### 3. Recommendation Categories
1. Process Automation & Optimization
2. Software Solutions
3. Cybersecurity & Risk Reduction
4. Technology Modernization
5. AI & Intelligent Automation
6. Industry-Specific Solutions

### 4. Rich Dashboard
- Priority-based recommendations (High/Medium/Low)
- Category filtering
- Business impact and ROI display
- Timeline and cost estimates
- Project blueprint with phases

## User Flow

1. **Landing Page** → User sees overview and value proposition
2. **Sign Up/Login** → Simple authentication with email
3. **Discovery** → Choose upload or questionnaire
4. **Analysis** → AI processes business information
5. **Dashboard** → View personalized recommendations and blueprint

## Data Storage
- **Local Storage** for MVP (session persistence)
- Ready for Supabase backend integration (developer will add later)

## Environment Variables
- **GEMINI_API_KEY** - Google Gemini API key (configured in Replit Secrets)

## Recent Changes

### November 14, 2025 - Initial Build
- Set up complete Next.js application with TypeScript
- Integrated Google Gemini API for AI analysis
- Implemented file parsing for PDF, DOCX, TXT
- Built 7-section comprehensive questionnaire
- Created beautiful UI with Tailwind CSS
- Configured Tailwind v4 with @tailwindcss/postcss
- Set up local storage session management
- Deployed on port 5000 for Replit webview

## User Preferences
- Clean, modern gradient-based design
- Masterpiece UX with smooth transitions
- High-quality AI recommendations (specific, actionable, valuable)
- Professional color scheme (blue, indigo, purple gradients)
- Mobile-friendly responsive design

## Development Notes

### Tailwind CSS Setup
- Using Tailwind CSS v4 with @tailwindcss/postcss
- PostCSS configured with autoprefixer
- Global styles in styles/globals.css

### Next.js Configuration
- Port 5000 for Replit compatibility
- Hostname 0.0.0.0 for public access
- Pages Router (not App Router)

### Future Enhancements (For Developer)
- Supabase backend integration
- User authentication with database
- Persistent storage of profiles and recommendations
- Email notifications
- PDF export of recommendations
- Admin dashboard
- Analytics and tracking

## Technical Decisions

1. **Why Gemini API?** - Superior analysis capabilities, JSON mode, multimodal support
2. **Why Local Storage?** - Simplifies MVP, easy to migrate to Supabase later
3. **Why Next.js?** - Server-side API routes, easy deployment, TypeScript support
4. **Why Tailwind CSS?** - Rapid UI development, consistent design system
5. **Why Pages Router?** - Simpler for this use case than App Router

## Known Issues
- None currently - application is fully functional

## Performance
- Fast initial load
- Efficient AI processing with streaming support
- Responsive UI with smooth transitions
- Optimized for Vercel/Replit deployment
