import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Card from '@/components/Card';
import Button from '@/components/Button';
import { isAuthenticated, getSession, getUser, clearSession, clearUser } from '@/lib/storage';
import { ServiceRecommendation, ProjectBlueprint, ServiceCategory } from '@/types';
import { 
  Sparkles, Target, DollarSign, Clock, TrendingUp, 
  Shield, Cpu, Cloud, Zap, Brain, Building, LogOut 
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
    clearSession();
    clearUser();
    toast.success('Logged out successfully');
    router.push('/login');
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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
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
                <p className="text-sm text-gray-600">{user?.companyName}</p>
              </div>
            </div>
            <Button variant="outline" onClick={handleLogout}>
              <LogOut className="w-4 h-4" />
              Logout
            </Button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-2">
            Your Personalized Service Recommendations
          </h2>
          <p className="text-gray-600">
            AI-powered insights tailored to your business needs
          </p>
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

                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <DollarSign className="w-4 h-4 text-gray-500" />
                      <span className="text-xs font-semibold text-gray-500 uppercase">Investment</span>
                    </div>
                    <p className="text-sm font-medium text-gray-800">{rec.estimatedCost}</p>
                  </div>
                </div>

                <div className="mt-4 bg-purple-50 p-3 rounded-lg">
                  <div className="flex items-center gap-2 mb-1">
                    <DollarSign className="w-4 h-4 text-purple-600" />
                    <span className="text-xs font-semibold text-purple-800 uppercase">Expected ROI</span>
                  </div>
                  <p className="text-sm text-purple-900 font-medium">{rec.expectedROI}</p>
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

        <div className="text-center">
          <Button size="lg" onClick={() => router.push('/discovery')}>
            Start New Analysis
          </Button>
        </div>
      </div>
    </div>
  );
}
