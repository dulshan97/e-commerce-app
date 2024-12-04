import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { motion } from 'framer-motion';
import { SignupSchema } from '../../Utils/validations/signUpValidationSchema';

interface SignupFormProps {
  initialValues: { 
    id:string;
    username: string; 
    email: string; 
    password: string; 
    confirmPassword: string 
  };
  validationSchema: typeof SignupSchema;
  onSubmit: (values: { 
    id:string;
    username: string; 
    email: string; 
    password: string 
  }) => void;
}

const SignupForm: React.FC<SignupFormProps> = ({ 
  initialValues, 
  validationSchema, 
  onSubmit 
}) => {
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={(values) => onSubmit({
        id:values.id,
        username: values.username,
        email: values.email,
        password: values.password
      })}
    >
      {({ errors, touched }) => (
        <Form className="space-y-6">
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-2">
              Username
            </label>
            <Field
              type="text"
              name="username"
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 
                ${errors.username && touched.username
                  ? 'border-red-500 focus:ring-red-500'
                  : 'border-gray-300 focus:ring-green-500'}`}
            />
            <ErrorMessage
              name="username"
              component="p"
              className="text-red-500 text-xs mt-1"
            />
          </div>

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
                  : 'border-gray-300 focus:ring-green-500'}`}
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
                  : 'border-gray-300 focus:ring-green-500'}`}
            />
            <ErrorMessage
              name="password"
              component="p"
              className="text-red-500 text-xs mt-1"
            />
          </div>

          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-2">
              Confirm Password
            </label>
            <Field
              type="password"
              name="confirmPassword"
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 
                ${errors.confirmPassword && touched.confirmPassword
                  ? 'border-red-500 focus:ring-red-500'
                  : 'border-gray-300 focus:ring-green-500'}`}
            />
            <ErrorMessage
              name="confirmPassword"
              component="p"
              className="text-red-500 text-xs mt-1"
            />
          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            className="w-full bg-green-600 text-white py-3 rounded-lg 
              hover:bg-green-700 transition duration-300 font-semibold"
          >
            Sign Up
          </motion.button>
        </Form>
      )}
    </Formik>
  );
};

export default SignupForm;