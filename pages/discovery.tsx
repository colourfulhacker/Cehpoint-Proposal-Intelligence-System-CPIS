import { useEffect } from 'react';
import { useRouter } from 'next/router';
import Button from '@/components/Button';
import Card from '@/components/Card';
import { isAuthenticated } from '@/lib/storage';
import { FileText, AlertCircle } from 'lucide-react';

export default function Discovery() {
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated()) {
      router.push('/login');
    }
  }, [router]);

  const handleQuestionnaire = () => {
    router.push('/questionnaire');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Business Discovery
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Share your business information to receive AI-powered, personalized IT and security recommendations
          </p>
        </div>

        <div className="max-w-4xl mx-auto mb-8">
          <Card>
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-600 rounded-xl flex items-center justify-center mx-auto mb-4">
                <FileText className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-3">
                Complete Business Questionnaire
              </h2>
              <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
                Answer our comprehensive 7-section questionnaire to help us understand your business needs and provide personalized technology recommendations
              </p>
              <Button fullWidth size="lg" onClick={handleQuestionnaire}>
                Start Questionnaire
              </Button>
            </div>
          </Card>
          
          <div className="mt-6 bg-amber-50 border border-amber-200 rounded-lg p-4">
            <div className="flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="font-semibold text-amber-900 mb-1">Document Upload Temporarily Unavailable</h3>
                <p className="text-sm text-amber-800">
                  The business profile upload feature is currently under development and requires technical configuration. Please use the questionnaire to provide your business information. Our team is working to enable document uploads soon.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-3xl mx-auto">
          <Card>
            <h3 className="text-lg font-semibold text-gray-800 mb-3">
              What happens next?
            </h3>
            <ul className="space-y-2 text-gray-600">
              <li className="flex items-start gap-2">
                <span className="text-blue-600 font-bold">1.</span>
                <span>Our AI analyzes your business information comprehensively</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-600 font-bold">2.</span>
                <span>We identify opportunities for automation, security, and growth</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-600 font-bold">3.</span>
                <span>You receive personalized service recommendations with clear business impact</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-600 font-bold">4.</span>
                <span>Review a high-level project blueprint tailored to your needs</span>
              </li>
            </ul>
          </Card>
        </div>
      </div>
    </div>
  );
}
