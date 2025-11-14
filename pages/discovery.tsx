import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Button from '@/components/Button';
import Card from '@/components/Card';
import { isAuthenticated, saveSession, getSession, getUser } from '@/lib/storage';
import { parseFile, fetchURLContent } from '@/lib/fileParser';
import { Upload, FileText, Link as LinkIcon, Sparkles } from 'lucide-react';
import toast, { Toaster } from 'react-hot-toast';

export default function Discovery() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [uploadMethod, setUploadMethod] = useState<'file' | 'url' | null>(null);
  const [url, setUrl] = useState('');

  useEffect(() => {
    if (!isAuthenticated()) {
      router.push('/login');
    }
  }, [router]);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setLoading(true);
    toast.loading('Analyzing your business profile...');

    try {
      const content = await parseFile(file);
      
      const response = await fetch('/api/analyze-document', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content, fileName: file.name }),
      });

      if (!response.ok) throw new Error('Analysis failed');

      const businessProfile = await response.json();
      
      const user = getUser();
      const session = {
        userId: user?.id || '',
        businessProfile,
        uploadedFile: {
          name: file.name,
          type: file.type,
          content,
        },
        lastUpdated: new Date().toISOString(),
      };
      
      saveSession(session);
      toast.dismiss();
      toast.success('Profile analyzed successfully!');
      
      setTimeout(() => {
        router.push('/questionnaire?fromUpload=true');
      }, 1000);
    } catch (error) {
      toast.dismiss();
      toast.error('Failed to analyze document. Please try again.');
      setLoading(false);
    }
  };

  const handleURLSubmit = async () => {
    if (!url) return;

    setLoading(true);
    toast.loading('Fetching content from URL...');

    try {
      const content = await fetchURLContent(url);
      
      const response = await fetch('/api/analyze-document', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content, fileName: url }),
      });

      if (!response.ok) throw new Error('Analysis failed');

      const businessProfile = await response.json();
      
      const user = getUser();
      const session = {
        userId: user?.id || '',
        businessProfile,
        uploadedFile: {
          name: url,
          type: 'url',
          content,
        },
        lastUpdated: new Date().toISOString(),
      };
      
      saveSession(session);
      toast.dismiss();
      toast.success('Website analyzed successfully!');
      
      setTimeout(() => {
        router.push('/questionnaire?fromUpload=true');
      }, 1000);
    } catch (error) {
      toast.dismiss();
      toast.error('Failed to fetch URL content. Please try again.');
      setLoading(false);
    }
  };

  const handleQuestionnaire = () => {
    router.push('/questionnaire');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <Toaster position="top-right" />
      
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Sparkles className="w-8 h-8 text-indigo-600" />
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Business Discovery
            </h1>
          </div>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto">
            Share your business information to receive AI-powered, personalized IT and security recommendations
          </p>
        </div>

        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-8 mb-8">
          <Card hover>
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Upload className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-gray-800 mb-3">
                Upload Business Profile
              </h2>
              <p className="text-gray-600 mb-6">
                Upload your existing business profile document (PDF, DOCX, or TXT)
              </p>
              
              {uploadMethod === 'file' ? (
                <div className="space-y-4">
                  <input
                    type="file"
                    accept=".pdf,.doc,.docx,.txt"
                    onChange={handleFileUpload}
                    disabled={loading}
                    className="hidden"
                    id="file-upload"
                  />
                  <label htmlFor="file-upload">
                    <Button as="span" fullWidth disabled={loading}>
                      <FileText className="w-5 h-5" />
                      Choose File
                    </Button>
                  </label>
                  
                  <Button
                    variant="outline"
                    fullWidth
                    onClick={() => setUploadMethod('url')}
                    disabled={loading}
                  >
                    Or Enter Website URL
                  </Button>
                </div>
              ) : uploadMethod === 'url' ? (
                <div className="space-y-4">
                  <input
                    type="url"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    placeholder="https://yourcompany.com"
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-blue-500 outline-none"
                    disabled={loading}
                  />
                  <Button fullWidth onClick={handleURLSubmit} disabled={loading || !url}>
                    <LinkIcon className="w-5 h-5" />
                    Analyze Website
                  </Button>
                  <Button
                    variant="outline"
                    fullWidth
                    onClick={() => setUploadMethod('file')}
                    disabled={loading}
                  >
                    Or Upload Document
                  </Button>
                </div>
              ) : (
                <div className="space-y-3">
                  <Button fullWidth onClick={() => setUploadMethod('file')}>
                    <FileText className="w-5 h-5" />
                    Upload Document
                  </Button>
                  <Button variant="outline" fullWidth onClick={() => setUploadMethod('url')}>
                    <LinkIcon className="w-5 h-5" />
                    Enter Website URL
                  </Button>
                </div>
              )}
            </div>
          </Card>

          <Card hover>
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <FileText className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-gray-800 mb-3">
                Fill Smart Questionnaire
              </h2>
              <p className="text-gray-600 mb-6">
                Answer a structured questionnaire to help us understand your business needs
              </p>
              <Button variant="secondary" fullWidth size="lg" onClick={handleQuestionnaire}>
                Start Questionnaire
              </Button>
            </div>
          </Card>
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
