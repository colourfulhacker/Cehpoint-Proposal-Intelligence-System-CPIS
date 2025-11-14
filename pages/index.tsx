import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { isAuthenticated } from '@/lib/storage';
import Button from '@/components/Button';
import { Sparkles, Target, Shield, Zap, Brain } from 'lucide-react';

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    if (isAuthenticated()) {
      router.push('/discovery');
    }
  }, [router]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-3 mb-6">
            <Sparkles className="w-16 h-16 text-indigo-600" />
            <h1 className="text-6xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Cehpoint
            </h1>
          </div>
          <p className="text-2xl text-gray-700 mb-4">
            AI-Powered Client Onboarding & Service Recommendation System
          </p>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto mb-8">
            Transform your business with intelligent IT solutions, cybersecurity services, 
            and automation recommendations tailored specifically to your needs.
          </p>
          <div className="flex gap-4 justify-center">
            <Button size="lg" onClick={() => router.push('/login')}>
              Get Started
              <Sparkles className="w-5 h-5" />
            </Button>
            <Button variant="outline" size="lg" onClick={() => router.push('/login')}>
              Sign In
            </Button>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto mb-16">
          <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-2xl transition-all">
            <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center mb-4">
              <Target className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-lg font-bold text-gray-800 mb-2">
              Process Automation
            </h3>
            <p className="text-sm text-gray-600">
              Streamline workflows and eliminate manual tasks
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-2xl transition-all">
            <div className="w-12 h-12 bg-gradient-to-r from-red-500 to-pink-500 rounded-lg flex items-center justify-center mb-4">
              <Shield className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-lg font-bold text-gray-800 mb-2">
              Cybersecurity
            </h3>
            <p className="text-sm text-gray-600">
              Protect your business from evolving threats
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-2xl transition-all">
            <div className="w-12 h-12 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-lg flex items-center justify-center mb-4">
              <Zap className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-lg font-bold text-gray-800 mb-2">
              Custom Software
            </h3>
            <p className="text-sm text-gray-600">
              Build solutions that fit your unique needs
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-2xl transition-all">
            <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg flex items-center justify-center mb-4">
              <Brain className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-lg font-bold text-gray-800 mb-2">
              AI Solutions
            </h3>
            <p className="text-sm text-gray-600">
              Leverage intelligent automation and analytics
            </p>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
            How It Works
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-3">
                1
              </div>
              <h3 className="font-bold text-gray-800 mb-2">Share Your Business Info</h3>
              <p className="text-sm text-gray-600">
                Upload your business profile or complete our smart questionnaire
              </p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-indigo-600 text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-3">
                2
              </div>
              <h3 className="font-bold text-gray-800 mb-2">AI Analyzes Your Needs</h3>
              <p className="text-sm text-gray-600">
                Our AI understands your challenges, goals, and opportunities
              </p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-purple-600 text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-3">
                3
              </div>
              <h3 className="font-bold text-gray-800 mb-2">Get Tailored Solutions</h3>
              <p className="text-sm text-gray-600">
                Receive personalized recommendations with clear business impact
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
