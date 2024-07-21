import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useLoginMutation } from '../context/userApiSlice';
import { toast } from 'react-toastify';

function Login() {
  const [email, setEmail] = useState('');  
  const [password, setPassword] = useState('');

  const [login ,{isLoading, isError }]=useLoginMutation();

  
  if(isLoading){
    return <div>...loading</div>  }
 
     
  const handleLogin = async(e) => {
    e.preventDefault();

       try{
        if ( !email || !password) {
          toast.error("All fields are required!");
          return;
        }
        const res=await login({email, password}).unwrap();
        console.log(res)
       toast.success('Logged in successfully');
       }
       catch(err){
        toast.error(err);
       }
  };

  return (
    <div className="container mx-auto p-4 bg-zinc-100 h-screen flex justify-center items-center">
      <div className="bg-white p-6 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-2">Login</h2>
        <p className="text-sm mb-4">
          or{' '}
          <Link to="/signup" className="text-orange-500">
            create an account
          </Link>
        </p>
        <div className="mb-4">
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 py-4  border outline-none "
            placeholder="Email"
          />
          <input
            type="text"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 py-4 border-t-0 border outline-none"
            placeholder="Password"
          />
        </div>
        <div className="mb-4">
          <button
            onClick={handleLogin}
            className="w-full p-3 bg-orange-500 text-white font-semibold "
          >
            LOGIN
          </button>
        </div>
        <p className="text-xs text-center">
          By clicking on Login, I accept the{' '}
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

export default Login;
