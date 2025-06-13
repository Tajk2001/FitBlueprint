import React from 'react';
import { Link } from 'react-router-dom';

function HomePage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-6 bg-gray-100 text-center p-4">
      <img src="/logo.png" alt="FitBlueprint" className="w-32 h-32" />
      <h1 className="text-4xl font-bold text-blue-600">Welcome to FitBlueprint</h1>
      <p className="text-lg text-gray-700 max-w-md">
        Track your fitness progress and get a personalized training plan.
      </p>
      <div className="flex gap-4">
        <Link
          to="/onboarding"
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-xl shadow transition hover:scale-105"
        >
          Get Started
        </Link>
        <Link
          to="/tests"
          className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-6 py-2 rounded-xl shadow transition hover:scale-105"
        >
          Go to Tests
        </Link>
      </div>
    </div>
  );
}

export default HomePage;
