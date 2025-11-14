import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Button from '@/components/Button';
import Input from '@/components/Input';
import Card from '@/components/Card';
import { isAuthenticated, saveSession, getSession, getUser } from '@/lib/storage';
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

  useEffect(() => {
    if (!isAuthenticated()) {
      router.push('/login');
      return;
    }
    
    if (fromUpload) {
      const session = getSession();
      if (session?.businessProfile) {
        setFormData(session.businessProfile);
      }
    }
  }, [router, fromUpload]);

  const updateField = (field: keyof BusinessProfile, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const sections = [
    {
      title: 'Basic Business Identity',
      fields: [
        { name: 'businessName', label: 'Legal Business Name', type: 'text', required: true },
        { name: 'industry', label: 'Industry/Sector', type: 'text', required: true },
        { name: 'businessModel', label: 'Business Model', type: 'text', placeholder: 'B2B, B2C, SaaS, etc.', required: true },
        { name: 'yearEstablished', label: 'Year of Establishment', type: 'text', required: true },
        { name: 'teamSize', label: 'Team Size', type: 'text', required: true },
        { name: 'operatingRegions', label: 'Operating Countries/Regions', type: 'text', required: true },
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
        { name: 'targetCustomers', label: 'Target customers', type: 'textarea', required: true },
        { name: 'competitors', label: 'Competitors', type: 'textarea' },
        { name: 'dataFormat', label: 'Existing data format', type: 'text', placeholder: 'Excel, CRM, paper-based, etc.' },
        { name: 'industrySpecificProcesses', label: 'Industry-specific processes requiring optimization', type: 'textarea' },
      ],
    },
    {
      title: 'Preferences & Constraints',
      fields: [
        { name: 'budgetPreference', label: 'Budget preference', type: 'text', placeholder: 'Low, Medium, High, Flexible' },
        { name: 'preferredSolutionType', label: 'Preferred solution type', type: 'text', placeholder: 'Web app, Mobile app, Automation, etc.' },
        { name: 'deadline', label: 'Deadline or urgency', type: 'text' },
        { name: 'hasDevTeam', label: 'Do you have an existing developer team?', type: 'checkbox' },
        { name: 'resourceConstraints', label: 'Resource constraints', type: 'textarea' },
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
      const response = await fetch('/api/analyze-profile', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error('Analysis failed');

      const result = await response.json();
      
      const user = getUser();
      const session = {
        userId: user?.id || '',
        businessProfile: formData,
        recommendations: result.recommendations,
        projectBlueprint: result.projectBlueprint,
        lastUpdated: new Date().toISOString(),
      };
      
      saveSession(session);
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
              {currentSectionData.fields.map((field) => (
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
