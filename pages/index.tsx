import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { isAuthenticated } from '@/lib/storage';
import Button from '@/components/Button';
import { Target, Shield, Zap, Brain, CheckCircle, TrendingUp, Users, Award, ArrowRight, Building2, Lock, Database, Cloud, BarChart3, MessageCircle } from 'lucide-react';
import Image from 'next/image';

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    if (isAuthenticated()) {
      router.push('/discovery');
    }
  }, [router]);

  return (
    <div className="min-h-screen bg-white page-transition">
      {/* Navigation */}
      <nav className="bg-white border-b border-gray-200 sticky top-0 z-50 backdrop-blur-sm bg-white/95">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-700 rounded flex items-center justify-center">
                <Building2 className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-bold text-gray-900">Cehpoint</span>
              <span className="hidden md:inline text-sm text-gray-500 ml-2">Technology Consulting</span>
            </div>
            <Button variant="primary" onClick={() => router.push('/login')} className="px-6">
              Client Portal
              <ArrowRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-b from-gray-50 to-white py-20 md:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-grid-gray-100 opacity-40"></div>
        <div className="container mx-auto px-6 relative">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-700 px-4 py-2 rounded-full text-sm font-medium mb-8">
              <Award className="w-4 h-4" />
              Trusted by 500+ Enterprises Worldwide
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              Affordable Technology Solutions
              <span className="block text-blue-600 mt-2">for Indian Businesses</span>
            </h1>
            <p className="text-xl text-gray-700 mb-4 leading-relaxed max-w-3xl mx-auto font-medium">
              Cehpoint delivers enterprise-grade IT, cybersecurity, and automation strategies at prices designed for Indian startups and SMEs.
            </p>
            <p className="text-lg text-green-700 font-semibold mb-10">
              Starting from just ₹25,000 - World-class technology made accessible
            </p>
            <div className="flex gap-4 justify-center flex-wrap">
              <Button size="lg" onClick={() => router.push('/login')} className="px-8 shadow-lg">
                Request Consultation
                <ArrowRight className="w-5 h-5" />
              </Button>
              <a
                href="https://wa.me/919091156095?text=Hi%2C%20I%20would%20like%20to%20learn%20more%20about%20Cehpoint%27s%20technology%20consulting%20services."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 text-lg font-semibold text-gray-900 bg-white border-2 border-gray-900 rounded-lg hover:bg-gray-900 hover:text-white hover:border-gray-900 transition-all shadow-md hover:shadow-lg"
              >
                <MessageCircle className="w-5 h-5" />
                Contact Us
              </a>
            </div>
          </div>

          {/* Stats Bar */}
          <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            <div className="bg-white border-2 border-gray-200 rounded-lg p-6 text-center shadow-sm hover:shadow-md transition-shadow">
              <div className="text-3xl font-bold text-blue-600 mb-1">500+</div>
              <div className="text-sm font-medium text-gray-900">Happy Clients</div>
            </div>
            <div className="bg-white border-2 border-gray-200 rounded-lg p-6 text-center shadow-sm hover:shadow-md transition-shadow">
              <div className="text-3xl font-bold text-green-600 mb-1">95%</div>
              <div className="text-sm font-medium text-gray-900">Success Rate</div>
            </div>
            <div className="bg-white border-2 border-gray-200 rounded-lg p-6 text-center shadow-sm hover:shadow-md transition-shadow">
              <div className="text-3xl font-bold text-purple-600 mb-1">₹25K+</div>
              <div className="text-sm font-medium text-gray-900">Starting Price</div>
            </div>
            <div className="bg-white border-2 border-gray-200 rounded-lg p-6 text-center shadow-sm hover:shadow-md transition-shadow">
              <div className="text-3xl font-bold text-indigo-600 mb-1">24/7</div>
              <div className="text-sm font-medium text-gray-900">Support</div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Comprehensive Technology Services
            </h2>
            <p className="text-lg text-gray-700 mb-2 font-medium">
              End-to-end solutions designed for Indian businesses - enterprise quality at startup prices
            </p>
            <p className="text-md text-green-600 font-semibold">
              Flexible payment plans available • No hidden costs
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            <div className="group bg-white border-2 border-gray-200 rounded-lg p-6 hover:border-blue-500 hover:shadow-xl transition-all cursor-pointer">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4 group-hover:bg-blue-600 transition-colors">
                <Target className="w-6 h-6 text-blue-600 group-hover:text-white transition-colors" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                Process Automation
              </h3>
              <p className="text-sm text-gray-700 leading-relaxed font-medium mb-3">
                Intelligent workflow optimization and RPA implementation to reduce costs and increase efficiency
              </p>
              <p className="text-xs text-green-600 font-semibold">From ₹50,000</p>
            </div>

            <div className="group bg-white border-2 border-gray-200 rounded-lg p-6 hover:border-red-500 hover:shadow-xl transition-all cursor-pointer">
              <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mb-4 group-hover:bg-red-600 transition-colors">
                <Shield className="w-6 h-6 text-red-600 group-hover:text-white transition-colors" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-red-600 transition-colors">
                Cybersecurity
              </h3>
              <p className="text-sm text-gray-700 leading-relaxed font-medium mb-3">
                Enterprise-grade security architecture, compliance management, and threat protection
              </p>
              <p className="text-xs text-green-600 font-semibold">From ₹75,000</p>
            </div>

            <div className="group bg-white border-2 border-gray-200 rounded-lg p-6 hover:border-purple-500 hover:shadow-xl transition-all cursor-pointer">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4 group-hover:bg-purple-600 transition-colors">
                <Cloud className="w-6 h-6 text-purple-600 group-hover:text-white transition-colors" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-purple-600 transition-colors">
                Cloud Solutions
              </h3>
              <p className="text-sm text-gray-700 leading-relaxed font-medium mb-3">
                Migration, optimization, and management of cloud infrastructure across AWS, Azure, and GCP
              </p>
              <p className="text-xs text-green-600 font-semibold">From ₹60,000</p>
            </div>

            <div className="group bg-white border-2 border-gray-200 rounded-lg p-6 hover:border-green-500 hover:shadow-xl transition-all cursor-pointer">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4 group-hover:bg-green-600 transition-colors">
                <Brain className="w-6 h-6 text-green-600 group-hover:text-white transition-colors" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-green-600 transition-colors">
                AI & Analytics
              </h3>
              <p className="text-sm text-gray-700 leading-relaxed font-medium mb-3">
                Machine learning models, predictive analytics, and data-driven decision intelligence
              </p>
              <p className="text-xs text-green-600 font-semibold">From ₹1,00,000</p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section for Indian Market */}
      <section className="py-20 bg-gradient-to-br from-green-50 to-blue-50">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Transparent Pricing for Indian Businesses
              </h2>
              <p className="text-lg text-gray-700 font-medium mb-2">
                Enterprise-quality solutions at prices designed for the Indian market
              </p>
              <p className="text-md text-green-600 font-semibold">
                No hidden fees • Flexible payment options • EMI available
              </p>
            </div>
            
            <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 border-2 border-blue-200">
              <div className="grid md:grid-cols-2 gap-8 mb-8">
                <div className="space-y-4">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">✓ What's Included</h3>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <p className="text-sm text-gray-700 font-medium">Free initial consultation & business analysis</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <p className="text-sm text-gray-700 font-medium">Detailed project roadmap & timeline</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <p className="text-sm text-gray-700 font-medium">6 months post-launch support included</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <p className="text-sm text-gray-700 font-medium">Training for your team</p>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">💳 Payment Options</h3>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                    <p className="text-sm text-gray-700 font-medium">Milestone-based payments (no upfront 100%)</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                    <p className="text-sm text-gray-700 font-medium">EMI options available for projects above ₹1 lakh</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                    <p className="text-sm text-gray-700 font-medium">UPI, Bank Transfer, International cards accepted</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                    <p className="text-sm text-gray-700 font-medium">GST compliant invoicing</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 border-2 border-blue-200">
                <h3 className="text-lg font-bold text-gray-900 mb-3">🎉 Special Offer for Startups</h3>
                <p className="text-gray-700 font-medium mb-4">
                  YC-backed or funded startups get <span className="text-blue-600 font-bold">20% discount</span> on all services
                </p>
                <div className="flex flex-wrap gap-4">
                  <a
                    href="https://wa.me/919091156095?text=Hi%2C%20I%20want%20to%20discuss%20pricing%20for%20my%20startup"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition-all shadow-md hover:shadow-lg"
                  >
                    <MessageCircle className="w-4 h-4" />
                    Get Custom Quote
                  </a>
                  <Button onClick={() => router.push('/login')} variant="outline" className="border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white font-semibold">
                    View Sample Projects
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Value Proposition */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                  Data-Driven Technology Strategy
                </h2>
                <p className="text-lg text-gray-700 mb-8 leading-relaxed font-medium">
                  Our AI-powered platform analyzes your business operations, technology stack, and industry landscape to deliver precise, actionable recommendations aligned with your strategic objectives.
                </p>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <CheckCircle className="w-4 h-4 text-green-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-1">Comprehensive Analysis</h4>
                      <p className="text-sm text-gray-700 font-medium">7-point business assessment covering operations, technology, and market position</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <CheckCircle className="w-4 h-4 text-green-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-1">ROI-Focused Solutions</h4>
                      <p className="text-sm text-gray-700 font-medium">Every recommendation includes detailed impact analysis and financial projections</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <CheckCircle className="w-4 h-4 text-green-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-1">Implementation Roadmap</h4>
                      <p className="text-sm text-gray-700 font-medium">Detailed project blueprint with phases, timelines, and resource requirements</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="relative h-96 bg-gray-200 rounded-lg overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 to-indigo-600/10 flex items-center justify-center">
                  <BarChart3 className="w-32 h-32 text-gray-400" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Certifications */}
      <section className="py-16 bg-white border-y border-gray-200">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h3 className="text-2xl font-bold text-gray-900 mb-2">Industry Certifications & Compliance</h3>
            <p className="text-gray-700 font-medium">Maintaining the highest standards in technology consulting</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-600 rounded-lg flex items-center justify-center mx-auto mb-3">
                <Shield className="w-8 h-8 text-white" />
              </div>
              <h4 className="font-semibold text-gray-900 text-sm mb-1">ISO 27001</h4>
              <p className="text-xs text-gray-600">Information Security</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-green-600 rounded-lg flex items-center justify-center mx-auto mb-3">
                <CheckCircle className="w-8 h-8 text-white" />
              </div>
              <h4 className="font-semibold text-gray-900 text-sm mb-1">SOC 2 Type II</h4>
              <p className="text-xs text-gray-600">Compliance</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-indigo-600 rounded-lg flex items-center justify-center mx-auto mb-3">
                <Award className="w-8 h-8 text-white" />
              </div>
              <h4 className="font-semibold text-gray-900 text-sm mb-1">Google Cloud Partner</h4>
              <p className="text-xs text-gray-600">AI Technology</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-600 rounded-lg flex items-center justify-center mx-auto mb-3">
                <Users className="w-8 h-8 text-white" />
              </div>
              <h4 className="font-semibold text-gray-900 text-sm mb-1">CMMI Level 3</h4>
              <p className="text-xs text-gray-600">Process Maturity</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-blue-600 to-indigo-700">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto text-center text-white">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Transform Your Technology Strategy
            </h2>
            <p className="text-xl text-blue-100 mb-10">
              Schedule a consultation to discover how we can accelerate your digital transformation journey
            </p>
            <div className="flex gap-4 justify-center flex-wrap">
              <Button 
                size="lg" 
                onClick={() => router.push('/login')}
                className="bg-white text-blue-600 hover:bg-gray-100 shadow-xl px-8"
              >
                Get Started
                <ArrowRight className="w-5 h-5" />
              </Button>
              <a
                href="https://wa.me/919091156095?text=Hi%2C%20I%27d%20like%20to%20schedule%20a%20consultation%20with%20Cehpoint."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 text-lg font-semibold text-white bg-transparent border-2 border-white rounded-lg hover:bg-white hover:text-blue-600 transition-all shadow-lg hover:shadow-xl"
              >
                <MessageCircle className="w-5 h-5" />
                Contact Sales
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-12">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div className="md:col-span-2">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-700 rounded flex items-center justify-center">
                  <Building2 className="w-6 h-6 text-white" />
                </div>
                <span className="text-2xl font-bold text-white">Cehpoint</span>
              </div>
              <p className="text-sm text-gray-500 mb-4">
                Enterprise Technology Consulting & Strategic Advisory
              </p>
              <div className="flex gap-4">
                <a href="https://wa.me/919091156095" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
                  <MessageCircle className="w-5 h-5" />
                </a>
              </div>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-3">Services</h4>
              <ul className="space-y-2 text-sm">
                <li>Process Automation</li>
                <li>Cybersecurity</li>
                <li>Cloud Solutions</li>
                <li>AI & Analytics</li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-3">Contact</h4>
              <ul className="space-y-2 text-sm">
                <li>+91 909 115 6095</li>
                <li>contact@cehpoint.com</li>
                <li>24/7 Support</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 text-center">
            <p className="text-sm text-gray-500">
              © 2024 Cehpoint Technology Consulting. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
