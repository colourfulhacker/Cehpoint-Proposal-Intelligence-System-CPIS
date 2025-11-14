import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { isAuthenticated } from '@/lib/storage';
import Button from '@/components/Button';
import { Sparkles, Target, Shield, Zap, Brain, CheckCircle, TrendingUp, Users, Award } from 'lucide-react';

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    if (isAuthenticated()) {
      router.push('/discovery');
    }
  }, [router]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Navigation */}
      <nav className="bg-white shadow-sm border-b border-gray-200">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-2xl font-bold text-gray-900">
                Cehpoint
              </span>
            </div>
            <Button variant="outline" onClick={() => router.push('/login')}>
              Sign In
            </Button>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-6 py-16">
        {/* Hero Section */}
        <div className="text-center mb-20 max-w-5xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            Enterprise Technology Consulting,
            <span className="block text-blue-600">
              Powered by Artificial Intelligence
            </span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 leading-relaxed max-w-3xl mx-auto">
            Cehpoint delivers data-driven technology recommendations tailored to your business. 
            Our AI-powered platform analyzes your operations, challenges, and goals to identify 
            high-impact IT solutions, security enhancements, and automation opportunities.
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Button size="lg" onClick={() => router.push('/login')} className="shadow-xl">
              Get Started
            </Button>
            <Button variant="outline" size="lg" onClick={() => router.push('/login')}>
              Learn More
            </Button>
          </div>
          
          {/* Trust Indicators */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16 pt-8 border-t border-gray-200">
            <div className="text-center">
              <div className="text-3xl font-bold text-gray-900 mb-1">500+</div>
              <div className="text-sm text-gray-600">Businesses Analyzed</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-gray-900 mb-1">95%</div>
              <div className="text-sm text-gray-600">Implementation Rate</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-gray-900 mb-1">$2.4M</div>
              <div className="text-sm text-gray-600">Avg. Cost Savings</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-gray-900 mb-1">15min</div>
              <div className="text-sm text-gray-600">Assessment Time</div>
            </div>
          </div>
        </div>

        {/* Core Services */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Comprehensive Technology Services
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              From automation to security, we identify the solutions your business needs to thrive
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-2xl transition-all border border-gray-100">
              <div className="w-14 h-14 bg-blue-600 rounded-xl flex items-center justify-center mb-4">
                <Target className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">
                Process Automation
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                Streamline operations, reduce manual work, and boost productivity with intelligent workflow automation
              </p>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-2xl transition-all border border-gray-100">
              <div className="w-14 h-14 bg-red-600 rounded-xl flex items-center justify-center mb-4">
                <Shield className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">
                Cybersecurity
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                Protect your business with comprehensive security assessments, threat detection, and compliance solutions
              </p>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-2xl transition-all border border-gray-100">
              <div className="w-14 h-14 bg-orange-600 rounded-xl flex items-center justify-center mb-4">
                <Zap className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">
                Custom Software
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                Build scalable applications, dashboards, and tools designed specifically for your unique requirements
              </p>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-2xl transition-all border border-gray-100">
              <div className="w-14 h-14 bg-green-600 rounded-xl flex items-center justify-center mb-4">
                <Brain className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">
                AI & Analytics
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                Leverage machine learning, predictive analytics, and intelligent automation to gain competitive advantage
              </p>
            </div>
          </div>
        </div>

        {/* How It Works */}
        <div className="bg-gradient-to-br from-white to-blue-50 rounded-2xl shadow-2xl p-10 md:p-12 max-w-5xl mx-auto mb-20 border border-blue-100">
          <h2 className="text-3xl font-bold text-gray-900 mb-3 text-center">
            How Cehpoint Works
          </h2>
          <p className="text-center text-gray-600 mb-10 max-w-2xl mx-auto">
            Our AI-driven assessment process delivers actionable insights in three simple steps
          </p>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="relative">
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-blue-700 text-white rounded-2xl flex items-center justify-center text-2xl font-bold mx-auto mb-4 shadow-lg">
                  1
                </div>
                <h3 className="font-bold text-gray-900 mb-3 text-lg">Submit Business Profile</h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  Upload your company documentation or complete our comprehensive 7-section questionnaire covering operations, technology, and goals
                </p>
              </div>
            </div>
            
            <div className="relative">
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-indigo-600 to-indigo-700 text-white rounded-2xl flex items-center justify-center text-2xl font-bold mx-auto mb-4 shadow-lg">
                  2
                </div>
                <h3 className="font-bold text-gray-900 mb-3 text-lg">AI Analysis & Mapping</h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  Our Gemini-powered engine analyzes your data, identifies gaps, and matches business needs with optimal technology solutions
                </p>
              </div>
            </div>
            
            <div className="relative">
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-600 to-purple-700 text-white rounded-2xl flex items-center justify-center text-2xl font-bold mx-auto mb-4 shadow-lg">
                  3
                </div>
                <h3 className="font-bold text-gray-900 mb-3 text-lg">Receive Custom Roadmap</h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  Get prioritized recommendations with ROI projections, implementation timelines, and a detailed project blueprint
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Why Choose Cehpoint */}
        <div className="max-w-5xl mx-auto mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Why Leading Businesses Choose Cehpoint
            </h2>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="flex gap-4 bg-white p-6 rounded-xl shadow-md border border-gray-100">
              <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
              <div>
                <h4 className="font-bold text-gray-900 mb-2">Data-Driven Recommendations</h4>
                <p className="text-sm text-gray-600">AI analyzes your specific business context, not generic templates</p>
              </div>
            </div>
            
            <div className="flex gap-4 bg-white p-6 rounded-xl shadow-md border border-gray-100">
              <TrendingUp className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
              <div>
                <h4 className="font-bold text-gray-900 mb-2">ROI-Focused Approach</h4>
                <p className="text-sm text-gray-600">Every recommendation includes measurable business impact and expected returns</p>
              </div>
            </div>
            
            <div className="flex gap-4 bg-white p-6 rounded-xl shadow-md border border-gray-100">
              <Users className="w-6 h-6 text-indigo-600 flex-shrink-0 mt-1" />
              <div>
                <h4 className="font-bold text-gray-900 mb-2">Industry Expertise</h4>
                <p className="text-sm text-gray-600">Solutions tailored to your sector's unique challenges and compliance requirements</p>
              </div>
            </div>
            
            <div className="flex gap-4 bg-white p-6 rounded-xl shadow-md border border-gray-100">
              <Award className="w-6 h-6 text-purple-600 flex-shrink-0 mt-1" />
              <div>
                <h4 className="font-bold text-gray-900 mb-2">Comprehensive Blueprint</h4>
                <p className="text-sm text-gray-600">Complete project roadmap with phases, deliverables, and cost estimates</p>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 rounded-2xl shadow-2xl p-12 text-center text-white max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Transform Your Business?
          </h2>
          <p className="text-lg mb-8 text-blue-100 max-w-2xl mx-auto">
            Join hundreds of businesses leveraging AI-powered insights to make smarter technology decisions
          </p>
          <Button 
            size="lg" 
            onClick={() => router.push('/login')}
            className="bg-white text-indigo-600 hover:bg-gray-100 shadow-xl"
          >
            Get Your Free Assessment
          </Button>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-8 mt-20">
        <div className="container mx-auto px-6 text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <span className="text-xl font-bold text-white">Cehpoint</span>
          </div>
          <p className="text-sm">
            Enterprise Technology Consulting Platform © 2024
          </p>
        </div>
      </footer>
    </div>
  );
}
