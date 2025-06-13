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
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md w-full max-w-md">
        <h2 className="text-xl font-semibold mb-4">Tell us about yourself</h2>
        <div className="mb-4">
          <label className="block mb-1">Age</label>
          <input
            type="number"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            className="w-full border rounded p-2"
            required
          />
        </div>
        <div className="mb-4">
          <span className="block mb-1">Sex</span>
          <label className="mr-4">
            <input
              type="radio"
              value="male"
              checked={sex === 'male'}
              onChange={(e) => setSex(e.target.value)}
              className="mr-1"
            />
            Male
          </label>
          <label>
            <input
              type="radio"
              value="female"
              checked={sex === 'female'}
              onChange={(e) => setSex(e.target.value)}
              className="mr-1"
            />
            Female
          </label>
        </div>
        <div className="mb-4">
          <label className="block mb-1">Weight (kg)</label>
          <input
            type="number"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            className="w-full border rounded p-2"
            required
          />
        </div>
        <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded">
          Continue
        </button>
      </form>
    </div>
  );
}

export default OnboardingForm;
