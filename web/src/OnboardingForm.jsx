import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import UserContext from './UserContext';

function OnboardingForm() {
  const { userData, setUserData } = useContext(UserContext);
  const [age, setAge] = useState(userData.age);
  const [sex, setSex] = useState(userData.sex);
  const [weight, setWeight] = useState(userData.weight_kg);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setUserData({ ...userData, age, sex, weight_kg: weight });
    navigate('/tests');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-xl shadow-lg w-full max-w-md space-y-4"
      >
        <h2 className="text-2xl font-semibold text-center">Tell us about yourself</h2>
        <div>
          <label className="block mb-1">Age</label>
          <input
            type="number"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            className="w-full border border-gray-300 rounded p-2"
            required
          />
        </div>
        <div>
          <span className="block mb-1">Sex</span>
          <div className="flex gap-4">
            <label className="flex items-center gap-1">
              <input
                type="radio"
                value="male"
                checked={sex === 'male'}
                onChange={(e) => setSex(e.target.value)}
              />
              Male
            </label>
            <label className="flex items-center gap-1">
              <input
                type="radio"
                value="female"
                checked={sex === 'female'}
                onChange={(e) => setSex(e.target.value)}
              />
              Female
            </label>
          </div>
        </div>
        <div>
          <label className="block mb-1">Weight (kg)</label>
          <input
            type="number"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            className="w-full border border-gray-300 rounded p-2"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl transition"
        >
          Continue
        </button>
      </form>
    </div>
  );
}

export default OnboardingForm;
