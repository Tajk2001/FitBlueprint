import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './HomePage';
import OnboardingForm from './OnboardingForm';
import TestInputForm from './TestInputForm';
import ResultsPage from './ResultsPage';
import UserContext from './UserContext';

function App() {
  const [userData, setUserData] = useState({ age: '', sex: 'male', weight_kg: '' });
  const [results, setResults] = useState(null);

  const reset = () => {
    setUserData({ age: '', sex: 'male', weight_kg: '' });
    setResults(null);
  };

  return (
    <UserContext.Provider value={{ userData, setUserData, results, setResults, reset }}>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/onboarding" element={<OnboardingForm />} />
          <Route path="/tests" element={<TestInputForm />} />
          <Route path="/results" element={<ResultsPage />} />
        </Routes>
      </Router>
    </UserContext.Provider>
  );
}

export default App;
