import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';


const Login= ()=>{
    const [formData,setformData] = useState({email:'',password:''});
    const [error,seterror] = useState('')
    const navigate = useNavigate();

    const handelchange = (e) =>{
        const {name,value} =e.target;
        setformData({...formData,[name]:value})
    };

    const handelsubmit = async (e) =>{
        e.preventDefault();
        try{
            const response = await axios.post('http://localhost:5000/api/auth/login', formData);
            localStorage.setItem('token', response.data.token); // Store token in local storage
            navigate('/dashboard');
        }catch (e) {
            // If the error comes from the backend, display the error message
            const errorMessage = e.response?.data?.error || 'Something went wrong, please try again later.';
            seterror(errorMessage);
        }
    };
    const goToSignup = () => {
        navigate('/signup'); // Navigate to the signup page
      };
    return(
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-4 bg-white shadow-lg rounded-lg">
        <h1 className="text-2xl font-bold text-center text-gray-700">Login</h1>
        {error && <p className="text-red-500 text-center">{error}</p>}
        <form onSubmit={handelsubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handelchange}
              placeholder="Enter your email"
              className="w-full mt-1 p-2 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handelchange}
              placeholder="Enter your password"
              className="w-full mt-1 p-2 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700"
          >
            Login
          </button>
        </form>
        <div className="text-center">
          <p className="text-sm text-gray-600">Don't have an account? </p>
          <button
            onClick={goToSignup}
            className="text-indigo-600 hover:text-indigo-700 font-semibold"
          >
            Sign Up
          </button>
          </div>
      </div>
    </div>
  );

}
export default Login;