import { useState, useEffect } from 'react';

export default function PasswordGate({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  const STAGING_PASSWORD = import.meta.env.PUBLIC_STAGING_PASSWORD;
  const NODE_ENV = import.meta.env.MODE;

  useEffect(() => {
    // Skip password gate in development or if no staging password is set
    if (NODE_ENV === 'development' || !STAGING_PASSWORD) {
      setIsAuthenticated(true);
      setIsLoading(false);
      return;
    }

    // Check if user is already authenticated
    const savedAuth = sessionStorage.getItem('biorunway-staging-auth');
    if (savedAuth === 'authenticated') {
      setIsAuthenticated(true);
    }
    setIsLoading(false);
  }, [NODE_ENV, STAGING_PASSWORD]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password === STAGING_PASSWORD) {
      setIsAuthenticated(true);
      setError('');
      sessionStorage.setItem('biorunway-staging-auth', 'authenticated');
    } else {
      setError('Incorrect password. Please try again.');
      setPassword('');
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-au-chico-50 flex items-center justify-center">
        <div className="text-au-chico-800">Loading...</div>
      </div>
    );
  }

  if (isAuthenticated) {
    return children;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-au-chico-50 to-porsche-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl p-8 max-w-md w-full">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-au-chico-800 mb-2">
            BioRunway Staging
          </h1>
          <p className="text-au-chico-600">
            This is a password-protected staging environment
          </p>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-au-chico-700 mb-2">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 border border-au-chico-200 rounded-md focus:outline-none focus:ring-2 focus:ring-au-chico-500 focus:border-transparent"
              placeholder="Enter staging password"
              required
            />
          </div>
          
          {error && (
            <div className="text-red-600 text-sm bg-red-50 p-3 rounded-md">
              {error}
            </div>
          )}
          
          <button
            type="submit"
            className="w-full bg-au-chico-600 text-white py-2 px-4 rounded-md hover:bg-au-chico-700 focus:outline-none focus:ring-2 focus:ring-au-chico-500 focus:ring-offset-2 transition-colors"
          >
            Access Staging Site
          </button>
        </form>
        
        <div className="mt-6 text-center text-xs text-au-chico-500">
          Contact development team for access
        </div>
      </div>
    </div>
  );
}