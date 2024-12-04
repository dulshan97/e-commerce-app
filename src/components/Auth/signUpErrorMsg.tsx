// src/components/Signup/SignupErrorMessage.tsx
import React from 'react';

interface SignupErrorMessageProps {
  error: string;
}

const SignupErrorMessage: React.FC<SignupErrorMessageProps> = ({ error }) => {
  if (!error) return null;

  return (
    <div className="text-red-500 text-center mb-4">
      {error}
    </div>
  );
};

export default SignupErrorMessage;