import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { RouteName } from '../../routes/RouteName';
import { UserDetails } from '../../models/user';

// Validation Schema
const LoginSchema = Yup.object().shape({
  email: Yup.string()
    .email('Invalid email address')
    .required('Email is required'),
  password: Yup.string()
    .min(6, 'Password must be at least 6 characters')
    .required('Password is required')
});

const Login: React.FC = () => {
  const navigate = useNavigate();
  const [loginError, setLoginError] = useState('');

  // Handle login with local storage
  const handleLogin = (values: { email: string; password: string }) => {
    try {
      // Retrieve registered users from local storage
      const registeredUsers = JSON.parse(localStorage.getItem('registeredUsers') || '[]');

      // Find user by email
      const user = registeredUsers.find(
        (u: UserDetails) =>
          u.email === values.email
      );

      // Check if user exists and password matches (in a real app, use proper encryption)
      if (user) {
        // Store authenticated user
        localStorage.setItem('currentUser', JSON.stringify({
          ...user,
          isAuthenticated: true
        }));

        // Navigate to root/dashboard
        navigate(RouteName.ROOT);
      } else {
        setLoginError('Invalid email or password');
      }
    } catch (error) {
      setLoginError('Login failed. Please try again.');
      console.error('Login error:', error);
    }
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100 px-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
        className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-md"
      >
        <h2 className="text-3xl font-bold text-center mb-6 text-blue-800">
          Login
        </h2>

        {loginError && (
          <div className="text-red-500 text-center mb-4">
            {loginError}
          </div>
        )}

        <Formik
          initialValues={{ email: '', password: '' }}
          validationSchema={LoginSchema}
          onSubmit={handleLogin}
        >
          {({ errors, touched }) => (
            <Form className="space-y-6">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  Email
                </label>
                <Field
                  type="email"
                  name="email"
                  className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 
                    ${errors.email && touched.email
                      ? 'border-red-500 focus:ring-red-500'
                      : 'border-gray-300 focus:ring-blue-500'}`}
                />
                <ErrorMessage
                  name="email"
                  component="p"
                  className="text-red-500 text-xs mt-1"
                />
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                  Password
                </label>
                <Field
                  type="password"
                  name="password"
                  className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 
                    ${errors.password && touched.password
                      ? 'border-red-500 focus:ring-red-500'
                      : 'border-gray-300 focus:ring-blue-500'}`}
                />
                <ErrorMessage
                  name="password"
                  component="p"
                  className="text-red-500 text-xs mt-1"
                />
              </div>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                type="submit"
                className="w-full bg-blue-600 text-white py-3 rounded-lg 
                  hover:bg-blue-700 transition duration-300 font-semibold"
              >
                Sign In
              </motion.button>
            </Form>
          )}
        </Formik>

        <div className="text-center mt-6">
          <p className="text-sm text-gray-600">
            Don't have an account?{' '}
            <button
              onClick={() => navigate(RouteName.SIGNUP)}
              className="text-blue-600 hover:underline font-medium"
            >
              Sign Up
            </button>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;