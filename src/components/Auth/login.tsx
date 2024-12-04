// src/pages/Login.tsx
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { UserDetails } from '../../models/user';
import { RouteName } from '../../routes/RouteName';
import { LoginSchema } from '../../Utils/validations/loginvalidation';
import LoginErrorMessage from './loginErrorMsg';
import LoginForm from './loginForm';
import LoginSignupLink from './SignupLink';



const Login: React.FC = () => {
  const navigate = useNavigate();
  const [loginError, setLoginError] = useState('');

  const handleLogin = (values: { email: string; password: string }) => {
    try {
      const registeredUsers = JSON.parse(localStorage.getItem('registeredUsers') || '[]');

      
      const user = registeredUsers.find(
        (u: UserDetails) => u.email === values.email
      );

      
      if (user) {
        
        localStorage.setItem('currentUser', JSON.stringify({
          ...user,
          isAuthenticated: true
        }));

        
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
        <h2 className="text-3xl font-bold text-center mb-6 bg-gradient-to-r from-pink-500 to-purple-600  text-transparent bg-clip-text ">
          Login
        </h2>

        <LoginErrorMessage error={loginError} />

        <LoginForm 
          initialValues={{ email: '', password: '' }}
          validationSchema={LoginSchema}
          onSubmit={handleLogin}
        />

        <LoginSignupLink />
      </motion.div>
    </div>
  );
};

export default Login;