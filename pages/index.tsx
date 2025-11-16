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

      <div className="container mx-auto px-6 py-20">
        {/* Hero Section */}
        <div className="text-center mb-28 max-w-5xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-8 leading-tight tracking-wide">
            Enterprise Technology Consulting,
            <span className="block text-blue-600 mt-2">
              Powered by Artificial Intelligence
            </span>
          </h1>
          <p className="text-xl text-gray-600 mb-12 leading-loose max-w-3xl mx-auto font-light">
            Cehpoint delivers data-driven technology recommendations tailored to your business. 
            Our AI-powered platform analyzes your operations, challenges, and goals to identify 
            high-impact IT solutions, security enhancements, and automation opportunities.
          </p>
          <div className="flex gap-5 justify-center flex-wrap">
            <Button size="lg" onClick={() => router.push('/login')} className="shadow-xl px-8 py-4">
              Get Started
            </Button>
            <Button variant="outline" size="lg" onClick={() => router.push('/login')} className="px-8 py-4">
              Learn More
            </Button>
          </div>
          
          {/* Trust Indicators */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-0 mt-20 pt-12 border-t border-gray-200">
            <div className="text-center px-6 py-4 border-r border-gray-200 last:border-r-0">
              <div className="text-4xl md:text-5xl font-semibold text-gray-900 mb-2">500+</div>
              <div className="text-xs uppercase tracking-wider text-gray-500 font-medium">Businesses Analyzed</div>
            </div>
            <div className="text-center px-6 py-4 border-r border-gray-200 md:border-r last:border-r-0">
              <div className="text-4xl md:text-5xl font-semibold text-gray-900 mb-2">95%</div>
              <div className="text-xs uppercase tracking-wider text-gray-500 font-medium">Implementation Rate</div>
            </div>
            <div className="text-center px-6 py-4 border-r border-gray-200 last:border-r-0">
              <div className="text-4xl md:text-5xl font-semibold text-gray-900 mb-2">$2.4M</div>
              <div className="text-xs uppercase tracking-wider text-gray-500 font-medium">Avg. Cost Savings</div>
            </div>
            <div className="text-center px-6 py-4">
              <div className="text-4xl md:text-5xl font-semibold text-gray-900 mb-2">15min</div>
              <div className="text-xs uppercase tracking-wider text-gray-500 font-medium">Assessment Time</div>
            </div>
          </div>
        </div>

        {/* Core Services */}
        <div className="mb-28">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-semibold text-gray-900 mb-5 tracking-tight">
              Comprehensive Technology Services
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto font-light leading-relaxed">
              From automation to security, we identify the solutions your business needs to thrive
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            <div className="bg-white rounded-2xl shadow-md hover:shadow-2xl transition-all duration-300 border border-gray-100 p-8">
              <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center mb-6 shadow-sm">
                <Target className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Process Automation
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed font-light">
                Streamline operations, reduce manual work, and boost productivity with intelligent workflow automation
              </p>
            </div>

            <div className="bg-white rounded-2xl shadow-md hover:shadow-2xl transition-all duration-300 border border-gray-100 p-8">
              <div className="w-16 h-16 bg-red-600 rounded-2xl flex items-center justify-center mb-6 shadow-sm">
                <Shield className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Cybersecurity
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed font-light">
                Protect your business with comprehensive security assessments, threat detection, and compliance solutions
              </p>
            </div>

            <div className="bg-white rounded-2xl shadow-md hover:shadow-2xl transition-all duration-300 border border-gray-100 p-8">
              <div className="w-16 h-16 bg-orange-600 rounded-2xl flex items-center justify-center mb-6 shadow-sm">
                <Zap className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Custom Software
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed font-light">
                Build scalable applications, dashboards, and tools designed specifically for your unique requirements
              </p>
            </div>

            <div className="bg-white rounded-2xl shadow-md hover:shadow-2xl transition-all duration-300 border border-gray-100 p-8">
              <div className="w-16 h-16 bg-green-600 rounded-2xl flex items-center justify-center mb-6 shadow-sm">
                <Brain className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                AI & Analytics
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed font-light">
                Leverage machine learning, predictive analytics, and intelligent automation to gain competitive advantage
              </p>
            </div>
          </div>
        </div>

        {/* How It Works */}
        <div className="bg-gradient-to-br from-white to-blue-50 rounded-3xl shadow-lg p-12 md:p-16 max-w-5xl mx-auto mb-28 border border-gray-200">
          <h2 className="text-4xl font-semibold text-gray-900 mb-5 text-center tracking-tight">
            How Cehpoint Works
          </h2>
          <p className="text-center text-gray-600 mb-16 max-w-2xl mx-auto font-light leading-relaxed">
            Our AI-driven assessment process delivers actionable insights in three simple steps
          </p>
          
          <div className="grid md:grid-cols-3 gap-12">
            <div className="relative">
              <div className="text-center">
                <div className="w-20 h-20 bg-gradient-to-br from-blue-600 to-blue-700 text-white rounded-3xl flex items-center justify-center text-3xl font-semibold mx-auto mb-6 shadow-sm">
                  1
                </div>
                <h3 className="font-semibold text-gray-900 mb-4 text-xl">Submit Business Profile</h3>
                <p className="text-sm text-gray-600 leading-loose font-light">
                  Upload your company documentation or complete our comprehensive 7-section questionnaire covering operations, technology, and goals
                </p>
              </div>
            </div>
            
            <div className="relative">
              <div className="text-center">
                <div className="w-20 h-20 bg-gradient-to-br from-indigo-600 to-indigo-700 text-white rounded-3xl flex items-center justify-center text-3xl font-semibold mx-auto mb-6 shadow-sm">
                  2
                </div>
                <h3 className="font-semibold text-gray-900 mb-4 text-xl">AI Analysis & Mapping</h3>
                <p className="text-sm text-gray-600 leading-loose font-light">
                  Our Gemini-powered engine analyzes your data, identifies gaps, and matches business needs with optimal technology solutions
                </p>
              </div>
            </div>
            
            <div className="relative">
              <div className="text-center">
                <div className="w-20 h-20 bg-gradient-to-br from-purple-600 to-purple-700 text-white rounded-3xl flex items-center justify-center text-3xl font-semibold mx-auto mb-6 shadow-sm">
                  3
                </div>
                <h3 className="font-semibold text-gray-900 mb-4 text-xl">Receive Custom Roadmap</h3>
                <p className="text-sm text-gray-600 leading-loose font-light">
                  Get prioritized recommendations with ROI projections, implementation timelines, and a detailed project blueprint
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Why Choose Cehpoint */}
        <div className="max-w-5xl mx-auto mb-28">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-semibold text-gray-900 mb-5 tracking-tight">
              Why Leading Businesses Choose Cehpoint
            </h2>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div className="flex gap-5 bg-white p-8 rounded-2xl shadow-sm hover:shadow-md transition-shadow border border-gray-200">
              <CheckCircle className="w-7 h-7 text-green-600 flex-shrink-0 mt-1" />
              <div>
                <h4 className="font-semibold text-gray-900 mb-3 text-lg">Data-Driven Recommendations</h4>
                <p className="text-sm text-gray-600 leading-relaxed font-light">AI analyzes your specific business context, not generic templates</p>
              </div>
            </div>
            
            <div className="flex gap-5 bg-white p-8 rounded-2xl shadow-sm hover:shadow-md transition-shadow border border-gray-200">
              <TrendingUp className="w-7 h-7 text-blue-600 flex-shrink-0 mt-1" />
              <div>
                <h4 className="font-semibold text-gray-900 mb-3 text-lg">ROI-Focused Approach</h4>
                <p className="text-sm text-gray-600 leading-relaxed font-light">Every recommendation includes measurable business impact and expected returns</p>
              </div>
            </div>
            
            <div className="flex gap-5 bg-white p-8 rounded-2xl shadow-sm hover:shadow-md transition-shadow border border-gray-200">
              <Users className="w-7 h-7 text-indigo-600 flex-shrink-0 mt-1" />
              <div>
                <h4 className="font-semibold text-gray-900 mb-3 text-lg">Industry Expertise</h4>
                <p className="text-sm text-gray-600 leading-relaxed font-light">Solutions tailored to your sector&apos;s unique challenges and compliance requirements</p>
              </div>
            </div>
            
            <div className="flex gap-5 bg-white p-8 rounded-2xl shadow-sm hover:shadow-md transition-shadow border border-gray-200">
              <Award className="w-7 h-7 text-purple-600 flex-shrink-0 mt-1" />
              <div>
                <h4 className="font-semibold text-gray-900 mb-3 text-lg">Comprehensive Blueprint</h4>
                <p className="text-sm text-gray-600 leading-relaxed font-light">Complete project roadmap with phases, deliverables, and cost estimates</p>
              </div>
            </div>
          </div>
        </div>

        {/* Certifications & Trust Badges */}
        <div className="max-w-5xl mx-auto mb-28">
          <div className="bg-white rounded-3xl shadow-lg p-12 border border-gray-200">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-semibold text-gray-900 mb-4 tracking-tight">
                Certified & Trusted
              </h2>
              <p className="text-gray-600 font-light">
                Industry-recognized certifications and partnerships ensuring the highest standards
              </p>
            </div>
            
            <div className="grid md:grid-cols-4 gap-8 mb-12">
              <div className="text-center p-6 bg-gray-50 rounded-xl border border-gray-200">
                <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Shield className="w-8 h-8 text-white" />
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">ISO 27001</h4>
                <p className="text-xs text-gray-600 font-light">Information Security</p>
              </div>
              
              <div className="text-center p-6 bg-gray-50 rounded-xl border border-gray-200">
                <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="w-8 h-8 text-white" />
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">SOC 2 Type II</h4>
                <p className="text-xs text-gray-600 font-light">Compliance Certified</p>
              </div>
              
              <div className="text-center p-6 bg-gray-50 rounded-xl border border-gray-200">
                <div className="w-16 h-16 bg-indigo-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Award className="w-8 h-8 text-white" />
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">Google Partner</h4>
                <p className="text-xs text-gray-600 font-light">AI Technology</p>
              </div>
              
              <div className="text-center p-6 bg-gray-50 rounded-xl border border-gray-200">
                <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="w-8 h-8 text-white" />
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">CMMI Level 3</h4>
                <p className="text-xs text-gray-600 font-light">Process Maturity</p>
              </div>
            </div>

            <div className="pt-8 border-t border-gray-200">
              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center">
                  <p className="text-3xl font-bold text-gray-900 mb-2">500+</p>
                  <p className="text-sm text-gray-600 font-light">Enterprise Clients</p>
                </div>
                <div className="text-center">
                  <p className="text-3xl font-bold text-gray-900 mb-2">98%</p>
                  <p className="text-sm text-gray-600 font-light">Client Satisfaction</p>
                </div>
                <div className="text-center">
                  <p className="text-3xl font-bold text-gray-900 mb-2">24/7</p>
                  <p className="text-sm text-gray-600 font-light">Support Available</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 rounded-3xl shadow-lg p-16 text-center text-white max-w-4xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-semibold mb-6 tracking-tight">
            Ready to Transform Your Business?
          </h2>
          <p className="text-lg mb-10 text-blue-100 max-w-2xl mx-auto font-light leading-relaxed">
            Join hundreds of businesses leveraging AI-powered insights to make smarter technology decisions
          </p>
          <Button 
            size="lg" 
            onClick={() => router.push('/login')}
            className="bg-white text-indigo-600 hover:bg-gray-100 shadow-lg px-8 py-4"
          >
            Get Your Free Assessment
          </Button>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-12 mt-24">
        <div className="container mx-auto px-6 text-center">
          <div className="flex items-center justify-center gap-2 mb-3">
            <span className="text-2xl font-semibold text-white tracking-tight">Cehpoint</span>
          </div>
          <p className="text-sm font-light text-gray-500">
            Enterprise Technology Consulting Platform © 2024
          </p>
        </div>
      </footer>
    </div>
  );
}
