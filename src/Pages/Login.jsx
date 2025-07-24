import React, { useState, useRef, useEffect, useContext } from 'react';
import { Link, useLocation, useNavigate } from 'react-router';
import { toast } from 'react-toastify';
import { AuthContext } from '../Authentication/AuthContext';
import AlreadyLoggedIn from './AlreadyLoggedIn';



const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const emailRef = useRef();

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from || '/';

  const { logIn, LoginGoogle, user } = useContext(AuthContext);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await logIn(email, password);
      toast.success('Logged in successfully', {
        position: 'top-center',
        autoClose: 1200,
        onClose: () => navigate(from, { replace: true }),
      });
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await LoginGoogle();
      toast.success('Logged in successfully', {
        position: 'top-center',
        autoClose: 1200,
        onClose: () => navigate(from, { replace: true }),
      });
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleForgetPass = () => {
    const currentEmail = emailRef.current?.value || '';
    navigate('/auth/forgetPass', { state: { email: currentEmail } });
  };

  if (user) {
    return <AlreadyLoggedIn />;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#EAEBD0] px-4">
      <div className="flex flex-col lg:flex-row w-full max-w-5xl shadow-xl rounded-2xl overflow-hidden bg-white">
        {/* Left Section */}
        <div className="w-full lg:w-1/2 bg-[#FFF2EB] flex flex-col items-center justify-center p-10">
          <h2 className="text-3xl font-bold text-[#AF3E3E] mb-2">Welcome Back</h2>
          <p className="text-gray-700 text-center max-w-xs">
            Log in to access your LifeDrop dashboard and continue your impact.
          </p>
        </div>

        {/* Right Section */}
        <div className="w-full lg:w-1/2 p-10 bg-white flex flex-col justify-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-2">Login</h2>
          <p className="text-gray-600 mb-6">Please enter your credentials below.</p>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-gray-700 mb-1">Email</label>
              <input
                ref={emailRef}
                type="email"
                required
                placeholder="Enter your email"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-[#CD5656] text-gray-800"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div>
              <label className="block text-gray-700 mb-1">Password</label>
              <input
                type="password"
                required
                placeholder="Enter your password"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-[#CD5656] text-gray-800"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <div className="text-right">
              <button
                type="button"
                onClick={handleForgetPass}
                className="text-sm text-[#AF3E3E] hover:underline"
              >
                Forgot password?
              </button>
            </div>

            <button
              type="submit"
              className="w-full bg-[#DA6C6C] hover:bg-[#CD5656] text-white font-semibold py-2 rounded-md transition cursor-pointer"
            >
              Login
            </button>
          </form>

          <div className="my-4">
            <button
              onClick={handleGoogleLogin}
              className="bg-blue-500 hover:bg-blue-600 w-full text-white font-semibold flex items-center justify-center gap-2 py-2 rounded-md"
            >
              <img className="w-5 h-5" src="https://i.ibb.co/gFM2v5M2/google.png" alt="google" />
              Login with Google
            </button>
          </div>

          <p className="mt-6 text-center text-gray-600 text-sm">
            Don’t have an account?{' '}
            <Link to="/auth/register" className="text-[#AF3E3E] font-medium hover:underline">
              Sign Up Now
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
