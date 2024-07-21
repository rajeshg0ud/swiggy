import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function Signup() {
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const handleSignup = () => {
    // Handle signup logic
  };

  return (
    <div className="container mx-auto p-4 bg-zinc-100 h-screen flex justify-center items-center">
      <div className="bg-white p-6 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-2">Sign up</h2>
        <p className="text-sm mb-4">
          or{' '}
          <Link to="/login" className="text-orange-500">
            login in to your account
          </Link>
        </p>
        <div className="mb-4">
          
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-2 py-4 border outline-none"
            placeholder="Name"
          />
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 py-4  border-t-0 border outline-none"
            placeholder="Email"
          />
          <input
            type="text"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 py-4  border-t-0 border outline-none"
            placeholder="Password"
          />
        </div>
        <div className="mb-4">
          <button
            onClick={handleSignup}
            className="w-full p-3 bg-orange-500 text-white font-semibold rounded"
          >
            CONTINUE
          </button>
        </div>
        <p className="text-xs text-center">
          By creating an account, I accept the{' '}
          <a href="#" className="text-orange-500">
            Terms & Conditions
          </a>{' '}
          &{' '}
          <a href="#" className="text-orange-500">
            Privacy Policy
          </a>
        </p>
      </div>
    </div>
  );
}

export default Signup;
