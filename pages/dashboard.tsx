import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Card from '@/components/Card';
import Button from '@/components/Button';
import { isAuthenticated, getSession, getUser, clearSession, clearUser } from '@/lib/storage';
import { ServiceRecommendation, ProjectBlueprint, ServiceCategory } from '@/types';
import { 
  Sparkles, Target, DollarSign, Clock, TrendingUp, 
  Shield, Cpu, Cloud, Zap, Brain, Building, LogOut,
  MessageCircle, Phone, Mail, CheckCircle, Award, Users
} from 'lucide-react';
import toast, { Toaster } from 'react-hot-toast';

const categoryIcons: Record<ServiceCategory, any> = {
  'Process Automation & Optimization': Zap,
  'Software Solutions': Cpu,
  'Cybersecurity & Risk Reduction': Shield,
  'Technology Modernization': Cloud,
  'AI & Intelligent Automation': Brain,
  'Industry-Specific Solutions': Building,
};

const categoryColors: Record<ServiceCategory, string> = {
  'Process Automation & Optimization': 'from-yellow-400 to-orange-500',
  'Software Solutions': 'from-blue-400 to-cyan-500',
  'Cybersecurity & Risk Reduction': 'from-red-400 to-pink-500',
  'Technology Modernization': 'from-purple-400 to-indigo-500',
  'AI & Intelligent Automation': 'from-green-400 to-emerald-500',
  'Industry-Specific Solutions': 'from-indigo-400 to-purple-500',
};

export default function Dashboard() {
  const router = useRouter();
  const [recommendations, setRecommendations] = useState<ServiceRecommendation[]>([]);
  const [blueprint, setBlueprint] = useState<ProjectBlueprint | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<ServiceCategory | 'All'>('All');
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    if (!isAuthenticated()) {
      router.push('/login');
      return;
    }

    const session = getSession();
    const currentUser = getUser();
    
    if (!session?.recommendations) {
      router.push('/discovery');
      return;
    }

    setUser(currentUser);
    setRecommendations(session.recommendations);
    setBlueprint(session.projectBlueprint || null);
  }, [router]);

  const handleLogout = () => {
    if (window.confirm('Are you sure you want to log out? Your recommendations will remain saved in this browser.')) {
      clearSession();
      clearUser();
      toast.success('Logged out successfully');
      router.push('/login');
    }
  };

  const filteredRecommendations = selectedCategory === 'All' 
    ? recommendations 
    : recommendations.filter(r => r.category === selectedCategory);

  const categories = Array.from(new Set(recommendations.map(r => r.category)));

  const priorityColors = {
    High: 'bg-red-100 text-red-700 border-red-300',
    Medium: 'bg-yellow-100 text-yellow-700 border-yellow-300',
    Low: 'bg-green-100 text-green-700 border-green-300',
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 page-transition">
      <Toaster position="top-right" />
      
      <div className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Sparkles className="w-8 h-8 text-indigo-600" />
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                  Cehpoint
                </h1>
                <p className="text-sm text-gray-600">{user?.companyName || 'Guest'}</p>
              </div>
            </div>
            <div className="flex gap-2 md:gap-3 flex-wrap">
              <Button 
                variant="outline" 
                onClick={() => window.open('https://portfolios.cehpoint.co.in/', '_blank')}
                className="text-blue-600 border-blue-600 hover:bg-blue-600 hover:text-white text-sm md:text-base"
              >
                View Sample Project
              </Button>
              <Button variant="outline" onClick={handleLogout} className="text-sm md:text-base">
                <LogOut className="w-4 h-4" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8 border border-gray-100">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 mb-6">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-3">
                <CheckCircle className="w-6 h-6 text-green-600" />
                <span className="text-sm font-semibold text-green-700 uppercase tracking-wide">Analysis Complete</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
                Technology Solutions Portfolio
              </h2>
              <p className="text-lg text-gray-600 mb-2">
                Tailored for <span className="font-semibold text-indigo-700">{user?.companyName || 'your business'}</span>
              </p>
              <p className="text-sm text-gray-500">
                Based on comprehensive business analysis and industry best practices
              </p>
            </div>
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6 border-2 border-indigo-200">
              <div className="text-center">
                <Award className="w-12 h-12 text-indigo-600 mx-auto mb-2" />
                <p className="text-xs font-semibold text-gray-600 uppercase tracking-wide mb-1">Certified Partner</p>
                <p className="text-2xl font-bold text-indigo-700">{recommendations.length}</p>
                <p className="text-sm text-gray-600">Solutions Identified</p>
              </div>
            </div>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6 pt-6 border-t border-gray-200">
            <div className="flex items-start gap-3">
              <div className="bg-blue-100 p-2 rounded-lg">
                <Users className="w-5 h-5 text-blue-700" />
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-800">Expert Consultation</p>
                <p className="text-xs text-gray-600">Dedicated account manager</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="bg-green-100 p-2 rounded-lg">
                <CheckCircle className="w-5 h-5 text-green-700" />
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-800">Quality Assured</p>
                <p className="text-xs text-gray-600">ISO 27001 certified processes</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="bg-purple-100 p-2 rounded-lg">
                <Award className="w-5 h-5 text-purple-700" />
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-800">Proven Track Record</p>
                <p className="text-xs text-gray-600">500+ successful implementations</p>
              </div>
            </div>
          </div>
        </div>

        <div className="mb-8 flex flex-wrap gap-3">
          <button
            onClick={() => setSelectedCategory('All')}
            className={`px-6 py-3 rounded-lg font-semibold transition-all ${
              selectedCategory === 'All'
                ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg'
                : 'bg-white text-gray-700 hover:shadow-md'
            }`}
          >
            All Services ({recommendations.length})
          </button>
          {categories.map((category) => {
            const Icon = categoryIcons[category];
            return (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-3 rounded-lg font-semibold transition-all flex items-center gap-2 ${
                  selectedCategory === category
                    ? `bg-gradient-to-r ${categoryColors[category]} text-white shadow-lg`
                    : 'bg-white text-gray-700 hover:shadow-md'
                }`}
              >
                <Icon className="w-5 h-5" />
                {category} ({recommendations.filter(r => r.category === category).length})
              </button>
            );
          })}
        </div>

        <div className="grid gap-6 mb-12">
          {filteredRecommendations.map((rec) => {
            const Icon = categoryIcons[rec.category];
            return (
              <Card key={rec.id} hover>
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-start gap-4">
                    <div className={`w-12 h-12 rounded-lg bg-gradient-to-r ${categoryColors[rec.category]} flex items-center justify-center flex-shrink-0`}>
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-gray-800 mb-1">
                        {rec.title}
                      </h3>
                      <p className="text-sm text-gray-500">{rec.category}</p>
                    </div>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-bold border ${priorityColors[rec.priority]}`}>
                    {rec.priority} Priority
                  </span>
                </div>

                <p className="text-gray-700 mb-4">{rec.description}</p>

                <div className="grid md:grid-cols-2 gap-4 mb-4">
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <Target className="w-5 h-5 text-blue-600" />
                      <h4 className="font-semibold text-gray-800">Why You Need This</h4>
                    </div>
                    <p className="text-sm text-gray-700">{rec.whyNeeded}</p>
                  </div>

                  <div className="bg-green-50 p-4 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <TrendingUp className="w-5 h-5 text-green-600" />
                      <h4 className="font-semibold text-gray-800">How It Helps</h4>
                    </div>
                    <p className="text-sm text-gray-700">{rec.howItHelps}</p>
                  </div>
                </div>

                <div className="grid md:grid-cols-3 gap-4 pt-4 border-t">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <TrendingUp className="w-4 h-4 text-gray-500" />
                      <span className="text-xs font-semibold text-gray-500 uppercase">Business Impact</span>
                    </div>
                    <p className="text-sm font-medium text-gray-800">{rec.businessImpact}</p>
                  </div>

                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <Clock className="w-4 h-4 text-gray-500" />
                      <span className="text-xs font-semibold text-gray-500 uppercase">Timeline</span>
                    </div>
                    <p className="text-sm font-medium text-gray-800">{rec.estimatedTimeline}</p>
                  </div>

                  <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-3 rounded-lg border-2 border-green-300">
                    <div className="flex items-center gap-2 mb-1">
                      <DollarSign className="w-4 h-4 text-green-600" />
                      <span className="text-xs font-bold text-green-800 uppercase">Affordable Pricing</span>
                    </div>
                    <p className="text-sm font-bold text-green-900">{rec.estimatedCost}</p>
                    <p className="text-xs text-green-700 mt-1">EMI options available</p>
                  </div>
                </div>

                <div className="mt-4 bg-gradient-to-r from-purple-50 to-pink-50 p-4 rounded-lg border-2 border-purple-200">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <DollarSign className="w-5 h-5 text-purple-600" />
                        <span className="text-xs font-bold text-purple-800 uppercase">Expected ROI</span>
                      </div>
                      <p className="text-sm text-purple-900 font-bold">{rec.expectedROI}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-purple-700 font-semibold">✓ Free Consultation</p>
                      <p className="text-xs text-purple-700">✓ No Hidden Costs</p>
                    </div>
                  </div>
                </div>

                <div className="mt-6 pt-6 border-t border-gray-200">
                  <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-4 rounded-xl border-2 border-green-200 mb-4">
                    <div className="flex items-center gap-2 mb-2">
                      <MessageCircle className="w-5 h-5 text-green-600" />
                      <h4 className="font-bold text-green-900">💬 Let's Discuss Your Solution</h4>
                    </div>
                    <p className="text-sm text-green-800 mb-3">
                      Connect instantly on WhatsApp - Our team responds within <span className="font-bold">5 minutes</span>
                    </p>
                  </div>
                  
                  <div className="flex flex-col sm:flex-row gap-3">
                    <a
                      href={`https://wa.me/919091156095?text=Hi!%20I%27m%20interested%20in%20${encodeURIComponent(rec.title)}%20for%20${encodeURIComponent(user?.companyName || 'my business')}.%0A%0ACan%20you%20provide%3A%0A1.%20Detailed%20breakdown%20of%20${rec.estimatedCost}%0A2.%20EMI%20payment%20options%0A3.%20Implementation%20timeline%0A4.%20Success%20stories`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-bold py-4 px-6 rounded-lg transition-all shadow-lg hover:shadow-xl"
                    >
                      <MessageCircle className="w-5 h-5" />
                      Chat on WhatsApp - Get Instant Quote
                    </a>
                    <a
                      href={`https://wa.me/919091156095?text=Hi%2C%20I%20need%20pricing%20details%20for%20${encodeURIComponent(rec.title)}.%20Company%3A%20${encodeURIComponent(user?.companyName || 'N/A')}%0A%0APlease%20share%20payment%20plans%20and%20discounts.`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2 bg-white hover:bg-gray-900 hover:text-white text-gray-900 font-bold py-4 px-6 rounded-lg border-2 border-gray-900 transition-all shadow-md hover:shadow-lg"
                    >
                      <DollarSign className="w-5 h-5" />
                      Get Detailed Pricing
                    </a>
                  </div>
                  <div className="mt-4 flex items-center justify-center gap-4 text-xs">
                    <span className="flex items-center gap-1 text-green-700 font-semibold">
                      <CheckCircle className="w-4 h-4" />
                      5 min response time
                    </span>
                    <span className="flex items-center gap-1 text-blue-700 font-semibold">
                      <CheckCircle className="w-4 h-4" />
                      Free consultation
                    </span>
                    <span className="flex items-center gap-1 text-purple-700 font-semibold">
                      <CheckCircle className="w-4 h-4" />
                      EMI available
                    </span>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>

        {blueprint && (
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              Project Blueprint Preview
            </h2>
            
            <Card>
              <div className="grid md:grid-cols-3 gap-6 mb-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-600 mb-1">{blueprint.timeline}</div>
                  <div className="text-sm text-gray-600">Overall Timeline</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-600 mb-1">{blueprint.costBracket}</div>
                  <div className="text-sm text-gray-600">Investment Range</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-purple-600 mb-1">{blueprint.deliverables.length}</div>
                  <div className="text-sm text-gray-600">Key Deliverables</div>
                </div>
              </div>

              <div className="mb-6">
                <h3 className="font-bold text-gray-800 mb-3">Deliverables</h3>
                <div className="grid md:grid-cols-2 gap-3">
                  {blueprint.deliverables.map((item, idx) => (
                    <div key={idx} className="flex items-start gap-2 bg-gray-50 p-3 rounded-lg">
                      <span className="text-blue-600 font-bold">{idx + 1}.</span>
                      <span className="text-gray-700">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="font-bold text-gray-800 mb-3">Project Phases</h3>
                <div className="space-y-3">
                  {blueprint.phases.map((phase, idx) => (
                    <div key={idx} className="border-l-4 border-blue-600 pl-4 py-2">
                      <div className="flex items-center gap-3 mb-1">
                        <h4 className="font-bold text-gray-800">{phase.name}</h4>
                        <span className="text-sm text-gray-500">({phase.duration})</span>
                      </div>
                      <p className="text-sm text-gray-600">{phase.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            </Card>
          </div>
        )}

        <div className="bg-gradient-to-br from-indigo-600 to-blue-700 rounded-2xl shadow-2xl p-8 md:p-12 text-white mb-8">
          <div className="max-w-3xl mx-auto text-center">
            <h3 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to Transform Your Business?
            </h3>
            <p className="text-lg text-indigo-100 mb-8">
              Our technology consultants are ready to discuss your specific requirements and create a customized implementation roadmap.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <a
                href="https://wa.me/919091156095?text=Hi%2C%20I%27ve%20reviewed%20my%20technology%20solutions%20portfolio%20and%20would%20like%20to%20schedule%20a%20consultation%20to%20discuss%20implementation."
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-3 bg-white text-indigo-700 font-bold py-4 px-8 rounded-xl hover:bg-indigo-50 transition-all shadow-lg hover:shadow-xl text-lg"
              >
                <MessageCircle className="w-6 h-6" />
                Schedule Consultation via WhatsApp
              </a>
              <a
                href="https://wa.me/919091156095?text=Hi%2C%20I%20need%20help%20prioritizing%20the%20solutions%20in%20my%20portfolio.%20Can%20we%20discuss%20which%20to%20implement%20first%3F"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-3 bg-transparent text-white font-bold py-4 px-8 rounded-xl border-2 border-white hover:bg-white hover:text-indigo-700 transition-all text-lg"
              >
                <Phone className="w-6 h-6" />
                Get Help Prioritizing
              </a>
            </div>

            <div className="grid md:grid-cols-3 gap-6 pt-8 border-t border-indigo-400">
              <div className="text-center">
                <div className="bg-white bg-opacity-20 rounded-lg p-4 mb-3 inline-block">
                  <Phone className="w-8 h-8" />
                </div>
                <p className="font-semibold mb-1">WhatsApp</p>
                <p className="text-sm text-indigo-100">+91 909 115 6095</p>
              </div>
              <div className="text-center">
                <div className="bg-white bg-opacity-20 rounded-lg p-4 mb-3 inline-block">
                  <Mail className="w-8 h-8" />
                </div>
                <p className="font-semibold mb-1">Email</p>
                <p className="text-sm text-indigo-100">contact@cehpoint.com</p>
              </div>
              <div className="text-center">
                <div className="bg-white bg-opacity-20 rounded-lg p-4 mb-3 inline-block">
                  <Clock className="w-8 h-8" />
                </div>
                <p className="font-semibold mb-1">Response Time</p>
                <p className="text-sm text-indigo-100">Within 2 business hours</p>
              </div>
            </div>
          </div>
        </div>

        <div className="text-center">
          <Button variant="outline" size="lg" onClick={() => router.push('/discovery')}>
            Request New Business Analysis
          </Button>
        </div>
      </div>

      {/* Floating Sticky WhatsApp Button */}
      <a
        href={`https://wa.me/919091156095?text=Hi!%20I%27m%20reviewing%20my%20Cehpoint%20solutions%20portfolio%20for%20${encodeURIComponent(user?.companyName || 'my business')}.%20I%20have%20some%20questions.`}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white p-4 rounded-full shadow-2xl hover:shadow-3xl transition-all duration-300 z-50 flex items-center gap-3 group animate-pulse hover:animate-none"
        title="Chat on WhatsApp - 5 min response time"
      >
        <MessageCircle className="w-6 h-6" />
        <span className="hidden group-hover:inline-block font-bold text-sm whitespace-nowrap pr-2">
          Chat Now - 5 min response!
        </span>
      </a>
    </div>
  );
}
