import React from 'react';
import { useNavigate } from 'react-router-dom';
import { RouteName } from '../../routes/RouteName';

const LoginSignupLink: React.FC = () => {
  const navigate = useNavigate();

  return (
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
  );
};

export default LoginSignupLink;