// src/components/Login/LoginErrorMessage.tsx
import React from 'react';

interface LoginErrorMessageProps {
  error: string;
}

const LoginErrorMessage: React.FC<LoginErrorMessageProps> = ({ error }) => {
  if (!error) return null;

  return (
    <div className="text-red-500 text-center mb-4">
      {error}
    </div>
  );
};

export default LoginErrorMessage;