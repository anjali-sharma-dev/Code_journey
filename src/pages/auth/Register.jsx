import React, { useState } from "react";
import { Mail, Lock, UserPlus, AlertCircle } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { registerUser } from "../../services/apiHelpers";
import { validateField, validatePassword } from "../../utils/validators";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: ""
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [serverError, setServerError] = useState("");
  
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: null
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    // Validate name
    const nameError = validateField('Name', formData.name, { required: true, minLength: 2 });
    if (nameError) newErrors.name = nameError;
    
    // Validate email
    const emailError = validateField('Email', formData.email, { required: true });
    if (emailError) newErrors.email = emailError;
    
    // Validate password
    const passwordError = validateField('Password', formData.password, { 
      required: true, 
      validateStrength: true 
    });
    if (passwordError) newErrors.password = passwordError;
    
    // Validate password confirmation
    const confirmError = validateField('confirmPassword', formData.confirmPassword, { 
      required: true, 
      password: formData.password 
    });
    if (confirmError) newErrors.confirmPassword = confirmError;
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setServerError("");
    
    if (!validateForm()) {
      return;
    }
    
    setIsLoading(true);
    
    try {
      await registerUser(
        formData.name,
        formData.email,
        formData.password
      );
      
      navigate("/login", { 
        state: { message: "Registration successful! Please log in with your new account." } 
      });
    } catch (err) {
      console.log("Registration error:", err);
      setServerError(err.response?.data?.message || "Registration failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center py-12 px-4">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <div className="mx-auto h-12 w-12 bg-[#00b8a3] rounded-full flex items-center justify-center">
            <UserPlus className="h-6 w-6 text-white" />
          </div>
          <h2 className="mt-6 text-3xl font-bold text-gray-800">Create your account</h2>
          <p className="mt-2 text-sm text-gray-600">Join us and start your DSA journey</p>
        </div>

        {serverError && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded relative flex items-center" role="alert">
            <AlertCircle className="h-5 w-5 mr-2" />
            <span>{serverError}</span>
          </div>
        )}

        <div className="bg-[#f9f9f9] py-8 px-6 shadow rounded-lg border border-gray-200">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-800 mb-2">Full Name</label>
              <div className="relative">
                <UserPlus className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  id="name"
                  name="name"
                  type="text"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter your full name"
                  className={`w-full pl-10 pr-3 py-3 border ${errors.name ? 'border-red-500' : 'border-gray-300'} placeholder-gray-400 text-gray-800 bg-white rounded-md focus:outline-none focus:ring-2 focus:ring-[#00b8a3] focus:border-transparent sm:text-sm`}
                />
              </div>
              {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-800 mb-2">Email address</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your email"
                  className={`w-full pl-10 pr-3 py-3 border ${errors.email ? 'border-red-500' : 'border-gray-300'} placeholder-gray-400 text-gray-800 bg-white rounded-md focus:outline-none focus:ring-2 focus:ring-[#00b8a3] focus:border-transparent sm:text-sm`}
                />
              </div>
              {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-800 mb-2">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  id="password"
                  name="password"
                  type="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Create a password"
                  className={`w-full pl-10 pr-3 py-3 border ${errors.password ? 'border-red-500' : 'border-gray-300'} placeholder-gray-400 text-gray-800 bg-white rounded-md focus:outline-none focus:ring-2 focus:ring-[#00b8a3] focus:border-transparent sm:text-sm`}
                />
              </div>
              {errors.password && <p className="mt-1 text-sm text-red-600">{errors.password}</p>}
            </div>

            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-800 mb-2">Confirm Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="Confirm your password"
                  className={`w-full pl-10 pr-3 py-3 border ${errors.confirmPassword ? 'border-red-500' : 'border-gray-300'} placeholder-gray-400 text-gray-800 bg-white rounded-md focus:outline-none focus:ring-2 focus:ring-[#00b8a3] focus:border-transparent sm:text-sm`}
                />
              </div>
              {errors.confirmPassword && <p className="mt-1 text-sm text-red-600">{errors.confirmPassword}</p>}
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 px-4 text-sm font-medium rounded-md text-white bg-[#00b8a3] hover:bg-[#00a693] transition disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isLoading ? "Creating account..." : "Sign up"}
            </button>
          </form>

          <p className="text-sm text-gray-600 text-center mt-4">
            Already have an account?{" "}
            <Link to="/login" className="font-medium text-[#00b8a3] hover:underline">
              Sign in here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;