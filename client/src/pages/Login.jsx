import React from 'react'
import { useState } from 'react';
import { AlertCircle, Mail, Lock, User } from 'lucide-react';
import axios from 'axios';
// import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
const base_url = import.meta.env.VITE_BASE_API_URL 

const Login = () => {
const [isSignIn, setIsSignIn] = useState(true);
const [error, setError] = useState('');
const [username, setUsername] = useState('');
const [email, setEmail] = useState('');
const [password, setPassword] = useState('');
const [confirmPassword, setConfirmPassword] = useState('');

const navigate = useNavigate()
const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!isSignIn) {
      // if (password !== confirmPassword) {
      //   setError("Passwords don't match");
      //   // toast.error("Passwords don't match");
      //   return;
      // }

      try {
        const response = await axios.post(`${base_url}/api/auth/signUp`, {
          username,
          email,
          password,
        }, {withCredentials : true});
        Cookies.set('token', response.data.token, { expires: 7, secure: true }); 
        navigate('/department')
        // toast.success(response.data.message);
      } catch (err) {
        console.log(err)
        setError(err.response?.data?.message || 'Server error');
        // toast.error(err.response?.data?.message || 'Server error');
      }
    } else {
      try {
        const response = await axios.post(`${base_url}/api/auth/logIn`, {
          email,
          password,
        },{withCredentials : true} );
        //  , {withCredentials : true , headers : { "Content-Type" : "application/json" }}
        Cookies.set('token', response.data.token, { expires: 7, secure: true }); 
        navigate('/department')
        // toast.success(response.data.message);
      } catch (err ) {
        console.log(err)
        setError(err.response?.data?.message || 'Server error');
        // toast.error(err.response?.data?.message || 'Server error');
      }
    }
  };
  return (
    //bg-gradient-to-br from-purple-400 via-blue-400 to-pink-200
    <div className="min-h-screen flex items-center justify-center bg-slate-200 ">
    <div className="bg-white/80  p-8 rounded-2xl shadow-xl w-full max-w-md mx-4">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
          {isSignIn ? 'Welcome Back' : 'Create Account'}
        </h1>
        <p className="text-gray-600 mt-2">
          {isSignIn 
            ? 'Enter your credentials to access your account' 
            : 'Sign up for a new account to get started'}
        </p>
      </div>

      {error && (
        <div className="mb-4 p-4 bg-red-100 text-red-600 rounded-lg flex items-center gap-2">
          <AlertCircle size={20} />
          <span>{error}</span>
        </div>
      )}

      <form className="space-y-4" onSubmit={handleSubmit}>
        {!isSignIn && (
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Username
            </label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                placeholder="Enter your username"
              />
            </div>
          </div>
        )}

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Email
          </label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              placeholder="Enter your email"
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Password
          </label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              placeholder="Enter your password"
            />
          </div>
        </div>

        {/* {!isSignIn && (
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Confirm Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                placeholder="Confirm your password"
              />
            </div>
          </div>
        )} */}

        <button
          type="submit"
          className="w-full py-2 px-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg hover:opacity-90 transition-opacity focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
        >
          {isSignIn ? 'Sign In' : 'Create Account'}
        </button>
      </form>

      <div className="mt-6 text-center">
        <button
          onClick={() => setIsSignIn(!isSignIn)}
          className="text-purple-600 hover:text-purple-700 text-sm font-medium"
        >
          {isSignIn 
            ? "Don't have an account? Sign Up" 
            : "Already have an account? Sign In"}
        </button>
      </div>
    </div>

  </div>
  );
}

export default Login
