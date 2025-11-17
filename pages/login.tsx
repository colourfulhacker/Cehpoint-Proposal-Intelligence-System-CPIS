import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Button from '@/components/Button';
import Input from '@/components/Input';
import Card from '@/components/Card';
import { saveUser, isAuthenticated } from '@/lib/storage';
import { Sparkles } from 'lucide-react';

export default function Login() {
  const router = useRouter();
  const [isSignup, setIsSignup] = useState(false);
  const [email, setEmail] = useState('');
  const [companyName, setCompanyName] = useState('');

  useEffect(() => {
    if (isAuthenticated()) {
      router.push('/discovery');
    }
  }, [router]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const user = {
      id: Math.random().toString(36).substr(2, 9),
      email,
      companyName: isSignup ? companyName : email.split('@')[0],
      createdAt: new Date().toISOString(),
    };
    
    saveUser(user);
    router.push('/discovery');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center p-4 page-transition">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Sparkles className="w-10 h-10 text-indigo-600" />
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Cehpoint
            </h1>
          </div>
          <p className="text-gray-600 text-lg">
            AI-Powered IT & Security Solutions
          </p>
        </div>

        <Card>
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              {isSignup ? 'Create Account' : 'Welcome Back'}
            </h2>
            <p className="text-gray-600">
              {isSignup 
                ? 'Start your journey to smarter business solutions'
                : 'Continue discovering tailored solutions'}
            </p>
          </div>

          <form onSubmit={handleSubmit}>
            <Input
              label="Email Address"
              type="email"
              value={email}
              onChange={setEmail}
              placeholder="you@company.com"
              required
            />
            
            {isSignup && (
              <Input
                label="Company Name"
                value={companyName}
                onChange={setCompanyName}
                placeholder="Your Company Name"
                required
              />
            )}

            <Button type="submit" fullWidth size="lg" className="mt-4">
              {isSignup ? 'Get Started' : 'Sign In'}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <button
              onClick={() => setIsSignup(!isSignup)}
              className="text-blue-600 hover:text-blue-700 font-medium"
            >
              {isSignup 
                ? 'Already have an account? Sign In' 
                : "Don't have an account? Sign Up"}
            </button>
          </div>
        </Card>

        <div className="mt-8 text-center">
          <p className="text-sm text-gray-500">
            Powered by Google Gemini AI
          </p>
        </div>
      </div>
    </div>
  );
}
