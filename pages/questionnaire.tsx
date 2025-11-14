import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Button from '@/components/Button';
import Input from '@/components/Input';
import Select from '@/components/Select';
import Card from '@/components/Card';
import { isAuthenticated, saveSession, getSession, getUser, saveQuestionnaireDraft, getQuestionnaireDraft, clearQuestionnaireDraft } from '@/lib/storage';
import { BusinessProfile } from '@/types';
import { ArrowRight, ArrowLeft, Sparkles } from 'lucide-react';
import toast, { Toaster } from 'react-hot-toast';

export default function Questionnaire() {
  const router = useRouter();
  const { fromUpload } = router.query;
  const [currentSection, setCurrentSection] = useState(0);
  const [loading, setLoading] = useState(false);
  
  const [formData, setFormData] = useState<BusinessProfile>({
    businessName: '',
    industry: '',
    businessModel: '',
    yearEstablished: '',
    teamSize: '',
    operatingRegions: '',
    coreOperations: '',
    workflowChallenges: '',
    manualTasks: '',
    currentTools: '',
    hasWebsite: false,
    hasMobileApp: false,
    hasCRM: false,
    hasERP: false,
    hasCloudSetup: false,
    hasAdminTools: false,
    technologyStack: '',
    cybersecurityPractices: '',
    apiIntegrations: '',
    shortTermGoals: '',
    longTermGoals: '',
    upcomingLaunches: '',
    automationAreas: '',
    revenueChallenges: '',
    salesMarketingChallenges: '',
    techBottlenecks: '',
    customerSupportChallenges: '',
    complianceConcerns: '',
    targetCustomers: '',
    competitors: '',
    dataFormat: '',
    industrySpecificProcesses: '',
    budgetPreference: '',
    preferredSolutionType: '',
    deadline: '',
    hasDevTeam: false,
    resourceConstraints: '',
  });
  
  const [customIndustry, setCustomIndustry] = useState('');

  useEffect(() => {
    if (!isAuthenticated()) {
      router.push('/login');
      return;
    }
    
    const draft = getQuestionnaireDraft();
    if (draft && !fromUpload) {
      setFormData(draft.formData);
      if (draft.customIndustry) setCustomIndustry(draft.customIndustry);
      if (draft.currentSection) setCurrentSection(draft.currentSection);
    } else if (fromUpload) {
      const session = getSession();
      if (session?.businessProfile) {
        setFormData(session.businessProfile);
      }
    }
  }, [router, fromUpload]);

  useEffect(() => {
    if (formData.businessName) {
      saveQuestionnaireDraft({
        formData,
        customIndustry,
        currentSection
      });
    }
  }, [formData, customIndustry, currentSection]);

  const updateField = (field: keyof BusinessProfile, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const sections = [
    {
      title: 'Basic Business Identity',
      fields: [
        { name: 'businessName', label: 'Legal Business Name', type: 'text', required: true },
        { 
          name: 'industry', 
          label: 'Industry/Sector', 
          type: 'select', 
          required: true,
          options: [
            { value: 'Technology & Software', label: 'Technology & Software' },
            { value: 'Healthcare & Medical', label: 'Healthcare & Medical' },
            { value: 'Finance & Banking', label: 'Finance & Banking' },
            { value: 'E-commerce & Retail', label: 'E-commerce & Retail' },
            { value: 'Manufacturing', label: 'Manufacturing' },
            { value: 'Education & E-Learning', label: 'Education & E-Learning' },
            { value: 'Real Estate', label: 'Real Estate' },
            { value: 'Hospitality & Tourism', label: 'Hospitality & Tourism' },
            { value: 'Logistics & Transportation', label: 'Logistics & Transportation' },
            { value: 'Marketing & Advertising', label: 'Marketing & Advertising' },
            { value: 'Consulting & Professional Services', label: 'Consulting & Professional Services' },
            { value: 'Food & Beverage', label: 'Food & Beverage' },
            { value: 'Agriculture', label: 'Agriculture' },
            { value: 'Construction', label: 'Construction' },
            { value: 'Media & Entertainment', label: 'Media & Entertainment' },
            { value: 'Legal Services', label: 'Legal Services' },
            { value: 'Non-Profit & NGO', label: 'Non-Profit & NGO' },
            { value: 'Other', label: 'Other' },
          ]
        },
        { 
          name: 'businessModel', 
          label: 'Business Model', 
          type: 'select', 
          required: true,
          options: [
            { value: 'B2B', label: 'B2B (Business to Business)' },
            { value: 'B2C', label: 'B2C (Business to Consumer)' },
            { value: 'D2C', label: 'D2C (Direct to Consumer)' },
            { value: 'SaaS', label: 'SaaS (Software as a Service)' },
            { value: 'Marketplace', label: 'Marketplace' },
            { value: 'Consulting', label: 'Consulting' },
            { value: 'E-commerce', label: 'E-commerce' },
            { value: 'Subscription', label: 'Subscription-based' },
            { value: 'Freemium', label: 'Freemium' },
            { value: 'Mixed', label: 'Mixed/Hybrid' },
          ]
        },
        { name: 'yearEstablished', label: 'Year of Establishment', type: 'text', placeholder: 'e.g., 2020', required: true },
        { 
          name: 'teamSize', 
          label: 'Team Size', 
          type: 'select', 
          required: true,
          options: [
            { value: '1-5 employees', label: '1-5 employees (Startup)' },
            { value: '6-20 employees', label: '6-20 employees (Small)' },
            { value: '21-50 employees', label: '21-50 employees (Medium)' },
            { value: '51-200 employees', label: '51-200 employees (Growing)' },
            { value: '201-500 employees', label: '201-500 employees (Large)' },
            { value: '500+ employees', label: '500+ employees (Enterprise)' },
          ]
        },
        { name: 'operatingRegions', label: 'Operating Countries/Regions', type: 'text', placeholder: 'e.g., USA, UK, India', required: true },
      ],
    },
    {
      title: 'Current Operations & Processes',
      fields: [
        { name: 'coreOperations', label: 'Describe your core daily operations', type: 'textarea', required: true },
        { name: 'workflowChallenges', label: 'Current workflow challenges', type: 'textarea', required: true },
        { name: 'manualTasks', label: 'Manual tasks you want to automate', type: 'textarea', required: true },
        { name: 'currentTools', label: 'Tools/software/platforms currently used', type: 'textarea', required: true },
      ],
    },
    {
      title: 'Technology Status',
      fields: [
        { name: 'hasWebsite', label: 'Do you have a website?', type: 'checkbox' },
        { name: 'hasMobileApp', label: 'Do you have a mobile app?', type: 'checkbox' },
        { name: 'hasCRM', label: 'Do you have a CRM?', type: 'checkbox' },
        { name: 'hasERP', label: 'Do you have an ERP?', type: 'checkbox' },
        { name: 'hasCloudSetup', label: 'Do you have cloud setup?', type: 'checkbox' },
        { name: 'hasAdminTools', label: 'Do you have internal admin tools?', type: 'checkbox' },
        { name: 'technologyStack', label: 'Technology stack currently used', type: 'textarea' },
        { name: 'cybersecurityPractices', label: 'Existing cybersecurity practices', type: 'textarea' },
        { name: 'apiIntegrations', label: 'Any API or integrations currently used', type: 'textarea' },
      ],
    },
    {
      title: 'Business Goals & Vision',
      fields: [
        { name: 'shortTermGoals', label: 'Short-term goals (next 6 months)', type: 'textarea', required: true },
        { name: 'longTermGoals', label: 'Long-term goals (1-3 years)', type: 'textarea', required: true },
        { name: 'upcomingLaunches', label: 'Any upcoming product launches or expansions?', type: 'textarea' },
        { name: 'automationAreas', label: 'Desired automation or improvement areas', type: 'textarea', required: true },
      ],
    },
    {
      title: 'Challenges & Blockers',
      fields: [
        { name: 'revenueChallenges', label: 'Revenue challenges', type: 'textarea', required: true },
        { name: 'salesMarketingChallenges', label: 'Sales/marketing challenges', type: 'textarea', required: true },
        { name: 'techBottlenecks', label: 'Tech or infrastructure bottlenecks', type: 'textarea', required: true },
        { name: 'customerSupportChallenges', label: 'Customer support challenges', type: 'textarea' },
        { name: 'complianceConcerns', label: 'Compliance or regulatory concerns', type: 'textarea' },
      ],
    },
    {
      title: 'Industry-Specific Data',
      fields: [
        { name: 'targetCustomers', label: 'Target customers', type: 'textarea', placeholder: 'Describe your ideal customer profile...', required: true },
        { name: 'competitors', label: 'Competitors', type: 'textarea', placeholder: 'List your main competitors...' },
        { 
          name: 'dataFormat', 
          label: 'Existing data format', 
          type: 'select',
          options: [
            { value: 'Excel/Spreadsheets', label: 'Excel/Spreadsheets' },
            { value: 'CRM System', label: 'CRM System (Salesforce, HubSpot, etc.)' },
            { value: 'ERP System', label: 'ERP System (SAP, Oracle, etc.)' },
            { value: 'Database', label: 'Database (SQL, NoSQL)' },
            { value: 'Cloud Storage', label: 'Cloud Storage (Google Drive, Dropbox)' },
            { value: 'Paper-based', label: 'Paper-based Records' },
            { value: 'Mixed/Multiple', label: 'Mixed/Multiple Systems' },
            { value: 'No formal system', label: 'No formal system' },
          ]
        },
        { name: 'industrySpecificProcesses', label: 'Industry-specific processes requiring optimization', type: 'textarea', placeholder: 'Describe unique processes in your industry...' },
      ],
    },
    {
      title: 'Preferences & Constraints',
      fields: [
        { 
          name: 'budgetPreference', 
          label: 'Budget preference', 
          type: 'select',
          required: true,
          options: [
            { value: 'Low ($5K-$15K)', label: 'Low ($5K-$15K)' },
            { value: 'Medium ($15K-$50K)', label: 'Medium ($15K-$50K)' },
            { value: 'High ($50K-$150K)', label: 'High ($50K-$150K)' },
            { value: 'Enterprise ($150K+)', label: 'Enterprise ($150K+)' },
            { value: 'Flexible', label: 'Flexible - ROI Driven' },
          ]
        },
        { 
          name: 'preferredSolutionType', 
          label: 'Preferred solution type', 
          type: 'select',
          required: true,
          options: [
            { value: 'Web Application', label: 'Web Application' },
            { value: 'Mobile App (iOS/Android)', label: 'Mobile App (iOS/Android)' },
            { value: 'Process Automation', label: 'Process Automation' },
            { value: 'Backend/API Development', label: 'Backend/API Development' },
            { value: 'Cybersecurity Solutions', label: 'Cybersecurity Solutions' },
            { value: 'AI/ML Solutions', label: 'AI/ML Solutions' },
            { value: 'Cloud Infrastructure', label: 'Cloud Infrastructure' },
            { value: 'Data Analytics/BI', label: 'Data Analytics/BI' },
            { value: 'Full Stack Solution', label: 'Full Stack Solution' },
            { value: 'Not Sure - Need Consultation', label: 'Not Sure - Need Consultation' },
          ]
        },
        { 
          name: 'deadline', 
          label: 'Deadline or urgency', 
          type: 'select',
          required: true,
          options: [
            { value: 'Urgent (1-2 months)', label: 'Urgent (1-2 months)' },
            { value: 'Standard (3-6 months)', label: 'Standard (3-6 months)' },
            { value: 'Long-term (6-12 months)', label: 'Long-term (6-12 months)' },
            { value: 'Flexible Timeline', label: 'Flexible Timeline' },
          ]
        },
        { name: 'hasDevTeam', label: 'Do you have an existing developer team?', type: 'checkbox' },
        { name: 'resourceConstraints', label: 'Resource constraints', type: 'textarea', placeholder: 'Describe any limitations in budget, time, or team capacity...' },
      ],
    },
  ];

  const currentSectionData = sections[currentSection];
  const isLastSection = currentSection === sections.length - 1;

  const handleNext = () => {
    if (currentSection < sections.length - 1) {
      setCurrentSection(currentSection + 1);
      window.scrollTo(0, 0);
    }
  };

  const handlePrevious = () => {
    if (currentSection > 0) {
      setCurrentSection(currentSection - 1);
      window.scrollTo(0, 0);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    setLoading(true);
    toast.loading('Generating your personalized recommendations...');

    try {
      const submissionData = { ...formData };
      if (formData.industry === 'Other' && customIndustry.trim()) {
        submissionData.industry = customIndustry;
      }
      
      const response = await fetch('/api/analyze-profile', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(submissionData),
      });

      if (!response.ok) throw new Error('Analysis failed');

      const result = await response.json();
      
      const user = getUser();
      const session = {
        userId: user?.id || '',
        businessProfile: submissionData,
        recommendations: result.recommendations,
        projectBlueprint: result.projectBlueprint,
        lastUpdated: new Date().toISOString(),
      };
      
      saveSession(session);
      clearQuestionnaireDraft();
      toast.dismiss();
      toast.success('Recommendations generated successfully!');
      
      setTimeout(() => {
        router.push('/dashboard');
      }, 1000);
    } catch (error) {
      toast.dismiss();
      toast.error('Failed to generate recommendations. Please try again.');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <Toaster position="top-right" />
      
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Sparkles className="w-8 h-8 text-indigo-600" />
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Business Profile Questionnaire
            </h1>
          </div>
          <p className="text-gray-600">
            Section {currentSection + 1} of {sections.length}
          </p>
        </div>

        <div className="max-w-3xl mx-auto mb-6">
          <div className="flex gap-1">
            {sections.map((_, idx) => (
              <div
                key={idx}
                className={`h-2 flex-1 rounded-full transition-all ${
                  idx <= currentSection ? 'bg-gradient-to-r from-blue-600 to-indigo-600' : 'bg-gray-200'
                }`}
              />
            ))}
          </div>
        </div>

        <div className="max-w-3xl mx-auto">
          <Card>
            <h2 className="text-2xl font-bold text-gray-800 mb-6">
              {currentSectionData.title}
            </h2>

            <form onSubmit={isLastSection ? handleSubmit : (e) => { e.preventDefault(); handleNext(); }}>
              {currentSectionData.fields.map((field: any) => (
                <div key={field.name}>
                  {field.type === 'checkbox' ? (
                    <label className="flex items-center gap-3 mb-4 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={formData[field.name as keyof BusinessProfile] as boolean}
                        onChange={(e) => updateField(field.name as keyof BusinessProfile, e.target.checked)}
                        className="w-5 h-5 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
                      />
                      <span className="text-gray-700 font-medium">{field.label}</span>
                    </label>
                  ) : field.type === 'select' ? (
                    <>
                      <Select
                        label={field.label}
                        value={formData[field.name as keyof BusinessProfile] as string}
                        onChange={(value) => {
                          updateField(field.name as keyof BusinessProfile, value);
                          if (field.name === 'industry' && value !== 'Other') {
                            setCustomIndustry('');
                          }
                        }}
                        options={field.options || []}
                        placeholder={`Select ${field.label.toLowerCase()}`}
                        required={field.required}
                      />
                      {field.name === 'industry' && formData.industry === 'Other' && (
                        <div className="mt-2">
                          <Input
                            label="Please specify your industry"
                            type="text"
                            value={customIndustry}
                            onChange={(value) => setCustomIndustry(value)}
                            placeholder="Enter your industry name..."
                            required={true}
                          />
                        </div>
                      )}
                    </>
                  ) : (
                    <Input
                      label={field.label}
                      type={field.type === 'textarea' ? 'text' : field.type}
                      value={formData[field.name as keyof BusinessProfile] as string}
                      onChange={(value) => updateField(field.name as keyof BusinessProfile, value)}
                      placeholder={field.placeholder}
                      required={field.required}
                      multiline={field.type === 'textarea'}
                      rows={4}
                    />
                  )}
                </div>
              ))}

              <div className="flex gap-4 mt-8">
                {currentSection > 0 && (
                  <Button
                    type="button"
                    variant="outline"
                    onClick={handlePrevious}
                    disabled={loading}
                  >
                    <ArrowLeft className="w-5 h-5" />
                    Previous
                  </Button>
                )}
                
                <Button
                  type="submit"
                  fullWidth={currentSection === 0}
                  disabled={loading}
                  variant={isLastSection ? 'secondary' : 'primary'}
                >
                  {isLastSection ? (
                    <>
                      Generate Recommendations
                      <Sparkles className="w-5 h-5" />
                    </>
                  ) : (
                    <>
                      Next
                      <ArrowRight className="w-5 h-5" />
                    </>
                  )}
                </Button>
              </div>
            </form>
          </Card>
        </div>
      </div>
    </div>
  );
}
