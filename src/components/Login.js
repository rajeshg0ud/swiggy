import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useLoginMutation } from '../context/userApiSlice';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { addUserInfo } from '../context/cartSlice';
import ClipLoader from 'react-spinners/ClipLoader';

function Login() {
  const [email, setEmail] = useState('');  
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const [login, { isLoading }] = useLoginMutation();
  const userInfo = useSelector(store => store.cartSlice.userInfo);
  const navigate = useNavigate();
 
  useEffect(() => {
    if (userInfo?.id) {
      navigate('/');
    }
  }, [userInfo, navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      if (!email || !password) {
        toast.error("All fields are required!");
        return;
      }

      const res = await login({ email, password }).unwrap();
      dispatch(addUserInfo(res));
      toast.success('Logged in successfully');
    } catch (err) {
      toast.error(err.data?.message || 'Login failed');
    }
  };

  return (
    <div className="container mx-auto p-4 bg-zinc-100 h-screen flex justify-center items-center">
      {isLoading ? (
        <div className="self-center flex justify-center m-[6px] items-center text-3xl font-semibold">
          <ClipLoader color="#000000" loading={isLoading} size={50} />
        </div>
      ) : (
        <div className="bg-white p-6 rounded shadow-md w-full max-w-md">
          <h2 className="text-2xl font-bold mb-2">Login</h2>
          <p className="text-sm mb-4">
            or{' '}
            <Link to="/signup" className="text-orange-500">
              create an account
            </Link>
          </p>
          <form onSubmit={handleLogin}>
            <div className="mb-4">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-2 py-4 border outline-none"
                placeholder="Email"
                required
              />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-2 py-4 border-t-0 border outline-none"
                placeholder="Password"
                required
              />
            </div>
            <div className="mb-4">
              <button
                type="submit"
                className="w-full p-3 bg-orange-500 text-white font-semibold"
              >
                LOGIN
              </button>
            </div>
          </form>
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
      )}
    </div>
  );
}

export default Login;
