import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import UserContext from './UserContext';
import { BACKEND_URL } from './config';

function TestInputForm() {
  const { userData, setResults } = useContext(UserContext);
  const [chair, setChair] = useState('');
  const [push, setPush] = useState('');
  const [step, setStep] = useState('');
  const [walkTime, setWalkTime] = useState('');
  const [walkHr, setWalkHr] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`${BACKEND_URL}/evaluate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          age: Number(userData.age),
          sex: userData.sex,
          weight_kg: Number(userData.weight_kg),
          chair_stand: Number(chair),
          push_up: Number(push),
          step_hr: Number(step),
          walk_time_min: Number(walkTime),
          walk_hr: Number(walkHr),
        }),
      });
      if (!res.ok) throw new Error('Failed to evaluate');
      const data = await res.json();
      setResults(data);
      navigate('/results');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md w-full max-w-lg">
        <h2 className="text-xl font-semibold mb-4">Enter your test results</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block mb-1">Chair Stand Reps</label>
            <input
              type="number"
              value={chair}
              onChange={(e) => setChair(e.target.value)}
              className="w-full border rounded p-2"
              required
            />
          </div>
          <div>
            <label className="block mb-1">Push-Up Reps</label>
            <input
              type="number"
              value={push}
              onChange={(e) => setPush(e.target.value)}
              className="w-full border rounded p-2"
              required
            />
          </div>
          <div>
            <label className="block mb-1">Step Test HR (1 min post)</label>
            <input
              type="number"
              value={step}
              onChange={(e) => setStep(e.target.value)}
              className="w-full border rounded p-2"
              required
            />
          </div>
          <div>
            <label className="block mb-1">Mile Walk Time (min)</label>
            <input
              type="number"
              value={walkTime}
              onChange={(e) => setWalkTime(e.target.value)}
              className="w-full border rounded p-2"
              required
            />
          </div>
          <div>
            <label className="block mb-1">Mile Walk HR</label>
            <input
              type="number"
              value={walkHr}
              onChange={(e) => setWalkHr(e.target.value)}
              className="w-full border rounded p-2"
              required
            />
          </div>
        </div>
        {error && <p className="text-red-500 mt-2">{error}</p>}
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded mt-4"
          disabled={loading}
        >
          {loading ? 'Loading...' : 'Submit'}
        </button>
      </form>
    </div>
  );
}

export default TestInputForm;
