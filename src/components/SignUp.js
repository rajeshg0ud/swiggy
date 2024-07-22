import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSignupMutation } from '../context/userApiSlice';
import { toast } from 'react-toastify';
import { addUserInfo } from '../context/cartSlice';
import { useDispatch, useSelector } from 'react-redux';
import ClipLoader from 'react-spinners/ClipLoader';

function Signup() {
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const dispatch = useDispatch();
  const [signup, { isLoading }] = useSignupMutation();

  const userInfo = useSelector(store => store.cartSlice.userInfo);
  const navigate = useNavigate();

  useEffect(() => {
    if (userInfo?.id) {
      navigate('/');
    }
  }, [userInfo, navigate]);

  if (isLoading) return (
    <div className="self-center flex justify-center m-[6px] items-center text-3xl font-semibold">
      <ClipLoader color="#000000" loading={isLoading} size={50} />
    </div>
  );
 

  const handleSignup = async (e) => {
    e.preventDefault();

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordPattern = /^(?=.*[A-Z])(?=.*\d)/;

    if (!name || !email || !password) {
      toast.error("All fields are required!");
      return;
    } 
    if (!emailPattern.test(email)) {
      toast.error("Please enter a valid email address!");
      return;
    }
    if (!passwordPattern.test(password)) {
      toast.error("Password must contain at least one capital letter and one number!");
      return;
    }

    try {
      const res = await signup({ name, email, password }).unwrap();
      console.log(res);
      dispatch(addUserInfo(res));
      toast.success('Account created successfully');
    } catch (err) {
      toast.error(err.message || "Invalid Credentials");
    }
  };

  return (
    <div className="container mx-auto p-4 bg-zinc-100 h-screen flex justify-center items-center">
      <div className="bg-white p-6 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-2">Sign up</h2>
        <p className="text-sm mb-4">
          or{' '}
          <Link to="/login" className="text-orange-500">
            login to your account
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
            type="password"
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
