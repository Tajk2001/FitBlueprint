import React from 'react';
import { Link } from 'react-router-dom';

function HomePage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
      <img src="/logo.png" alt="FitBlueprint" className="w-32 h-32 mb-4" />
      <h1 className="text-3xl font-bold text-blue-600 mb-8">Welcome to FitBlueprint</h1>
      <div className="space-x-4">
        <Link to="/onboarding" className="px-4 py-2 bg-blue-500 text-white rounded">
          Get Started
        </Link>
        <Link to="/tests" className="px-4 py-2 bg-gray-200 text-gray-700 rounded">
          Go to Tests
        </Link>
      </div>
    </div>
  );
}

export default HomePage;
