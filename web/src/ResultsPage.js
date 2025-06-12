import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import UserContext from './UserContext';

function ResultsPage() {
  const { results, reset } = useContext(UserContext);

  if (!results) {
    return (
      <div className="p-4">
        <p>No results to display.</p>
        <Link to="/">Back Home</Link>
      </div>
    );
  }

  const { tests, weekly_plan } = results;

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <h2 className="text-2xl font-bold text-center mb-4">Your Results</h2>
      <div className="grid gap-4 md:grid-cols-2">
        {Object.values(tests).map((test) => (
          <div key={test['Test Name']} className="bg-white p-4 rounded shadow">
            <h3 className="text-lg font-semibold mb-2">{test['Test Name']}</h3>
            <p className="mb-1">Category: <span className="font-medium">{test['Score Category']}</span></p>
            <p className="mb-1">
              Risk: <span className={test['Risk Flag'] ? 'text-red-600' : 'text-green-600'}>
                {test['Risk Flag'] ? 'Yes' : 'No'}
              </span>
            </p>
            <p className="text-sm text-gray-700">{test['Message']}</p>
            {test.VO2max && <p className="mt-2 text-sm">VO2max: {test.VO2max}</p>}
          </div>
        ))}
      </div>
      <h3 className="text-xl font-semibold mt-6 mb-2">Weekly Plan</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
        {Object.entries(weekly_plan).map(([day, activity]) => (
          <div key={day} className="bg-white p-2 rounded shadow">
            <p className="font-semibold">{day}</p>
            <p className="text-sm">{activity}</p>
          </div>
        ))}
      </div>
      <div className="text-center mt-6">
        <Link to="/" onClick={reset} className="px-4 py-2 bg-blue-500 text-white rounded">
          Start Over
        </Link>
      </div>
    </div>
  );
}

export default ResultsPage;
